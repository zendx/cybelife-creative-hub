import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CarePlans } from "@/components/care-plans";
import { Button } from "@/components/ui/button";

export function HomeCareSection() {
  return (
    <section className="border-y border-border bg-[#edf1ff]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-28">
        <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">Website care</p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Launch is day one.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
            Give your website dependable care with Basic, Standard or Premium support. Choose
            monthly billing or save 15% with an annual plan.
          </p>
        </div>
        <CarePlans />
        <div className="mt-9 flex justify-center">
          <Button size="lg" asChild>
            <Link to="/website-maintenance">
              Compare support options <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
