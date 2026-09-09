export function visitorLocation(request: Request) {
  const country = request.headers.get("cf-ipcountry")?.toUpperCase();
  // Cloudflare sets this header; XX and T1 do not identify a visitor's country.
  const known = country && /^[A-Z]{2}$/.test(country) && country !== "XX";
  return Response.json(
    { currency: known ? (country === "NG" ? "NGN" : "USD") : null },
    {
      headers: { "Cache-Control": "private, no-store", Vary: "CF-IPCountry" },
    },
  );
}
