import fintech from "@/assets/project-fintech.jpg";
import fashion from "@/assets/project-fashion.jpg";
import branding from "@/assets/project-branding.jpg";
import hospitality from "@/assets/project-hospitality.jpg";

export const services = [
  {
    slug: "website-design",
    title: "Website Design",
    tagline: "Signature sites, engineered to convert",
    description:
      "Bespoke, research-led website design and build for Nigerian businesses that want to look like the category leader — not a template.",
    bestFor:
      "Established businesses launching, repositioning or replacing a website that no longer reflects the quality of their work.",
    scope: "Strategy, copy direction, interface design, development and launch",
    deliverables: [
      "Brand-aligned UI design system",
      "Responsive build with SEO foundations",
      "Copy direction and content structuring",
      "Speed, analytics and handover training",
    ],
    outcomes: [
      "A clearer story for prospective customers",
      "A faster route from first visit to enquiry",
      "A flexible system your team can update",
    ],
    from: "₦850,000",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    tagline: "Storefronts built to sell at scale",
    description:
      "Conversion-first online stores with local payment rails, logistics integrations and inventory workflows your team can actually run.",
    bestFor:
      "Retailers ready to make online sales a dependable channel, not a side project held together by manual work.",
    scope: "Commerce strategy, UX, storefront build, operations and launch support",
    deliverables: [
      "Paystack / Flutterwave checkout",
      "Product, inventory and order dashboards",
      "Delivery and logistics integrations",
      "Retention flows and abandoned-cart recovery",
    ],
    outcomes: [
      "A simpler path from product discovery to payment",
      "Less manual work behind every order",
      "A storefront designed to support repeat sales",
    ],
    from: "₦1,650,000",
  },
  {
    slug: "digital-branding",
    title: "Digital Branding",
    tagline: "Identity systems with real presence",
    description:
      "Positioning, visual identity and social-ready asset systems that make your business unmistakable across every digital surface.",
    bestFor:
      "New and growing businesses that need a distinctive identity, a sharper message and consistent execution across channels.",
    scope: "Positioning, messaging, visual identity, launch assets and guidelines",
    deliverables: [
      "Positioning and messaging platform",
      "Logo, palette and type system",
      "Social and campaign templates",
      "Brand guidelines documentation",
    ],
    outcomes: [
      "A position customers can understand quickly",
      "A recognisable system across every touchpoint",
      "Practical tools that keep the brand consistent",
    ],
    from: "₦620,000",
  },
] as const;

export const projects = [
  {
    title: "Kobopath Financial",
    sector: "Fintech · Lagos",
    service: "Website Design",
    year: "2026",
    image: fintech,
    summary:
      "A trust-forward marketing site and client dashboard shell for a lending platform serving SMEs across Lagos and Abuja.",
    challenge:
      "Explain a complex lending offer in plain language while giving business owners enough confidence to begin an application online.",
    response:
      "We simplified the information architecture, brought eligibility and repayment expectations forward, and created a calm visual system around the application journey.",
    scope: ["Experience strategy", "UX and interface design", "Responsive development"],
    metric: "+184% qualified leads",
  },
  {
    title: "Adaeze Atelier",
    sector: "Fashion Retail · Lekki",
    service: "E-commerce Development",
    year: "2025",
    image: fashion,
    summary:
      "A full commerce rebuild with local payment rails, size-guide tooling and same-day Lagos delivery routing.",
    challenge:
      "Translate the confidence of the in-store experience online without making product discovery or checkout feel heavy on mobile.",
    response:
      "We paired editorial product storytelling with clearer sizing, local checkout options and delivery logic built around the way the operations team already worked.",
    scope: ["Commerce UX", "Storefront development", "Payment and delivery setup"],
    metric: "3.4x online revenue",
  },
  {
    title: "Ridgeline Logistics",
    sector: "Logistics · Apapa",
    service: "Digital Branding",
    year: "2025",
    image: branding,
    summary:
      "A complete identity system — mark, palette, print and digital templates — for a haulage firm expanding nationwide.",
    challenge:
      "Create a more credible national presence without losing the practical, dependable character customers already valued.",
    response:
      "We built a bold identity around movement and reliability, then translated it into a usable toolkit for vehicles, documents, sales material and digital channels.",
    scope: ["Brand strategy", "Visual identity", "Campaign and operations toolkit"],
    metric: "Full rebrand in 6 weeks",
  },
  {
    title: "The Marina House",
    sector: "Hospitality · Victoria Island",
    service: "Website Design",
    year: "2026",
    image: hospitality,
    summary:
      "A booking-led hotel experience with live availability, curated suite storytelling and multi-currency rates.",
    challenge:
      "Make direct booking feel as effortless and trustworthy as a third-party platform while preserving the hotel's distinctive atmosphere.",
    response:
      "We designed the experience around suites, availability and useful local detail, with a shorter booking journey and richer visual storytelling.",
    scope: ["Content strategy", "Booking experience", "Responsive website build"],
    metric: "+61% direct bookings",
  },
] as const;

export const stats = [
  { value: "120+", label: "Projects delivered" },
  { value: "9 yrs", label: "Building for Nigerian brands" },
  { value: "4.9/5", label: "Average client rating" },
  { value: "14 days", label: "Typical launch runway" },
] as const;

export const process = [
  {
    step: "01",
    title: "Discovery call",
    body: "We meet, audit where you are, and agree on the commercial outcome the project must produce.",
  },
  {
    step: "02",
    title: "Strategy and design",
    body: "Positioning, structure and a full visual direction you review before a single line of code.",
  },
  {
    step: "03",
    title: "Build and integrate",
    body: "Engineering, payments, content and SEO wired together with weekly demo checkpoints.",
  },
  {
    step: "04",
    title: "Launch and grow",
    body: "We ship, train your team, and stay on for performance, iteration and support.",
  },
] as const;
