import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { visitorLocation } from "../src/lib/visitor-location.server";
import { enquirySchema } from "../src/lib/enquiry-schema";
import { enquiryMessage } from "../src/lib/enquiries.server";

test("location defaults distinguish Nigeria, overseas visitors and unknown countries", async () => {
  for (const [country, currency] of [
    ["NG", "NGN"],
    ["GB", "USD"],
    ["US", "USD"],
    ["XX", null],
    ["T1", null],
    ["", null],
  ]) {
    const response = visitorLocation(
      new Request("https://cyberlifedigital.com/api/visitor-location", {
        headers: { "cf-ipcountry": country ?? "" },
      }),
    );
    expect(await response.json()).toEqual({ currency });
    expect(response.headers.get("cache-control")).toContain("no-store");
  }
});

test("international care pricing, discounts and manual choices stay in sync", async ({ page }) => {
  await page.route("**/api/visitor-location", (route) =>
    route.fulfill({ json: { currency: "USD" } }),
  );
  await page.goto("/website-maintenance");
  await expect(page.getByLabel("Pricing currency").first()).toHaveValue("USD");
  await expect(page.getByText("US$226.93", { exact: false }).first()).toBeVisible();
  await page
    .getByRole("switch", { name: /Annual billing/ })
    .first()
    .click();
  await expect(page.getByText("US$192.89", { exact: false }).first()).toBeVisible();
  await expect(page.getByRole("form")).toContainText("US$2,314.65");
  await expect(page.getByRole("form")).toContainText("US$408.47");
  await expect(page.getByLabel("First name", { exact: true })).toHaveAttribute(
    "placeholder",
    "Your first name",
  );
  await expect(page.getByLabel("Last name", { exact: true })).toHaveAttribute(
    "placeholder",
    "Your last name",
  );
  await expect(page.getByLabel("Phone number", { exact: true })).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.getByLabel("Pricing currency").first().selectOption("NGN");
  await expect(page.getByRole("form")).toContainText("₦3,060,000");
  await page.reload();
  await expect(page.getByLabel("Pricing currency").first()).toHaveValue("NGN");
  await page.goto("/services");
  await page.getByLabel("Pricing currency").first().selectOption("USD");
  await expect(page.getByText("US$642.96", { exact: false }).first()).toBeVisible();
  await page.goto("/book");
  await expect(page.getByLabel("Phone / WhatsApp number")).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Call", exact: true })).not.toBeChecked();
});

test("timezone fallback is available when location detection fails", async ({ browser }) => {
  const context = await browser.newContext({ timezoneId: "America/New_York" });
  const page = await context.newPage();
  await page.route("**/api/visitor-location", (route) => route.abort());
  await page.goto("http://127.0.0.1:4173/website-maintenance");
  await expect(page.getByLabel("Pricing currency").first()).toHaveValue("USD");
  await context.close();
});

test("USD enquiries include the international phone and a server-derived currency estimate", () => {
  const data = enquirySchema.parse({
    kind: "maintenance",
    firstName: "Ada",
    lastName: "Obi",
    email: "ada@example.com",
    phone: "+44 7700 900123",
    websiteUrl: "https://example.com",
    platform: "WordPress",
    websiteTypes: ["Blog"],
    plan: "Standard",
    billing: "annually",
    currency: "USD",
    brief: "Improve the website performance.",
    usdAmount: 1,
  });
  const message = enquiryMessage(data);
  expect(message).toContain("Phone: +44 7700 900123");
  expect(message).toContain("Preferred currency: USD");
  expect(message).toContain("US$6,558.18 per year");
  expect(message).toContain("₦8,670,000");
});
