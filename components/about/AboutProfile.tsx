"use client";

import { HomeCta } from "@/components/home/HomeCta";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { PageHero } from "@/components/ui/PageHero";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { getExploringStatusLabel } from "@/lib/i18n/status-labels";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function AboutProfile() {
  const { dict, locale } = useI18n();
  const { about, inner, tech, exploring } = dict;
  const [lead, ...rest] = about.paragraphs;

  return (
    <div>
      <PageHero
        crumbs={[{ label: about.sectionLabel.toLowerCase() }]}
        title={about.headline[0]}
        accent={about.headline[1]}
        description={lead}
        aside={<ProfileCard />}
      />

      <section className="theme-void py-[var(--space-xl)]">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <SectionLabel number="01" label={inner.story} />
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div className="space-y-6">
              {rest.map((p) => (
                <p key={p.slice(0, 30)} className="text-statement text-muted-foreground first:text-foreground">
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="callout mt-10">
              <p className="text-h2">{about.focusStatement}</p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <section className="theme-frost py-[var(--space-xl)]">
        <div className="container-editorial">
          <ScrollReveal>
            <SectionLabel number="02" label={inner.glance} />
          </ScrollReveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3" role="list">
            {about.meta.map((item, i) => (
              <li key={item.label}>
                <ScrollReveal delay={i * 0.06} className="h-full">
                  <div className="stat-card">
                    <p className="spec-label">{item.label}</p>
                    <p className="text-h1 mt-4">{item.value}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-void py-[var(--space-xl)]">
        <div className="container-editorial">
          <ScrollReveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <SectionLabel number="03" label={inner.stack} />
            <div>
              <h2 className="text-section font-display">{tech.headline}</h2>
              <p className="text-body mt-5 max-w-2xl text-muted-foreground">{tech.intro}</p>
            </div>
          </ScrollReveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3" role="list">
            {tech.categories.map((category, i) => (
              <li key={category.label}>
                <ScrollReveal delay={i * 0.06} className="h-full">
                  <div className="stat-card">
                    <p className="flex items-center gap-2.5 text-h2">
                      <span className={`orbit-key orbit-key-${i} !mt-0`} aria-hidden />
                      {category.label}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" role="list" lang="en">
                      {category.items.map((item) => (
                        <li key={item} className="tag">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-frost py-[var(--space-xl)]">
        <div className="container-editorial grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <SectionLabel number="04" label={exploring.sectionLabel} />
            <h2 className="text-section font-display mt-6">{exploring.heading}</h2>
            <p className="text-body mt-4 text-muted-foreground">{exploring.supporting}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <ul className="faq-list" role="list">
              {exploring.areas.map((area, i) => (
                <li key={area.label} className="flex items-center justify-between gap-6 border-b border-[var(--line)] py-5">
                  <span className="flex items-center gap-4">
                    <span className="text-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-h2">{area.label}</span>
                  </span>
                  <span className={cn("tag shrink-0", area.status === "Developing" && "border-[var(--accent-border)] text-[var(--accent-light)]")}>
                    {getExploringStatusLabel(area.status, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <HomeCta />
    </div>
  );
}
