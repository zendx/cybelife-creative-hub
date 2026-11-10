import heroStudio from "@/assets/hero-studio.jpg";
import projectBranding from "@/assets/project-branding.jpg";
import projectFashion from "@/assets/project-fashion.jpg";
import projectFintech from "@/assets/project-fintech.jpg";
import projectHospitality from "@/assets/project-hospitality.jpg";
import type { BlogPost } from "./blog";

export const blogSummaries: readonly Omit<BlogPost, "intro" | "sections" | "takeaway">[] = [
  {
    slug: "smpis-school-management-software-nigeria",
    title: "Meet SMPIS: school management software for Nigerian schools",
    category: "Digital Experience",
    excerpt:
      "Discover SMPIS by Cyberlife Digital: one workspace for admissions, school fees, attendance, report cards and parent portals. Start a 30-day free trial.",
    readingTime: "7 min read",
    publishedDate: "25 October 2026",
    publishedAt: "2026-10-25",
    image: "/blog/smpis-school-management-cyberlife.webp",
    imageAlt:
      "Official SMPIS logo above an illustrative school administration workspace with a laptop, tablet and organised school records",
  },
  {
    slug: "importance-of-web-maintenance",
    title: "Why website maintenance matters for your business",
    category: "Web Strategy",
    excerpt:
      "Protect your domain, customer enquiries and search visibility with website maintenance, SEO audits and ongoing support from Cyberlife Digital in Lagos, Nigeria.",
    readingTime: "7 min read",
    publishedDate: "25 October 2026",
    publishedAt: "2026-10-25",
    image: "/blog/website-maintenance-cyberlife.webp",
    imageAlt:
      "Cyberlife Digital branded website maintenance cover with a laptop, security shield and backup symbols",
  },
  {
    slug: "signs-your-business-website-is-costing-you-leads",
    title: "7 signs your business website is costing you leads",
    category: "Web Strategy",
    excerpt:
      "A practical audit of the messaging, trust signals and user journeys that help visitors become serious enquiries.",
    readingTime: "6 min read",
    publishedDate: "22 August 2026",
    publishedAt: "2026-08-22",
    modifiedAt: "2026-10-25",
    image: projectFintech,
    imageAlt: "Business dashboard displayed on a laptop against a deep blue background",
  },
  {
    slug: "how-to-write-a-better-website-brief",
    title: "How to write a website brief that gets a better result",
    category: "Web Strategy",
    excerpt:
      "The decisions, context and practical inputs a design team needs before the first wireframe is created.",
    readingTime: "7 min read",
    publishedDate: "14 August 2026",
    publishedAt: "2026-08-14",
    modifiedAt: "2026-10-25",
    image: heroStudio,
    imageAlt: "Digital designers working together in a dark creative studio",
  },
  {
    slug: "what-to-prepare-before-building-an-ecommerce-store",
    title: "What to prepare before building an e-commerce store",
    category: "E-commerce",
    excerpt:
      "A launch checklist for products, inventory, delivery, payments, policies and the team responsible after an order arrives.",
    readingTime: "7 min read",
    publishedDate: "6 August 2026",
    publishedAt: "2026-08-06",
    modifiedAt: "2026-10-25",
    image: projectFashion,
    imageAlt: "Fashion storefront shown across desktop and mobile screens",
  },
  {
    slug: "brand-refresh-or-full-rebrand",
    title: "Brand refresh or full rebrand: which does your business need?",
    category: "Branding",
    excerpt:
      "A practical way to choose the right level of change without discarding brand recognition that still has value.",
    readingTime: "6 min read",
    publishedDate: "28 July 2026",
    publishedAt: "2026-07-28",
    modifiedAt: "2026-10-25",
    image: projectBranding,
    imageAlt: "Red and blue brand identity materials arranged on a dark surface",
  },
  {
    slug: "why-local-context-matters-in-digital-experience",
    title: "Why local context belongs in every digital experience",
    category: "Digital Experience",
    excerpt:
      "How customer conditions, trust, payments and fulfillment should shape a digital product from the start.",
    readingTime: "6 min read",
    publishedDate: "18 July 2026",
    publishedAt: "2026-07-18",
    modifiedAt: "2026-10-25",
    image: projectHospitality,
    imageAlt: "Hospitality booking experience displayed on a tablet in a refined interior",
  },
];
