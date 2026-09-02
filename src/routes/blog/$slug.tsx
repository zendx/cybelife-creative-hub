import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { BookingDialog } from "@/components/booking-dialog";
import { Button } from "@/components/ui/button";
import { blogPosts, getBlogPost } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} | Cyberlife Digital`
          : "Insights | Cyberlife Digital",
      },
      {
        name: "description",
        content:
          loaderData?.excerpt ??
          "Practical thinking on web strategy, e-commerce, branding and digital experience.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: loaderData?.title ?? "Cyberlife Digital Insights" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      { property: "article:published_time", content: loaderData?.publishedAt ?? "" },
    ],
  }),
  component: BlogArticlePage,
});

function toSectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function BlogArticlePage() {
  const post = Route.useLoaderData();
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="border-b border-border/70">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to insights
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
              <span className="eyebrow">{post.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{post.publishedDate}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
          <figure className="overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1600}
              height={900}
              className="aspect-[16/8] w-full object-cover"
            />
          </figure>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[0.35fr_1fr] lg:py-24">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">In this article</p>
            <nav aria-label="Article sections" className="mt-5 border-l border-border">
              {post.sections.map((section) => (
                <a
                  key={section.heading}
                  href={`#${toSectionId(section.heading)}`}
                  className="block border-l border-transparent py-2 pl-4 text-sm text-muted-foreground transition-colors hover:border-brand-soft hover:text-foreground"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <p className="text-xl leading-relaxed text-foreground/90">{post.intro}</p>

            <div className="mt-12 space-y-14">
              {post.sections.map((section) => (
                <section
                  key={section.heading}
                  id={toSectionId(section.heading)}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl font-semibold md:text-3xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 space-y-3 rounded-lg border border-border bg-card p-6">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed">
                          <Check className="mt-1 size-4 shrink-0 text-signal" />
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className="mt-14 rounded-lg border border-brand-soft/30 bg-primary/15 p-7 md:p-9">
              <p className="eyebrow">The takeaway</p>
              <p className="mt-4 font-display text-xl font-medium leading-relaxed">
                {post.takeaway}
              </p>
            </aside>
          </div>
        </div>
      </article>

      <section className="hairline-grid border-y border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Keep reading</p>
              <h2 className="mt-4 text-3xl font-semibold">Related thinking.</h2>
            </div>
            <Button variant="quiet" asChild className="hidden sm:inline-flex">
              <Link to="/blog">All articles</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                to="/blog/$slug"
                params={{ slug: related.slug }}
                className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-brand-soft/50"
              >
                <p className="eyebrow">{related.category}</p>
                <h3 className="mt-4 text-xl font-semibold transition-colors group-hover:text-brand-soft">
                  {related.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {related.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-brand-soft">
                  Read article <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="gradient-brand rounded-lg p-9 shadow-elevated md:flex md:items-center md:justify-between md:gap-10 md:p-12">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/75">
                Apply the thinking
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-primary-foreground">
                Let us turn the next challenge into a clear plan.
              </h2>
            </div>
            <BookingDialog
              trigger={
                <Button variant="signal" size="lg" className="mt-7 shrink-0 md:mt-0">
                  Book a discovery call
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
