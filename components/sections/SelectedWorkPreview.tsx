"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { RevealText } from "@/components/motion/RevealText";
import { ProjectCardPrimary } from "@/components/work/ProjectCardPrimary";
import { Section } from "@/components/ui/Section";
import {
  getPrimaryProject,
  getSecondaryProjects,
  selectedWorkIntro,
} from "@/lib/data/projects";

export function SelectedWorkPreview() {
  const primary = getPrimaryProject();
  const secondary = getSecondaryProjects().slice(0, 2);

  return (
    <Section
      id="work"
      number={selectedWorkIntro.number}
      label={selectedWorkIntro.label}
      headingId="work-heading"
      bordered
      spacing="default"
    >
      <RevealText className="mb-12 md:mb-16">
        <h2 id="work-heading" className="text-h2 max-w-3xl text-foreground">
          {selectedWorkIntro.headline[0]}
          <br />
          <span className="text-muted-foreground">
            {selectedWorkIntro.headline[1]}
          </span>
        </h2>
      </RevealText>

      <RevealBlock>
        <ProjectCardPrimary project={primary} />
      </RevealBlock>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {secondary.map((project, index) => (
          <RevealBlock key={project.slug} delay={index * 0.08}>
            <Link
              href={project.href}
              className="group block border border-border bg-surface p-6 transition-colors hover:border-accent/30 hover:bg-surface-elevated md:p-8"
            >
              <p className="text-label text-accent">{project.industry}</p>
              <h3 className="text-h3 mt-3 text-foreground">{project.displayTitle}</h3>
              <p className="text-body mt-3 text-muted-foreground">{project.tagline}</p>
              <span className="text-label mt-6 inline-flex items-center gap-2 text-foreground group-hover:text-accent">
                View project
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </Link>
          </RevealBlock>
        ))}
      </div>

      <RevealBlock className="mt-10">
        <Link
          href="/work"
          className="text-label inline-flex min-h-11 items-center gap-2 border border-border px-6 py-3 text-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          View all work
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </RevealBlock>
    </Section>
  );
}
