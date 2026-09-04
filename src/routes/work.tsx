import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Case Studies — Problems Solved by Cyberlife Digital" },
      {
        name: "description",
        content:
          "Explore live websites and digital products Cyberlife Digital has delivered across investment, industrial power, email infrastructure, consumer services and creator technology.",
      },
      { property: "og:title", content: "Our Work | Cyberlife Digital" },
      {
        property: "og:description",
        content: "Five live digital experiences, with the challenge and thinking behind each one.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <section className="hero-mesh border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
          <p className="eyebrow">Case studies</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.98] sm:text-6xl md:text-7xl">
            Real products. Clear thinking. <span className="text-gradient-brand">Live work.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Five very different briefs, shaped into focused digital experiences. Explore the
            challenge and response behind each project, then open the finished work for yourself.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              05 selected launches
            </span>
            <span className="rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
              Websites + SaaS products
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#34b26f]" /> Every project is live
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
          <div className="space-y-10">
            {projects.map((project, index) => (
              <Reveal
                as="article"
                key={project.title}
                id={project.slug}
                className={`scroll-mt-28 grid items-stretch overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative flex min-h-[360px] items-center overflow-hidden bg-[#12182c] p-4 sm:p-7 lg:min-h-full lg:p-9">
                  <div className="pointer-events-none absolute -left-16 top-8 size-64 rounded-full bg-primary/25 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 right-0 size-64 rounded-full bg-signal/15 blur-3xl" />
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live website`}
                    className="group relative z-10 w-full overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <div className="flex h-10 items-center gap-3 border-b border-black/8 bg-white px-4">
                      <div className="flex gap-1.5" aria-hidden="true">
                        <span className="size-2 rounded-full bg-[#ff6a53]" />
                        <span className="size-2 rounded-full bg-[#ffd85c]" />
                        <span className="size-2 rounded-full bg-[#68c978]" />
                      </div>
                      <span className="min-w-0 flex-1 truncate text-center text-[10px] font-semibold text-slate-500">
                        {project.domain}
                      </span>
                      <ArrowUpRight className="size-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading={index === 0 ? "eager" : "lazy"}
                      width={1440}
                      height={1000}
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.018]"
                    />
                  </a>
                  <figcaption className="sr-only">
                    Live homepage preview for {project.title}
                  </figcaption>
                </figure>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <p className="eyebrow">
                    {project.sector} · {project.status}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{project.title}</h2>
                  <p className="mt-2 text-sm font-semibold text-brand-soft">{project.service}</p>
                  <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-7 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-signal">
                        The problem
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                        How we fixed it
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {project.response}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.scope.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 rounded-2xl border border-primary/10 bg-[#f2f4ff] p-5">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                          Delivered outcome
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {project.result}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        Visit live project <ArrowUpRight />
                      </a>
                    </Button>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <Globe2 className="size-4 text-brand-soft" /> {project.highlight}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border md:grid-cols-3">
            <div className="bg-card p-8">
              <p className="eyebrow">What we look for</p>
              <h2 className="mt-4 text-2xl font-semibold">Useful beyond the reveal.</h2>
            </div>
            <div className="bg-card p-8">
              <h3 className="text-lg font-semibold">Customer movement</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Can people understand the offer, find the right information and take the next step
                with less hesitation?
              </p>
            </div>
            <div className="bg-card p-8">
              <h3 className="text-lg font-semibold">Team confidence</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Can the business manage the system, communicate consistently and build on the work
                after handover?
              </p>
            </div>
          </Reveal>

          <Reveal className="gradient-brand mt-20 rounded-[2rem] p-10 text-white shadow-elevated md:p-14">
            <h2 className="max-w-xl text-3xl font-semibold">
              Your project could be the next one here.
            </h2>
            <p className="mt-4 max-w-lg text-white/70">
              Book a discovery call and we'll map the fastest route to launch.
            </p>
            <div className="mt-8">
              <BookingDialog
                trigger={
                  <Button variant="signal" size="lg">
                    Get started
                  </Button>
                }
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
