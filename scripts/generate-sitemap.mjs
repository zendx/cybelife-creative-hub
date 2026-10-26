import { readFileSync, readdirSync, writeFileSync } from "node:fs";

// Derive public pages from the routes so newly added pages cannot silently
// disappear from the sitemap. Transaction-only/noindex routes are excluded.
const routeRoot = new URL("../src/routes/", import.meta.url);
const pages = readdirSync(routeRoot, { recursive: true })
  .filter((file) => file.endsWith(".tsx"))
  .flatMap((file) => {
    const source = readFileSync(new URL(file.replaceAll("\\", "/"), routeRoot), "utf8");
    const path = source.match(/createFileRoute\("([^"]+)"\)/)?.[1];
    if (!path || path.includes("$") || /content:\s*"noindex\b/.test(source)) return [];
    return [path.replace(/\/+$/, "") || "/"];
  })
  .sort();

const blog = readFileSync(new URL("../src/data/blog.ts", import.meta.url), "utf8");
const posts = Array.from(
  blog.matchAll(/slug: "([a-z0-9-]+)"([\s\S]*?)(?=\n    image:)/g),
  ([, slug, fields]) => ({
    path: `/blog/${slug}`,
    modified:
      fields.match(/modifiedAt: "([\d-]+)"/)?.[1] ?? fields.match(/publishedAt: "([\d-]+)"/)?.[1],
  }),
);
const paths = [...pages, ...posts.map((post) => post.path)];
if (!pages.includes("/") || !posts.length || new Set(paths).size !== paths.length) {
  throw new Error("Sitemap routes are missing or duplicated; refusing to publish.");
}
writeFileSync(
  new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((path) => {
      const modified =
        path === "/blog"
          ? posts
              .map((post) => post.modified)
              .filter(Boolean)
              .sort()
              .at(-1)
          : posts.find((post) => post.path === path)?.modified;
      return `  <url>\n    <loc>https://www.cyberlife.digital${path}</loc>${modified ? `\n    <lastmod>${modified}</lastmod>` : ""}\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`,
);
