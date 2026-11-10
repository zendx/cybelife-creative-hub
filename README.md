# Cybelife Creative Hub

Cybelife Digital is a web design and digital agency based in Lagos, Nigeria, that builds business websites. Services: Website design, e-commerce development, and digital branding.

This website should showcase a modern digital agency. The website color scheme can be gotten from the attached logo. The website should have a way to showcase projects that has been handled and showcase it's services as premium. There should be a get started call to action button where customers can book a meeting with the company by selecting a date from the calendar available there.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/68a4784b-45f9-4bd0-8224-9feb6cf9b247).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Website audit speed testing

Enable the PageSpeed Insights API in your Google Cloud project and create an API
key restricted to that API. See [Google's setup instructions](https://developers.google.com/speed/docs/insights/v5/get-started).
Set `PAGESPEED_API_KEY` as a server secret in your hosting environment and restart
or redeploy. For local development and compiled previews, supply it in the
process environment before starting the server. Never use a `VITE_` prefix or
commit the key.

Run an audit of a public webpage and confirm it returns Lighthouse category scores
and loading metrics. Google must grant the project available PageSpeed quota;
an API key alone does not bypass exhausted quota. If configuration, quota, or the
Google test fails, the report explains the reason and provides live HTML/header
checks with suggested fixes and a link to test directly with PageSpeed Insights.

## Production redirects

The application combines HTTPS, the canonical `www.cyberlife.digital` host and
page trailing-slash normalization into one cacheable 308 redirect. The hosting
edge must apply the same final destination: an HTTP request to
`http://cyberlife.digital/` must redirect directly to
`https://www.cyberlife.digital/`, without first visiting `https://cyberlife.digital/`.
The live host still performs that intermediate HTTPS redirect before the app
receives the request. Update the hosting provider's HTTP/domain forwarding rule;
deploying application code alone cannot remove a redirect issued before it.
Preserve the query string and normalize page trailing slashes in that same rule
so `/audit/?source=test` goes directly to
`https://www.cyberlife.digital/audit?source=test`. Keep `/` and asset/API paths intact.
For Cloudflare-managed forwarding, use a [Single Redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)
to the final URL rather than separate scheme and host redirects.
