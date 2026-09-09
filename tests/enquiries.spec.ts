import { test, expect } from "@playwright/test";
import { handleEnquiry } from "../src/lib/enquiries.server";

const maintenance = {
  kind: "maintenance",
  firstName: "Ada",
  lastName: "Obi",
  email: "ada@example.com",
  phone: "+44 7700 900123",
  websiteUrl: "https://example.com",
  platform: "WordPress",
  websiteTypes: ["E-commerce", "Blog"],
  plan: "Standard",
  billing: "annually",
  brief: "Improve the checkout and update our content.",
};
let client = 0;
function request(body: unknown, options: { origin?: string; method?: string } = {}) {
  return new Request("https://cyberlifedigital.com/api/enquiries", {
    method: options.method ?? "POST",
    headers: {
      origin: options.origin ?? "https://cyberlifedigital.com",
      "content-type": "application/json",
      "cf-connecting-ip": `test-${++client}`,
    },
    ...(options.method === "GET" ? {} : { body: JSON.stringify(body) }),
  });
}

test("rejects cross-origin, invalid methods, malformed data, honeypots and oversized bodies", async () => {
  expect(
    (await handleEnquiry(request(maintenance, { origin: "https://evil.example" }), {})).status,
  ).toBe(403);
  expect((await handleEnquiry(request(maintenance, { method: "GET" }), {})).status).toBe(405);
  for (const change of [
    { email: "invalid" },
    { phone: "" },
    { phone: "---()---" },
    { websiteUrl: "javascript:alert(1)" },
    { websiteTypes: [] },
    { plan: "Forged" },
    { website: "spam" },
    { platform: "Other" },
  ]) {
    expect((await handleEnquiry(request({ ...maintenance, ...change }), {})).status).toBe(400);
  }
  expect(
    (await handleEnquiry(request({ ...maintenance, brief: "x".repeat(21000) }), {})).status,
  ).toBe(413);
});

test("derives annual price on the server and sends all fields to the fixed recipient", async () => {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = async (_url, init) => {
    sent = JSON.parse(String(init?.body));
    return Response.json({ id: "test-delivery" });
  };
  try {
    const response = await handleEnquiry(
      request({ ...maintenance, total: 1, recipient: "evil@example.com" }),
      { RESEND_API_KEY: "test-only" },
    );
    expect(response.status).toBe(200);
    expect(sent["to"]).toEqual(["cyberlifeng@gmail.com"]);
    expect(sent["reply_to"]).toBe("ada@example.com");
    expect(sent["text"]).toContain("Phone: +44 7700 900123");
    expect(sent["text"]).toContain("₦8,670,000 per year (15% discount applied)");
    expect(sent["text"]).toContain("E-commerce, Blog");
    expect(sent["text"]).toContain("WordPress");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("project delivery includes every chosen contact method and requires a phone when needed", async () => {
  const future = new Date();
  future.setDate(future.getDate() + 7);
  while ([0, 6].includes(future.getUTCDay())) future.setDate(future.getDate() + 1);
  const project = {
    kind: "project",
    name: "Ada Obi",
    company: "Example Ltd",
    email: "ada@example.com",
    service: "Website & Web App Solutions",
    date: future.toISOString().slice(0, 10),
    time: "10:30",
    contactMethods: ["Email", "Zoom", "Google Meet", "WhatsApp", "Call"],
    phone: "+2348031975415",
    brief: "We need a new business website.",
  };
  expect((await handleEnquiry(request({ ...project, phone: "" }), {})).status).toBe(400);
  const originalFetch = globalThis.fetch;
  let message = "";
  globalThis.fetch = async (_url, init) => {
    message = JSON.parse(String(init?.body)).text;
    return Response.json({ id: "test" });
  };
  try {
    expect((await handleEnquiry(request(project), { RESEND_API_KEY: "test" })).status).toBe(200);
    expect(message).toContain("Email, Zoom, Google Meet, WhatsApp, Call");
    expect(message).toContain("+2348031975415");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider failure is not reported as success and repeated submissions are limited", async () => {
  expect((await handleEnquiry(request(maintenance), { RESEND_API_KEY: "" })).status).toBe(503);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ error: "Provider error" }, { status: 500 });
  try {
    expect((await handleEnquiry(request(maintenance), { RESEND_API_KEY: "test" })).status).toBe(
      502,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
  const base = request({ ...maintenance, email: "invalid" });
  for (let i = 0; i < 5; i++) await handleEnquiry(base.clone(), {});
  expect((await handleEnquiry(base.clone(), {})).status).toBe(429);
});
