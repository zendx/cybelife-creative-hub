// Reference conversion for enquiry estimates, not a live settlement rate.
// Source: https://open.er-api.com/v6/latest/USD, retrieved 2026-09-09.
// Review this centrally when changing international pricing.
export const usdReferenceRate = { ngnPerUsd: 1322.012964, asOf: "2026-09-09" } as const;
export type Currency = "NGN" | "USD";

export function formatPrice(naira: number, currency: Currency) {
  return currency === "USD"
    ? `US$${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(naira / usdReferenceRate.ngnPerUsd)}`
    : `₦${new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(naira)}`;
}
