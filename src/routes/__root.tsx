import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import socialImage from "@/assets/hero-studio.jpg";
import { CurrencyProvider } from "@/components/currency-provider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cyberlife Digital — Web, Mobile, E-commerce & Growth Agency" },
      {
        name: "description",
        content:
          "Cyberlife Digital builds websites, mobile apps, e-commerce platforms and brands, with SEO, Google Maps visibility, page-speed and maintenance support.",
      },
      { name: "author", content: "Cyberlife Digital" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cyberlife Digital" },
      { property: "og:locale", content: "en_NG" },
      { property: "og:image", content: `https://cyberlifedigital.com${socialImage}` },
      { property: "og:image:alt", content: "Cyberlife Digital creative studio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://cyberlifedigital.com${socialImage}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://cyberlifedigital.com/#organization",
              name: "Cyberlife Digital",
              url: "https://cyberlifedigital.com",
              logo: "https://cyberlifedigital.com/favicon.png",
              email: "hello@cyberlifedigital.com",
              telephone: "+2348031975415",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Yaba",
                addressRegion: "Lagos",
                addressCountry: "NG",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://cyberlifedigital.com/#website",
              name: "Cyberlife Digital",
              url: "https://cyberlifedigital.com",
              publisher: { "@id": "https://cyberlifedigital.com/#organization" },
            },
          ],
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const canonical = `https://cyberlifedigital.com${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {router.options.ssr?.nonce && (
          <meta property="csp-nonce" content={router.options.ssr.nonce} />
        )}
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-4 focus:text-primary"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </CurrencyProvider>
    </QueryClientProvider>
  );
}
