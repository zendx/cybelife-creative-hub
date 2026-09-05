import { enquirySchema } from "./enquiry-schema";

export async function submitEnquiry(input: unknown) {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    throw new Error(parsed.error.issues[0]?.message ?? "Please check your enquiry details.");
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) {
    throw new Error(
      result?.error ??
        "We couldn’t send your request. Please try again or email cyberlifeng@gmail.com.",
    );
  }
}
