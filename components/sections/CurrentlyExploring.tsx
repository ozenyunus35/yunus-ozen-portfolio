"use client";

import { RevealBlock } from "@/components/motion/RevealBlock";
import { RevealText } from "@/components/motion/RevealText";
import { KnowledgeGraph } from "@/components/exploring/KnowledgeGraph";
import { Section } from "@/components/ui/Section";
import { exploringContent } from "@/lib/data/exploring";

export function CurrentlyExploring() {
  return (
    <Section
      id="exploring"
      number="05"
      label="Current Focus"
      headingId="exploring-heading"
      bordered
      spacing="default"
    >
      <RevealText className="mb-10 md:mb-14">
        <h2 id="exploring-heading" className="text-h2 text-foreground">
          {exploringContent.heading}
        </h2>
        <p className="text-h3 mt-4 max-w-md text-muted-foreground">
          {exploringContent.supporting[0]}
          <br />
          {exploringContent.supporting[1]}
        </p>
      </RevealText>

      <RevealBlock>
        <p className="text-label mb-6 text-accent">{exploringContent.statusLabel}</p>
        <KnowledgeGraph />
      </RevealBlock>
    </Section>
  );
}
