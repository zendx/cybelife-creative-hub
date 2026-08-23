import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { BookingForm } from "@/components/booking-form";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Meeting — Cyberlife Digital, Lagos" },
      {
        name: "description",
        content:
          "Pick a date and time to meet the Cyberlife Digital team in Lagos and discuss your website, online store or brand project.",
      },
      { property: "og:title", content: "Book a Meeting | Cyberlife Digital" },
      {
        property: "og:description",
        content: "Choose a date on our calendar for a free 45-minute discovery call.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <p className="eyebrow">Get started</p>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] md:text-5xl">
          Book a meeting with our Lagos team.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Select a date from the calendar, choose a slot, and tell us what you're building. We
          confirm every request within one business day.
        </p>

        <div className="mt-14 rounded-lg border border-border bg-card p-6 md:p-10">
          <BookingForm />
        </div>

        <ul className="mt-12 grid gap-6 text-sm text-muted-foreground sm:grid-cols-3">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 text-brand-soft" />
            Yaba, Lagos, Nigeria
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 text-brand-soft" />
            hello@cyberlifedigital.ng
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 text-brand-soft" />
            +234 801 234 5678
          </li>
        </ul>
      </div>
    </section>
  );
}
