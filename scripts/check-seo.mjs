import { readFileSync } from "node:fs";

const canonicalOrigin = "https://www.cyberlife.digital";
const target = new URL(process.argv[2] ?? canonicalOrigin);
const failures = [];
const links = new Set();
const checked = new Set();
const fail = (message) => failures.push(message);

async function get(url) {
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
  });
  if (response.status !== 200 || response.headers.has("location")) {
    throw new Error(
      `HTTP ${response.status}; Location: ${response.headers.get("location") ?? "none"}`,
    );
  }
  return response;
}

try {
  const local = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const sitemap = await (await get(new URL("/sitemap.xml", target))).text();
  const locations = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const urls = locations(sitemap);
  if (!urls.length || urls.length !== new Set(urls).size) fail("Empty or duplicate sitemap URLs");
  if (JSON.stringify([...urls].sort()) !== JSON.stringify(locations(local).sort())) {
    fail("Served sitemap differs from the project sitemap");
  }
  const robots = await (await get(new URL("/robots.txt", target))).text();
  if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`))
    fail("robots.txt sitemap mismatch");

  async function inspect(canonical) {
    if (checked.has(canonical)) return;
    checked.add(canonical);
    const url = new URL(canonical);
    if (url.origin !== canonicalOrigin) throw new Error("Noncanonical host or protocol");
    if (url.pathname !== "/" && url.pathname.endsWith("/"))
      throw new Error("Trailing slash in page link");
    const response = await get(new URL(url.pathname + url.search, target));
    const html = await response.text();
    if (!response.headers.get("content-type")?.includes("text/html"))
      throw new Error("Expected HTML");
    const expected = `${canonicalOrigin}${url.pathname}`;
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
    if (canonicals.length !== 1 || canonicals[0][1] !== expected)
      throw new Error("Canonical URL mismatch");
    if (
      /noindex/i.test(response.headers.get("x-robots-tag") ?? "") ||
      /<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)
    )
      throw new Error("Page is noindex");
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const link = new URL(href.replaceAll("&amp;", "&"), canonical);
      if (!/^(www\.)?cyberlife\.digital$|^(www\.)?cyberlifedigital\.(com|ng)$/.test(link.hostname))
        continue;
      link.hash = "";
      links.add(link.href);
    }
    console.log(`PASS ${canonical}`);
  }

  for (const url of urls) {
    try {
      await inspect(url);
    } catch (error) {
      fail(`${url}: ${error.message}`);
    }
  }
  // Crawl all linked pages, including any pages absent from the sitemap.
  for (const url of links) {
    try {
      await inspect(url);
    } catch (error) {
      fail(`${url}: ${error.message}`);
    }
  }
} catch (error) {
  fail(error.message);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`SEO check passed: ${checked.size} page URLs; zero redirects.`);
}
