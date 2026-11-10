const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

let activeAudits = 0;

export async function handlePageSpeed(request: Request, env: unknown) {
  if (request.method !== "POST") return json({ error: { message: "Use POST." } }, 405);
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return json({ error: { message: "This audit must be started from our website." } }, 403);
  }
  let url: URL;
  try {
    const body = await request.json();
    if (typeof body.url !== "string" || body.url.length > 2048) throw new Error();
    url = new URL(body.url);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      !url.hostname.includes(".") ||
      url.port
    )
      throw new Error();
  } catch {
    return json({ error: { message: "Enter a valid public HTTP or HTTPS webpage address." } }, 400);
  }
  const key =
    (env as Record<string, string | undefined> | undefined)?.["PAGESPEED_API_KEY"] ??
    process.env["PAGESPEED_API_KEY"];
  if (!key) {
    return json(
      {
        error: {
          message:
            "Speed testing is not configured on this service yet. The page checks below are still available; use Google PageSpeed Insights for a speed test.",
        },
      },
      503,
    );
  }
  if (activeAudits >= 4) {
    return json(
      { error: { message: "All speed test slots are in use. Please try again shortly." } },
      429,
    );
  }
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url.href);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.set("key", key);
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
    endpoint.searchParams.append("category", category);
  }
  activeAudits++;
  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(70_000) });
    if (!response.ok) {
      const message =
        response.status === 429
          ? "The speed test quota has been reached. Please try again later or open Google PageSpeed Insights."
          : response.status === 400
            ? "Google could not test this address. Check that the page is public and accessible without signing in."
            : "Google could not complete the speed test. Please try again shortly.";
      return json({ error: { message } }, response.status === 400 ? 400 : 503);
    }
    return json(await response.json());
  } catch {
    return json(
      {
        error: { message: "The speed test timed out or could not reach Google. Please try again." },
      },
      504,
    );
  } finally {
    activeAudits--;
  }
}
