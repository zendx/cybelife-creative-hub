import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BookingDialog } from "@/components/booking-dialog";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Web, E-commerce & Brand Strategy | Cyberlife Digital" },
      {
        name: "description",
        content:
          "Practical articles from Cyberlife Digital on website strategy, e-commerce, branding and better digital experiences for growing businesses.",
      },
      { property: "og:title", content: "Insights | Cyberlife Digital" },
      {
        property: "og:description",
        content:
          "Clear, useful thinking for teams building stronger brands and digital businesses.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featuredPost, ...remainingPosts] = blogPosts;

  if (!featuredPost) return null;

  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <p className="eyebrow">Ideas and field notes</p>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-5xl">
                Practical thinking for stronger brands and better digital products.
              </h1>
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:pb-1">
              Useful guidance on website strategy, e-commerce, branding and growth, written for
              teams building ambitious businesses in Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="eyebrow">Featured article</p>
            <span className="text-xs text-muted-foreground">Fresh from the studio</span>
          </div>
          <article className="group overflow-hidden rounded-lg border border-border bg-card">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                aria-label={`Read ${featuredPost.title}`}
                className="overflow-hidden"
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  width={1200}
                  height={900}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                  <span className="eyebrow">{featuredPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featuredPost.publishedAt}>{featuredPost.publishedDate}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
                <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    className="transition-colors hover:text-brand-soft"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-brand-soft"
                >
                  Read article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="hairline-grid border-b border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">From the journal</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">More useful reads.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Clear explanations, practical checklists and the thinking behind digital work that
              performs after launch.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  aria-label={`Read ${post.title}`}
                  className="overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                    <span className="eyebrow">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt}>{post.publishedDate}</time>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-brand-soft"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                    <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      aria-label={`Open ${post.title}`}
                      className="text-brand-soft transition-colors hover:text-foreground"
                    >
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-8 rounded-lg border border-border bg-card p-9 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="eyebrow">Have a project in mind?</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold">
                Turn the next good idea into a useful digital experience.
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Bring us the goal, the context and the questions. We will help map a sensible route
                from where you are to launch.
              </p>
            </div>
            <BookingDialog
              trigger={
                <Button variant="signal" size="lg">
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
