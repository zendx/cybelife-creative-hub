import { useCurrency } from "@/hooks/use-currency";
import { usdReferenceRate, type Currency } from "@/data/pricing";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className="inline-flex items-center gap-2 text-sm font-semibold">
      Currency
      <select
        aria-label="Pricing currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as Currency)}
        className="h-10 rounded-md border border-input bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="NGN">NGN — Nigerian naira</option>
        <option value="USD">USD — US dollars</option>
      </select>
    </label>
  );
}

export function CurrencyNote() {
  const { currency } = useCurrency();
  if (currency !== "USD") return null;
  return (
    <p className="mt-3 text-xs leading-5">
      USD estimates use the exchange rate dated {usdReferenceRate.asOf}. We confirm your final quote
      before work begins.{" "}
      <a
        className="underline underline-offset-2"
        href="https://www.exchangerate-api.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Rates by ExchangeRate-API
      </a>
      .
    </p>
  );
}
