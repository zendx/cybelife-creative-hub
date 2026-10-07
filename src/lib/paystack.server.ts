import { enquirySchema, type Enquiry } from "./enquiry-schema";
import { planPricing } from "./maintenance";
import { enquiryMessage } from "./enquiries.server";

type CareEnquiry = Extract<Enquiry, { kind: "maintenance" }>;
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const secret = (env: unknown, name: string) =>
  (env as Record<string, string | undefined> | undefined)?.[name] ?? process.env[name];

async function signature(value: string, key: string, algorithm = "SHA-256") {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"],
  );
  const bytes = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sameSignature(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index++)
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function paystack(path: string, key: string, body?: unknown) {
  const response = await fetch(`https://api.paystack.co${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  const result = await response.json();
  if (!response.ok || result.status !== true) throw new Error("Paystack request failed");
  return result.data;
}

export async function initializeCarePayment(data: CareEnquiry, request: Request, env: unknown) {
  const key = secret(env, "PAYSTACK_SECRET_KEY");
  if (!key)
    return json(
      { error: "Online payment is temporarily unavailable. Please contact cyberlifeng@gmail.com." },
      503,
    );
  try {
    const reference = `care-${crypto.randomUUID()}`;
    const amount = Math.round(planPricing(data.plan, data.billing).total * 100);
    const details = JSON.stringify({ enquiry: data, amount, currency: "NGN", reference });
    const transaction = await paystack("/transaction/initialize", key, {
      email: data.email,
      amount,
      currency: "NGN",
      reference,
      callback_url: new URL("/care-payment", request.url).href,
      metadata: JSON.stringify({
        purpose: "website-care",
        details,
        signature: await signature(details, key),
      }),
    });
    const checkout = new URL(transaction.authorization_url);
    if (checkout.protocol !== "https:" || checkout.hostname !== "checkout.paystack.com")
      throw new Error("Invalid checkout URL");
    return json({ ok: true, authorizationUrl: checkout.href });
  } catch {
    return json(
      {
        error:
          "We couldn't open Paystack checkout. Please try again or contact cyberlifeng@gmail.com.",
      },
      502,
    );
  }
}

async function verifiedPayment(reference: string, key: string) {
  if (!/^care-[a-f0-9-]{36}$/.test(reference)) throw new Error("Invalid reference");
  const payment = await paystack(`/transaction/verify/${encodeURIComponent(reference)}`, key);
  const metadata =
    typeof payment.metadata === "string" ? JSON.parse(payment.metadata) : payment.metadata;
  if (
    metadata?.purpose !== "website-care" ||
    typeof metadata.details !== "string" ||
    typeof metadata.signature !== "string" ||
    !sameSignature(await signature(metadata.details, key), metadata.signature)
  )
    throw new Error("Invalid payment metadata");
  const details = JSON.parse(metadata.details);
  const parsed = enquirySchema.safeParse(details.enquiry);
  if (
    !parsed.success ||
    parsed.data.kind !== "maintenance" ||
    payment.status !== "success" ||
    payment.reference !== reference ||
    details.reference !== reference ||
    payment.currency !== "NGN" ||
    details.currency !== "NGN" ||
    !Number.isSafeInteger(details.amount) ||
    details.amount <= 0 ||
    payment.amount !== details.amount ||
    payment.customer?.email?.toLowerCase() !== parsed.data.email.toLowerCase()
  )
    throw new Error("Payment not confirmed");
  return {
    enquiry: parsed.data,
    amount: details.amount,
    reference,
    testMode: payment.domain === "test",
  };
}

export async function handleCarePayment(request: Request, env: unknown) {
  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);
  const key = secret(env, "PAYSTACK_SECRET_KEY");
  if (!key)
    return json(
      {
        error:
          "Payment verification is temporarily unavailable. Please contact us with your payment reference.",
      },
      503,
    );
  try {
    const payment = await verifiedPayment(
      new URL(request.url).searchParams.get("reference") ?? "",
      key,
    );
    return json({
      ok: true,
      plan: payment.enquiry.plan,
      billing: payment.enquiry.billing,
      amount: payment.amount / 100,
      reference: payment.reference,
      testMode: payment.testMode,
    });
  } catch {
    return json(
      {
        error:
          "Your payment could not be confirmed. If you were debited, contact cyberlifeng@gmail.com with your reference before paying again.",
      },
      502,
    );
  }
}

export async function handlePaystackWebhook(request: Request, env: unknown) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const key = secret(env, "PAYSTACK_SECRET_KEY");
  if (!key) return json({ error: "Payment service unavailable." }, 503);
  const reader = request.body?.getReader();
  if (!reader) return json({ error: "Missing body." }, 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 100000) {
      await reader.cancel();
      return json({ error: "Request too large." }, 413);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  const body = new TextDecoder().decode(bytes);
  const supplied = request.headers.get("x-paystack-signature") ?? "";
  if (!sameSignature(await signature(body, key, "SHA-512"), supplied))
    return json({ error: "Invalid signature." }, 401);
  try {
    const event = JSON.parse(body);
    if (event.event !== "charge.success" || event.data?.metadata?.purpose !== "website-care")
      return json({ ok: true });
    const payment = await verifiedPayment(event.data.reference, key);
    const resendKey = secret(env, "RESEND_API_KEY");
    if (!resendKey) throw new Error("Email unavailable");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `care-payment-${payment.reference}`,
      },
      body: JSON.stringify({
        from:
          secret(env, "ENQUIRY_FROM_EMAIL") ?? "Cyberlife Digital <enquiries@cyberlifedigital.com>",
        to: ["cyberlifeng@gmail.com"],
        reply_to: payment.enquiry.email,
        subject: `${payment.testMode ? "TEST — " : ""}Website care payment — ${payment.enquiry.plan}`,
        text: `${payment.testMode ? "TEST PAYMENT — no live payment collected" : "Paystack payment verified"}\nReference: ${payment.reference}\nPaid: NGN ${payment.amount / 100}\n\n${enquiryMessage(payment.enquiry)}`,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok || !(await response.json()).id) throw new Error("Email delivery failed");
    return json({ ok: true });
  } catch {
    // Non-200 asks Paystack to retry notification delivery.
    return json({ error: "Payment notification could not be processed." }, 503);
  }
}
