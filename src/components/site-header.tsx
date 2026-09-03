import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Menu, ScanSearch, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Case studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link
          to="/"
          aria-label="Cyberlife Digital home"
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid size-10 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border">
            <img src="/favicon.png" alt="" aria-hidden="true" className="size-9 object-contain" />
          </span>
          <span className="font-display text-[15px] font-bold leading-none tracking-[-0.04em] sm:text-base">
            Cyberlife<span className="text-brand-soft">.</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-sm py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "text-foreground after:scale-x-100" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" asChild>
            <Link to="/audit">
              <ScanSearch /> Free site audit
            </Link>
          </Button>
          <BookingDialog
            trigger={
              <Button>
                Start a project <ArrowUpRight />
              </Button>
            }
          />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {open && (
        <nav
          id="site-mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-5 pb-6 pt-3 shadow-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/70 py-4 font-display text-lg font-semibold text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button variant="quiet" size="lg" asChild>
                <Link to="/audit" onClick={() => setOpen(false)}>
                  <ScanSearch /> Free site audit
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link to="/book" onClick={() => setOpen(false)}>
                  Start a project <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
