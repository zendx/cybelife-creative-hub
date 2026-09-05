// Local preview of the compiled SSR application and its public assets.
// Production deployments should use the generated hosting-platform entry.
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import app from "../.output/server/_ssr/ssr.mjs";

const publicRoot = resolve(".output/public");
const mime = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const file = resolve(publicRoot, `.${decodeURIComponent(url.pathname)}`);
    if (file.startsWith(publicRoot + sep) && (await stat(file).catch(() => null))?.isFile()) {
      res.writeHead(200, {
        "Content-Type": mime[extname(file)] ?? "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(await readFile(file));
      return;
    }
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      ...(req.method !== "GET" && req.method !== "HEAD"
        ? { body: Readable.toWeb(req), duplex: "half" }
        : {}),
    });
    const response = await app.fetch(request, process.env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) Readable.fromWeb(response.body).pipe(res);
    else res.end();
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end("Preview unavailable");
  }
});
server.listen(Number(process.env.PORT ?? 4173), "127.0.0.1", () =>
  console.log("Production preview: http://127.0.0.1:4173"),
);
