import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { BookingForm } from "@/components/booking-form";

const callAgenda = [
  "The business goal behind the project",
  "Who the experience needs to serve",
  "What is working today and what is getting in the way",
  "A sensible scope, sequence and next step",
] as const;

const bookingFaqs = [
  {
    question: "Do I need a finished brief?",
    answer:
      "No. A clear description of the business, the current challenge and what you hope to change is enough for a useful first conversation.",
  },
  {
    question: "Who should join the call?",
    answer:
      "Bring the person responsible for the project and anyone whose approval will shape scope, budget or launch timing.",
  },
  {
    question: "What should I have nearby?",
    answer:
      "Your current website or brand material, examples you find useful, any known technical requirements and the date you would ideally like to launch.",
  },
] as const;

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

        <div className="mt-10 rounded-lg border border-border bg-surface/40 p-7 md:p-9">
          <p className="eyebrow">What we will cover</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {callAgenda.map((item, index) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-display text-xs text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 rounded-lg border border-border bg-card p-6 md:p-10">
          <BookingForm />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="eyebrow">Come as you are</p>
            <h2 className="mt-4 text-3xl font-semibold">A useful first conversation.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              This is a working session, not a sales presentation. We will ask questions, share an
              initial point of view and tell you honestly whether the studio is the right fit.
            </p>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {bookingFaqs.map((item) => (
              <article key={item.question} className="p-7">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-6 border-t border-border pt-10 text-sm text-muted-foreground sm:grid-cols-3">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 text-brand-soft" />
            Yaba, Lagos, Nigeria
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 text-brand-soft" />
            <a
              href="mailto:hello@cyberlifedigital.ng"
              className="transition-colors hover:text-foreground"
            >
              hello@cyberlifedigital.ng
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 text-brand-soft" />
            <a href="tel:+2348012345678" className="transition-colors hover:text-foreground">
              +234 801 234 5678
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
