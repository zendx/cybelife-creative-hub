import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { services } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Website Design, E-commerce & Branding | Cyberlife Digital" },
      {
        name: "description",
        content:
          "Premium website design, e-commerce development and digital branding for Nigerian businesses, delivered by Cyberlife Digital in Lagos.",
      },
      { property: "og:title", content: "Services | Cyberlife Digital, Lagos" },
      {
        property: "og:description",
        content:
          "Website design, e-commerce development and digital branding built to a studio standard.",
      },
    ],
  }),
  component: ServicesPage,
});

const engagementStandards = [
  {
    title: "One accountable team",
    body: "Strategy, design and delivery stay connected from the first workshop through launch.",
  },
  {
    title: "Visible progress",
    body: "Regular reviews and working demos keep decisions clear and make surprises less likely.",
  },
  {
    title: "A practical handover",
    body: "Your team receives training, documentation and a system built to be managed after launch.",
  },
] as const;

const serviceFaqs = [
  {
    question: "Can you work with our existing brand?",
    answer:
      "Yes. We can extend a strong existing identity into a more complete digital system, or recommend a focused refresh where the current brand is holding the experience back.",
  },
  {
    question: "Do you help with content?",
    answer:
      "Every website engagement includes content structure and copy direction. Where deeper writing or production is needed, we scope it clearly before the project begins.",
  },
  {
    question: "Will our team be able to update the finished work?",
    answer:
      "That is the goal. We choose practical tools, build repeatable components and include a handover session so routine updates do not require a developer.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We monitor the initial release, resolve launch issues and can stay involved for ongoing optimisation, new features or campaign support.",
  },
] as const;

function ServicesPage() {
  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow">Services</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-5xl">
            Premium digital work, priced and scoped with no guesswork.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Every engagement is led by a senior strategist and delivered by a small, dedicated team.
            No handoffs to juniors, no template shortcuts.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span>Clear scope before work begins</span>
            <span>Weekly progress reviews</span>
            <span>Training included at handover</span>
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section key={service.slug} className="border-b border-border/70">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="font-display text-sm text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{service.title}</h2>
              <p className="mt-3 text-lg text-brand-soft">{service.tagline}</p>
              <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-7 max-w-lg border-l border-brand-soft/50 pl-5">
                <p className="eyebrow">Best for</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.bestFor}
                </p>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Investment from{" "}
                <span className="font-display text-lg text-foreground">{service.from}</span>
              </p>
              <div className="mt-8">
                <BookingDialog
                  trigger={<Button variant="signal">Book a meeting about this</Button>}
                />
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-lg border border-border bg-card p-8">
                <p className="eyebrow">Core engagement</p>
                <p className="mt-4 font-display text-lg font-medium leading-relaxed">
                  {service.scope}
                </p>
                <div className="my-7 h-px bg-border" />
                <p className="eyebrow">What's included</p>
                <ul className="mt-6 space-y-4">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                      <span className="text-muted-foreground">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-surface/40 p-8">
                <p className="eyebrow">Built to deliver</p>
                <ul className="mt-5 space-y-3">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-soft" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="hairline-grid border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow">The studio standard</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
            What every engagement has in common.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {engagementStandards.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-border bg-card p-8">
                <span className="font-display text-sm text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Before we begin.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              Still working out the right scope? Bring the problem to a discovery call and we will
              help identify the most useful starting point.
            </p>
            <div className="mt-7">
              <BookingDialog trigger={<Button variant="signal">Talk to the studio</Button>} />
            </div>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {serviceFaqs.map((item) => (
              <article key={item.question} className="p-7">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
