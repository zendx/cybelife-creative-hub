import { readFileSync, writeFileSync } from "node:fs";

const blog = readFileSync(new URL("../src/data/blog.ts", import.meta.url), "utf8");
const paths = [
  "/",
  "/services",
  "/website-maintenance",
  "/work",
  "/about",
  "/blog",
  "/audit",
  "/book",
  ...Array.from(blog.matchAll(/slug: "([a-z0-9-]+)"/g), ([, slug]) => `/blog/${slug}`),
];
writeFileSync(
  new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>https://cyberlifedigital.com${path}</loc></url>`).join("\n")}\n</urlset>\n`,
);
