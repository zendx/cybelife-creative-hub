import { maintenancePlans } from "../data/site";
import { formatPrice } from "../data/pricing";

export type PlanName = (typeof maintenancePlans)[number]["name"];
export type BillingCycle = "monthly" | "annually";
export const annualDiscount = 0.15;

export function planPricing(plan: PlanName, billing: BillingCycle) {
  const { monthlyPrice } = maintenancePlans.find((item) => item.name === plan)!;
  const annualTotal = Math.round(monthlyPrice * 12 * (1 - annualDiscount));
  return {
    monthlyEquivalent: billing === "annually" ? annualTotal / 12 : monthlyPrice,
    total: billing === "annually" ? annualTotal : monthlyPrice,
    savings: monthlyPrice * 12 - annualTotal,
  };
}

export function formatNaira(amount: number) {
  return formatPrice(amount, "NGN");
}
