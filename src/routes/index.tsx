import { CarePlans } from "@/components/care-plans";
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
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { BookingDialog } from "@/components/booking-dialog";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { process, projects, services, stats } from "@/data/site";

const serviceIcons: Record<string, LucideIcon> = {
  "website-design": MonitorSmartphone,
  "mobile-app-development": Smartphone,
  "ecommerce-development": ShoppingBag,
  "digital-branding": Palette,
  "google-business-profile": MapPin,
  "seo-performance": Gauge,
  "website-maintenance": Wrench,
};

const capabilityStrip = [
  "Websites",
  "Mobile apps",
  "E-commerce",
  "Brand identity",
  "Google Maps",
  "SEO & speed",
  "Website care",
] as const;

const cardLayouts = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

const cardStyles = [
  "ink-section",
  "bg-[#dfe6ff]",
  "bg-[#ffe1d8]",
  "bg-white",
  "bg-[#e3f5cb]",
  "bg-[#ece8ff]",
  "bg-[#fff0b8]",
] as const;

const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyberlife Digital — Digital products that move businesses forward" },
      {
        name: "description",
        content:
          "Cyberlife Digital builds websites, mobile apps, e-commerce stores and brands, then helps businesses get found with Google Maps, SEO, speed and ongoing support.",
      },
      {
        property: "og:title",
        content: "Cyberlife Digital — Build. Get found. Keep growing.",
      },
      {
        property: "og:description",
        content:
          "Web, mobile, e-commerce, branding and digital growth support from a Lagos-based agency.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="hero-mesh relative isolate overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute -left-20 top-36 size-52 rounded-full border border-primary/15" />
        <div className="pointer-events-none absolute left-7 top-56 size-24 rounded-full border border-primary/20" />
        <div className="mx-auto grid min-h-[calc(100svh-72px)] min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] lg:py-16">
          <div className="relative z-10 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-3.5 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-signal" />
              </span>
              Digital agency · Lagos, working everywhere
            </div>
            <h1 className="mt-7 max-w-4xl font-display text-[clamp(3.2rem,7vw,6.6rem)] font-bold leading-[0.94] tracking-[-0.065em]">
              Build bold.
              <br />
              Get found. <br className="sm:hidden" />
              <span className="text-gradient-brand">Grow.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              We design and build websites, mobile apps, online stores and brands — then make them
              faster, easier to find and simpler to maintain.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BookingDialog
                trigger={
                  <Button size="xl" className="w-full sm:w-auto">
                    Start a project <ArrowUpRight />
                  </Button>
                }
              />
              <Button variant="quiet" size="xl" className="w-full sm:w-auto" asChild>
                <Link to="/audit">
                  <Search /> Audit my website
                </Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Strategy to launch
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Clear project scope
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Support after go-live
              </span>
            </div>
          </div>

          <div className="relative mx-auto min-w-0 w-full max-w-[620px] lg:mr-0">
            <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[#171d33] p-2.5 shadow-[0_35px_100px_-35px_rgba(38,55,130,.55)] sm:p-3">
              <div className="flex items-center justify-between px-3 py-2.5 text-[10px] text-white/60">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-[#ff6a53]" />
                  <span className="size-2 rounded-full bg-[#ffd85c]" />
                  <span className="size-2 rounded-full bg-[#7edc86]" />
                </div>
                <span className="rounded-full bg-white/8 px-4 py-1">{featuredProject.domain}</span>
                <Sparkles className="size-3.5 text-[#ffd85c]" />
              </div>
              <Link
                to="/work"
                hash={featuredProject.slug}
                aria-label={`Read the ${featuredProject.title} case study`}
                className="group relative block overflow-hidden rounded-[1.35rem] bg-[#f1f3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <img
                  src={featuredProject.image}
                  alt={featuredProject.imageAlt}
                  width={1440}
                  height={1000}
                  className="aspect-[5/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#11162b] via-[#11162b]/80 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                    Featured live project · {featuredProject.service}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="font-display text-xl font-semibold sm:text-2xl">
                      {featuredProject.title}
                    </p>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#171d33]">
                      View case study
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="animate-float-card absolute -left-3 top-14 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur sm:-left-14 sm:p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#e6f7d2] text-[#27651f]">
                  <Globe2 className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Project status
                  </p>
                  <p className="font-display text-lg font-bold">Live & responsive</p>
                </div>
              </div>
            </div>

            <div className="animate-float-card absolute -bottom-7 right-2 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur [animation-delay:-2.5s] sm:-right-8 sm:p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#ffe1d8] text-[#c43e26]">
                  <MonitorSmartphone className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Selected work
                  </p>
                  <p className="font-display text-sm font-bold">5 real-world launches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            One team, every digital touchpoint
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
            {capabilityStrip.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm font-semibold">
                <span className="size-1.5 rounded-full bg-signal" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <Reveal className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.03] sm:text-5xl lg:text-6xl">
              Your whole digital presence, working together.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
            From the first brand idea to the website, app, Google listing and monthly care — we
            connect the pieces that help people discover, trust and choose your business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug] ?? Globe2;
            const isDark = index === 0;
            return (
              <Reveal
                as="article"
                delay={(index % 3) * 70}
                key={service.slug}
                className={`${cardLayouts[index]} ${cardStyles[index]} group relative min-h-[290px] overflow-hidden rounded-[1.75rem] border border-border/70 p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-8`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${
                      isDark ? "bg-white/10 text-white" : "bg-white/80 text-primary shadow-sm"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={`text-xs font-bold ${isDark ? "text-white/45" : "text-muted-foreground"}`}
                  >
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-10 max-w-xl">
                  <h3 className={`text-2xl font-bold sm:text-3xl ${isDark ? "text-white" : ""}`}>
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-6 ${isDark ? "text-white/65" : "text-muted-foreground"}`}
                  >
                    {service.description}
                  </p>
                </div>
                <div
                  className={`mt-7 flex items-center justify-between border-t pt-5 ${isDark ? "border-white/10" : "border-foreground/10"}`}
                >
                  <span
                    className={`text-xs font-semibold ${isDark ? "text-white/55" : "text-muted-foreground"}`}
                  >
                    From {service.from}
                  </span>
                  <ArrowUpRight
                    className={`size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isDark ? "text-white" : "text-primary"}`}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button variant="quiet" size="lg" asChild>
            <Link to="/services">
              Explore every service <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="ink-section overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-6 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-2 text-xs font-bold text-white/70">
              <Sparkles className="size-3.5 text-[#ff8a72]" /> Free website health check
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
              Find out what is slowing your website — and your sales — down.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
              Run a live Lighthouse-powered check for performance, accessibility, best practices and
              SEO. You get real scores, key metrics and a clear place to start.
            </p>
            <div className="mt-8">
              <Button variant="signal" size="xl" asChild>
                <Link to="/audit">
                  Audit my website <ArrowRight />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/40">No made-up scores. No sign-up required.</p>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                    Example report
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-white">
                    yourwebsite.com
                  </p>
                </div>
                <span className="rounded-full bg-[#dff5c9] px-3 py-1.5 text-xs font-bold text-[#234d1e]">
                  Mobile audit
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["92", "Performance", "#dff5c9"],
                  ["96", "Accessibility", "#dfe6ff"],
                  ["100", "Best practices", "#ece8ff"],
                  ["91", "SEO", "#ffe1d8"],
                ].map(([score, label, color]) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4 text-[#151a2d]"
                    style={{ backgroundColor: color }}
                  >
                    <p className="font-display text-3xl font-bold">{score}</p>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  ["1.8s", "Largest content"],
                  ["0.04", "Layout shift"],
                  ["180ms", "Interaction"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-[#151a2d] p-4">
                    <p className="font-display text-xl font-bold text-white">{value}</p>
                    <p className="mt-1 text-xs text-white/40">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Case studies</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl">
              The problem, the thinking and what changed.
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            See every case study
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <div className="mt-14 space-y-6">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <Reveal
                as="article"
                key={project.title}
                className="group grid overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]"
              >
                <Link
                  to="/work"
                  hash={project.slug}
                  aria-label={`Read the ${project.title} case study`}
                  className={`relative min-h-[320px] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    width={1440}
                    height={1000}
                    className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur">
                    {project.sector}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#11162b]/90 to-transparent px-5 pb-5 pt-20 text-white">
                    <span className="text-xs font-semibold">{project.domain}</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">{project.service}</p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#e8f7ee] px-3 py-1.5 text-xs font-bold text-[#237547]">
                      <span className="size-1.5 rounded-full bg-[#34b26f]" /> {project.status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl font-bold sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                  <div className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-signal">
                        The problem
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                        What we changed
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {project.response}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 inline-flex w-fit rounded-full bg-surface px-3.5 py-2 text-xs font-semibold text-primary">
                    {project.highlight}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <Link
                      to="/work"
                      hash={project.slug}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                    >
                      Read case study <ArrowRight className="size-4" />
                    </Link>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Visit live site <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      <section className="border-y border-border bg-[#edf1ff]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-28">
          <Reveal className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="eyebrow">Website care</p>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
                Launch is day one.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
              Give your website dependable care with Basic, Standard or Premium support. Choose
              monthly billing or save 15% with an annual plan.
            </p>
          </Reveal>

          <CarePlans />
          <Reveal className="mt-9 flex justify-center">
            <Button size="lg" asChild>
              <Link to="/website-maintenance">
                Compare support options <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <Reveal className="text-center">
          <p className="eyebrow">How we work</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            Clear from first conversation to life after launch.
          </h2>
        </Reveal>
        <div className="relative mt-14 grid gap-4 md:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-border md:block" />
          {process.map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 75}
              className="relative rounded-[1.5rem] border border-border bg-white p-6"
            >
              <span className="relative z-10 grid size-14 place-items-center rounded-2xl bg-foreground font-display text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-7 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Useful thinking</p>
              <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Learn before you build.</h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Browse insights <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal
                as="article"
                delay={index * 70}
                key={post.slug}
                className="group overflow-hidden rounded-[1.5rem] border border-border bg-background"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="block overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="p-6">
                  <p className="eyebrow">{post.category}</p>
                  <h3 className="mt-4 text-xl font-bold leading-tight">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    Read article <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <Reveal className="gradient-brand relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 text-white shadow-elevated sm:px-10 md:px-16 md:py-20">
          <div className="animate-orbit-pulse absolute -right-16 -top-24 size-72 rounded-full border-[45px] border-white/10" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                Your next move
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.03] text-white sm:text-5xl md:text-6xl">
                Let’s make your business impossible to overlook.
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-white/75">
                Tell us what you are building, fixing or trying to grow. We will help you find the
                clearest place to start.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <BookingDialog
                trigger={
                  <Button size="xl" className="bg-white text-primary hover:bg-white/90">
                    Book a discovery call <ArrowUpRight />
                  </Button>
                }
              />
              <Button
                variant="ghost"
                size="xl"
                className="text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/audit">Run a free audit</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-bold sm:text-4xl">{stat.value}</dt>
                <dd className="mt-2 text-xs font-semibold text-muted-foreground sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
