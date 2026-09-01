"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HomeTimelinePreview() {
  const { dict, path } = useI18n();
  const { journey } = dict;
  const preview = [...journey.milestones].reverse().slice(0, 4);

  return (
    <SectionChapter theme="chalk" id="timeline" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <div className="editorial-grid items-start gap-y-10">
          <ScrollReveal className="col-span-12 lg:col-span-4">
            <SectionLabel number="04" label={journey.sectionLabel} />
            <h2 className="text-section mt-6 font-display">
              {journey.headline[0]}{" "}
              <span className="text-muted-foreground">{journey.headline[1]}</span>
            </h2>
            <p className="text-body mt-5 text-muted-foreground">{journey.intro}</p>
            <Link
              href={path("/journey")}
              className="link-form text-meta mt-8 inline-flex text-[var(--accent)]"
            >
              {dict.common.footerNav.journey}
              <ArrowUpRight size={13} />
            </Link>
          </ScrollReveal>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]" role="list">
              {preview.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 0.06} y={32}>
                  <li className="grid gap-2 py-6 md:grid-cols-[6rem_1fr] md:gap-8">
                    <span className="text-meta text-muted-foreground">{m.period}</span>
                    <div>
                      <p className="text-meta text-[var(--accent)]">{journey.types[m.type]}</p>
                      {"href" in m && m.href ? (
                        <Link
                          href={m.href.startsWith("http") ? m.href : path(m.href)}
                          className="text-h1 mt-1 hover:text-[var(--accent-light)]"
                          {...(m.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {m.title}
                        </Link>
                      ) : (
                        <p className="text-h1 mt-1">{m.title}</p>
                      )}
                      <p className="text-body mt-2 text-muted-foreground">{m.description}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SectionChapter>
  );
}
