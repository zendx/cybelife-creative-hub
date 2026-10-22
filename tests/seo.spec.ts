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
