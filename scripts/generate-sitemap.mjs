import { readFileSync, writeFileSync } from "node:fs";

const blog = readFileSync(new URL("../src/data/blog.ts", import.meta.url), "utf8");
const posts = Array.from(
  blog.matchAll(/slug: "([a-z0-9-]+)"([\s\S]*?)(?=\n    image:)/g),
  ([, slug, fields]) => ({
    path: `/blog/${slug}`,
    modified:
      fields.match(/modifiedAt: "([\d-]+)"/)?.[1] ?? fields.match(/publishedAt: "([\d-]+)"/)?.[1],
  }),
);
const paths = [
  "/",
  "/services",
  "/website-maintenance",
  "/work",
  "/about",
  "/blog",
  "/audit",
  "/book",
  ...posts.map((post) => post.path),
];
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
      return `  <url><loc>https://www.cyberlife.digital${path}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ""}</url>`;
    })
    .join("\n")}\n</urlset>\n`,
);
