import type { BlogPost } from "../blog";

export default {
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
} satisfies Pick<BlogPost, "intro" | "sections" | "takeaway">;
