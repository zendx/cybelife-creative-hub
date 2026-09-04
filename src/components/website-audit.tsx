import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileSearch,
  Gauge,
  Globe2,
  LoaderCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TriangleAlert,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  runSiteScan,
  type SiteScanCategory,
  type SiteScanReport,
  type SiteScanStatus,
} from "@/lib/site-scan.functions";

type CategoryKey = "performance" | "accessibility" | "best-practices" | "seo";

interface LighthouseCategory {
  title?: string;
  score?: number | null;
}

interface LighthouseAudit {
  id?: string;
  title?: string;
  description?: string;
  score?: number | null;
  displayValue?: string;
  numericValue?: number;
  numericUnit?: string;
  details?: {
    type?: string;
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
  };
}

interface PageSpeedResponse {
  id?: string;
  analysisUTCTimestamp?: string;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
  lighthouseResult?: {
    requestedUrl?: string;
    finalUrl?: string;
    fetchTime?: string;
    lighthouseVersion?: string;
    runtimeError?: {
      code?: string;
      message?: string;
    };
    categories?: Partial<Record<CategoryKey, LighthouseCategory>>;
    audits?: Record<string, LighthouseAudit | undefined>;
  };
}

interface AuditScore {
  key: CategoryKey;
  label: string;
  score: number | null;
}

interface AuditMetric {
  id: string;
  label: string;
  value: string;
  score: number | null;
}

interface AuditOpportunity {
  id: string;
  title: string;
  description: string;
  savings: string | null;
  savingsMs: number;
  savingsBytes: number;
}

interface AuditReport {
  requestedUrl: string;
  finalUrl: string;
  fetchedAt: string | null;
  lighthouseVersion: string | null;
  scores: AuditScore[];
  metrics: AuditMetric[];
  opportunities: AuditOpportunity[];
}

interface AuditError {
  title: string;
  message: string;
}

const categoryDefinitions: ReadonlyArray<{ key: CategoryKey; label: string }> = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best-practices", label: "Best practices" },
  { key: "seo", label: "SEO" },
];

const metricDefinitions = [
  { id: "first-contentful-paint", label: "First Contentful Paint" },
  { id: "largest-contentful-paint", label: "Largest Contentful Paint" },
  { id: "total-blocking-time", label: "Total Blocking Time" },
  { id: "cumulative-layout-shift", label: "Cumulative Layout Shift" },
  { id: "speed-index", label: "Speed Index" },
  { id: "interaction-to-next-paint", label: "Interaction to Next Paint" },
] as const;

const loadingStages = [
  {
    title: "Checking the address",
    detail: "Making sure the website URL is ready for a public test.",
  },
  {
    title: "Connecting to Lighthouse",
    detail: "Requesting a fresh mobile analysis from Google PageSpeed Insights.",
  },
  {
    title: "Running the mobile test",
    detail: "Lighthouse is loading the page and evaluating its experience.",
  },
  {
    title: "Preparing your report",
    detail: "The test is still running. Complex websites can take a little longer.",
  },
] as const;

const resultBenefits = [
  {
    icon: Gauge,
    title: "Lighthouse when available",
    body: "See Google's mobile performance, accessibility, best practices and SEO scores.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first conditions",
    body: "The test uses Google's mobile strategy—the experience most likely to expose friction.",
  },
  {
    icon: Sparkles,
    title: "An honest fallback",
    body: "If Lighthouse is busy, we inspect live HTML and headers without inventing a speed score.",
  },
] as const;

class AuditRequestError extends Error {
  title: string;

  constructor(title: string, message: string) {
    super(message);
    this.name = "AuditRequestError";
    this.title = title;
  }
}

function isPrivateOrLocalHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  if (host === "localhost" || host === "::1" || host.endsWith(".local")) return true;

  const parts = host.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) return false;

  const [first, second] = parts;
  if (first === undefined || second === undefined) return false;

  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

function normalizeWebsiteUrl(value: string) {
  let candidate = value.trim();

  if (!candidate) {
    throw new Error("Enter the address of the website you want to audit.");
  }

  if (candidate.length > 2048) {
    throw new Error("That website address is too long. Enter a URL under 2,048 characters.");
  }

  if (!/^[a-z][a-z\d+.-]*:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error("Enter a valid website address, such as example.com.");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only public HTTP or HTTPS website addresses can be audited.");
  }

  if (!parsed.hostname || parsed.username || parsed.password) {
    throw new Error("Enter a public website address without login details.");
  }

  if (
    isPrivateOrLocalHost(parsed.hostname) ||
    (!parsed.hostname.includes(".") && !parsed.hostname.includes(":"))
  ) {
    throw new Error("Google Lighthouse can only audit websites that are publicly available.");
  }

  parsed.hash = "";
  return parsed.toString();
}

