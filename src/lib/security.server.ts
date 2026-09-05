export function secureResponse(response: Response, request: Request, nonce: string) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  if (new URL(request.url).protocol === "https:")
    headers.set("Strict-Transport-Security", "max-age=31536000");
  if (import.meta.env.PROD) {
    headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https:",
        "connect-src 'self' https://www.googleapis.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://*.lovable.app",
        ...(new URL(request.url).protocol === "https:" ? ["upgrade-insecure-requests"] : []),
      ].join("; "),
    );
  }
  if (response.status >= 400) headers.set("X-Robots-Tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
