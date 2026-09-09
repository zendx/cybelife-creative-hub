import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, ScanSearch } from "lucide-react";

import { services } from "@/data/site";
import { CurrencySelector, CurrencyNote } from "@/components/currency-selector";

export function SiteFooter() {
  return (
    <footer className="ink-section border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-6 md:pt-20">
        <div className="mb-10 text-white/80">
          <CurrencySelector />
          <CurrencyNote />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.85fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center overflow-hidden rounded-xl bg-white">
                <img src="/favicon.png" alt="" className="size-10 object-contain" />
              </span>
              <span className="font-display text-lg font-bold tracking-[-0.04em] text-white">
                Cyberlife<span className="text-[#ff7a62]">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              We build digital products and brand experiences that help ambitious businesses get
              found, get chosen and keep growing.
            </p>
            <Link
              to="/audit"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/14"
            >
              <ScanSearch className="size-4 text-[#ff8a72]" /> Run a free website audit
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/60">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={
                      service.slug === "website-maintenance" ? "/website-maintenance" : "/services"
                    }
                    className="transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/60">
              Grow & care
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {services.slice(4).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={
                      service.slug === "website-maintenance" ? "/website-maintenance" : "/services"
                    }
                    className="transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/work" className="transition-colors hover:text-white">
                  Case studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/60">
              Talk to us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li>
                <a
                  href="mailto:hello@cyberlifedigital.com"
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-[#ff8a72]" />
                  hello@cyberlifedigital.com
                </a>
              </li>
              <li>
                <a href="tel:+2348031975415" className="transition-colors hover:text-white">
                  +234 803 197 5415
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#ff8a72]" />
                Yaba, Lagos, Nigeria
              </li>
              <li>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 font-bold text-white hover:text-[#ffb29f]"
                >
                  Start a project <ArrowUpRight className="size-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cyberlife Digital. All rights reserved.</p>
          <p>Strategy · Design · Development · Growth</p>
        </div>
      </div>
    </footer>
  );
}
