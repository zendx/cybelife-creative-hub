import { createContext, useContext } from "react";
import { formatPrice, type Currency } from "@/data/pricing";

export const CurrencyContext = createContext({
  currency: "NGN" as Currency,
  setCurrency: (_currency: Currency) => {},
});

export function useCurrency() {
  const context = useContext(CurrencyContext);
  return { ...context, format: (amount: number) => formatPrice(amount, context.currency) };
}
