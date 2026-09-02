"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { HoverTilt } from "@/components/motion/HoverTilt";
import { PageAmbientField } from "@/components/motion/PageAmbientField";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { InteractiveTimeline } from "@/components/journey/InteractiveTimeline";
import { PageHeader } from "@/components/ui/PageHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { isNasaGithubConfigured } from "@/lib/data/nasa";

export function JourneyPath() {
  const { dict, path } = useI18n();
  const { journey, nasa } = dict;

  return (
    <div>
      <SectionChapter theme="void" className="relative overflow-hidden pt-16 pb-[var(--space-lg)]">
        <PageAmbientField />
        <div className="container-editorial relative py-[var(--space-md)]">
          <PageHeader
            label={journey.sectionLabel}
            title={journey.headline[0]}
            titleMuted={`${journey.headline[1]} ${journey.headline[2]}`}
            description={journey.intro}
          />
        </div>
      </SectionChapter>

      <SectionChapter theme="frost" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid">
          <div className="col-span-12 lg:col-span-7">
            <ScrollReveal>
              <InteractiveTimeline
                milestones={journey.milestones}
                types={journey.types}
                allLabel={dict.common.all}
                path={path}
              />
            </ScrollReveal>
          </div>
          <div className="col-span-12 mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <ScrollReveal delay={0.1}>
              <HoverTilt maxTilt={5}>
                <aside className="pro-panel p-8">
                  <p className="text-meta text-muted-foreground">{nasa.sectionLabel}</p>
                  <h2 className="text-h1 mt-4">{nasa.title}</h2>
                  <p className="text-meta mt-2 text-muted-foreground">
                    {nasa.year} · {nasa.location}
                  </p>
                  <p className="text-body mt-5 text-muted-foreground">{nasa.description}</p>
                  {isNasaGithubConfigured("https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT") && (
                    <a
                      href="https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-form text-meta mt-6 inline-flex text-[var(--accent)]"
                      data-cursor="external"
                    >
                      {nasa.githubLinkLabel}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </aside>
              </HoverTilt>
            </ScrollReveal>
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="void" className="py-[var(--space-lg)]">
        <div className="container-editorial">
          <ScrollReveal>
            <p className="text-meta text-muted-foreground">{dict.common.relatedWork}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {journey.milestones
                .filter((m): m is typeof m & { href: string } => m.type === "project" && "href" in m && !!m.href)
                .map((m) => (
                  <Link key={m.id} href={path(m.href)} className="btn-ghost" data-cursor="project">
                    {m.title}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </SectionChapter>
    </div>
  );
}
