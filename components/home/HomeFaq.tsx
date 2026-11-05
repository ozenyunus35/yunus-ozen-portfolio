"use client";

import { Plus } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Recruiter questions, answered only with facts stated elsewhere on the site. Native <details>, so it works without JavaScript. */
export function HomeFaq() {
  const { dict } = useI18n();
  const { faq } = dict.home;

  return (
    <section id="faq" className="theme-void py-[var(--space-xl)]">
      <div className="container-editorial grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal>
          <SectionLabel number="06" label={faq.sectionLabel} />
          <h2 className="text-section font-display mt-6 max-w-md">{faq.headline}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <div className="faq-list">
            {faq.items.map((item, i) => (
              <details key={item.q} name="faq" className="faq-item" open={i === 0}>
                <summary className="faq-q">
                  <span>{item.q}</span>
                  <Plus size={18} className="faq-icon" aria-hidden />
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
