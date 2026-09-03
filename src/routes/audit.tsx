import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, SearchCheck, Smartphone } from "lucide-react";

import { WebsiteAudit } from "@/components/website-audit";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Free Website Audit — Performance & SEO | Cyberlife Digital" },
      {
        name: "description",
        content:
          "Run a free mobile website audit with live Google Lighthouse data. Check performance, accessibility, best practices and SEO with Cyberlife Digital.",
      },
      { property: "og:title", content: "Free Website Audit | Cyberlife Digital" },
      {
        property: "og:description",
        content:
          "Get a live mobile Lighthouse report with verified performance, accessibility and SEO scores.",
      },
    ],
  }),
  component: AuditPage,
});

const trustPoints = [
  { icon: Smartphone, label: "Mobile strategy" },
  { icon: BarChart3, label: "Live Lighthouse data" },
  { icon: SearchCheck, label: "SEO signals included" },
  { icon: CheckCircle2, label: "No made-up scores" },
] as const;

function AuditPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -z-10 h-[28rem] w-[55rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        />
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 text-center md:pb-20 md:pt-28">
          <div className="animate-in fade-in slide-in-from-bottom-3 inline-flex items-center gap-2 rounded-full border border-brand-soft/25 bg-primary/10 px-4 py-2 text-xs font-medium text-brand-soft duration-700 motion-reduce:animate-none">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Powered by Google PageSpeed Insights
          </div>
          <h1 className="mx-auto mt-7 max-w-4xl animate-in fade-in slide-in-from-bottom-4 text-4xl font-semibold leading-[1.02] duration-700 fill-mode-both motion-reduce:animate-none sm:text-5xl md:text-6xl lg:text-7xl">
            Find out what is holding your website back.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-muted-foreground delay-150 duration-700 fill-mode-both motion-reduce:animate-none md:text-lg">
            Test a public page for speed, accessibility, search readiness and technical quality. You
            will see the real mobile scores Google returns—plus the clearest places to improve.
          </p>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground sm:text-sm">
            {trustPoints.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4 text-brand-soft" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="hairline-grid">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <WebsiteAudit />
        </div>
      </section>
    </>
  );
}
