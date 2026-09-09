# Website care and enquiry delivery

Both enquiry forms POST to `/api/enquiries`. The server validates the fields, derives plan prices itself and sends plain-text mail to **cyberlifeng@gmail.com**. The public contact address remains **hello@cyberlifedigital.com**. Submission success means the email provider accepted the message; it does not confirm a booking or payment.

## Email setup

1. Create a Resend account and verify `cyberlifedigital.com` using the DNS records supplied by Resend.
2. Add `RESEND_API_KEY` as a private runtime secret in the deployment environment. Never use a `VITE_` prefix. For local Vite development use an ignored `.env.local`; for Cloudflare use an ignored `.dev.vars` or deployed Worker secrets.
3. Set `ENQUIRY_FROM_EMAIL` to `Cyberlife Digital <hello@cyberlifedigital.com>` or another sender on your verified domain.
4. Submit one enquiry of each type from the deployed site and check receipt at `cyberlifeng@gmail.com`, including replies, all selected contact methods and annual pricing.

No mail provider was configured during implementation. Missing configuration returns a visible delivery error and direct contact details; the application never simulates success. Provider failures preserve form values.

See [Resend sender verification](https://resend.com/docs/knowledge-base/how-do-I-create-an-email-address-or-sender-in-resend) and [email API](https://resend.com/docs/api-reference/emails/send-email).

## Hosting and launch verification

- Serve the server build with HTTPS at `cyberlifedigital.com`. Configure DNS and TLS for the primary domain. Route old `.ng` and `www` hosts to this application or configure equivalent permanent redirects at the edge. Application redirects preserve paths and query strings.
- Deploy the server entry; static-only hosting cannot process these forms. Keep request origins intact through the proxy so same-origin validation works.
- Server responses set CSP with a unique script nonce, MIME-sniffing protection, referrer policy, permissions restrictions, framing restrictions and HSTS on HTTPS. Mirror applicable headers for static assets at the host/CDN. Lovable preview framing is permitted by CSP.
- Apply a managed rate limit at the edge to `/api/enquiries` (for example, five submissions per visitor per ten minutes). Built-in rate limits are per running instance, not distributed; Cloudflare's trusted client IP is used when available, and other runtimes share a fallback bucket. Ensure the ingress strips forged client-IP headers. Configure a trusted per-client key for a different host before launch.
- `npm run build` regenerates `public/sitemap.xml` from the public routes and blog slugs. Register the canonical domain in Search Console and submit the sitemap. SEO metadata and a sitemap enable crawling; search indexing and rankings are not guaranteed.
- Verify production CSP and hydration, mobile layout, form delivery, redirects, 404 status, TLS and asset headers. Run Lighthouse and an external security scan on the deployed domain, where hosting headers, caching and network conditions can be measured.

SEO implementation follows [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap); header configuration follows [MDN CSP guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

## International pricing

All service and care prices retain their NGN base amounts. USD estimates use the dated reference conversion in `src/data/pricing.ts` (NGN 1322.012964 per USD, sourced from ExchangeRate-API on 2026-09-09). This is a fixed reference, not a live FX feed: review and update the value and date there as needed. Prices disclose the reference date, attribution and that the final quote is confirmed before work begins. Annual billing applies the same 15% discount before conversion. No payment is taken by these forms.

On Cloudflare, enable IP geolocation so `/api/visitor-location` receives the platform's `CF-IPCountry` header. Nigeria defaults to NGN and other known countries to USD. The endpoint uses private/no-store responses. When country information is unavailable (including local preview), browser timezone is a best-effort fallback; it is not proof of location. The visible currency selector always takes precedence and remembers a manual choice in local storage. No external visitor-location service or precise location permission is used. Currency changes apply across service listings, care cards and the care enquiry summary, and enquiry emails include the preferred currency and phone number. The server derives amounts itself using the same reference conversion.

## Running checks

Run `npm run build`, `npx tsc --noEmit`, `npm run lint` and `npm test`. The browser tests use installed Google Chrome, run the compiled SSR application locally, and mock email delivery so test runs do not send messages. `npm run preview` serves that same production application at `http://127.0.0.1:4173`; deploy the generated platform entry for actual hosting.