function formatMetricValue(audit: LighthouseAudit) {
  if (audit.displayValue?.trim()) return audit.displayValue.trim();
  if (typeof audit.numericValue !== "number" || !Number.isFinite(audit.numericValue)) return null;

  if (audit.numericUnit === "millisecond") {
    return audit.numericValue >= 1000
      ? `${(audit.numericValue / 1000).toFixed(1)} s`
      : `${Math.round(audit.numericValue)} ms`;
  }

  if (audit.numericUnit === "unitless") return audit.numericValue.toFixed(3);
  return String(Math.round(audit.numericValue * 100) / 100);
}

function formatBytes(bytes: number) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${Math.round(bytes / 1_000)} KB`;
  return `${Math.round(bytes)} B`;
}

function formatSavings(audit: LighthouseAudit) {
  const milliseconds = audit.details?.overallSavingsMs ?? 0;
  const bytes = audit.details?.overallSavingsBytes ?? 0;

  if (milliseconds > 0) {
    return milliseconds >= 1000
      ? `Up to ${(milliseconds / 1000).toFixed(1)} s estimated savings`
      : `Up to ${Math.round(milliseconds)} ms estimated savings`;
  }

  if (bytes > 0) return `Up to ${formatBytes(bytes)} estimated savings`;
  return audit.displayValue?.trim() || null;
}

function cleanLighthouseDescription(value?: string) {
  if (!value) return "Open the source report for technical details about this recommendation.";

  return value
    .replace(/\[([^\]]+)]\([^\s)]+(?:\s+"[^"]*")?\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function toAuditReport(payload: PageSpeedResponse, fallbackUrl: string): AuditReport {
  if (payload.error) {
    throw new AuditRequestError(
      payload.error.code === 429 ? "The audit service is busy" : "The audit could not run",
      payload.error.code === 429
        ? "Google's public PageSpeed quota is temporarily busy. Please try again shortly or book a review with our team."
        : payload.error.message ||
            "Google PageSpeed Insights did not return a report for this URL.",
    );
  }

  const lighthouse = payload.lighthouseResult;
  if (!lighthouse) {
    throw new AuditRequestError(
      "No Lighthouse report was returned",
      "The website may be blocking automated tests, unavailable, or taking too long to respond.",
    );
  }

  if (lighthouse.runtimeError) {
    throw new AuditRequestError(
      "Lighthouse could not load this website",
      lighthouse.runtimeError.message ||
        "The page did not become available to Google's test runner. Check that it is public and try again.",
    );
  }

  const scores = categoryDefinitions.map(({ key, label }) => {
    const value = lighthouse.categories?.[key]?.score;
    return {
      key,
      label,
      score: typeof value === "number" && Number.isFinite(value) ? value : null,
    };
  });

  if (scores.every((item) => item.score === null)) {
    throw new AuditRequestError(
      "The report was incomplete",
      "Google returned a response but no category scores. Please wait a moment and run the audit again.",
    );
  }

  const audits = lighthouse.audits ?? {};
  const metrics = metricDefinitions.flatMap(({ id, label }) => {
    const audit = audits[id];
    if (!audit) return [];

    const value = formatMetricValue(audit);
    if (!value) return [];

    return [
      {
        id,
        label,
        value,
        score: typeof audit.score === "number" && Number.isFinite(audit.score) ? audit.score : null,
      },
    ];
  });

  const opportunities = Object.entries(audits)
    .flatMap(([id, audit]) => {
      if (!audit || audit.details?.type !== "opportunity") return [];

      const savingsMs = audit.details.overallSavingsMs ?? 0;
      const savingsBytes = audit.details.overallSavingsBytes ?? 0;
      const score = audit.score;
      const isActionable =
        savingsMs > 0 || savingsBytes > 0 || (typeof score === "number" && score < 0.9);
      if (!isActionable) return [];

      return [
        {
          id,
          title: audit.title || "Lighthouse opportunity",
          description: cleanLighthouseDescription(audit.description),
          savings: formatSavings(audit),
          savingsMs,
          savingsBytes,
        },
      ];
    })
    .sort((a, b) => b.savingsMs - a.savingsMs || b.savingsBytes - a.savingsBytes)
    .slice(0, 6);

  return {
    requestedUrl: lighthouse.requestedUrl || fallbackUrl,
    finalUrl: lighthouse.finalUrl || payload.id || fallbackUrl,
    fetchedAt: lighthouse.fetchTime || payload.analysisUTCTimestamp || null,
    lighthouseVersion: lighthouse.lighthouseVersion || null,
    scores,
    metrics,
    opportunities,
  };
}

async function requestPageSpeedAudit(websiteUrl: string, signal: AbortSignal) {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", websiteUrl);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.append("category", "performance");
  endpoint.searchParams.append("category", "accessibility");
  endpoint.searchParams.append("category", "best-practices");
  endpoint.searchParams.append("category", "seo");

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new AuditRequestError(
      "We could not reach the audit service",
      "Your browser could not connect to Google PageSpeed Insights. A network rule or browser privacy setting may be blocking the request. Try again, or book a manual review.",
    );
  }

  let payload: PageSpeedResponse | null = null;
  try {
    payload = (await response.json()) as PageSpeedResponse;
  } catch {
    // The status-specific message below is more useful than a JSON parsing error.
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new AuditRequestError(
        "The audit service is busy",
        "Google's public PageSpeed quota is temporarily busy. Please try again shortly or book a review with our team.",
      );
    }

    if (response.status === 400) {
      throw new AuditRequestError(
        "Google could not test this address",
        payload?.error?.message ||
          "Check that the website is public, uses a valid address, and does not require a login.",
      );
    }

    throw new AuditRequestError(
      "The audit service did not respond",
      payload?.error?.message ||
        `Google PageSpeed Insights returned an error (${response.status}). Please try again shortly.`,
    );
  }

  if (!payload) {
    throw new AuditRequestError(
      "The report could not be read",
      "Google returned an unexpected response. No scores have been shown; please try the audit again.",
    );
  }

  return toAuditReport(payload, websiteUrl);
}

function getScoreTone(score: number | null) {
  if (score === null) {
    return {
      label: "Not returned",
      text: "text-muted-foreground",
      stroke: "stroke-muted-foreground/50",
      dot: "bg-muted-foreground/50",
      surface: "bg-muted/40",
    };
  }

  if (score >= 0.9) {
    return {
      label: "Good",
      text: "text-emerald-700",
      stroke: "stroke-emerald-500",
      dot: "bg-emerald-500",
      surface: "bg-emerald-500/10",
    };
  }

  if (score >= 0.5) {
    return {
      label: "Needs work",
      text: "text-amber-700",
      stroke: "stroke-amber-500",
      dot: "bg-amber-500",
      surface: "bg-amber-500/10",
    };
  }

  return {
    label: "Poor",
    text: "text-red-600",
    stroke: "stroke-red-500",
    dot: "bg-red-500",
    surface: "bg-red-500/10",
  };
}

function ScoreCard({ item }: { item: AuditScore }) {
  const tone = getScoreTone(item.score);
  const percentage = item.score === null ? null : Math.round(item.score * 100);
  const circumference = 2 * Math.PI * 38;
  const offset = percentage === null ? circumference : circumference * (1 - percentage / 100);

  return (
    <article className="rounded-[1.5rem] border border-border bg-background/55 p-5">
      <div
        className="relative size-24"
        role="img"
        aria-label={`${item.label}: ${percentage === null ? "score not returned" : `${percentage} out of 100, ${tone.label}`}`}
      >
        <svg aria-hidden="true" viewBox="0 0 96 96" className="size-24 -rotate-90">
          <circle cx="48" cy="48" r="38" fill="none" className="stroke-border" strokeWidth="7" />
          <circle
            cx="48"
            cy="48"
            r="38"
            fill="none"
            strokeLinecap="round"
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${tone.stroke} transition-[stroke-dashoffset] duration-700`}
          />
        </svg>
        <span
          className={`absolute inset-0 grid place-items-center font-display text-2xl font-semibold ${tone.text}`}
        >
          {percentage ?? "—"}
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold">{item.label}</h3>
      <p className={`mt-1 text-xs font-medium ${tone.text}`}>{tone.label}</p>
    </article>
  );
}

