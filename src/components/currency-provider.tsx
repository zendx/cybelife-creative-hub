import { useEffect, useRef, useState, type ReactNode } from "react";
import { CurrencyContext } from "@/hooks/use-currency";
import type { Currency } from "@/data/pricing";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setValue] = useState<Currency>("NGN");
  const manuallySelected = useRef(false);
  useEffect(() => {
    let active = true;
    try {
      const saved = localStorage.getItem("cyberlife-currency");
      if (saved === "NGN" || saved === "USD") {
        manuallySelected.current = true;
        setValue(saved);
        return;
      }
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
    // A best-effort fallback for hosts without country headers; users can override it.
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setValue(timeZone === "Africa/Lagos" || !timeZone ? "NGN" : "USD");
    void fetch("/api/visitor-location", { signal: AbortSignal.timeout(4000) })
      .then((response) => (response.ok ? response.json() : null))
      .then((location) => {
        if (
          active &&
          !manuallySelected.current &&
          (location?.currency === "NGN" || location?.currency === "USD")
        )
          setValue(location.currency);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  function setCurrency(value: Currency) {
    manuallySelected.current = true;
    setValue(value);
    try {
      localStorage.setItem("cyberlife-currency", value);
    } catch {
      /* Keep the choice for this visit. */
    }
  }
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
