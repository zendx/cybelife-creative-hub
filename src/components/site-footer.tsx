import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import logoAsset from "@/assets/cyberlife-logo.png.asset.json";
import { services } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-8 w-8 object-contain" />
            <span className="font-display text-base font-semibold">Cyberlife Digital</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A web design and digital agency in Lagos building business websites that earn attention
            and revenue.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services"
                  className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                to="/about"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/work"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Our work
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 text-brand-soft" />
              Yaba, Lagos, Nigeria
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 text-brand-soft" />
              <a
                href="mailto:hello@cyberlifedigital.ng"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                hello@cyberlifedigital.ng
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 text-brand-soft" />
              <a
                href="tel:+2348012345678"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                +234 801 234 5678
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cyberlife Digital. All rights reserved.</p>
          <nav aria-label="Footer navigation">
            <Link
              to="/book"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Book a meeting
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
