"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { FocusAreas } from "@/components/visuals/pro/FocusAreas";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function AboutProfile() {
  const { dict, path, locale } = useI18n();
  const { about } = dict;

  return (
    <div>
      <SectionChapter theme="void" className="pt-16 pb-[var(--space-lg)]">
        <div className="container-editorial py-[var(--space-md)]">
          <PageHeader
            label={about.sectionLabel}
            title={about.headline[0]}
            titleMuted={about.headline[1]}
          />
        </div>
      </SectionChapter>

      <SectionChapter theme="frost" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid">
          <div className="col-span-12 lg:col-span-7">
            <ScrollReveal>
              <div className="space-y-6">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="text-body text-muted-foreground">{p}</p>
                ))}
              </div>
              <blockquote className="pro-quote mt-12">
                <p className="text-statement">{about.focusStatement}</p>
              </blockquote>
            </ScrollReveal>
          </div>
          <div className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <ScrollReveal delay={0.1}>
              <dl className="pro-meta-list">
                {about.meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-meta text-muted-foreground">{item.label}</dt>
                    <dd className="text-h2 mt-2">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="void" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid">
          <ScrollReveal className="col-span-12 lg:col-span-4">
            <p className="text-meta accent-text">{dict.exploring.sectionLabel}</p>
            <h2 className="text-section mt-4 font-display">{dict.exploring.heading}</h2>
            <p className="text-body mt-4 text-muted-foreground">{dict.exploring.supporting}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="col-span-12 lg:col-span-7 lg:col-start-6">
            <FocusAreas areas={dict.exploring.areas} locale={locale} />
          </ScrollReveal>
        </div>
      </SectionChapter>

      <SectionChapter theme="chalk" className="py-[var(--space-lg)]">
        <div className="container-editorial">
          <ScrollReveal>
            <Link href={path("/work")} className="link-form text-meta text-muted-foreground">
              {dict.common.viewSelectedWork}
              <ArrowUpRight size={13} />
            </Link>
          </ScrollReveal>
        </div>
      </SectionChapter>
    </div>
  );
}
