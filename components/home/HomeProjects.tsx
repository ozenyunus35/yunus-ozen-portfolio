"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { ProjectCard } from "@/components/work/ProjectCard";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Every project as a card: the screenshots on top, the field, the name and one line about it below. */
export function HomeProjects() {
  const { dict, path } = useI18n();
  const { work, projects, home } = dict;

  return (
    <section id="work" className="theme-frost py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel number="03" label={work.sectionLabel} />
            <h2 className="text-section font-display mt-6 max-w-2xl">{work.headline}</h2>
          </div>
          <Link href={path("/work")} className="btn-ghost">
            {home.projectsCta}
            <ArrowUpRight size={15} />
          </Link>
        </ScrollReveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ScrollReveal delay={(i % 3) * 0.06} className="h-full">
                <ProjectCard project={project} number={String(i + 1).padStart(2, "0")} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
