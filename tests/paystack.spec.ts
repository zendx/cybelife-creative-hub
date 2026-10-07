import { test, expect } from "@playwright/test";
import { createHmac } from "node:crypto";
import { handleEnquiry } from "../src/lib/enquiries.server";
import { handleCarePayment, handlePaystackWebhook } from "../src/lib/paystack.server";
import { planPricing } from "../src/lib/maintenance";

const care = {
  kind: "maintenance",
  firstName: "Ada",
  lastName: "Obi",
  email: "ada@example.com",
  phone: "+2348031975415",
  websiteUrl: "https://example.com",
  platform: "WordPress",
  websiteTypes: ["Blog"],
  plan: "Standard",
  billing: "annually",
  currency: "USD",
  brief: "Keep our website updated and secure.",
};
const env = { PAYSTACK_SECRET_KEY: "sk_test_mock", RESEND_API_KEY: "test-only" };
const request = (input = care) =>
  new Request("https://www.cyberlife.digital/api/care-checkout", {
    method: "POST",
    headers: {
      origin: "https://www.cyberlife.digital",
      "content-type": "application/json",
      "cf-connecting-ip": crypto.randomUUID(),
    },
    body: JSON.stringify(input),
  });

test("care checkout rejects missing configuration and untrusted origins", async () => {
  expect((await handleEnquiry(request(), {}, true)).status).toBe(503);
  const bad = request();
  bad.headers.set("origin", "https://evil.example");
  expect((await handleEnquiry(bad, env, true)).status).toBe(403);
});

test("checkout derives NGN price, verifies payment and emails only signed successful webhooks", async () => {
  const originalFetch = globalThis.fetch;
  let initialized: {
    amount: number;
    reference: string;
    currency: string;
    callback_url: string;
    metadata: string;
  };
  let payment: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    customer: { email: string };
    metadata: { purpose: string; details: string; signature: string };
    domain: string;
  };
  const emails: { to: string[]; text: string; subject: string }[] = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.endsWith("/initialize")) {
      initialized = JSON.parse(String(init?.body));
      return Response.json({
        status: true,
        data: { authorization_url: "https://checkout.paystack.com/test" },
      });
    }
    if (url.includes("/verify/")) return Response.json({ status: true, data: payment });
    if (url === "https://api.resend.com/emails") {
      emails.push(JSON.parse(String(init?.body)));
      expect(new Headers(init?.headers).get("Idempotency-Key")).toContain(initialized.reference);
      return Response.json({ id: "mock-email" });
    }
    throw new Error("Unexpected network request");
  };
  try {
    const response = await handleEnquiry(request({ ...care, amount: 1 } as typeof care), env, true);
    expect(response.status).toBe(200);
    expect(initialized.amount).toBe(planPricing("Standard", "annually").total * 100);
    expect(initialized.currency).toBe("NGN");
    expect(initialized.callback_url).toBe("https://www.cyberlife.digital/care-payment");
    expect(emails).toHaveLength(0);
    payment = {
      status: "success",
      reference: initialized.reference,
      amount: initialized.amount,
      currency: "NGN",
      customer: { email: care.email },
      metadata: JSON.parse(initialized.metadata),
      domain: "test",
    };
    const verify = () =>
      handleCarePayment(
        new Request(
          `https://www.cyberlife.digital/api/care-payment?reference=${initialized.reference}`,
        ),
        env,
      );
    expect((await (await verify()).json()).testMode).toBe(true);
    payment.amount = 1;
    expect((await verify()).status).toBe(502);
    payment.amount = initialized.amount;
    payment.status = "abandoned";
    expect((await verify()).status).toBe(502);
    payment.status = "success";
    const body = JSON.stringify({ event: "charge.success", data: payment });
    const webhook = (signature: string) =>
      new Request("https://www.cyberlife.digital/api/paystack-webhook", {
        method: "POST",
        headers: { "x-paystack-signature": signature },
        body,
      });
    expect((await handlePaystackWebhook(webhook("invalid"), env)).status).toBe(401);
    expect(emails).toHaveLength(0);
    const signed = createHmac("sha512", env.PAYSTACK_SECRET_KEY).update(body).digest("hex");
    expect((await handlePaystackWebhook(webhook(signed), env)).status).toBe(200);
    expect(emails[0]?.to).toEqual(["cyberlifeng@gmail.com"]);
    expect(emails[0]?.text).toContain("Ada Obi");
    expect(emails[0]?.subject).toContain("TEST");
    payment.metadata.signature = "forged";
    expect((await verify()).status).toBe(502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
