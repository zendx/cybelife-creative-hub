import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import heroImage from "@/assets/hero-studio.jpg";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { blogPosts } from "@/data/blog";
import { projects, services, stats, process } from "@/data/site";

const studioAdvantages = [
  {
    title: "Business before decoration",
    body: "We connect every design decision to what customers need to understand, trust and do next.",
  },
  {
    title: "Local fluency, global finish",
    body: "The experience accounts for Nigerian customers, payments and operations without compromising craft.",
  },
  {
    title: "Useful after launch",
    body: "Your team receives a maintainable system, clear documentation and the confidence to keep it current.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyberlife Digital — Web Design & Digital Agency in Lagos" },
      {
        name: "description",
        content:
          "Cyberlife Digital designs and builds premium business websites, e-commerce stores and digital brands for companies across Lagos and Nigeria.",
      },
      {
        property: "og:title",
        content: "Cyberlife Digital — Web Design & Digital Agency in Lagos",
      },
      {
        property: "og:description",
        content:
          "Premium website design, e-commerce development and digital branding from a Lagos studio. Book a discovery meeting.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Creative team working in a digital studio"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pb-36 md:pt-32">
          <p className="eyebrow">Lagos, Nigeria · Since 2017</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            We build business websites that look like the market leader.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Cyberlife Digital is a web design and digital agency in Lagos. Website design,
            e-commerce development and digital branding — delivered with studio-grade craft.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookingDialog
              trigger={
                <Button variant="signal" size="xl">
                  Get started <ArrowRight />
                </Button>
              }
            />
            <Button variant="quiet" size="xl" asChild>
              <Link to="/work">See our work</Link>
            </Button>
          </div>

          <dl className="mt-20 grid gap-8 border-t border-border/70 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Premium services</p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
                Three disciplines, one standard of finish.
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm text-brand-soft"
            >
              Full service detail
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.slug}
                className="group relative flex flex-col rounded-lg border border-border bg-card p-8 transition-colors hover:border-brand-soft/50"
              >
                <span className="absolute left-0 top-8 h-10 w-px gradient-brand" />
                <p className="eyebrow">{service.title}</p>
                <h3 className="mt-4 text-2xl font-semibold">{service.tagline}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-border/70 pt-5 text-sm text-muted-foreground">
                  From <span className="font-display text-foreground">{service.from}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Why Cyberlife</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold md:text-4xl">
              Digital work grounded in how the business really runs.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              We are a small, senior-led studio for teams that want rigorous thinking, direct
              collaboration and a finished product they can own.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand-soft"
            >
              Meet the studio <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {studioAdvantages.map((item, index) => (
              <article key={item.title} className="bg-card p-7">
                <span className="font-display text-sm text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-grid border-t border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
            Projects we've handled.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.service} by Cyberlife Digital`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">{project.sector}</p>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mt-5 inline-flex rounded-md bg-primary/20 px-3 py-1.5 text-xs text-foreground">
                    {project.metric}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Button variant="quiet" size="lg" asChild>
              <Link to="/work">
                View the full portfolio <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="hairline-grid border-t border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Latest thinking</p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
                Useful ideas for the next digital decision.
              </h2>
            </div>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm text-brand-soft"
            >
              Explore all insights
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  aria-label={`Read ${post.title}`}
                  className="overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="eyebrow">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-tight">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-brand-soft"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-brand-soft"
                  >
                    Read article <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
            A process built for launch dates.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="bg-card p-8">
                <span className="font-display text-sm text-signal">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="gradient-brand rounded-lg p-10 shadow-elevated md:p-16">
            <h2 className="max-w-2xl text-3xl font-semibold text-primary-foreground md:text-4xl">
              Ready to build something your competitors will study?
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/85">
              Pick a date on our calendar and speak to a strategist in Lagos. Free 45-minute
              discovery call.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookingDialog
                trigger={
                  <Button variant="signal" size="xl">
                    Get started
                  </Button>
                }
              />
              <Button variant="quiet" size="xl" asChild>
                <Link to="/book">Open booking page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
