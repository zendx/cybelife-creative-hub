import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BillingSwitch } from "@/components/care-plans";
import { maintenancePlans } from "@/data/site";
import { platforms, websiteTypes } from "@/lib/enquiry-schema";
import { formatNaira, planPricing, type BillingCycle, type PlanName } from "@/lib/maintenance";
import { submitEnquiry } from "@/lib/submit-enquiry";

const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function MaintenanceForm({
  plan,
  billing,
  onPlanChange,
  onBillingChange,
}: {
  plan: PlanName;
  billing: BillingCycle;
  onPlanChange: (plan: PlanName) => void;
  onBillingChange: (cycle: BillingCycle) => void;
}) {
  const [platform, setPlatform] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const pricing = planPricing(plan, billing);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      await submitEnquiry({
        ...Object.fromEntries(form),
        kind: "maintenance",
        plan,
        billing,
        platform,
        websiteTypes: types,
      });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Please try again or email cyberlifeng@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent)
    return (
      <div role="status" className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
        <CheckCircle2 className="size-8 text-primary" />
        <h3 className="mt-4 text-2xl font-bold">Your care request is on its way.</h3>
        <p className="mt-3 leading-7 text-muted-foreground">
          Thank you. Our team will review your website and contact you at the company email you
          provided to discuss your priorities and next steps.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-8" aria-label="Website maintenance enquiry">
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset disabled={submitting} className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="care-first-name">First name</Label>
            <Input
              id="care-first-name"
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={150}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="care-last-name">Last name</Label>
            <Input
              id="care-last-name"
              name="lastName"
              autoComplete="family-name"
              required
              maxLength={150}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="care-email">Company email</Label>
            <Input
              id="care-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              maxLength={254}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="care-url">Website URL</Label>
            <Input
              id="care-url"
              name="websiteUrl"
              type="url"
              autoComplete="url"
              placeholder="https://yourwebsite.com"
              required
              maxLength={2048}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="care-platform">CMS or website platform</Label>
            <select
              id="care-platform"
              name="platform"
              required
              className={selectClass}
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            >
              <option value="" disabled>
                Select your platform
              </option>
              {platforms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          {platform === "Other" && (
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="care-other-platform">Which platform do you use?</Label>
              <Input id="care-other-platform" name="otherPlatform" required maxLength={150} />
            </div>
          )}
        </div>
        <fieldset>
          <legend className="text-sm font-semibold">What type of website do you have?</legend>
          <p id="care-types-help" className="mt-2 text-sm text-muted-foreground">
            Select all that apply.
          </p>
          <div
            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
            aria-describedby="care-types-help"
          >
            {websiteTypes.map((type) => (
              <label
                key={type}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm ${types.includes(type) ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <input
                  className="size-4 accent-primary"
                  type="checkbox"
                  name="websiteTypes"
                  value={type}
                  checked={types.includes(type)}
                  onChange={(event) =>
                    setTypes((current) =>
                      event.target.checked
                        ? [...current, type]
                        : current.filter((item) => item !== type),
                    )
                  }
                />
                {type}
              </label>
            ))}
          </div>
          {types.includes("Other") && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="care-other-type">Describe your website type</Label>
              <Input id="care-other-type" name="otherWebsiteType" required maxLength={150} />
            </div>
          )}
        </fieldset>
        <div className="space-y-5 rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="care-plan">Your care plan</Label>
            <select
              id="care-plan"
              name="plan"
              className={selectClass}
              value={plan}
              onChange={(event) => onPlanChange(event.target.value as PlanName)}
            >
              {maintenancePlans.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <BillingSwitch value={billing} onChange={onBillingChange} />
          <div aria-live="polite" aria-atomic="true" className="border-t border-border pt-5">
            <p className="text-xl font-bold">
              {formatNaira(pricing.total)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / {billing === "annually" ? "year" : "month"}
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {billing === "annually"
                ? `${formatNaira(pricing.monthlyEquivalent)} per month, billed annually. You save ${formatNaira(pricing.savings)} per year (15%).`
                : "Monthly billing. Switch to annual billing to save 15%."}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="care-brief">Where would you like our support?</Label>
          <Textarea
            id="care-brief"
            name="brief"
            rows={6}
            required
            minLength={10}
            maxLength={5000}
            placeholder="Tell us what you would like updated or improved, any issues you are experiencing, and your most important priorities."
          />
          <p className="text-xs text-muted-foreground">
            Please leave out passwords, payment details and other sensitive information.
          </p>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {error}
          </p>
        )}
        <div>
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Sending request…" : "Request website care"}
            <ArrowUpRight />
          </Button>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            This is an enquiry. No payment is collected here. We will review your website and
            confirm the scope with you before your plan begins.
          </p>
        </div>
      </fieldset>
    </form>
  );
}
