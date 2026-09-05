import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("maintenance page is accessible on desktop and mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/website-maintenance");
  await page.screenshot({ path: "test-results/care-desktop.png", fullPage: true });
  const desktop = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(desktop.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/care-mobile.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page
    .getByRole("switch", { name: /Annual billing/ })
    .first()
    .click();
  const mobile = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(mobile.violations).toEqual([]);
});

test("Start a Project sends all selected contact methods and the requested meeting", async ({
  page,
}) => {
  await page.goto("/book");
  await page.locator("button[data-day]:not([disabled])").last().click();
  await page.getByRole("button", { name: "10:30", exact: true }).click();
  await page.getByLabel("Full name").fill("Ada Obi");
  await page.getByLabel("Work email").fill("ada@example.com");
  await page.getByLabel("Company", { exact: true }).fill("Example Ltd");
  await page.getByLabel("Project brief").fill("We would like a new business website.");
  for (const method of ["Zoom", "Google Meet", "WhatsApp", "Call"])
    await page.getByRole("checkbox", { name: method, exact: true }).check();
  await page.getByLabel("Phone / WhatsApp number").fill("+2348031975415");
  let payload: Record<string, unknown> = {};
  await page.route("**/api/enquiries", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.getByRole("button", { name: "Request meeting" }).click();
  await expect(page.getByText(/Meeting requested for/)).toBeVisible();
  expect(payload).toMatchObject({
    kind: "project",
    name: "Ada Obi",
    phone: "+2348031975415",
    contactMethods: ["Email", "Zoom", "Google Meet", "WhatsApp", "Call"],
    time: "10:30",
  });
});

test("production page hydrates under CSP and updates annual pricing and enquiry selection", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /content security|violates|hydration/i.test(message.text()))
      errors.push(message.text());
  });
  const response = await page.goto("/website-maintenance");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["content-security-policy"]).toContain("'nonce-");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Your website, cared for.");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://cyberlifedigital.com/website-maintenance",
  );
  await page
    .getByRole("switch", { name: /Annual billing/ })
    .first()
    .click();
  for (const price of [
    "₦255,000",
    "₦722,500",
    "₦1,317,500",
    "₦3,060,000",
    "₦8,670,000",
    "₦15,810,000",
  ])
    await expect(page.getByText(price, { exact: false }).first()).toBeVisible();
  await page.getByRole("button", { name: "Choose Premium" }).click();
  await expect(page.getByLabel("Your care plan")).toHaveValue("Premium");
  await expect(page.getByRole("form", { name: "Website maintenance enquiry" })).toContainText(
    "₦15,810,000",
  );
  await page
    .getByRole("switch", { name: /Annual billing/ })
    .last()
    .click();
  await expect(page.getByRole("form", { name: "Website maintenance enquiry" })).toContainText(
    "₦1,550,000",
  );
  expect(errors).toEqual([]);
});

test("maintenance form submits all selections and preserves data after a delivery error", async ({
  page,
}) => {
  await page.goto("/website-maintenance?plan=Standard&billing=annually#care-enquiry");
  await page.getByLabel("First name", { exact: true }).fill("Ada");
  await page.getByLabel("Last name", { exact: true }).fill("Obi");
  await page.getByLabel("Company email").fill("ada@example.com");
  await page.getByLabel("Website URL").fill("https://example.com");
  await page.getByLabel("CMS or website platform").selectOption("Other");
  await page.getByLabel("Which platform do you use?").fill("Custom CMS");
  await page.getByLabel("E-commerce", { exact: true }).check();
  await page.getByLabel("Blog", { exact: true }).check();
  await page
    .getByLabel("Where would you like our support?")
    .fill("Improve our checkout and keep our content updated.");
  let payload: Record<string, unknown> = {};
  await page.route("**/api/enquiries", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 502,
      json: { error: "Email delivery is unavailable. Please try again." },
    });
  });
  await page.getByRole("button", { name: "Request website care" }).click();
  await expect(page.getByRole("alert")).toContainText("Email delivery is unavailable");
  await expect(page.getByLabel("First name", { exact: true })).toHaveValue("Ada");
  expect(payload).toMatchObject({
    kind: "maintenance",
    plan: "Standard",
    billing: "annually",
    otherPlatform: "Custom CMS",
    websiteTypes: ["E-commerce", "Blog"],
  });
  await page.unroute("**/api/enquiries");
  await page.route("**/api/enquiries", (route) => route.fulfill({ json: { ok: true } }));
  await page.getByRole("button", { name: "Request website care" }).click();
  await expect(
    page.getByRole("heading", { name: "Your care request is on its way." }),
  ).toBeVisible();
});

test("mobile navigation, project contact preferences and care cards work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Website care" })
    .click();
  await expect(page).toHaveURL(/website-maintenance/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/book");
  for (const method of ["Zoom", "Google Meet", "WhatsApp", "Call"])
    await page.getByRole("checkbox", { name: method, exact: true }).check();
  for (const method of ["Email", "Zoom", "Google Meet", "WhatsApp", "Call"])
    await expect(page.getByRole("checkbox", { name: method, exact: true })).toBeChecked();
  await expect(page.getByLabel("Phone / WhatsApp number")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("public routes expose crawlable metadata, a sitemap and real 404 responses", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>https:\/\/cyberlifedigital.com([^<]*)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(urls).toContain("/website-maintenance");
  for (const path of urls) {
    const response = await request.get(path!);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('name="description"');
    expect(html).toContain('property="og:image"');
    expect(html.match(/<h1\b/g)?.length, path).toBe(1);
  }
  expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
});
