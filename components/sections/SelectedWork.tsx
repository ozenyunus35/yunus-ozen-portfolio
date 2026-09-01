"use client";

import { RevealText } from "@/components/motion/RevealText";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { ProjectCardPrimary } from "@/components/work/ProjectCardPrimary";
import { ProjectCardSecondary } from "@/components/work/ProjectCardSecondary";
import { Section } from "@/components/ui/Section";
import {
  getPrimaryProject,
  getSecondaryProjects,
  selectedWorkIntro,
} from "@/lib/data/projects";

const secondaryLayouts = {
  eyfel: "stacked" as const,
  fmd: "split" as const,
  "tavuk-da-tavuk": "visual-emphasis" as const,
};

export function SelectedWork() {
  const primary = getPrimaryProject();
  const secondary = getSecondaryProjects();

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
        <h2
          id="work-heading"
          className="text-h2 max-w-3xl text-foreground"
        >
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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6">
        {secondary.map((project, index) => (
          <RevealBlock key={project.slug} delay={index * 0.08} className="h-full">
            <ProjectCardSecondary
              project={project}
              layout={
                secondaryLayouts[
                  project.slug as keyof typeof secondaryLayouts
                ] ?? "stacked"
              }
            />
          </RevealBlock>
        ))}
      </div>
    </Section>
  );
}
