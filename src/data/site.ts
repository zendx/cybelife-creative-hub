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
    deliverables: [
      "Brand-aligned UI design system",
      "Responsive build with SEO foundations",
      "Copy direction & content structuring",
      "Speed, analytics and handover training",
    ],
    from: "₦850,000",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    tagline: "Storefronts built to sell at scale",
    description:
      "Conversion-first online stores with local payment rails, logistics integrations and inventory workflows your team can actually run.",
    deliverables: [
      "Paystack / Flutterwave checkout",
      "Product, inventory & order dashboards",
      "Delivery and logistics integrations",
      "Retention flows and abandoned-cart recovery",
    ],
    from: "₦1,650,000",
  },
  {
    slug: "digital-branding",
    title: "Digital Branding",
    tagline: "Identity systems with real presence",
    description:
      "Positioning, visual identity and social-ready asset systems that make your business unmistakable across every digital surface.",
    deliverables: [
      "Positioning & messaging platform",
      "Logo, palette and type system",
      "Social and campaign templates",
      "Brand guidelines documentation",
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
    title: "Strategy & design",
    body: "Positioning, structure and a full visual direction you review before a single line of code.",
  },
  {
    step: "03",
    title: "Build & integrate",
    body: "Engineering, payments, content and SEO wired together with weekly demo checkpoints.",
  },
  {
    step: "04",
    title: "Launch & grow",
    body: "We ship, train your team, and stay on for performance, iteration and support.",
  },
] as const;
