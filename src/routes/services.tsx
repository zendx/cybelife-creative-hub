import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gauge,
  Globe2,
  MapPin,
  MonitorSmartphone,
  Palette,
  SearchCheck,
  ShoppingBag,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { BookingDialog } from "@/components/booking-dialog";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { maintenancePlans, services } from "@/data/site";

const serviceIcons: Record<string, LucideIcon> = {
  "website-design": MonitorSmartphone,
  "mobile-app-development": Smartphone,
  "ecommerce-development": ShoppingBag,
  "digital-branding": Palette,
  "google-business-profile": MapPin,
  "seo-performance": Gauge,
  "website-maintenance": Wrench,
};

const serviceFaqs = [
  {
    question: "Can we start with an audit before choosing a service?",
    answer:
      "Yes. Our free technical check gives you live Lighthouse scores, and a discovery call helps us connect those signals to your business priorities before we recommend a scope.",
  },
  {
    question: "Do you work with an existing website or brand?",
    answer:
      "Absolutely. We can improve a strong foundation, rebuild only the parts causing friction, or recommend a fuller reset when the existing system is limiting the business.",
  },
  {
    question: "How are maintenance plans priced?",
    answer:
      "We quote around the platform, update frequency, response time and level of development support you need. That keeps the plan useful instead of padding it with services you will not use.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes handover and launch support. You can then move onto a care plan for monitoring, updates, SEO, performance and continued product improvements.",
  },
] as const;

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Digital Agency Services | Cyberlife Digital" },
      {
        name: "description",
        content:
          "Websites, mobile apps, e-commerce, branding, Google Business Profile, SEO, page-speed and website maintenance from Cyberlife Digital.",
      },
      { property: "og:title", content: "Digital services built around business growth" },
      {
        property: "og:description",
        content:
          "Strategy, design, technology, visibility and ongoing care from one connected team.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="hero-mesh overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">Services</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.98] sm:text-6xl md:text-7xl">
              From first idea to <span className="text-gradient-brand">daily growth.</span>
            </h1>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              One connected team for your brand, website, app, online store, search visibility and
              long-term support. Start with one need or build the full system.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookingDialog
                trigger={
                  <Button size="lg">
                    Discuss your project <ArrowUpRight />
                  </Button>
                }
              />
              <Button variant="quiet" size="lg" asChild>
                <Link to="/audit">
                  <SearchCheck /> Start with an audit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">The full offer</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl">
              Seven ways we move your business forward.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Every engagement includes clear scope, visible progress, testing and a practical
            handover your team can use.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug] ?? Globe2;
            return (
              <Reveal
                as="article"
                delay={(index % 2) * 80}
                key={service.slug}
                id={service.slug}
                className={`group rounded-[1.75rem] border p-7 sm:p-9 ${
                  index === 0
                    ? "ink-section md:col-span-2 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-12"
                    : "border-border bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`grid size-12 place-items-center rounded-2xl ${
                        index === 0 ? "bg-white/10 text-white" : "bg-surface text-primary"
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span
                      className={`text-xs font-bold ${index === 0 ? "text-white/35" : "text-muted-foreground"}`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <p
                    className={`mt-8 text-xs font-bold uppercase tracking-[0.14em] ${index === 0 ? "text-[#ff9b86]" : "text-signal"}`}
                  >
                    {service.tagline}
                  </p>
                  <h3
                    className={`mt-3 text-3xl font-bold ${index === 0 ? "text-white sm:text-4xl" : ""}`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-7 ${index === 0 ? "text-white/60" : "text-muted-foreground"}`}
                  >
                    {service.description}
                  </p>
                  <p
                    className={`mt-7 border-l-2 pl-4 text-sm leading-6 ${index === 0 ? "border-[#ff7a62] text-white/55" : "border-primary text-muted-foreground"}`}
                  >
                    <strong className={index === 0 ? "text-white" : "text-foreground"}>
                      Best for:{" "}
                    </strong>
                    {service.bestFor}
                  </p>
                </div>

                <div
                  className={`${index === 0 ? "mt-9 md:mt-0 md:border-l md:border-white/10 md:pl-12" : "mt-8 border-t border-border pt-6"}`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.14em] ${index === 0 ? "text-white/40" : "text-muted-foreground"}`}
                  >
                    What is included
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className={`flex items-start gap-3 text-sm ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}
                      >
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${index === 0 ? "text-[#ff8a72]" : "text-primary"}`}
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-7 flex items-center justify-between border-t pt-5 ${index === 0 ? "border-white/10" : "border-border"}`}
                  >
                    <div>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.12em] ${index === 0 ? "text-white/35" : "text-muted-foreground"}`}
                      >
                        Starting point
                      </p>
                      <p
                        className={`mt-1 font-display text-lg font-bold ${index === 0 ? "text-white" : ""}`}
                      >
                        {service.from}
                      </p>
                    </div>
                    <BookingDialog
                      initialService={service.title}
                      trigger={
                        <button
                          className={`grid size-11 place-items-center rounded-full transition-transform hover:-translate-y-0.5 ${index === 0 ? "bg-white text-primary" : "bg-foreground text-white"}`}
                          aria-label={`Ask about ${service.title}`}
                        >
                          <ArrowUpRight className="size-4" />
                        </button>
                      }
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-[#edf1ff]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">Findability + speed</p>
              <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl">
                A good website should not be hard to find or slow to use.
              </h2>
              <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
                We connect technical SEO, Google Business Profile work and page performance so your
                visibility is supported by a better experience after the click.
              </p>
              <Button className="mt-7" size="lg" asChild>
                <Link to="/audit">
                  Run your free site audit <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: MapPin,
                  title: "Show up locally",
                  body: "Accurate profile information, categories, services, media and a review workflow for Google Search and Maps.",
                  color: "bg-[#ffe1d8] text-[#b63c27]",
                },
                {
                  icon: Gauge,
                  title: "Load with less friction",
                  body: "Core Web Vitals, image and code optimisation, caching and technical fixes focused on the pages that matter.",
                  color: "bg-[#e3f5cb] text-[#286323]",
                },
                {
                  icon: SearchCheck,
                  title: "Build strong SEO foundations",
                  body: "Indexing, metadata, content structure, internal linking and measurement aligned around useful search journeys.",
                  color: "bg-[#dfe6ff] text-primary",
                },
                {
                  icon: Globe2,
                  title: "Turn discovery into action",
                  body: "Clear messages, proof and calls to action so visibility creates calls, visits, enquiries and sales.",
                  color: "bg-[#fff0b8] text-[#765b00]",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-border bg-white p-6"
                >
                  <span className={`grid size-11 place-items-center rounded-xl ${item.color}`}>
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28" id="maintenance-plans">
        <Reveal className="text-center">
          <p className="eyebrow">Maintenance plans</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            The right level of care for the website you run.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
            Pricing is quoted after a short website review, so the plan reflects your platform,
            update volume and response requirements.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {maintenancePlans.map((plan, index) => (
            <Reveal
              as="article"
              delay={index * 80}
              key={plan.name}
              className={`flex flex-col rounded-[1.75rem] border p-7 sm:p-8 ${
                index === 1
                  ? "border-primary bg-primary text-white shadow-elevated lg:-translate-y-3"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.14em] ${index === 1 ? "text-white/50" : "text-muted-foreground"}`}
                  >
                    Care level 0{index + 1}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>
                </div>
                {index === 1 && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]">
                    Popular
                  </span>
                )}
              </div>
              <p
                className={`mt-4 text-sm leading-6 ${index === 1 ? "text-white/65" : "text-muted-foreground"}`}
              >
                {plan.bestFor}
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm ${index === 1 ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${index === 1 ? "text-[#ffb29f]" : "text-primary"}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div
                className={`mt-8 border-t pt-6 ${index === 1 ? "border-white/15" : "border-border"}`}
              >
                <p className="font-display text-lg font-bold">{plan.price}</p>
                <BookingDialog
                  initialService="Website Maintenance & Support"
                  trigger={
                    <Button variant={index === 1 ? "signal" : "quiet"} className="mt-5 w-full">
                      Request this quote <ArrowUpRight />
                    </Button>
                  }
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-5 text-4xl font-bold">Before we begin.</h2>
            <p className="mt-5 max-w-sm leading-7 text-muted-foreground">
              Not sure which service you need? Bring the problem to a discovery call and we will
              help identify the most useful starting point.
            </p>
          </Reveal>
          <Reveal
            delay={90}
            className="divide-y divide-border overflow-hidden rounded-[1.75rem] border border-border bg-background px-6 sm:px-8"
          >
            {serviceFaqs.map((item) => (
              <article key={item.question} className="py-7">
                <h3 className="text-lg font-bold">{item.question}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
