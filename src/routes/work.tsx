import { createFileRoute } from "@tanstack/react-router";

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
          "Explore websites, online stores and brand systems Cyberlife Digital has delivered for fintech, fashion, logistics and hospitality clients in Nigeria.",
      },
      { property: "og:title", content: "Our Work | Cyberlife Digital" },
      {
        property: "og:description",
        content: "Selected projects across fintech, retail, logistics and hospitality in Nigeria.",
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
            Real problems. Thoughtful fixes.{" "}
            <span className="text-gradient-brand">Measurable change.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            See what was getting in the way, how we approached it and what changed for businesses
            across fintech, retail, logistics and hospitality.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
          <div className="space-y-10">
            {projects.map((project, index) => (
              <Reveal
                as="article"
                key={project.title}
                className={`grid items-stretch overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="min-h-[340px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.service} project by Cyberlife Digital`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full min-h-[340px] w-full object-cover transition-transform duration-700 hover:scale-[1.035]"
                  />
                </figure>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <p className="eyebrow">
                    {project.sector} · {project.year}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{project.title}</h2>
                  <p className="mt-2 text-sm text-brand-soft">{project.service}</p>
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
                  <div className="mt-6 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Outcome
                    </span>
                    <p className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">
                      {project.metric}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border md:grid-cols-3">
            <div className="bg-card p-8">
              <p className="eyebrow">What we look for</p>
              <h2 className="mt-4 text-2xl font-semibold">Evidence beyond the reveal.</h2>
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
