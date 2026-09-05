import { enquirySchema, type Enquiry } from "./enquiry-schema";
import { formatNaira, planPricing } from "./maintenance";

const RECIPIENT = "cyberlifeng@gmail.com";
const attempts = new Map<string, { count: number; expires: number }>();
const MAX_BODY_BYTES = 20000;

function json(body: unknown, status = 200, extraHeaders = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}

export function enquiryMessage(data: Enquiry) {
  if (data.kind === "maintenance") {
    const pricing = planPricing(data.plan, data.billing);
    return [
      "Website maintenance enquiry",
      `Name: ${data.firstName} ${data.lastName}`,
      `Company email: ${data.email}`,
      `Website: ${data.websiteUrl}`,
      `Platform: ${data.platform}${data.otherPlatform ? ` (${data.otherPlatform})` : ""}`,
      `Website types: ${data.websiteTypes.join(", ")}${data.otherWebsiteType ? ` (${data.otherWebsiteType})` : ""}`,
      `Plan: ${data.plan}`,
      `Billing: ${data.billing}`,
      `Amount: ${formatNaira(pricing.total)} ${data.billing === "annually" ? "per year (15% discount applied)" : "per month"}`,
      `Monthly equivalent: ${formatNaira(pricing.monthlyEquivalent)}`,
      "",
      "Requested assistance:",
      data.brief,
    ].join("\n");
  }
  return [
    "Project enquiry",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Service: ${data.service}`,
    `Contact preferences: ${data.contactMethods.join(", ")}`,
    `Phone: ${data.phone || "Not supplied"}`,
    `Preferred meeting: ${data.date} at ${data.time} WAT (UTC+1)`,
    "",
    "Project brief:",
    data.brief,
  ].join("\n");
}

export async function handleEnquiry(request: Request, env: unknown) {
  if (request.method !== "POST")
    return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  if (!origin || origin !== url.origin || request.headers.get("sec-fetch-site") === "cross-site")
    return json({ error: "Invalid request origin." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Expected JSON." }, 415);

  // Bounded per-instance protection. Use an edge rate-limit rule for distributed deployments.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires < now) attempts.delete(key);
  const ip = request.headers.get("cf-connecting-ip") ?? "shared";
  const key = ip.slice(0, 64);
  const entry = attempts.get(key) ?? { count: 0, expires: now + 600000 };
  if (entry.count >= 5 || (!attempts.has(key) && attempts.size >= 10000))
    return json({ error: "Too many requests. Please try again in ten minutes." }, 429, {
      "Retry-After": "600",
    });
  entry.count += 1;
  attempts.set(key, entry);

  const reader = request.body?.getReader();
  if (!reader) return json({ error: "Request body is required." }, 400);
  let size = 0;
  let body = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "Request is too large." }, 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return json({ error: "Unable to read the request." }, 400);
  }

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return json(
      { error: parsed.error.issues[0]?.message ?? "Please check your enquiry details." },
      400,
    );
  if (parsed.data.website) return json({ error: "Unable to submit this request." }, 400);

  const bindings = (env ?? {}) as Record<string, string | undefined>;
  const apiKey = bindings["RESEND_API_KEY"] ?? process.env["RESEND_API_KEY"];
  const from =
    bindings["ENQUIRY_FROM_EMAIL"] ??
    process.env["ENQUIRY_FROM_EMAIL"] ??
    "Cyberlife Digital <hello@cyberlifedigital.com>";
  if (!apiKey)
    return json(
      {
        error:
          "Online enquiries are temporarily unavailable. Please email cyberlifeng@gmail.com or call +234 803 197 5415.",
      },
      503,
    );

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: parsed.data.email,
        subject:
          parsed.data.kind === "maintenance"
            ? `Website care enquiry — ${parsed.data.plan}`
            : "New project enquiry — Cyberlife Digital",
        text: enquiryMessage(parsed.data),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!result.ok)
      return json(
        {
          error:
            "We couldn’t deliver your request. Please try again or email cyberlifeng@gmail.com.",
        },
        502,
      );
    const delivery = (await result.json()) as { id?: string };
    if (!delivery.id) throw new Error("Missing email receipt");
    return json({ ok: true });
  } catch {
    return json(
      {
        error:
          "Delivery could not be confirmed. Please email cyberlifeng@gmail.com before retrying.",
      },
      502,
    );
  }
}
