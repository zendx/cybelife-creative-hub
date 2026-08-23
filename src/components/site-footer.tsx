import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import logoAsset from "@/assets/cyberlife-logo.png.asset.json";
import { services } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
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
                <Link to="/services" className="transition-colors hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/work" className="transition-colors hover:text-foreground">
                Selected work
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Studio</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-brand-soft" />
              Yaba, Lagos, Nigeria
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-brand-soft" />
              hello@cyberlifedigital.ng
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-brand-soft" />
              +234 801 234 5678
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 px-6 py-6">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cyberlife Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
