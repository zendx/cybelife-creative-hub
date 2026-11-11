import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { blogSummaries } from "@/data/blog-summaries";
import { Reveal } from "@/components/reveal";

export function HomeBlogSection() {
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Useful thinking</p>
            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Learn before you build.</h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            Browse insights <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {blogSummaries.slice(0, 3).map((post, index) => (
            <Reveal
              as="article"
              delay={index * 70}
              key={post.slug}
              className="group overflow-hidden rounded-[1.5rem] border border-border bg-background"
            >
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </Link>
              <div className="p-6">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-4 text-xl font-bold leading-tight">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  Read article <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
