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
            A selection of recent engagements across fintech, retail, logistics and hospitality.
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
                  <p className="mt-6 inline-flex rounded-md bg-signal/15 px-4 py-2 text-sm text-foreground">
                    {project.metric}
                  </p>
                </div>
              </article>
            ))}
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
