import type { BlogPost } from "../blog";

export default {
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
} satisfies Pick<BlogPost, "intro" | "sections" | "takeaway">;
