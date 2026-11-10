import { blogSummaries } from "./blog-summaries";

export type BlogCategory = "Web Strategy" | "E-commerce" | "Branding" | "Digital Experience";

export interface BlogSection {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  links?: readonly { label: string; href: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readingTime: string;
  publishedDate: string;
  publishedAt: string;
  modifiedAt?: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: readonly BlogSection[];
  takeaway: string;
}

const articleLoaders: Record<
  string,
  () => Promise<{ default: Pick<BlogPost, "intro" | "sections" | "takeaway"> }>
> = {
  "smpis-school-management-software-nigeria": () =>
    import("./articles/smpis-school-management-software-nigeria"),
  "importance-of-web-maintenance": () => import("./articles/importance-of-web-maintenance"),
  "signs-your-business-website-is-costing-you-leads": () =>
    import("./articles/signs-your-business-website-is-costing-you-leads"),
  "how-to-write-a-better-website-brief": () =>
    import("./articles/how-to-write-a-better-website-brief"),
  "what-to-prepare-before-building-an-ecommerce-store": () =>
    import("./articles/what-to-prepare-before-building-an-ecommerce-store"),
  "brand-refresh-or-full-rebrand": () => import("./articles/brand-refresh-or-full-rebrand"),
  "why-local-context-matters-in-digital-experience": () =>
    import("./articles/why-local-context-matters-in-digital-experience"),
};

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const summary = blogSummaries.find((post) => post.slug === slug);
  const load = articleLoaders[slug];
  if (!summary || !load) return undefined;
  return { ...summary, ...(await load()).default };
}
