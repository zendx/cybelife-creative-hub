import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { handleEnquiry } from "./lib/enquiries.server";
import { secureResponse } from "./lib/security.server";

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
      if (
        ["cyberlifedigital.ng", "www.cyberlifedigital.ng", "www.cyberlifedigital.com"].includes(
          url.hostname,
        ) ||
        (url.hostname === "cyberlifedigital.com" && url.protocol === "http:")
      ) {
        url.protocol = "https:";
        url.host = "cyberlifedigital.com";
        return protect(Response.redirect(url, 308));
      }
      if (url.pathname === "/api/enquiries") return protect(await handleEnquiry(request, env));
      const handler = await getServerEntry();
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-cyberlife-csp-nonce", nonce);
      const response = await handler.fetch(new Request(request, { headers: requestHeaders }), {
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
