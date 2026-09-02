import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { projects } from "@/data/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Projects by Cyberlife Digital, Lagos" },
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
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-5xl">
            Projects we've handled for Nigerian businesses.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            A selection of recent engagements across fintech, retail, logistics and hospitality,
            each shaped around a clear business problem and a practical route to launch.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.service} project by Cyberlife Digital`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </figure>
                <div>
                  <p className="eyebrow">
                    {project.sector} · {project.year}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold">{project.title}</h2>
                  <p className="mt-2 text-sm text-brand-soft">{project.service}</p>
                  <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-7 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow">The challenge</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow">Our response</p>
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
                  <p className="mt-6 inline-flex rounded-md bg-signal/15 px-4 py-2 text-sm text-foreground">
                    {project.metric}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
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
          </div>

          <div className="mt-20 rounded-lg border border-border bg-card p-10 md:p-14">
            <h2 className="max-w-xl text-3xl font-semibold">
              Your project could be the next one here.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
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
          </div>
        </div>
      </section>
    </>
  );
}
