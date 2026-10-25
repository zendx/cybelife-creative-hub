import heroStudio from "@/assets/hero-studio.jpg";
import projectBranding from "@/assets/project-branding.jpg";
import projectFashion from "@/assets/project-fashion.jpg";
import projectFintech from "@/assets/project-fintech.jpg";
import projectHospitality from "@/assets/project-hospitality.jpg";

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

export const blogPosts: readonly BlogPost[] = [
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
    intro:
      "When did you last check your business website? If a prospective customer searches for your company today, will they find a working website with accurate information and a reliable way to contact you? Or will an expired domain, broken page or failed enquiry form interrupt that first impression? Website maintenance protects the investment you made at launch and keeps your digital presence useful as your business grows.",
    sections: [
      {
        heading: "Your website is a business asset that needs ongoing care",
        paragraphs: [
          "Entrepreneurs, business owners and professionals often invest heavily in social media while website upkeep slips down the priority list. The neglect is rarely intentional: operations become busy, renewal reminders go unanswered and small technical problems accumulate.",
          "Your website is more than a link in a social media bio or on corporate stationery. It is your own online property: a place to explain your services, demonstrate credibility and turn interest into enquiries. Domain registration, hosting and software all need attention to keep that property accessible and relevant.",
        ],
      },
      {
        heading: "Domain renewal and hosting keep your front door open",
        paragraphs: [
          "Domain registration and website hosting are separate services, and either can interrupt access if it expires. A domain lapse can also disrupt email connected to that domain. Record renewal dates, keep billing details current and make sure a responsible person receives the reminders.",
          "Retain access to the registrar, hosting account and recovery email. Agree with your maintenance partner who handles each renewal and which charges are included in your plan. A clear ownership record makes a future handover much simpler.",
        ],
        bullets: [
          "Review domain and hosting renewal dates and payment methods.",
          "Check HTTPS certificates and confirm important pages load correctly.",
          "Keep account recovery details and authorised contacts current.",
        ],
        links: [
          {
            label: "Explore Cyberlife website maintenance and care plans",
            href: "/website-maintenance",
          },
        ],
      },
      {
        heading: "Security, backups and working forms protect customer trust",
        paragraphs: [
          "A maintenance routine should cover software updates where applicable, access reviews, backups and checks of important customer journeys. Backups should be recoverable, with restoration tested at an agreed interval; simply having a backup file does not establish that recovery will work.",
          "Test enquiry forms, booking links, checkout flows and confirmation messages after relevant changes. A page can appear healthy while its form fails to deliver a lead. Accurate contact details, current service descriptions and functional mobile navigation deserve the same attention as technical updates.",
        ],
      },
      {
        heading: "How website maintenance supports SEO and conversions",
        paragraphs: [
          "Search visibility depends on useful content and pages that search engines can access and understand. Maintenance helps identify broken links, accidental indexing restrictions, missing page titles, outdated information and unnecessary obstacles in the customer journey.",
          "Descriptive headings, relevant internal links, clear service pages and appropriately sized images make a website easier to navigate. Review search queries and enquiries alongside technical findings so improvements answer real customer questions. SEO is ongoing work; a maintenance plan supports that work without guaranteeing a particular ranking.",
        ],
        links: [
          {
            label: "Read the seven signs your website may be losing leads",
            href: "/blog/signs-your-business-website-is-costing-you-leads",
          },
        ],
      },
      {
        heading: "Start with a website audit, then prioritise the fixes",
        paragraphs: [
          "Cyberlife's website audit tool gives new and existing customers a starting point for improvement. It inspects the returned page HTML and response for foundations such as page titles, descriptions, heading structure, mobile viewport settings, image alternative attributes, canonical links, indexing directives and HTTPS signals.",
          "These automated checks flag issues for investigation; they are not a full-site crawl, a keyword ranking report or a substitute for human review. Our team of digital professionals puts the findings in context, reviews content and customer journeys, and helps prioritise technical SEO and usability improvements around business goals.",
          "For a new website, an audit helps establish a baseline. For an existing website, it can expose gaps that appeared as content, services or technology changed. After fixes, repeat the relevant checks and review search and enquiry data to understand what needs attention next.",
        ],
        links: [
          { label: "Run your free website audit", href: "/audit" },
          { label: "Explore our digital services", href: "/services" },
        ],
      },
      {
        heading: "Choosing digital partners in Lagos, Nigeria",
        paragraphs: [
          "If you are searching for the best web development agency in Lagos or the best web development agency in Nigeria, look beyond a launch-day portfolio. Ask who will own your domain, how maintenance is scoped, how backups are tested and how the team will respond when a customer-facing feature stops working.",
          "A digital agency in Lagos, Nigeria should understand local customer journeys while supporting businesses serving wider markets. Premium web development services should include clear content architecture, responsive design, accessible interactions and an agreed plan for support after launch. Effective digital partners connect these decisions to the way your business actually operates.",
        ],
        links: [
          { label: "Meet the team behind Cyberlife Digital", href: "/about" },
          { label: "Explore our website and web app services", href: "/services#website-design" },
        ],
      },
      {
        heading: "How Cyberlife supports businesses in Nigeria and beyond",
        paragraphs: [
          "Cyberlife Digital helps businesses in Nigeria and outside Nigeria build and care for their digital presence. Our work includes Martins Investments (martinsinvestments.com), alongside the other businesses showcased in our portfolio. We bring website development, digital service expertise and ongoing care together so clients have a team to discuss improvements with as their needs change.",
          "Our Martins Investments project demonstrates how a corporate website can bring a parent company's story and portfolio together. Explore that project and our other case studies to see the type of work we deliver, then speak with us about the maintenance, content and SEO support your own website needs.",
          "Whether your domain needs attention, your existing site needs a technical review or you are planning a new platform, start with an audit and a conversation. We will help define the priorities, responsibilities and scope of support before work begins.",
        ],
        links: [
          { label: "View the Martins Investments case study", href: "/work#martins-investments" },
          { label: "Visit Martins Investments", href: "https://www.martinsinvestments.com/" },
          { label: "Review website care options", href: "/website-maintenance" },
          { label: "Book a conversation with Cyberlife", href: "/book" },
        ],
      },
    ],
    takeaway:
      "Your website should remain a dependable route from discovery to enquiry. Keep renewals, security, content and customer journeys under review, and use an audit to turn overlooked issues into a practical improvement plan.",
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
    intro:
      "A website can look polished and still make it unnecessarily difficult for a potential customer to choose you. The most expensive problems are often small moments of uncertainty: an unclear headline, missing proof, a slow path to contact or a page that asks the visitor to work too hard.",
    sections: [
      {
        heading: "Clarity has to arrive before style",
        paragraphs: [
          "Visitors should quickly understand what you offer, who it is for and why it matters. A beautiful first screen cannot do its job if the message underneath it is vague.",
          "Read the page as if you know nothing about the company. If the language only makes sense to an insider, the site is relying on the visitor to translate it.",
        ],
        bullets: [
          "1. The headline describes the company but not the customer outcome.",
          "2. Services are hidden behind broad language or unexplained jargon.",
        ],
      },
      {
        heading: "Trust should not be a treasure hunt",
        paragraphs: [
          "People look for reasons to believe a business can deliver. Relevant work, specific capabilities, a clear location and an easy way to reach a real team all reduce uncertainty.",
          "Proof is strongest when it sits close to the claim it supports. A project outcome beside a service is more useful than a page of praise disconnected from the decision at hand.",
        ],
        bullets: [
          "3. Important claims appear without projects, examples or context.",
          "4. Contact details, ownership or the next step feel difficult to verify.",
        ],
      },
      {
        heading: "Friction grows quickly on a small screen",
        paragraphs: [
          "A mobile visitor may be comparing options between meetings or on an uneven connection. Dense layouts, oversized media and forms with unnecessary fields make a simple task feel demanding.",
          "Test the complete journey on a real phone: arrive from a search result, understand the offer, review proof and make an enquiry. Every avoidable pause is a useful design clue.",
        ],
        bullets: [
          "5. Core pages are difficult to scan or operate comfortably on mobile.",
          "6. Pages feel heavy, slow or distracted by media that does not help the decision.",
        ],
      },
      {
        heading: "Every important page needs a clear next move",
        paragraphs: [
          "A visitor should not have to guess whether to call, request a quote, book a meeting or read another page. Choose one primary action for each page and support it with a lower-commitment option where useful.",
        ],
        bullets: [
          "7. Calls to action are generic, inconsistent or absent when interest is highest.",
        ],
      },
      {
        heading: "Audit the journey before replacing the website",
        paragraphs: [
          "Start with evidence you already have: common sales questions, support messages, search terms, analytics and conversations with recent customers. Together, they reveal where the current story and experience are falling short.",
          "The goal is not a redesign for its own sake. It is a clearer route from first impression to informed action, supported by content and technology your team can maintain.",
        ],
      },
      {
        heading: "Turn website friction into an improvement plan",
        paragraphs: [
          "For a business in Lagos or elsewhere in Nigeria, start by testing the route from a service page to a delivered enquiry. Cyberlife Digital can help review that journey alongside technical SEO foundations, then scope changes around the problems customers actually encounter.",
        ],
        links: [
          { label: "Run a free website audit", href: "/audit" },
          {
            label: "Keep your website reliable after improvements",
            href: "/blog/importance-of-web-maintenance",
          },
        ],
      },
    ],
    takeaway:
      "If visitors cannot understand the offer, trust the business and take the next step without friction, visual polish alone will not recover the opportunity.",
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
    intro:
      "A useful website brief is not a long list of pages or visual references. It is a shared definition of the business problem, the people the website must serve and the change the project should create. That clarity gives strategy, design and development a stronger starting point.",
    sections: [
      {
        heading: "Begin with the business change",
        paragraphs: [
          "Describe what has prompted the project now. The company may be entering a new market, introducing a service, improving the quality of enquiries or giving customers a better way to buy.",
          "Turn that reason into a focused objective. “We need a modern website” describes an output; “we need qualified prospects to understand our offer and book a meeting” describes a job the website can perform.",
        ],
        bullets: [
          "What should be easier for the business after launch?",
          "What should a customer understand or do differently?",
          "Which commercial or operational problem matters most?",
        ],
      },
      {
        heading: "Make the audience specific",
        paragraphs: [
          "Avoid defining the audience as everyone who could technically buy. Identify the people most important to this project, the situation that brings them to the website and the questions they need answered before they can move forward.",
          "Useful audience notes include buying concerns, decision makers, common objections and the alternatives people are likely to consider. These details shape the structure and message more directly than broad demographic labels.",
        ],
      },
      {
        heading: "Separate requirements from assumptions",
        paragraphs: [
          "List the capabilities the business genuinely needs: enquiries, payments, product management, booking, multilingual content or connections to an existing tool. Then explain the workflow behind each one.",
          "If a feature is only a possible solution, label it as open for discussion. This gives the project team room to recommend a simpler or stronger approach without overlooking a real constraint.",
        ],
      },
      {
        heading: "Account for content and ownership",
        paragraphs: [
          "A website cannot be designed independently of its words, images and proof. Note what already exists, what needs to be created and who can approve it. Include product data, policies, photography, case studies and brand files where relevant.",
          "Name the people responsible for decisions and ongoing updates. A clear approval path protects momentum and helps the final system fit the team that will run it.",
        ],
      },
      {
        heading: "Give the project honest boundaries",
        paragraphs: [
          "Share the target date, budget range, technical constraints and any event or dependency that cannot move. Early transparency makes it easier to propose a realistic scope and sequence.",
        ],
        bullets: [
          "Business objective and primary audience",
          "Key messages, actions and required capabilities",
          "Available content, integrations and brand assets",
          "Decision makers, budget range and target launch window",
          "How the team will judge whether the project worked",
        ],
      },
      {
        heading: "Include SEO and website care in your brief",
        paragraphs: [
          "When comparing web development agencies in Nigeria, ask each team to explain content ownership, search-friendly page structure, launch checks and ongoing support. Include your service locations, customer questions and domain renewal responsibilities in the brief so premium web development services have a clear scope.",
        ],
        links: [
          { label: "Explore website development services", href: "/services#website-design" },
          { label: "Plan ongoing website maintenance", href: "/website-maintenance" },
        ],
      },
    ],
    takeaway:
      "The best brief gives a team a clear problem and honest constraints, then leaves enough room for strategy and design to find the right solution.",
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
    intro:
      "An online store is not only a collection of product pages. It is a connected operating system for discovery, payment, fulfillment, communication and support. Preparing those decisions before design begins prevents the storefront from promising an experience the business cannot reliably deliver.",
    sections: [
      {
        heading: "Build a dependable product source",
        paragraphs: [
          "Start with a structured catalogue rather than scattered messages and folders. Every product should have a stable name, description, price, category, image set, stock status and any variation a customer can choose.",
          "Decide which information helps someone buy confidently. Materials, dimensions, care guidance, compatibility, sizing and what is included can be as important as the main sales description.",
        ],
        bullets: [
          "Product names, identifiers and categories",
          "Prices, variants and inventory rules",
          "Consistent photography and useful detail images",
          "Descriptions, specifications and customer guidance",
        ],
      },
      {
        heading: "Map the order after checkout",
        paragraphs: [
          "Write down what happens from the moment payment is confirmed. Who sees the order, where stock is updated, how it is packed, which delivery option is selected and how the customer receives progress updates should all be clear.",
          "This workflow exposes the integrations and dashboard views the team actually needs. It also reveals where a manual step is acceptable and where it would create delays or mistakes.",
        ],
      },
      {
        heading: "Define payment and delivery rules",
        paragraphs: [
          "Choose payment options around the customers you plan to serve and the way the finance team reconciles transactions. Document delivery zones, fees, timelines, pickup options and the conditions that affect each promise.",
          "Make exceptions visible before launch. Fragile items, made-to-order products, international destinations and same-day delivery may each need a different rule and message.",
        ],
      },
      {
        heading: "Write the policies before the interface",
        paragraphs: [
          "Returns, exchanges, cancellations, privacy and customer support are part of the buying experience. Clear policies help the design team place the right information near product, cart and checkout decisions.",
          "Use language the support team can stand behind. A short, accurate promise is stronger than generous copy that operations cannot fulfil consistently.",
        ],
      },
      {
        heading: "Plan ownership for launch week and beyond",
        paragraphs: [
          "Assign responsibility for catalogue updates, order handling, promotions, customer questions and reporting. Test each role with realistic orders before inviting customers in.",
        ],
        bullets: [
          "Place successful and unsuccessful test orders.",
          "Check confirmations and status messages on mobile.",
          "Test stock changes, discounts, refunds and delivery exceptions.",
          "Confirm who responds when an order needs manual attention.",
        ],
      },
      {
        heading: "Prepare your Nigerian store for search and ongoing care",
        paragraphs: [
          "For an e-commerce business in Nigeria, useful category descriptions, clear product information and reliable mobile checkout deserve attention before launch. Afterwards, keep prices, stock, delivery rules and payment journeys under review. Cyberlife Digital can help connect the storefront to those operational needs.",
        ],
        links: [
          { label: "Discuss your e-commerce project", href: "/services" },
          {
            label: "Learn why website maintenance matters",
            href: "/blog/importance-of-web-maintenance",
          },
        ],
      },
    ],
    takeaway:
      "A strong storefront reflects a clear operation. Prepare the product data, policies and fulfillment workflow with the same care as the visual design.",
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
    intro:
      "When a brand feels behind the business, the instinct is often to replace everything. Sometimes that is necessary. In other cases, the strongest move is to preserve what customers already recognise while improving the parts that no longer communicate clearly.",
    sections: [
      {
        heading: "Start with the reason for change",
        paragraphs: [
          "A new logo is not a strategy. Identify the gap between how the business needs to be understood and what the current brand communicates today.",
          "The gap may come from a new audience, a broader offer, inconsistent execution, confusing positioning or an identity that no longer works across digital channels. Different causes require different levels of change.",
        ],
      },
      {
        heading: "Choose a refresh when the foundation still works",
        paragraphs: [
          "A refresh improves expression without changing the core promise. It can refine typography, colour, layout, imagery, tone of voice and the way existing elements work together.",
          "This route suits a business with useful recognition and a clear position, but an identity that feels inconsistent, dated or difficult to use. The aim is greater clarity and flexibility, not novelty.",
        ],
        bullets: [
          "Customers still understand and trust the existing name.",
          "The core audience and offer remain broadly the same.",
          "The main problem is consistency or execution.",
        ],
      },
      {
        heading: "Choose a rebrand when the meaning must change",
        paragraphs: [
          "A full rebrand revisits positioning before visual identity. It may be appropriate when the business has changed direction, the current name creates a barrier, multiple companies are becoming one or the brand carries associations the future business cannot use.",
          "Because the change reaches operations, sales and customer communication, it needs leadership alignment and a careful rollout. The work is as much about decisions and adoption as it is about design.",
        ],
        bullets: [
          "The business is entering a materially different category or market.",
          "The existing promise conflicts with the future offer.",
          "A structural change makes the current identity misleading.",
        ],
      },
      {
        heading: "Protect the equity worth keeping",
        paragraphs: [
          "Ask customers and team members what they recognise, value and repeatedly associate with the business. Familiar language, a colour, a symbol or a service promise may still do important work.",
          "Keeping a useful element is not a compromise. It can create continuity while the new system fixes genuine weaknesses.",
        ],
      },
      {
        heading: "Plan for use, not just reveal day",
        paragraphs: [
          "The final identity should include the templates, rules and files people need for everyday work. Prioritise the channels customers see most, document decisions clearly and give the team examples of the system in action.",
        ],
      },
      {
        heading: "Carry the brand change into your website",
        paragraphs: [
          "A brand update should reach service pages, contact details, social previews and the customer enquiry journey. If page addresses must change, plan relevant redirects and review internal links so visitors can still find the information they need. Cyberlife Digital connects brand identity with practical website delivery for businesses in Nigeria and beyond.",
        ],
        links: [
          { label: "Explore brand identity services", href: "/services" },
          {
            label: "Write a clearer website brief",
            href: "/blog/how-to-write-a-better-website-brief",
          },
        ],
      },
    ],
    takeaway:
      "Refresh the expression when the strategy remains sound; rebrand when the business needs to stand for something meaningfully different.",
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
    intro:
      "A digital experience can follow every fashionable convention and still feel wrong for the people expected to use it. Context changes what customers notice, what they trust and what may stop them from completing a task. Good design begins by understanding those conditions instead of treating them as last-minute adjustments.",
    sections: [
      {
        heading: "Context is behaviour, not decoration",
        paragraphs: [
          "Local design is not achieved by adding familiar photographs or colours. It comes from understanding how people discover the business, compare options, ask questions, pay, receive an order and seek help.",
          "Speak with customers and the teams closest to them. Sales calls, support conversations and delivery exceptions often reveal more useful design requirements than a list of generic preferences.",
        ],
      },
      {
        heading: "Design for the conditions around the screen",
        paragraphs: [
          "The same person may move between a phone, messaging app and desktop before making a decision. Keep important pages focused, make content easy to scan and avoid forcing someone to repeat information when the journey changes channel.",
          "Performance and resilience are part of the experience. Prioritise essential content, use media deliberately and make errors recoverable so a temporary interruption does not turn into a lost task.",
        ],
      },
      {
        heading: "Earn trust at the moment it is needed",
        paragraphs: [
          "Trust is built through specific, consistent information: what the business does, where it operates, what an item costs, how delivery works and what happens if something goes wrong.",
          "Place reassurance beside the decision it supports. Payment guidance belongs near checkout; delivery expectations belong near the product and cart; real contact options should be easy to find before uncertainty grows.",
        ],
        bullets: [
          "Use plain language for prices, fees and timelines.",
          "Explain payment and confirmation states clearly.",
          "Make delivery coverage and exceptions visible early.",
          "Offer a practical route to human support.",
        ],
      },
      {
        heading: "Connect the interface to real operations",
        paragraphs: [
          "A promise on a screen creates work somewhere else. Before presenting live availability, same-day delivery or instant confirmation, confirm how the responsible team will keep that information accurate.",
          "The strongest experience is not the one with the most features. It is the one whose digital promise and operational reality agree.",
        ],
      },
      {
        heading: "Keep learning after launch",
        paragraphs: [
          "Watch where customers pause, abandon or ask for help, then combine that evidence with direct conversation. Small improvements to wording, sequence and feedback can remove friction without rebuilding the whole product.",
        ],
      },
      {
        heading: "Choose digital partners who understand your customer journey",
        paragraphs: [
          "When choosing a digital agency in Lagos, Nigeria, ask how the team will test real customer tasks and maintain the experience after launch. Cyberlife Digital brings local context to web strategy and development, with attention to service information, mobile usability and clear routes to support.",
        ],
        links: [
          { label: "Explore Cyberlife case studies", href: "/work" },
          { label: "Audit the foundations of your website", href: "/audit" },
        ],
      },
    ],
    takeaway:
      "Design for the real journey around the screen—how people understand, trust, pay, receive and recover—and the experience becomes useful as well as attractive.",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
