import { z } from "zod";
import { services } from "../data/site";

export const platforms = [
  "WordPress",
  "Framer",
  "Shopify",
  "Webflow",
  "Not sure",
  "Other",
] as const;
export const websiteTypes = [
  "E-commerce",
  "Blog",
  "Portfolio",
  "Startup",
  "SaaS",
  "Corporate / business",
  "Nonprofit",
  "Other",
] as const;
export const contactMethods = ["Email", "Zoom", "Google Meet", "WhatsApp", "Call"] as const;
export const meetingTimes = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"] as const;
const shortText = z.string().trim().min(1).max(150);
const common = {
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(40)
    .refine(
      (value) =>
        /^\+?[\d\s()-]+$/.test(value) &&
        value.replace(/\D/g, "").length >= 7 &&
        value.replace(/\D/g, "").length <= 15,
      "Enter a valid phone number with your country code.",
    ),
  currency: z.enum(["NGN", "USD"]).default("NGN"),
  brief: z
    .string()
    .trim()
    .min(10, "Please describe what you need in at least 10 characters.")
    .max(5000),
  website: z.string().max(200).optional(), // Honeypot; never included in email.
};

export const enquirySchema = z
  .discriminatedUnion("kind", [
    z.object({
      ...common,
      kind: z.literal("maintenance"),
      firstName: shortText,
      lastName: shortText,
      websiteUrl: z
        .string()
        .trim()
        .max(2048)
        .url()
        .refine((value) => {
          const url = new URL(value);
          return (
            ["https:", "http:"].includes(url.protocol) &&
            !url.username &&
            !url.password &&
            url.hostname.includes(".")
          );
        }, "Enter a public HTTP or HTTPS website URL without login credentials."),
      platform: z.enum(platforms),
      otherPlatform: z.string().trim().max(150).optional(),
      websiteTypes: z.array(z.enum(websiteTypes)).min(1).max(websiteTypes.length),
      otherWebsiteType: z.string().trim().max(150).optional(),
      plan: z.enum(["Basic", "Standard", "Premium"]),
      billing: z.enum(["monthly", "annually"]),
    }),
    z.object({
      ...common,
      kind: z.literal("project"),
      name: shortText,
      company: shortText,
      service: z
        .string()
        .refine(
          (value) => services.some((service) => service.title === value),
          "Choose a service.",
        ),
      contactMethods: z.array(z.enum(contactMethods)).min(1).max(contactMethods.length),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      time: z.enum(meetingTimes),
    }),
  ])
  .superRefine((data, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
    if (data.kind === "maintenance") {
      if (data.platform === "Other" && !data.otherPlatform)
        issue("otherPlatform", "Please name your website platform.");
      if (data.websiteTypes.includes("Other") && !data.otherWebsiteType)
        issue("otherWebsiteType", "Please describe your website type.");
    } else {
      const date = new Date(`${data.date}T${data.time}:00+01:00`);
      if (
        !Number.isFinite(date.getTime()) ||
        date.toISOString().slice(0, 10) !== data.date ||
        date <= new Date() ||
        [0, 6].includes(date.getUTCDay())
      )
        issue("date", "Choose a future weekday and time in West Africa Time.");
    }
  });

export type Enquiry = z.infer<typeof enquirySchema>;
