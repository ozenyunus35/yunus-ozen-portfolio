"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Closing band: one sentence and the two fastest ways to get in touch. */
export function HomeCta() {
  const { dict, path } = useI18n();
  const { cta } = dict.home;

  return (
    <section className="theme-void pb-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <div className="cta-band">
            <div className="cta-grain" aria-hidden />
            <h2 className="text-display font-display relative mx-auto max-w-3xl text-center">
              {cta.lead} <span className="accent-serif accent-ink">{cta.accent}</span>
              {cta.tail && ` ${cta.tail}`}
            </h2>
            <p className="text-body relative mx-auto mt-5 max-w-lg text-center text-[color-mix(in_srgb,var(--foreground)_75%,transparent)]">{cta.text}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${dict.site.email}`} className="btn-primary">
                <Mail size={15} />
                {dict.contact.actions.email}
              </a>
              <a href={dict.site.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {dict.contact.actions.linkedin}
                <ArrowUpRight size={15} />
              </a>
              <Link href={path("/contact")} className="btn-ghost">
                {dict.common.footerNav.contact}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
