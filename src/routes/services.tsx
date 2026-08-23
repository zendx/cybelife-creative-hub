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

            <div className="rounded-lg border border-border bg-card p-8">
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
          </div>
        </section>
      ))}
    </>
  );
}
