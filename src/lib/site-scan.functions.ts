import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type SiteScanStatus = "pass" | "warning" | "fail";
export type SiteScanCategory = "Search" | "Accessibility" | "Technical" | "Trust & security";

export interface SiteScanCheck {
  id: string;
  label: string;
  status: SiteScanStatus;
  detail: string;
  category: SiteScanCategory;
}

export interface SiteScanReport {
  source: "foundation-scan";
  requestedUrl: string;
  finalUrl: string;
  fetchedAt: string;
  httpStatus: number;
  htmlBytes: number;
  checks: SiteScanCheck[];
  summary: Record<SiteScanStatus, number>;
}

const scanInput = z.object({
  url: z.string().trim().min(1).max(2048),
});

const MAX_HTML_BYTES = 1_500_000;
const MAX_REDIRECTS = 4;
const MAX_CONCURRENT_SCANS = 4;
let activeScans = 0;

interface DnsJsonResponse {
  Status?: number;
  Answer?: Array<{
    type?: number;
    data?: string;
  }>;
}

function isBlockedHost(hostname: string) {
  const host = hostname
    .toLowerCase()
    .replace(/^\[|\]$/g, "")
    .replace(/\.+$/, "");

  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "metadata.google.internal"
  ) {
    return true;
  }

  // Direct IPv6 URLs are unnecessary for this public-facing form and are easy
  // to disguise with compression or IPv4-mapped notation. Domain AAAA records
  // are classified separately before each outbound request.
  if (host.includes(":")) return true;

  const octets = host.split(".").map(Number);
  if (octets.length !== 4 || octets.some((part) => !Number.isInteger(part))) return false;

  const [first = -1, second = -1] = octets;
  return (
    first <= 0 ||
    first >= 224 ||
    first === 10 ||
    first === 127 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

function isBlockedIpAddress(address: string) {
  const value = address
    .toLowerCase()
    .trim()
    .replace(/^\[|\]$/g, "");

  if (!value.includes(":")) return isBlockedHost(value);

  // Reject non-global and transition IPv6 ranges. A public domain can still
  // use ordinary global IPv6; only risky destinations are excluded.
  if (value.startsWith("::") || value.includes("::ffff:")) return true;
  const firstHextet = Number.parseInt(value.split(":")[0] ?? "", 16);
  if (!Number.isFinite(firstHextet)) return true;

  return (
    firstHextet === 0 ||
    (firstHextet >= 0xfc00 && firstHextet <= 0xfdff) ||
    (firstHextet >= 0xfe80 && firstHextet <= 0xfebf) ||
    (firstHextet >= 0xff00 && firstHextet <= 0xffff) ||
    value.startsWith("2001:db8:") ||
    value.startsWith("2001:2:") ||
    value.startsWith("64:ff9b:")
  );
}

function normalizePublicUrl(value: string) {
  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  let parsed: URL;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error("Enter a valid public website address.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP and HTTPS websites can be scanned.");
  }

  const hostname = parsed.hostname.replace(/^\[|\]$/g, "").replace(/\.+$/, "");
  if (!hostname || parsed.username || parsed.password || isBlockedHost(hostname)) {
    throw new Error("Only public website addresses can be scanned.");
  }
  if (!hostname.includes(".")) {
    throw new Error("Only public website addresses can be scanned.");
  }
  if (
    parsed.port &&
    !(
      (parsed.protocol === "http:" && parsed.port === "80") ||
      (parsed.protocol === "https:" && parsed.port === "443")
    )
  ) {
    throw new Error("Only standard public web ports can be scanned.");
  }

  parsed.hostname = hostname;
  parsed.hash = "";
  return parsed;
}

async function assertPublicResolution(url: URL, signal: AbortSignal) {
  const hostname = url.hostname.replace(/^\[|\]$/g, "").replace(/\.+$/, "");
  const ipv4Parts = hostname.split(".");
  const isIpv4Literal = ipv4Parts.length === 4 && ipv4Parts.every((part) => /^\d{1,3}$/.test(part));

  if (isIpv4Literal) {
    if (isBlockedIpAddress(hostname)) {
      throw new Error("Only publicly routed websites can be scanned.");
    }
    return;
  }

  const responses = await Promise.all(
    (["A", "AAAA"] as const).map(async (type) => {
      const endpoint = new URL("https://cloudflare-dns.com/dns-query");
      endpoint.searchParams.set("name", hostname);
      endpoint.searchParams.set("type", type);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/dns-json" },
        signal,
      });
      if (!response.ok) throw new Error("The website address could not be safely resolved.");
      return (await response.json()) as DnsJsonResponse;
    }),
  );

  const addresses = responses.flatMap(
    (payload) =>
      payload.Answer?.filter((answer) => answer.type === 1 || answer.type === 28)
        .map((answer) => answer.data?.trim() ?? "")
        .filter(Boolean) ?? [],
  );

  if (responses.some((payload) => payload.Status !== 0) || addresses.length === 0) {
    throw new Error("The website address did not resolve to a public server.");
  }
  if (addresses.some(isBlockedIpAddress)) {
    throw new Error("Only publicly routed websites can be scanned.");
  }
}

