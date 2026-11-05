"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, FileText } from "lucide-react";
import { HomeCta } from "@/components/home/HomeCta";
import { AtlasDemo, RelayDemo, ScraperDemo, TallyDemo } from "@/components/live/demos";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { withBasePath } from "@/lib/data/base-path";
import { caseStudy } from "@/lib/data/case-studies";
import { PROJECT_MEDIA } from "@/lib/data/project-media";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Projects that have a scripted demo on the home page show it here too. */
const DEMOS: Record<string, { Demo: () => React.JSX.Element; key: "tally" | "relay" | "atlas" | "scraper" }> = {
  tally: { Demo: TallyDemo, key: "tally" },
  relay: { Demo: RelayDemo, key: "relay" },
  "atlas-portal": { Demo: AtlasDemo, key: "atlas" },
  "lead-scraper": { Demo: ScraperDemo, key: "scraper" },
};

const host = (url: string) => {
  try {
    const u = new URL(url);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
};

export function ProjectDetail({ slug }: { slug: string }) {
  const { dict, path, locale } = useI18n();
  const { inner } = dict;
  const study = caseStudy(slug, locale);
  const projects = dict.projects;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const media = PROJECT_MEDIA[slug];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const num = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  const demo = DEMOS[slug];

  const spec = (
    <dl className="spec">
      <div className="spec-row">
        <dt className="spec-label">{dict.common.field}</dt>
        <dd className="text-small">{project.industry}</dd>
      </div>
      <div className="spec-row">
        <dt className="spec-label">{dict.common.period}</dt>
        <dd className="text-small">{project.period}</dd>
      </div>
      <div className="spec-row">
        <dt className="spec-label">{dict.common.roles}</dt>
        <dd className="flex flex-wrap gap-1.5">
          {project.roles.map((role) => (
            <span key={role} className="tag">
              {role}
            </span>
          ))}
        </dd>
      </div>
      <div className="spec-row">
        <dt className="spec-label">{dict.common.stack}</dt>
        <dd className="flex flex-wrap gap-1.5" lang="en">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </dd>
      </div>
      {media && (
        <div className="spec-row">
          <dt className="spec-label">{inner.links}</dt>
          <dd className="grid gap-1.5 text-small">
            <a href={media.demo} target="_blank" rel="noopener noreferrer" className="spec-link">
              {host(media.demo)}
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={media.source} target="_blank" rel="noopener noreferrer" className="spec-link">
              {host(media.source)}
              <ArrowUpRight size={13} aria-hidden />
            </a>
          </dd>
        </div>
      )}
    </dl>
  );

  return (
    <article>
      <PageHero
        crumbs={[{ label: dict.nav[0].label.toLowerCase(), href: "/work" }, { label: slug }]}
        title={project.title}
        description={project.tagline}
        aside={spec}
        actions={
          media && (
            <>
              <a href={media.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {media.live ? dict.common.liveSite : dict.common.liveDemo}
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <a href={media.source} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {media.live ? <FileText size={15} aria-hidden /> : <Code2 size={15} aria-hidden />}
                {media.live ? dict.common.caseStudy : dict.common.sourceCode}
              </a>
              <span className="text-mono ml-1 text-muted-foreground">{num}</span>
            </>
          )
        }
      />

      <section className="theme-void pt-[var(--space-md)]">
        <div className="container-editorial">
          <div className="detail-stage anim-rise-lg" style={{ animationDelay: "220ms" }}>
            <ProjectVisual slug={slug} alt={`${project.title}: ${dict.common.screenshotsAlt}`} priority sizes="(min-width: 1088px) 68rem, 100vw" />
          </div>
        </div>
      </section>

      <section className="theme-void py-[var(--space-xl)]">
        <div className="container-editorial grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <SectionLabel number="01" label={inner.overview} />
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <p className="text-statement max-w-3xl">{project.description}</p>
            <div className="callout mt-10">
              <p className="spec-label">{dict.common.whatIDid}</p>
              <p className="text-h2 mt-3">{project.techInvolvement}</p>
            </div>
          </ScrollReveal>
        </div>

        {study && (
          <div className="container-editorial mt-[var(--space-lg)] grid gap-4 md:grid-cols-2">
            {[
              { label: inner.problem, text: study.problem, n: "A" },
              { label: inner.approach, text: study.approach, n: "B" },
            ].map((block, i) => (
              <ScrollReveal key={block.label} delay={i * 0.06} className="h-full">
                <div className="stat-card">
                  <p className="spec-label flex items-center gap-2">
                    <span className="text-[var(--accent-light)]">{block.n}</span>
                    {block.label}
                  </p>
                  <p className="text-body mt-4 text-muted-foreground">{block.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {study && (
        <section className="theme-frost py-[var(--space-xl)]">
          <div className="container-editorial grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <SectionLabel number="02" label={inner.features} />
              </div>
            </ScrollReveal>
            <ol className="feature-list" role="list">
              {study.features.map((f, i) => (
                <li key={f}>
                  <ScrollReveal delay={Math.min(i, 3) * 0.04}>
                    <div className="feature-item">
                      <span className="feature-num">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-body">{f}</p>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {study && study.gallery.length > 0 && (
        <section className="theme-void overflow-hidden py-[var(--space-xl)]">
          <div className="container-editorial">
            <ScrollReveal>
              <SectionLabel number="03" label={inner.screens} />
            </ScrollReveal>
          </div>
          <ul className="gallery mt-8" role="list">
            {study.gallery.map((img) => (
              <li key={img.src} className={img.phone ? "gallery-item gallery-phone" : "gallery-item"}>
                <figure>
                  <div className="gallery-frame">
                    <Image src={withBasePath(img.src)} alt={img.caption} width={img.w} height={img.h} sizes={img.phone ? "18rem" : "(min-width: 1024px) 52rem, 88vw"} loading="lazy" />
                  </div>
                  <figcaption className="text-small mt-3 text-muted-foreground">{img.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {study && (
        <section className="theme-frost py-[var(--space-lg)]">
          <div className="container-editorial grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <ScrollReveal>
              <SectionLabel number="04" label={inner.quality} />
            </ScrollReveal>
            <ul className="grid gap-3" role="list">
              {study.quality.map((q) => (
                <li key={q}>
                  <ScrollReveal>
                    <p className="flex gap-3 text-body">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)]">
                        <Check size={12} aria-hidden />
                      </span>
                      {q}
                    </p>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {demo && (
        <section className="theme-void py-[var(--space-xl)]">
          <div className="container-editorial grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <ScrollReveal>
              <SectionLabel number={study ? "05" : "02"} label={inner.seeItWork} />
              <h2 className="text-section font-display mt-6">{dict.live.cards[demo.key].title}</h2>
              <p className="text-body mt-5 max-w-md text-muted-foreground">{dict.live.cards[demo.key].caption}</p>
              <p className="text-small mt-6 text-muted-foreground">{dict.live.note}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="tour-panel tour-stage !border-0">
                <demo.Demo />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="theme-void py-[var(--space-lg)]">
        <nav className="container-editorial grid gap-5 md:grid-cols-2" aria-label={inner.moreProjects}>
          {[
            { p: prev, label: dict.common.previous, Icon: ArrowLeft },
            { p: next, label: dict.common.next, Icon: ArrowRight },
          ].map(({ p, label, Icon }, i) => (
            <Link key={label} href={path(p.href)} className={`neighbor group ${i === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="neighbor-media" aria-hidden>
                <ProjectVisual slug={p.slug} alt="" sizes="20rem" />
              </div>
              <div className={i === 1 ? "md:text-right" : undefined}>
                <span className={`text-mono inline-flex items-center gap-2 text-muted-foreground ${i === 1 ? "md:flex-row-reverse" : ""}`}>
                  <Icon size={13} className={i === 0 ? "transition-transform group-hover:-translate-x-1" : "transition-transform group-hover:translate-x-1"} aria-hidden />
                  {label}
                </span>
                <span className="text-h1 mt-2 block">{p.title}</span>
                <span className="text-small mt-1 block text-muted-foreground">{p.tagline}</span>
              </div>
            </Link>
          ))}
        </nav>
      </section>

      <HomeCta />
    </article>
  );
}
