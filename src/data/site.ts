export const services = [
  {
    slug: "website-design",
    title: "Website & Web App Solutions",
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
    from: 850000,
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
    from: 1250000,
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
    from: 1650000,
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
    from: 620000,
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
    from: 250000,
  },
  {
    slug: "seo-performance",
    title: "SEO",
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
    from: 500000,
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
    from: 300000,
  },
] as const;

export const maintenancePlans = [
  {
    name: "Basic",
    monthlyPrice: 300000,
    bestFor:
      "Reliable website care for startups and small businesses, freeing your team to focus on running and growing the business.",
    features: [
      "15+ website change requests each month",
      "Plugin and core software updates",
      "Ongoing security monitoring",
      "Response within 48 hours (SLA)",
      "Daily website backups",
      "Uptime and performance monitoring",
      "Monthly maintenance report",
    ],
  },
  {
    name: "Standard",
    monthlyPrice: 850000,
    bestFor:
      "Proactive support for teams publishing regularly and investing in stronger organic visibility and sustainable growth.",
    features: [
      "Everything included in Basic",
      "40+ website change requests each month",
      "Response within 24 hours (SLA)",
      "Comprehensive SEO and speed improvements",
      "CMS and content management",
      "Core Web Vitals monitoring",
      "Design refinements and visual refreshes",
    ],
  },
  {
    name: "Premium",
    monthlyPrice: 1550000,
    bestFor:
      "A dedicated technical partnership for companies that need direct access to our team and comprehensive, ongoing website support.",
    features: [
      "Everything included in Standard",
      "Unlimited website change requests",
      "Priority response within 4 hours (SLA)",
      "Priority technical support",
      "Ongoing design refinements and refreshes",
      "One complete website rebuild each year",
      "Priority access to our team through Slack",
    ],
  },
] as const;

export const projects = [
  {
    slug: "martins-investments",
    title: "Martins Investments",
    domain: "martinsinvestments.com",
    url: "https://www.martinsinvestments.com/",
    sector: "Investment Group",
    service: "Brand & Corporate Website",
    status: "Live",
    image: "/case-studies/martins-investments.jpg",
    imageAlt:
      "Martins Investments corporate website with a dark editorial layout and gold typography",
    summary:
      "A premium digital flagship for an independent group building and backing businesses across fashion, experiences and hospitality.",
    challenge:
      "Create a cohesive digital presence for Martins Investments that establishes the parent entity as an authoritative holding company, while providing a clear, scalable framework to showcase its founder and growing portfolio of distinct subsidiary brands without overshadowing their individual brand identities.",
    response:
      "To resolve this, we engineered a headless architecture utilizing Next.js for the frontend and WordPress as a flexible headless CMS. This approach delivered a unified, high-performance platform that seamlessly balances corporate governance with brand storytelling.",
    scope: [
      "Digital strategy",
      "UX & interface design",
      "Content architecture",
      "Responsive build",
    ],
    highlight: "3 holdings · 1 digital flagship",
    result:
      "The group now has one coherent home, with clear routes into RocDizWay, Roc*Parties and Roc*Away.",
    featured: true,
  },
  {
    slug: "orij-power",
    title: "Orij Power",
    domain: "orij-power.vercel.app",
    url: "https://orij-power.vercel.app/",
    sector: "Power Generation Equipment ",
    service: "E-CommerceCatalogue &  Website",
    status: "Live",
    image: "/case-studies/orij-power.jpg",
    imageAlt:
      "Orij Power industrial and residential generator catalogue website with capacity filters and product photography",
    summary:
      "A technical catalogue and enquiry platform for diesel generators serving homes, businesses and industrial installations in Nigeria.",
    challenge:
      "Make a broad 12.5–2,000 kVA inventory easy to explore while keeping expert specification at the centre of the buying journey.",
    response:
      "We organised equipment by capacity, paired specifications with current photography, and built direct quote, call and WhatsApp routes instead of a misleading checkout flow.",
    scope: [
      "E-commerce",
      "Information architecture",
      "Catalogue UX",
      "Responsive build",
      "Enquiry journeys",
    ],
    highlight: "E-commerce · Product Specifications",
    result:
      "Buyers can compare photographed units, understand the ordering process and reach an engineer from one focused experience.",
    featured: true,
  },
  {
    slug: "delivar",
    title: "Delivar",
    domain: "delivar.vercel.app",
    url: "https://delivar.vercel.app/",
    sector: "Email Infrastructure",
    service: "SaaS Product Design & Development",
    status: "Live",
    image: "/case-studies/delivar.jpg",
    imageAlt:
      "Delivar email deliverability platform with a navy interface and cyan product messaging",
    summary:
      "A SaaS experience that turns DMARC and RUA reporting into clearer email-authentication signals and prioritised remediation.",
    challenge:
      "Make dense authentication data understandable and actionable before technical failures begin to hurt inbox placement.",
    response:
      "We centred the product story on inbox focus, authentication health, policy alignment and a prioritised fix queue, then connected it to a clear free-tier entry point.",
    scope: ["Product strategy", "SaaS UX & UI", "Responsive application", "Onboarding & pricing"],
    highlight: "DMARC signals → prioritised fixes",
    result:
      "A coherent journey from product education to account access, with complex infrastructure translated into action-led language.",
    featured: true,
  },
  {
    slug: "swiftredeem",
    title: "SwiftRedeem",
    domain: "swiftredeem.com",
    url: "https://swiftredeem.com/",
    sector: "Gift-card Services",
    service: "Conversion-focused Website",
    status: "Live",
    image: "/case-studies/swift-redeem.jpg",
    imageAlt: "SwiftRedeem website showing gift cards arranged above a mobile phone",
    summary:
      "A responsive brand website that gives customers a direct, confidence-building path from unused gift cards to redemption support.",
    challenge:
      "Turn a trust-sensitive service into a journey customers can understand quickly, with reassurance at each high-intent decision point.",
    response:
      "We created a clear value proposition, visible trust pillars, accepted-card coverage, FAQs and direct WhatsApp actions throughout the experience.",
    scope: ["Website strategy", "UX & interface design", "Responsive build", "Conversion journeys"],
    highlight: "Discovery → direct redemption support",
    result:
      "The finished site moves visitors from service discovery to a direct support channel with less uncertainty and fewer dead ends.",
    featured: false,
  },
  {
    slug: "s-trends",
    title: "S-Trends",
    domain: "strends.vercel.app",
    url: "https://strends.vercel.app/",
    sector: "Creator Intelligence",
    service: "SaaS Product Design & Development",
    status: "Live",
    image: "/case-studies/s-trends.jpg",
    imageAlt: "S-Trends dark SaaS landing page for country-specific X trend intelligence",
    summary:
      "A focused trend-intelligence workspace designed to help modern X creators discover country-level signals and act on them faster.",
    challenge:
      "Help creators move from noisy trend research to useful publishing decisions without stitching together a fragmented workflow.",
    response:
      "We built a dark-mode product journey around country selection, topic views, copy and sharing actions, account access and clearly separated Free and future Pro paths.",
    scope: ["Product UX", "SaaS interface design", "Authentication flows", "Responsive build"],
    highlight: "Country-level X trend discovery",
    result:
      "The experience connects acquisition, pricing and account access to a focused workspace for faster content decisions.",
    featured: false,
  },
] as const;

export const stats = [
  { value: "300+", label: "Projects delivered" },
  { value: "18 yrs", label: "Building for Nigerian brands" },
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
