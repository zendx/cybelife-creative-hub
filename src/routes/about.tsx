import { createFileRoute, Link } from "@tanstack/react-router";

import heroImage from "@/assets/hero-studio.jpg";
import { BookingDialog } from "@/components/booking-dialog";
import { Button } from "@/components/ui/button";
import { process, stats } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Cyberlife Digital — Independent Digital Studio in Lagos" },
      {
        name: "description",
        content:
          "Meet Cyberlife Digital, a senior-led Lagos studio creating strategic websites, e-commerce experiences and digital brand systems for ambitious businesses.",
      },
      { property: "og:title", content: "About Cyberlife Digital | Lagos Digital Studio" },
      {
        property: "og:description",
        content:
          "A small, senior-led team combining strategy, design and engineering to help Nigerian businesses lead their categories online.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Commercial clarity",
    body: "We begin with the business outcome: who the work must reach, what it must communicate and what action it should create.",
  },
  {
    title: "Craft with purpose",
    body: "Every visual and technical decision has a job to do. The result should feel distinctive, work smoothly and earn trust quickly.",
  },
  {
    title: "Candid collaboration",
    body: "Clear recommendations, visible progress and useful feedback keep decisions moving without unnecessary layers or surprises.",
  },
  {
    title: "Lasting ownership",
    body: "We build practical systems, document the work and train your team so the finished product remains useful long after launch.",
  },
] as const;

const studioModel = [
  {
    number: "01",
    title: "Senior attention throughout",
    body: "The people shaping the strategy stay close to design, build and launch. Context is carried forward instead of lost between departments.",
  },
  {
    number: "02",
    title: "A team sized to the work",
    body: "Each engagement brings together the right mix of strategy, design, copy and engineering, with one clear line of communication.",
  },
  {
    number: "03",
    title: "Progress you can see",
    body: "Structured reviews and working demos make the project tangible early, giving your team time to respond before decisions become expensive.",
  },
] as const;

function AboutPage() {
  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">About the studio</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-5xl">
              Built in Lagos for businesses ready to lead online.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Cyberlife Digital is an independent web design and digital studio. We bring strategy,
              design and engineering together to create websites, online stores and brand systems
              that make ambitious businesses easier to trust and choose.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <BookingDialog
                trigger={
                  <Button variant="signal" size="lg">
                    Start a project
                  </Button>
                }
              />
              <Button variant="quiet" size="lg" asChild>
                <Link to="/work">View selected work</Link>
              </Button>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-lg border border-border bg-card shadow-elevated">
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              width={1600}
              height={1104}
              className="aspect-[4/3] w-full object-cover opacity-80"
            />
            <div className="veil absolute inset-0" />
            <figcaption className="absolute inset-x-0 bottom-0 p-7">
              <p className="eyebrow">Lagos, Nigeria</p>
              <p className="mt-3 max-w-sm font-display text-xl font-semibold">
                Local market understanding, delivered to a global standard.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-brand-soft/50 pl-5">
                <dt className="font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold md:text-4xl">
              Digital work should move the business forward.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Cyberlife Digital grew from a simple observation: many capable businesses were being
              underestimated because their digital presence did not reflect the quality of what they
              delivered. A website was often treated as decoration instead of a working part of the
              business.
            </p>
            <p>
              We built the studio around a more useful approach. First understand the customer, the
              offer and the commercial goal. Then shape the message, experience and technology
              around that foundation. It produces work that looks considered because the thinking
              behind it is considered.
            </p>
            <p>
              Today, that same approach guides every engagement—from a focused business website to a
              full commerce platform or digital identity system. The scale changes; the standard of
              care does not.
            </p>
          </div>
        </div>
      </section>

      <section className="hairline-grid border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow">What guides us</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
            Principles that show up in the work.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {values.map((value, index) => (
              <article key={value.title} className="bg-card p-8 md:p-10">
                <span className="font-display text-sm text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">How the studio operates</p>
              <h2 className="mt-4 max-w-md text-3xl font-semibold md:text-4xl">
                A small, senior team around the same table.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                We keep the working team close to the client and close to the problem. That means
                fewer handoffs, faster decisions and a clearer connection between strategy and the
                finished product.
              </p>
            </div>

            <div className="space-y-4">
              {studioModel.map((item) => (
                <article
                  key={item.number}
                  className="grid gap-4 rounded-lg border border-border bg-card p-7 sm:grid-cols-[auto_1fr] sm:gap-6"
                >
                  <span className="font-display text-sm text-signal">{item.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow">From brief to launch</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">
            One clear process, shared from day one.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {process.map((item) => (
              <article key={item.step} className="bg-card p-8">
                <span className="font-display text-sm text-signal">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="gradient-brand rounded-lg p-10 shadow-elevated md:p-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/75">
              Work with the studio
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold text-primary-foreground md:text-4xl">
              Bring us the business challenge, not a finished brief.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
              In a free 45-minute discovery call, we will discuss where you are, what needs to
              change and the most useful first step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookingDialog
                trigger={
                  <Button variant="signal" size="xl">
                    Book a discovery call
                  </Button>
                }
              />
              <Button variant="quiet" size="xl" asChild>
                <Link to="/services">Explore our services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
