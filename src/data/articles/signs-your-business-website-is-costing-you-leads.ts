import type { BlogPost } from "../blog";

export default {
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
      bullets: ["7. Calls to action are generic, inconsistent or absent when interest is highest."],
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
} satisfies Pick<BlogPost, "intro" | "sections" | "takeaway">;
