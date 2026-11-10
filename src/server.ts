import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { secureResponse } from "./lib/security.server";
import { visitorLocation } from "./lib/visitor-location.server";

type ServerEntry = {
  fetch: (
    request: Request,
    options: { context: { nonce: string } },
  ) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(24))));
    const protect = (response: Response) => secureResponse(response, request, nonce);
    try {
      const url = new URL(request.url);
      const canonicalUrl = new URL(url);
      if (
        [
          "cyberlife.digital",
          "cyberlifedigital.ng",
          "www.cyberlifedigital.ng",
          "cyberlifedigital.com",
          "www.cyberlifedigital.com",
        ].includes(url.hostname) ||
        (url.hostname === "www.cyberlife.digital" && url.protocol === "http:")
      ) {
        canonicalUrl.protocol = "https:";
        canonicalUrl.host = "www.cyberlife.digital";
      }
      // Normalize page paths together with the host to avoid temporary router
      // redirects and a second hop when an old-domain URL has a trailing slash.
      // API endpoints and assets retain their own routing semantics.
      if (
        (request.method === "GET" || request.method === "HEAD") &&
        !url.pathname.startsWith("/api/") &&
        !url.pathname.split("/").some((segment) => segment.includes("."))
      ) {
        canonicalUrl.pathname = url.pathname.replace(/\/+$/, "") || "/";
      }
      if (canonicalUrl.href !== url.href) {
        return protect(
          new Response(null, {
            status: 308,
            headers: { Location: canonicalUrl.href, "Cache-Control": "public, max-age=86400" },
          }),
        );
      }
      if (url.pathname === "/api/enquiries" || url.pathname === "/api/care-checkout") {
        const { handleEnquiry } = await import("./lib/enquiries.server");
        return protect(await handleEnquiry(request, env, url.pathname === "/api/care-checkout"));
      }
      if (url.pathname === "/api/care-payment" || url.pathname === "/api/paystack-webhook") {
        const { handleCarePayment, handlePaystackWebhook } = await import("./lib/paystack.server");
        return protect(
          await (url.pathname === "/api/care-payment" ? handleCarePayment : handlePaystackWebhook)(
            request,
            env,
          ),
        );
      }
      if (url.pathname === "/api/visitor-location") return protect(visitorLocation(request));
      if (url.pathname === "/api/pagespeed") {
        const { handlePageSpeed } = await import("./lib/pagespeed.server");
        return protect(await handlePageSpeed(request, env));
      }
      const handler = await getServerEntry();
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-cyberlife-csp-nonce", nonce);
      // Vite supplies a proxied Request; passing it directly to Undici's
      // constructor fails its private-field checks. Copy the public fields.
      const requestInit: RequestInit & { duplex?: "half" } = {
        method: request.method,
        headers: requestHeaders,
        signal: request.signal,
        ...(request.method !== "GET" && request.method !== "HEAD"
          ? { body: request.body, duplex: "half" as const }
          : {}),
      };
      const response = await handler.fetch(new Request(request.url, requestInit), {
        context: { nonce },
      });
      return protect(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return protect(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
