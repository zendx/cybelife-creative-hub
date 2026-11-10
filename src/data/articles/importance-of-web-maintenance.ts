import type { BlogPost } from "../blog";

export default {
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
} satisfies Pick<BlogPost, "intro" | "sections" | "takeaway">;
