import { test, expect } from "@playwright/test";
import { handlePageSpeed } from "../src/lib/pagespeed.server";

const request = (url = "https://example.com") =>
  new Request("https://www.cyberlife.digital/api/pagespeed", {
    method: "POST",
    headers: { origin: "https://www.cyberlife.digital", "content-type": "application/json" },
    body: JSON.stringify({ url }),
  });

test("speed endpoint validates requests and explains missing configuration", async () => {
  expect((await handlePageSpeed(request("file:///etc/passwd"), {})).status).toBe(400);
  const foreign = request();
  foreign.headers.set("origin", "https://other.example");
  expect((await handlePageSpeed(foreign, {})).status).toBe(403);
  const response = await handlePageSpeed(request(), { PAGESPEED_API_KEY: "" });
  expect(response.status).toBe(503);
  expect((await response.json()).error.message).toContain("not configured");
});

test("speed endpoint uses private key and returns measured Lighthouse results", async () => {
  const originalFetch = globalThis.fetch;
  const payload = { lighthouseResult: { categories: { performance: { score: 0.83 } } } };
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    expect(url.hostname).toBe("www.googleapis.com");
    expect(url.searchParams.get("key")).toBe("test-secret");
    expect(url.searchParams.get("url")).toBe("https://example.com/");
    expect(url.searchParams.getAll("category")).toHaveLength(4);
    return Response.json(payload);
  };
  try {
    const response = await handlePageSpeed(request(), { PAGESPEED_API_KEY: "test-secret" });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(payload);
    expect(response.headers.get("cache-control")).toBe("no-store");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("quota and network failures are actionable and do not disclose upstream secrets", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      Response.json({ error: { message: "private-project-details" } }, { status: 429 });
    let response = await handlePageSpeed(request(), { PAGESPEED_API_KEY: "test-secret" });
    expect(response.status).toBe(503);
    const text = await response.text();
    expect(text).toContain("quota");
    expect(text).not.toContain("private-project-details");
    globalThis.fetch = async () => {
      throw new Error("test-secret");
    };
    response = await handlePageSpeed(request(), { PAGESPEED_API_KEY: "test-secret" });
    expect(response.status).toBe(504);
    expect(await response.text()).not.toContain("test-secret");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("audit displays the measured Lighthouse scores", async ({ page }) => {
  await page.route("**/api/pagespeed", (route) =>
    route.fulfill({
      json: {
        lighthouseResult: {
          finalUrl: "https://example.com/",
          categories: {
            performance: { score: 0.83 },
            accessibility: { score: 0.9 },
            seo: { score: 0.95 },
            "best-practices": { score: 1 },
          },
          audits: {
            "server-response-time": {
              title: "Initial server response time was short",
              score: 1,
              details: { type: "opportunity", overallSavingsMs: 100 },
            },
            "unused-javascript": {
              title: "Reduce unused JavaScript",
              score: 0.5,
              details: { type: "opportunity", overallSavingsBytes: 25000 },
            },
          },
        },
      },
    }),
  );
  await page.goto("/audit");
  await page.getByRole("textbox").first().fill("https://example.com");
  await page.getByRole("button", { name: "Audit my website", exact: true }).click();
  await expect(page.getByText("83", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Initial server response time was short", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByText("Reduce unused JavaScript", { exact: true })).toBeVisible();
  await expect(page.getByText("Speed test not completed", { exact: true })).toHaveCount(0);
});

test("failed speed tests explain the reason and provide actionable page checks", async ({
  page,
}) => {
  await page.route("**/api/pagespeed", (route) =>
    route.fulfill({
      status: 503,
      json: { error: { message: "The speed test quota has been reached." } },
    }),
  );
  await page.goto("/audit");
  await page.getByRole("textbox").first().fill("https://example.com");
  await page.getByRole("button", { name: "Audit my website", exact: true }).click();
  await expect(page.getByText("Speed test not completed", { exact: true })).toBeVisible({
    timeout: 25000,
  });
  await expect(
    page.getByText("The speed test quota has been reached.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Next step:", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Test speed with Google PageSpeed Insights" }),
  ).toHaveAttribute("href", "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fexample.com%2F");
});
