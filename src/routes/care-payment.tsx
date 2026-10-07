import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatPrice } from "@/data/pricing";

export const Route = createFileRoute("/care-payment")({
  validateSearch: (search: Record<string, unknown>) => ({
    reference: typeof search["reference"] === "string" ? search["reference"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Website Care Payment | Cyberlife Digital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const { reference } = Route.useSearch();
  const [result, setResult] = useState<{
    plan: string;
    amount: number;
    billing: string;
    testMode: boolean;
  }>();
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setError("");
    setResult(undefined);
    if (!reference) {
      setError("No payment reference was supplied.");
      return;
    }
    fetch(`/api/care-payment?reference=${encodeURIComponent(reference)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || data.ok !== true)
          throw new Error(data.error ?? "Payment could not be confirmed.");
        setResult(data);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          setError(
            error instanceof Error
              ? error.message
              : "Unable to verify payment. Please contact us before paying again.",
          );
      });
    return () => controller.abort();
  }, [reference, attempt]);

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-bold">
        {result
          ? result.testMode
            ? "Test payment confirmed"
            : "Payment confirmed"
          : error
            ? "Payment needs attention"
            : "Checking your payment…"}
      </h1>
      <div role="status" className="mt-6 space-y-4 leading-7">
        {result && (
          <p>
            {result.testMode
              ? "This was a test transaction. No live payment was collected."
              : `Thank you. We received ${formatPrice(result.amount, "NGN")} for your ${result.plan} website care plan (${result.billing === "annually" ? "one year" : "one month"}). Our team will contact you to arrange your website care.`}
          </p>
        )}
        {error && <p role="alert">{error}</p>}
        {reference && (
          <p className="break-all text-sm text-muted-foreground">Payment reference: {reference}</p>
        )}
        {error && reference && (
          <button className="underline" onClick={() => setAttempt((value) => value + 1)}>
            Check payment again
          </button>
        )}
        <p>
          <Link to="/website-maintenance" className="text-primary underline">
            Return to website care
          </Link>
        </p>
        <p>
          <a href="mailto:cyberlifeng@gmail.com" className="text-primary underline">
            Contact us for help
          </a>
        </p>
      </div>
    </section>
  );
}
