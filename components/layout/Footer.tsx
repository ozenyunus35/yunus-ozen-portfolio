"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getSocialNav } from "@/lib/i18n/helpers";

export function Footer() {
  const { dict, path } = useI18n();
  const socialNav = getSocialNav(dict);
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: dict.common.footerNav.work, href: "/work" },
    { label: dict.common.footerNav.about, href: "/about" },
    { label: dict.common.footerNav.journey, href: "/journey" },
    { label: dict.common.footerNav.contact, href: "/contact" },
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink-soft)]">
      <div className="container-editorial py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-h1 text-foreground">{dict.site.name}</p>
            <p className="text-body mt-3 text-muted-foreground">{dict.site.role}</p>
            <p className="text-body mt-4 max-w-sm text-muted-foreground">{dict.common.footerTagline}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-meta text-muted-foreground">{dict.common.footerNav.work}</p>
            <ul className="mt-4 space-y-2" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={path(link.href)}
                    className="text-body text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-meta text-muted-foreground">{dict.common.channels}</p>
            <ul className="mt-4 space-y-2" role="list">
              <li>
                <a
                  href={`mailto:${dict.site.email}`}
                  className="text-body text-muted-foreground transition-colors hover:text-foreground"
                >
                  {dict.site.email}
                </a>
              </li>
              {socialNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-meta mt-6 text-muted-foreground">{dict.site.location}</p>
          </div>
        </div>

        <div className="rule mt-12" />

        <p className="text-meta mt-6 text-muted-foreground">
          © {year} {dict.site.name}. {dict.common.footerCopyright} {dict.site.portfolioYear}.
        </p>
      </div>
    </footer>
  );
}
