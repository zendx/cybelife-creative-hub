import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { maintenancePlans } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { planPricing, type BillingCycle, type PlanName } from "@/lib/maintenance";
import { useCurrency } from "@/hooks/use-currency";
import { CurrencySelector, CurrencyNote } from "@/components/currency-selector";

export function BillingSwitch({
  value,
  onChange,
}: {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
}) {
  return (
    <label className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
      <span>Monthly</span>
      <Switch
        aria-label="Annual billing — save 15%"
        checked={value === "annually"}
        onCheckedChange={(checked) => onChange(checked ? "annually" : "monthly")}
      />
      <span>
        Annually{" "}
        <span className="ml-1 rounded-full bg-primary/10 px-2 py-1 text-brand-soft">Save 15%</span>
      </span>
    </label>
  );
}

export function CarePlans({
  billing,
  onBillingChange,
  selectedPlan,
  onSelect,
}: {
  billing?: BillingCycle;
  onBillingChange?: (value: BillingCycle) => void;
  selectedPlan?: PlanName;
  onSelect?: (plan: PlanName) => void;
}) {
  const [localBilling, setLocalBilling] = useState<BillingCycle>("monthly");
  const { format } = useCurrency();
  const cycle = billing ?? localBilling;
  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <BillingSwitch value={cycle} onChange={onBillingChange ?? setLocalBilling} />
        <CurrencySelector />
      </div>
      <CurrencyNote />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {maintenancePlans.map((plan, index) => {
          const pricing = planPricing(plan.name, cycle);
          const featured = index === 1;
          return (
            <article
              key={plan.name}
              className={`flex min-w-0 flex-col rounded-[1.75rem] border p-6 sm:p-8 ${featured ? "border-primary bg-primary text-white shadow-xl" : "border-border bg-white"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                {featured && (
                  <span className="rounded-full bg-black/15 px-3 py-1 text-xs font-semibold">
                    For growing teams
                  </span>
                )}
              </div>
              <p
                className={`mt-4 min-h-24 text-sm leading-6 ${featured ? "text-white/95" : "text-muted-foreground"}`}
              >
                {plan.bestFor}
              </p>
              <div className="mt-6" aria-live="polite" aria-atomic="true">
                {cycle === "annually" && (
                  <p
                    className={`mb-1 text-sm ${featured ? "text-white/95" : "text-muted-foreground"}`}
                  >
                    <s>{format(plan.monthlyPrice)}</s> / month
                  </p>
                )}
                <p className="font-display text-3xl font-bold tracking-tight">
                  {format(pricing.monthlyEquivalent)}
                  <span className="text-sm font-normal"> / month</span>
                </p>
                <p
                  className={`mt-2 text-sm ${featured ? "text-white/95" : "text-muted-foreground"}`}
                >
                  {cycle === "annually"
                    ? `${format(pricing.total)} billed annually`
                    : "Billed monthly"}
                </p>
                {cycle === "annually" && (
                  <p
                    className={`mt-2 text-sm font-semibold ${featured ? "text-white" : "text-primary"}`}
                  >
                    Save {format(pricing.savings)} per year
                  </p>
                )}
              </div>
              <ul className="my-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <Check
                      aria-hidden="true"
                      className={`mt-1 size-4 shrink-0 ${featured ? "text-white" : "text-primary"}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {onSelect ? (
                <Button
                  type="button"
                  variant={featured ? "signal" : "quiet"}
                  aria-pressed={selectedPlan === plan.name}
                  onClick={() => onSelect(plan.name)}
                >
                  {selectedPlan === plan.name ? `${plan.name} selected` : `Choose ${plan.name}`}
                  <ArrowUpRight />
                </Button>
              ) : (
                <Button variant={featured ? "signal" : "quiet"} asChild>
                  <Link
                    to="/website-maintenance"
                    search={{ plan: plan.name, billing: cycle }}
                    hash="care-enquiry"
                  >
                    Choose {plan.name}
                    <ArrowUpRight />
                  </Link>
                </Button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
