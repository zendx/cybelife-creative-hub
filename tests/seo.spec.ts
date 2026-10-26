import { test, expect } from "@playwright/test";

const origin = "https://www.cyberlife.digital";

test("sitemap pages return indexable HTML with matching canonical URLs", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml", { maxRedirects: 0 });
  expect(sitemap.status()).toBe(200);
  const urls = Array.from(
    (await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g),
    ([, url]) => url,
  );
  expect(urls).toContain(`${origin}/`);
  expect(new Set(urls).size).toBe(urls.length);
  for (const url of urls) {
    expect(new URL(url).origin).toBe(origin);
    const response = await request.get(new URL(url).pathname, { maxRedirects: 0 });
    expect(response.status(), url).toBe(200);
    expect(response.headers()["x-robots-tag"] ?? "").not.toContain("noindex");
    const html = await response.text();
    expect(html, url).toContain(`<link rel="canonical" href="${url}"`);
    expect(html, url).toContain(`<meta property="og:url" content="${url}"`);
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
});

test("trailing slash variants redirect permanently in one hop", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml", { maxRedirects: 0 });
  const paths = [...(await sitemap.text()).matchAll(/<loc>[^<]+<\/loc>/g)]
    .map(([entry]) => new URL(entry.slice(5, -6)).pathname)
    .filter((path) => path !== "/");
  for (const path of paths) {
    for (const host of ["127.0.0.1:4173", "cyberlife.digital"]) {
      const response = await request.get(`${path}/?source=test`, {
        headers: { host },
        maxRedirects: 0,
      });
      expect(response.status(), `${host}${path}/`).toBe(308);
      const destination = new URL(response.headers().location);
      expect(destination.pathname).toBe(path);
      expect(destination.search).toBe("?source=test");
      if (host === "cyberlife.digital") expect(destination.origin).toBe(origin);
      const final = await request.get(destination.pathname + destination.search, {
        maxRedirects: 0,
      });
      expect(final.status(), path).toBe(200);
    }
  }
});

test("alternate production hosts redirect directly to the canonical host", async ({ request }) => {
  for (const host of ["cyberlife.digital", "cyberlifedigital.ng", "www.cyberlifedigital.com"]) {
    const response = await request.get("/services?source=test", {
      headers: { host },
      maxRedirects: 0,
    });
    expect(response.status(), host).toBe(308);
    expect(response.headers().location).toBe(`${origin}/services?source=test`);
  }
});