async function fetchPublicHtml(initialUrl: URL, signal: AbortSignal) {
  let currentUrl = initialUrl;

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    await assertPublicResolution(currentUrl, signal);

    const response = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      signal,
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
        "User-Agent":
          "Mozilla/5.0 (compatible; CyberlifeSiteAudit/1.0; +https://cyberlifedigital.ng)",
      },
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("The website returned a redirect without a destination.");
      if (redirectCount === MAX_REDIRECTS)
        throw new Error("The website redirected too many times.");
      currentUrl = normalizePublicUrl(new URL(location, currentUrl).toString());
      continue;
    }

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      throw new Error("That address did not return an HTML webpage.");
    }

    const declaredLength = Number(response.headers.get("content-length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_HTML_BYTES) {
      throw new Error("The webpage HTML is too large for this quick scan.");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      const html = await response.text();
      if (new TextEncoder().encode(html).byteLength > MAX_HTML_BYTES) {
        throw new Error("The webpage HTML is too large for this quick scan.");
      }
      return { response, html, finalUrl: currentUrl };
    }

    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_HTML_BYTES) {
        await reader.cancel();
        throw new Error("The webpage HTML is too large for this quick scan.");
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return { response, html: new TextDecoder().decode(bytes), finalUrl: currentUrl };
  }

  throw new Error("The website could not be reached.");
}

function decodeText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function shortValue(value: string | null, maxLength = 200) {
  if (!value) return null;
  const clean = decodeText(value);
  return clean.length > maxLength ? `${clean.slice(0, maxLength - 1)}…` : clean;
}

