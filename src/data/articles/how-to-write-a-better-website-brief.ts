import type { BlogPost } from "../blog";

export default {
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
} satisfies Pick<BlogPost, "intro" | "sections" | "takeaway">;
