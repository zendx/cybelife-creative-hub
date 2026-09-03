import fintech from "@/assets/project-fintech.jpg";
import fashion from "@/assets/project-fashion.jpg";
import branding from "@/assets/project-branding.jpg";
import hospitality from "@/assets/project-hospitality.jpg";

export const services = [
  {
    slug: "website-design",
    title: "Websites & Web Apps",
    tagline: "Useful digital products, built to perform",
    description:
      "Strategy, UX, interface design and development for polished marketing websites, portals and custom web applications.",
    bestFor:
      "Businesses launching, repositioning or replacing a website or workflow that no longer supports how they operate.",
    scope: "Strategy, UX, interface design, development, integrations and launch",
    deliverables: [
      "Brand-aligned responsive interface",
      "Marketing website, portal or custom web app",
      "CMS, forms and third-party integrations",
      "Analytics, testing and handover training",
    ],
    outcomes: [
      "A clearer story for prospective customers",
      "A faster route from visit to enquiry or action",
      "A dependable product your team can manage",
    ],
    from: "₦850,000",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Mobile experiences people can rely on",
    description:
      "User-centred mobile apps designed and engineered around clear business goals, practical journeys and dependable performance.",
    bestFor:
      "Businesses bringing a new mobile product to market or improving an app that is difficult to use, maintain or scale.",
    scope: "Product discovery, UX, interface design, development, testing and release support",
    deliverables: [
      "Product requirements and user flows",
      "Interactive interface prototypes",
      "iOS and Android app development",
      "API integration, testing and release support",
    ],
    outcomes: [
      "A focused product shaped around real user needs",
      "Consistent experiences across supported devices",
      "A maintainable foundation for future releases",
    ],
    from: "Custom quote",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Solutions",
    tagline: "Storefronts built to sell at scale",
    description:
      "Conversion-focused online stores with local payments, delivery integrations and inventory workflows your team can run confidently.",
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
    title: "Brand Identity",
    tagline: "Brands with clarity and a distinct presence",
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
  {
    slug: "google-business-profile",
    title: "Google Business Profile",
    tagline: "Help nearby customers find your business",
    description:
      "Google Business Profile setup and optimisation that improves how your business appears across Google Search and Maps.",
    bestFor:
      "Local and service businesses that need accurate listings, stronger visibility and an easier route from search to contact.",
    scope: "Profile audit, setup, category and content optimisation, tracking and guidance",
    deliverables: [
      "Profile setup or optimisation",
      "Accurate business information and categories",
      "Photo, service and post recommendations",
      "Review workflow and performance tracking",
    ],
    outcomes: [
      "More accurate information across Search and Maps",
      "A clearer path for customers to call or visit",
      "A practical plan for ongoing profile activity",
    ],
    from: "Custom quote",
  },
  {
    slug: "seo-performance",
    title: "SEO & Page Speed",
    tagline: "Be easier to find and faster to use",
    description:
      "Technical SEO, content foundations and performance improvements that help search engines understand your site and visitors use it comfortably.",
    bestFor:
      "Businesses with slow pages, weak search visibility, indexing issues or a site that needs a stronger technical foundation.",
    scope: "Technical audit, search optimisation, page-speed work, measurement and recommendations",
    deliverables: [
      "Technical SEO and content audit",
      "Metadata, structure and indexing fixes",
      "Core Web Vitals and page-speed improvements",
      "Measurement setup and prioritised roadmap",
    ],
    outcomes: [
      "A faster experience across key pages",
      "Stronger foundations for organic discovery",
      "Clear priorities for continued improvement",
    ],
    from: "Custom quote",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance & Support",
    tagline: "Keep your website secure, current and useful",
    description:
      "Ongoing technical care, content updates and performance checks delivered through a support plan matched to your website.",
    bestFor:
      "Teams that need a reliable partner for routine updates, issue resolution and steady website improvement.",
    scope: "Monitoring, updates, backups, fixes, content support and performance reviews",
    deliverables: [
      "Software, security and dependency updates",
      "Backups and uptime monitoring",
      "Content changes and technical fixes",
      "Regular health and performance reporting",
    ],
    outcomes: [
      "Fewer preventable website issues",
      "A consistent route for updates and support",
      "A site that stays healthy as the business changes",
    ],
    from: "Monthly quote",
  },
] as const;

export const maintenancePlans = [
  {
    name: "Essential Care",
    price: "Monthly quote",
    bestFor: "Small business websites that need dependable routine care.",
    features: [
      "Core software and security updates",
      "Scheduled backups and uptime checks",
      "Minor content updates",
      "Monthly website health summary",
    ],
  },
  {
    name: "Growth Care",
    price: "Custom monthly quote",
    bestFor: "Active marketing and e-commerce sites that change often.",
    features: [
      "Everything in Essential Care",
      "Priority technical support",
      "Regular content and product updates",
      "SEO and performance monitoring",
    ],
  },
  {
    name: "Managed Support",
    price: "Custom monthly quote",
    bestFor: "Business-critical websites and web apps needing hands-on support.",
    features: [
      "Everything in Growth Care",
      "Reserved development capacity",
      "Integration and incident support",
      "Ongoing optimisation planning",
    ],
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