function readAttribute(tag: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(`\\s${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return match ? (match[1] ?? match[2] ?? match[3] ?? "").trim() : null;
}

function check(
  id: string,
  label: string,
  status: SiteScanStatus,
  detail: string,
  category: SiteScanCategory,
): SiteScanCheck {
  return { id, label, status, detail, category };
}

function analyzePage(response: Response, html: string, requestedUrl: URL, finalUrl: URL) {
  const title = decodeText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const h1Count = (html.match(/<h1\b[^>]*>/gi) ?? []).length;
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";

  const findMeta = (key: string) =>
    metaTags.find((tag) => {
      const name = readAttribute(tag, "name")?.toLowerCase();
      const property = readAttribute(tag, "property")?.toLowerCase();
      const httpEquiv = readAttribute(tag, "http-equiv")?.toLowerCase();
      return name === key || property === key || httpEquiv === key;
    });

  const description = decodeText(readAttribute(findMeta("description") ?? "", "content") ?? "");
  const viewport = readAttribute(findMeta("viewport") ?? "", "content");
  const robots = [
    readAttribute(findMeta("robots") ?? "", "content") ?? "",
    response.headers.get("x-robots-tag") ?? "",
  ]
    .join(",")
    .toLowerCase();
  const canonical = linkTags.find((tag) =>
    (readAttribute(tag, "rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"),
  );
  const lang = shortValue(readAttribute(htmlTag, "lang"), 30);
  const ogTitle = shortValue(readAttribute(findMeta("og:title") ?? "", "content"));
  const ogDescription = shortValue(readAttribute(findMeta("og:description") ?? "", "content"));
  const canonicalHref = shortValue(readAttribute(canonical ?? "", "href"));
  const hasJsonLd = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>/i.test(html);
  const imagesWithAlt = imageTags.filter((tag) => /\salt(?:\s*=|\s|>)/i.test(tag)).length;
  const charsetDeclared =
    metaTags.some((tag) => readAttribute(tag, "charset") !== null) ||
    Boolean(findMeta("content-type"));
  const htmlBytes = new TextEncoder().encode(html).byteLength;
  const checks: SiteScanCheck[] = [];

  checks.push(
    check(
      "status",
      "Page response",
      response.ok ? "pass" : "fail",
      `The page returned HTTP ${response.status}.`,
      "Technical",
    ),
    check(
      "https",
      "Secure connection",
      finalUrl.protocol === "https:" ? "pass" : "fail",
      finalUrl.protocol === "https:"
        ? "The final page uses HTTPS."
        : "The final page is served over HTTP instead of HTTPS.",
      "Trust & security",
    ),
    check(
      "title",
      "Page title",
      !title ? "fail" : title.length >= 10 && title.length <= 60 ? "pass" : "warning",
      !title
        ? "No page title was found."
        : `The title is ${title.length} characters: “${title.slice(0, 90)}”.`,
      "Search",
    ),
    check(
      "description",
      "Meta description",
      !description
        ? "fail"
        : description.length >= 50 && description.length <= 160
          ? "pass"
          : "warning",
      !description
        ? "No meta description was found."
        : `The meta description is ${description.length} characters.`,
      "Search",
    ),
    check(
      "viewport",
      "Mobile viewport",
      viewport ? "pass" : "fail",
      viewport
        ? "A viewport declaration is present for responsive layouts."
        : "No mobile viewport declaration was found.",
      "Accessibility",
    ),
    check(
      "language",
      "Document language",
      lang ? "pass" : "warning",
      lang
        ? `The document language is set to “${lang}”.`
        : "The HTML element has no language attribute.",
      "Accessibility",
    ),
    check(
      "heading",
      "Primary heading",
      h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warning",
      h1Count === 1
        ? "Exactly one H1 heading was found."
        : h1Count === 0
          ? "No H1 heading was found."
          : `${h1Count} H1 headings were found; review the page hierarchy.`,
      "Accessibility",
    ),
    check(
      "image-alt",
      "Image alternatives",
      imageTags.length === 0 || imagesWithAlt === imageTags.length
        ? "pass"
        : imagesWithAlt === 0
          ? "fail"
          : "warning",
      imageTags.length === 0
        ? "No image elements were present in the returned HTML."
        : `${imagesWithAlt} of ${imageTags.length} image elements include an alt attribute.`,
      "Accessibility",
    ),
    check(
      "canonical",
      "Canonical URL",
      canonical ? "pass" : "warning",
      canonical
        ? `A canonical link is present${canonicalHref ? `: ${canonicalHref}` : "."}`
        : "No canonical link was found in the returned HTML.",
      "Search",
    ),
    check(
      "indexing",
      "Search indexing",
      /(?:^|[,\s])noindex(?:[,\s]|$)/.test(robots) ? "fail" : "pass",
      /(?:^|[,\s])noindex(?:[,\s]|$)/.test(robots)
        ? "A noindex directive is present."
        : "No noindex directive was found in the page response.",
      "Search",
    ),
    check(
      "social",
      "Social sharing metadata",
      ogTitle && ogDescription ? "pass" : ogTitle || ogDescription ? "warning" : "warning",
      ogTitle && ogDescription
        ? "Open Graph title and description are present."
        : "Open Graph title and description are incomplete or missing.",
      "Search",
    ),
    check(
      "structured-data",
      "Structured data",
      hasJsonLd ? "pass" : "warning",
      hasJsonLd
        ? "JSON-LD structured data was found."
        : "No JSON-LD structured data was found in the returned HTML.",
      "Search",
    ),
    check(
      "html-weight",
      "HTML document weight",
      htmlBytes <= 200_000 ? "pass" : htmlBytes <= 600_000 ? "warning" : "fail",
      `The returned HTML document is ${Math.max(1, Math.round(htmlBytes / 1024))} KB before page assets.`,
      "Technical",
    ),
    check(
      "charset",
      "Character encoding",
      charsetDeclared ? "pass" : "warning",
      charsetDeclared
        ? "A character encoding declaration is present."
        : "No character encoding declaration was found in the HTML metadata.",
      "Technical",
    ),
  );

  const headerChecks: Array<[string, string, string, SiteScanCategory]> = [
    ["content-security-policy", "Content Security Policy", "CSP", "Trust & security"],
    ["strict-transport-security", "HTTPS enforcement", "HSTS", "Trust & security"],
    [
      "x-content-type-options",
      "Content type protection",
      "X-Content-Type-Options",
      "Trust & security",
    ],
    ["referrer-policy", "Referrer policy", "Referrer-Policy", "Trust & security"],
  ];

  for (const [header, label, shortName, category] of headerChecks) {
    const value = response.headers.get(header);
    checks.push(
      check(
        header,
        label,
        value ? "pass" : "warning",
        value
          ? `${shortName} is present in the response.`
          : `${shortName} was not found in the response headers.`,
        category,
      ),
    );
  }

  const summary: Record<SiteScanStatus, number> = { pass: 0, warning: 0, fail: 0 };
  for (const item of checks) summary[item.status] += 1;

  return {
    source: "foundation-scan" as const,
    requestedUrl: requestedUrl.toString(),
    finalUrl: finalUrl.toString(),
    fetchedAt: new Date().toISOString(),
    httpStatus: response.status,
    htmlBytes,
    checks,
    summary,
  } satisfies SiteScanReport;
}

export const runSiteScan = createServerFn({ method: "POST" })
  .validator(scanInput)
  .handler(async ({ data }) => {
    const requestedUrl = normalizePublicUrl(data.url);

    if (activeScans >= MAX_CONCURRENT_SCANS) {
      throw new Error("The live scanner is busy. Please wait a moment and try again.");
    }

    activeScans += 1;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const { response, html, finalUrl } = await fetchPublicHtml(requestedUrl, controller.signal);
      return analyzePage(response, html, requestedUrl, finalUrl);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("The website did not respond within 15 seconds.");
      }
      throw error instanceof Error ? error : new Error("The website could not be scanned.");
    } finally {
      clearTimeout(timeout);
      activeScans = Math.max(0, activeScans - 1);
    }
  });