function MetricCard({ metric }: { metric: AuditMetric }) {
  const tone = getScoreTone(metric.score);

  return (
    <article className="rounded-2xl border border-border bg-surface/35 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[13rem] text-sm leading-snug text-muted-foreground">{metric.label}</p>
        <span aria-hidden="true" className={`mt-1 size-2.5 shrink-0 rounded-full ${tone.surface}`}>
          <span className={`block size-2.5 rounded-full ${tone.dot}`} />
        </span>
      </div>
      <p className="mt-4 font-display text-2xl font-semibold tracking-tight">{metric.value}</p>
      {metric.score !== null && <p className={`mt-1 text-xs ${tone.text}`}>{tone.label}</p>}
    </article>
  );
}

function LoadingState({ stage, mode }: { stage: number; mode: "lighthouse" | "foundation" }) {
  const current =
    mode === "foundation"
      ? {
          title: "Running a live foundation scan",
          detail:
            "Google's lab service is busy, so we are checking the public page and its response headers instead.",
        }
      : (loadingStages[stage] ?? loadingStages[3]);

  return (
    <div
      className="rounded-[2rem] border border-brand-soft/25 bg-card p-7 shadow-elevated md:p-10"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div className="relative grid size-20 shrink-0 place-items-center rounded-3xl bg-primary/15">
          <span className="absolute inset-2 animate-ping rounded-2xl border border-brand-soft/30 motion-reduce:animate-none" />
          <LoaderCircle
            aria-hidden="true"
            className="size-8 animate-spin text-brand-soft motion-reduce:animate-none"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="eyebrow">
            {mode === "foundation" ? "Reliable fallback in progress" : "Live audit in progress"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{current.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.detail}</p>
        </div>
      </div>

      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full gradient-brand transition-[width] duration-700"
          style={{
            width: mode === "foundation" ? "88%" : `${((stage + 1) / loadingStages.length) * 100}%`,
          }}
          role="progressbar"
          aria-label="Audit progress"
          aria-valuemin={1}
          aria-valuemax={loadingStages.length}
          aria-valuenow={mode === "foundation" ? 3.5 : stage + 1}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock3 aria-hidden="true" className="size-3.5" />
        {mode === "foundation"
          ? "This scan checks live HTML and headers; it will not invent a speed score."
          : "Fresh Lighthouse tests commonly take 30–60 seconds."}
      </div>
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: AuditError; onRetry: () => void }) {
  return (
    <div
      className="rounded-[2rem] border border-signal/35 bg-signal/5 p-7 md:p-10"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-signal/15 text-red-600">
        <TriangleAlert aria-hidden="true" className="size-6" />
      </div>
      <p className="eyebrow mt-6 text-red-600">No scores were generated</p>
      <h2 className="mt-3 text-2xl font-semibold">{error.title}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{error.message}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        We never replace missing audit data with estimates. You can retry the live test or ask our
        team to review the site manually.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button type="button" variant="quiet" size="lg" onClick={onRetry}>
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
        <Button asChild variant="signal" size="lg">
          <Link to="/book">
            Book a manual review
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function AuditResults({ report, onReset }: { report: AuditReport; onReset: () => void }) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const sourceUrl = new URL("https://pagespeed.web.dev/analysis");
  sourceUrl.searchParams.set("url", report.finalUrl);
  sourceUrl.searchParams.set("form_factor", "mobile");

  useEffect(() => {
    resultsRef.current?.focus();
  }, []);

  return (
    <div
      ref={resultsRef}
      tabIndex={-1}
      className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-700 outline-none motion-reduce:animate-none"
    >
      <section className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
        <div className="border-b border-border bg-surface/30 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                <CheckCircle2 aria-hidden="true" className="size-4" />
                Live report received
              </div>
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                Your mobile Lighthouse scores
              </h2>
              <a
                href={report.finalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex max-w-full items-center gap-2 truncate text-sm text-brand-soft hover:text-foreground"
              >
                <Globe2 aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{report.finalUrl}</span>
                <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            </div>
            <Button type="button" variant="quiet" onClick={onReset}>
              <RotateCcw aria-hidden="true" />
              Audit another site
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6 lg:grid-cols-4 lg:p-8">
          {report.scores.map((item) => (
            <ScoreCard key={item.key} item={item} />
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-border px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            Mobile lab data
            {report.fetchedAt ? ` · ${new Date(report.fetchedAt).toLocaleString()}` : ""}
            {report.lighthouseVersion ? ` · Lighthouse ${report.lighthouseVersion}` : ""}
          </p>
          <a
            href={sourceUrl.toString()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-brand-soft transition-colors hover:text-foreground"
          >
            Open in PageSpeed Insights
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </section>

      {report.metrics.length > 0 && (
        <section
          className="rounded-[2rem] border border-border bg-card p-6 md:p-8"
          aria-labelledby="audit-metrics-title"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-brand-soft">
              <Zap aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="eyebrow">Lab metrics</p>
              <h2 id="audit-metrics-title" className="mt-1 text-xl font-semibold">
                How the page behaved in this test
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {report.metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>
      )}

      <section
        className="rounded-[2rem] border border-border bg-card p-6 md:p-8"
        aria-labelledby="audit-opportunities-title"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Priority fixes</p>
            <h2 id="audit-opportunities-title" className="mt-2 text-2xl font-semibold">
              What Lighthouse recommends next
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
            Estimated savings are supplied by Lighthouse and may vary between visits, devices and
            network conditions.
          </p>
        </div>

        {report.opportunities.length > 0 ? (
          <ol className="mt-7 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background/45">
            {report.opportunities.map((opportunity, index) => (
              <li
                key={opportunity.id}
                className="grid gap-4 p-5 md:grid-cols-[3rem_1fr_auto] md:p-6"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-primary/15 font-display text-sm text-brand-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{opportunity.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {opportunity.description}
                  </p>
                </div>
                {opportunity.savings && (
                  <p className="h-fit rounded-full bg-signal/10 px-3 py-1.5 text-xs font-medium text-red-700 md:whitespace-nowrap">
                    {opportunity.savings}
                  </p>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-7 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-emerald-600"
              />
              <div>
                <h3 className="font-semibold">No scored performance opportunities were returned</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  That is what this Lighthouse response reported; it does not guarantee the site has
                  no usability, conversion, content or technical issues.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-brand-soft/25 bg-primary/10 p-7 md:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-72 rounded-full bg-signal/10 blur-3xl"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">Scores explain what. We find why.</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold md:text-3xl">
              Turn this report into a faster, easier-to-find website.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Book a practical review with Cyberlife Digital. We will connect the technical findings
              to search visibility, customer journeys and the changes most likely to move the
              business.
            </p>
          </div>
          <Button asChild variant="signal" size="xl">
            <Link to="/book">
              Review this with our team
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

const scanCategories: SiteScanCategory[] = [
  "Search",
  "Accessibility",
  "Technical",
  "Trust & security",
];

const scanStatusDetails: Record<
  SiteScanStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    iconClass: string;
    surfaceClass: string;
  }
> = {
  pass: {
    label: "Passed",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    surfaceClass: "border-emerald-500/20 bg-emerald-500/5",
  },
  warning: {
    label: "Review",
    icon: CircleAlert,
    iconClass: "text-amber-600",
    surfaceClass: "border-amber-500/20 bg-amber-500/5",
  },
  fail: {
    label: "Fix",
    icon: XCircle,
    iconClass: "text-red-600",
    surfaceClass: "border-red-500/20 bg-red-500/5",
  },
};

function FoundationScanResults({
  report,
  onReset,
}: {
  report: SiteScanReport;
  onReset: () => void;
}) {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resultsRef.current?.focus();
  }, []);

  return (
    <div
      ref={resultsRef}
      tabIndex={-1}
      className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-700 outline-none motion-reduce:animate-none"
    >
      <section className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
        <div className="border-b border-border bg-surface/30 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                <CheckCircle2 aria-hidden="true" className="size-4" />
                Live page scan complete
              </div>
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                Your website foundation report
              </h2>
              <a
                href={report.finalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex max-w-full items-center gap-2 truncate text-sm text-brand-soft hover:text-foreground"
              >
                <Globe2 aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{report.finalUrl}</span>
                <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            </div>
            <Button type="button" variant="quiet" onClick={onReset}>
              <RotateCcw aria-hidden="true" />
              Audit another site
            </Button>
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-6 lg:p-8">
          {(["pass", "warning", "fail"] as const).map((status) => {
            const details = scanStatusDetails[status];
            const Icon = details.icon;

            return (
              <article
                key={status}
                className={`rounded-[1.5rem] border p-5 ${details.surfaceClass}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon aria-hidden="true" className={`size-5 ${details.iconClass}`} />
                  <span className={`text-xs font-medium ${details.iconClass}`}>
                    {details.label}
                  </span>
                </div>
                <p className="mt-7 font-display text-4xl font-semibold tracking-tight">
                  {report.summary[status]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {status === "pass"
                    ? "checks passed"
                    : status === "warning"
                      ? "items to review"
                      : "issues to fix"}
                </p>
              </article>
            );
          })}
        </div>

        <div className="border-t border-border px-6 py-5 text-xs leading-relaxed text-muted-foreground lg:px-8">
          Google Lighthouse was unavailable, so this report uses a live read of the page HTML and
          response headers. It does not estimate loading speed or invent a performance score.
        </div>
      </section>

      <section
        className="rounded-[2rem] border border-border bg-card p-6 md:p-8"
        aria-labelledby="foundation-findings-title"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">What the live page revealed</p>
            <h2 id="foundation-findings-title" className="mt-2 text-2xl font-semibold">
              Foundation checks by area
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
            HTTP {report.httpStatus} · {Math.max(1, Math.round(report.htmlBytes / 1024))} KB HTML ·{" "}
            {new Date(report.fetchedAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {scanCategories.map((category) => {
            const checks = report.checks.filter((item) => item.category === category);

            return (
              <article
                key={category}
                className="overflow-hidden rounded-3xl border border-border bg-background/45"
              >
                <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-brand-soft">
                    <FileSearch aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="font-semibold">{category}</h3>
                </div>
                <ul className="divide-y divide-border">
                  {checks.map((item) => {
                    const details = scanStatusDetails[item.status];
                    const Icon = details.icon;

                    return (
                      <li key={item.id} className="flex gap-3 p-5">
                        <Icon
                          aria-hidden="true"
                          className={`mt-0.5 size-5 shrink-0 ${details.iconClass}`}
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <h4 className="text-sm font-semibold">{item.label}</h4>
                            <span
                              className={`text-[0.68rem] font-semibold uppercase ${details.iconClass}`}
                            >
                              {details.label}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {item.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-brand-soft/25 bg-primary/10 p-7 md:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-72 rounded-full bg-signal/10 blur-3xl"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">A useful signal, then a clear plan.</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold md:text-3xl">
              Let us turn these findings into business improvements.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              We can pair this technical snapshot with a human review of speed, search visibility,
              messaging and conversion paths.
            </p>
          </div>
          <Button asChild variant="signal" size="xl">
            <Link to="/book">
              Review this with our team
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export function WebsiteAudit() {
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();
  const siteScan = useServerFn(runSiteScan);
  const controllerRef = useRef<AbortController | null>(null);
  const activeRunRef = useRef(0);
  const mountedRef = useRef(true);
  const [website, setWebsite] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<AuditError | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [siteScanReport, setSiteScanReport] = useState<SiteScanReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingMode, setLoadingMode] = useState<"lighthouse" | "foundation">("lighthouse");

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      activeRunRef.current += 1;
      controllerRef.current?.abort();
    };
  }, []);

  async function runAudit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    let normalizedUrl: string;
    try {
      normalizedUrl = normalizeWebsiteUrl(website);
    } catch (error) {
      setFieldError(
        error instanceof Error ? error.message : "Enter a valid public website address.",
      );
      return;
    }

    const runId = activeRunRef.current + 1;
    activeRunRef.current = runId;
    const isCurrentRun = () => mountedRef.current && activeRunRef.current === runId;

    setWebsite(normalizedUrl);
    setFieldError(null);
    setRequestError(null);
    setReport(null);
    setSiteScanReport(null);
    setLoading(true);
    setLoadingStage(0);
    setLoadingMode("lighthouse");

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const stageTimers = [
      window.setTimeout(() => setLoadingStage(1), 500),
      window.setTimeout(() => setLoadingStage(2), 2_000),
      window.setTimeout(() => setLoadingStage(3), 12_000),
    ];
    const timeout = window.setTimeout(() => controller.abort(), 75_000);

    try {
      const nextReport = await requestPageSpeedAudit(normalizedUrl, controller.signal);
      if (isCurrentRun()) setReport(nextReport);
    } catch (error) {
      if (!isCurrentRun()) return;

      const lighthouseIssue =
        error instanceof DOMException && error.name === "AbortError"
          ? "Google did not finish the Lighthouse test within 75 seconds."
          : error instanceof AuditRequestError
            ? error.message
            : "Google's live Lighthouse test could not be completed.";

      stageTimers.forEach(window.clearTimeout);
      window.clearTimeout(timeout);
      setLoadingMode("foundation");
      setLoadingStage(3);

      try {
        const nextSiteScan = await siteScan({ data: { url: normalizedUrl } });
        if (isCurrentRun()) setSiteScanReport(nextSiteScan);
      } catch (scanError) {
        if (!isCurrentRun()) return;

        const scanDetail =
          scanError instanceof Error && scanError.message
            ? ` The backup scan reported: ${scanError.message}`
            : " The backup scan could not read the public page.";
        setRequestError({
          title: "We could not complete either live check",
          message: `${lighthouseIssue}${scanDetail} Check that the page is public, then try again or book a manual review.`,
        });
      }
    } finally {
      stageTimers.forEach(window.clearTimeout);
      window.clearTimeout(timeout);
      if (isCurrentRun()) setLoading(false);
    }
  }

  function resetAudit() {
    activeRunRef.current += 1;
    controllerRef.current?.abort();
    setLoading(false);
    setReport(null);
    setSiteScanReport(null);
    setRequestError(null);
    setFieldError(null);
    window.requestAnimationFrame(() => document.getElementById(inputId)?.focus());
  }

  return (
    <div className="space-y-8">
      {!report && !siteScanReport && !loading && !requestError && (
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="relative overflow-hidden rounded-[2rem] border border-brand-soft/25 bg-card p-6 shadow-elevated sm:p-8 md:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 size-80 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 left-1/4 size-72 rounded-full bg-signal/10 blur-3xl"
            />
            <div className="relative">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-brand-soft">
                <Search aria-hidden="true" className="size-6" />
              </div>
              <h2 className="mt-7 max-w-2xl text-2xl font-semibold md:text-3xl">
                Run a free website health check
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Enter any public page. We will try a fresh mobile Lighthouse report first, then use
                our live foundation scan if Google's service is busy.
              </p>

              <form className="mt-8" onSubmit={runAudit} noValidate>
                <label htmlFor={inputId} className="font-display text-sm font-medium">
                  Website address
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Globe2
                      aria-hidden="true"
                      className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id={inputId}
                      name="website"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      spellCheck={false}
                      maxLength={2048}
                      value={website}
                      onChange={(event) => {
                        setWebsite(event.target.value);
                        if (fieldError) setFieldError(null);
                      }}
                      placeholder="yourbusiness.com"
                      aria-describedby={`${hintId}${fieldError ? ` ${errorId}` : ""}`}
                      aria-invalid={Boolean(fieldError)}
                      className="h-14 w-full rounded-2xl border border-input bg-background/70 pl-12 pr-4 text-base text-foreground outline-none transition focus:border-brand-soft/70 focus:ring-2 focus:ring-brand-soft/20 aria-[invalid=true]:border-signal"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="signal"
                    size="xl"
                    className="h-14 rounded-2xl sm:px-7"
                  >
                    Audit my website
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
                <p id={hintId} className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  No protocol needed—we will add HTTPS. The URL is used only to run this one-time
                  public website check.
                </p>
                {fieldError && (
                  <p
                    id={errorId}
                    role="alert"
                    className="mt-3 flex items-start gap-2 text-sm text-red-600"
                  >
                    <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    {fieldError}
                  </p>
                )}
              </form>
            </div>
          </section>

          <aside
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
            aria-label="What the audit includes"
          >
            {resultBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-border bg-surface/35 p-5 md:p-6"
                >
                  <Icon aria-hidden="true" className="size-5 text-brand-soft" />
                  <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              );
            })}
          </aside>
        </div>
      )}

      {loading && <LoadingState stage={loadingStage} mode={loadingMode} />}
      {requestError && <ErrorState error={requestError} onRetry={resetAudit} />}
      {report && <AuditResults report={report} onReset={resetAudit} />}
      {siteScanReport && <FoundationScanResults report={siteScanReport} onReset={resetAudit} />}

      {!report && !siteScanReport && (
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/20 p-5 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-2xl items-start gap-2">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-soft" />
            Automated tools cannot assess positioning, conversion strategy or every accessibility
            issue. Treat this as a useful technical signal, not a complete professional audit.
          </p>
          <Link
            to="/book"
            className="inline-flex shrink-0 items-center gap-1.5 font-medium text-brand-soft hover:text-foreground"
          >
            Prefer a human review?
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
