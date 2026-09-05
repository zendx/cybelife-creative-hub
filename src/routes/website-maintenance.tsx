import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Wrench, Activity } from "lucide-react";
import { CarePlans } from "@/components/care-plans";
import { MaintenanceForm } from "@/components/maintenance-form";
import { maintenancePlans } from "@/data/site";
import type { BillingCycle, PlanName } from "@/lib/maintenance";

export const Route = createFileRoute("/website-maintenance")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { plan?: PlanName | undefined; billing?: BillingCycle | undefined } => ({
    plan: maintenancePlans.some((plan) => plan.name === search["plan"])
      ? (search["plan"] as PlanName)
      : undefined,
    billing:
      search["billing"] === "annually" || search["billing"] === "monthly"
        ? search["billing"]
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Website Maintenance Plans in Nigeria | Cyberlife Digital" },
      {
        name: "description",
        content:
          "Keep your website secure, updated and performing with Basic, Standard and Premium care plans from ₦300,000/month. Save 15% with annual billing.",
      },
      { property: "og:title", content: "Website Maintenance & Support | Cyberlife Digital" },
      {
        property: "og:description",
        content:
          "Dedicated website care for startups, growing teams and established businesses. Compare three plans and save 15% annually.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website Maintenance & Support",
          url: "https://cyberlifedigital.com/website-maintenance",
          serviceType: "Website maintenance",
          provider: {
            "@type": "Organization",
            "@id": "https://cyberlifedigital.com/#organization",
            name: "Cyberlife Digital",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Monthly website care plans",
            itemListElement: maintenancePlans.map((plan) => ({
              "@type": "Offer",
              name: `${plan.name} website care`,
              priceCurrency: "NGN",
              price: plan.monthlyPrice,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: plan.monthlyPrice,
                priceCurrency: "NGN",
                unitText: "MONTH",
              },
              itemOffered: {
                "@type": "Service",
                name: `${plan.name} website care`,
                description: plan.bestFor,
              },
            })),
          },
        }),
      },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const plan = search.plan ?? "Basic";
  const billing = search.billing ?? "monthly";
  const setPlan = (value: PlanName) => {
    void navigate({
      search: (previous) => ({ ...previous, plan: value }),
      replace: true,
      resetScroll: false,
    });
  };
  const setBilling = (value: BillingCycle) => {
    void navigate({
      search: (previous) => ({ ...previous, billing: value }),
      replace: true,
      resetScroll: false,
    });
  };
  return (
    <>
      <section className="border-b border-border bg-[#edf1ff]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
          <p className="eyebrow">Website maintenance & support</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Your website, cared for.
            <br />
            <span className="text-primary">Your time, back where it matters.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Leave the updates, monitoring and day-to-day improvements to a dependable technical
            partner. We keep your website working for your business, so your team can focus on what
            comes next.
          </p>
          <div className="mt-10 flex flex-wrap gap-5 text-sm font-semibold">
            {[
              { icon: ShieldCheck, title: "Security & peace of mind" },
              { icon: Wrench, title: "Changes without the chase" },
              { icon: Activity, title: "Ongoing performance care" },
            ].map(({ icon: FeatureIcon, title }) => {
              return (
                <span key={title} className="flex items-center gap-2">
                  <FeatureIcon aria-hidden="true" className="size-5 text-primary" />
                  {title}
                </span>
              );
            })}
          </div>
          <a
            href="#care-plans"
            className="mt-9 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-white"
          >
            Explore care plans
          </a>
        </div>
      </section>
      <section id="care-plans" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-6">
        <p className="eyebrow">Three plans. One dependable partner.</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Choose the support your website needs.
        </h2>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
          From essential upkeep to a dedicated technical partnership, each plan gives your team a
          clear route to support. Pay monthly or save 15% when billed annually.
        </p>
        <CarePlans
          billing={billing}
          onBillingChange={setBilling}
          selectedPlan={plan}
          onSelect={(value) => {
            setPlan(value);
            document.getElementById("care-enquiry")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            });
          }}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          Response SLAs describe how quickly we respond to a request. Completion time depends on the
          work involved and is agreed with you.
        </p>
      </section>
      <section id="care-enquiry" className="scroll-mt-24 border-t border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Let’s take it from here</p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Tell us about your website.</h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              Share your platform, priorities and preferred plan. We will review your requirements
              and agree on the right next steps with you.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Not sure what your website runs on? Choose “Not sure” and we will help you identify
              it.
            </p>
            <a href="tel:+2348031975415" className="mt-8 block font-semibold text-primary">
              +234 803 197 5415
            </a>
            <a
              href="mailto:hello@cyberlifedigital.com"
              className="mt-3 block break-all text-sm text-muted-foreground"
            >
              hello@cyberlifedigital.com
            </a>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-white p-5 sm:p-8">
            <MaintenanceForm
              plan={plan}
              billing={billing}
              onPlanChange={setPlan}
              onBillingChange={setBilling}
            />
          </div>
        </div>
      </section>
    </>
  );
}
