# Project review — 14 September 2026

The reported application issues are resolved in the local project. Email delivery and production hosting still require the setup and verification described below.

## Earlier requests

| Request                             | Verified result                                                                                                                                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Care packages and professional copy | Basic: NGN 300,000/month; Standard: NGN 850,000/month; Premium: NGN 1,550,000/month. Descriptions and all requested benefits are present. Standard correctly inherits Basic.                                                                                                          |
| Separate maintenance service        | `/website-maintenance` has its own enquiry form and desktop/mobile navigation entry.                                                                                                                                                                                                  |
| Care enquiry fields                 | First name, last name, company email, website URL, international phone, CMS/platform, multiple website types, conditional Other fields, and assistance brief are present. Text inputs have helpful placeholders.                                                                      |
| Annual billing                      | All plans apply a 15% discount. Cards and enquiry totals update together. Annual totals are NGN 3,060,000; NGN 8,670,000; NGN 15,810,000.                                                                                                                                             |
| Contact preferences                 | Start a Project supports Email, Zoom, Google Meet, WhatsApp, and Call together. Its phone field is always available and required.                                                                                                                                                     |
| Contact details                     | Public phone is +234 803 197 5415. Public email remains hello@cyberlifedigital.com. Both enquiry handlers send to cyberlifeng@gmail.com once email delivery is configured.                                                                                                            |
| Website domain                      | Canonicals, sitemap, social metadata, and public links use cyberlifedigital.com. Old `.ng`, `www`, and HTTP canonical-host requests redirect to HTTPS `.com`, preserving paths and queries.                                                                                           |
| International pricing               | Service and care prices support NGN/USD, remembered manual selection, country detection, and timezone fallback. Currency and server-derived care totals are included in enquiries.                                                                                                    |
| Formatting error at site.ts:252     | The scope array uses multiline formatting. Lint passes.                                                                                                                                                                                                                               |
| Six Fast Refresh warnings           | Component helpers/hooks were separated from component exports. No lint warnings remain.                                                                                                                                                                                               |
| Client bundle warning               | Main client chunk is 433.81 kB minified / 136.45 kB gzip, down from approximately 570 kB. Booking UI loads lazily.                                                                                                                                                                    |
| Redundant Vite paths plugin         | The injected vite-tsconfig-paths plugin is filtered out; Vite's native TypeScript path resolution is enabled. The package remains a dependency required by the Lovable preset.                                                                                                        |
| Preview                             | The compiled application starts with npm run preview and serves at http://127.0.0.1:4173. Browser tests verify hydration and navigation.                                                                                                                                              |
| SEO and security                    | Crawlable metadata, canonical URLs, sitemap, real 404 responses, CSP nonces, security headers, server validation, origin checks, body limits, honeypot, and enquiry rate limiting were verified locally. This is not a production penetration test or a guarantee of search rankings. |

## Fix made during this review

Updated the transitive js-yaml dependency from 4.3.1 to 4.3.2 in package-lock.json. This addresses [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh). The update changed only that dependency's version, download URL, and integrity value. npm reported zero known vulnerabilities afterward.

## Verification

- Production build, ESLint, and TypeScript checks passed after the dependency update.
- All 15 Playwright tests passed. These include desktop/mobile accessibility, form payloads, delivery failure handling, annual pricing, currency preferences, CSP hydration, navigation, and sitemap routes.
- Additional HTTP checks passed for canonical redirects, country detection, uncached location responses, unique CSP nonces, security headers, and 404 noindex responses.
- Email tests use mocked delivery; no real enquiry emails were sent.
- An upstream Nitro/Rolldown warning remains: inlineDynamicImports is ignored when codeSplitting is specified. The build succeeds; this is separate from the reported client bundle and Vite path warnings.

## Still requiring setup or a separate decision

1. **Email delivery:** No local `.env`, `.env.local`, or `.dev.vars` file was present during this review. Configure the private Resend key and verified sender, then confirm receipt of both enquiry types. Hosted secrets were not inspected. Missing configuration produces a visible error rather than a false success.
2. **Production hosting:** Verify DNS, HTTPS, Cloudflare IP geolocation, static-asset headers, and edge rate limits. Run Lighthouse and security checks against the deployed domain. Local test results do not establish the deployed site's configuration.
3. **USD reference rate:** Conversion is a disclosed estimate using the fixed rate dated 9 September 2026 in src/data/pricing.ts. It is not a live exchange-rate feed.
4. **Phone field scope:** Phone fields are implemented on both enquiry forms, including the project dialog. The free audit tool remains URL-only and does not collect contact details.
5. **Sanity:** The blog currently uses local content. Sanity is a compatible option for an editorial CMS given its [official JavaScript client and React tooling](https://www.sanity.io/docs/libraries), but no Sanity integration has been installed or configured. The earlier suitability question did not require a CMS migration.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the launch configuration steps.
