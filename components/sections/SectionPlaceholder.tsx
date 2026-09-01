"use client";

import { RevealBlock } from "@/components/motion/RevealBlock";
import { Section } from "@/components/ui/Section";

type SectionPlaceholderProps = {
  id: string;
  number: string;
  label: string;
};

export function SectionPlaceholder({
  id,
  number,
  label,
}: SectionPlaceholderProps) {
  return (
    <Section id={id} number={number} label={label} bordered spacing="default">
      <RevealBlock>
        <div className="max-w-2xl">
          <p className="text-label text-accent">Coming in a future phase</p>
          <p className="text-body mt-4 text-muted-foreground">
            This section is structurally in place. Content will be added in a
            later phase.
          </p>
        </div>
      </RevealBlock>
    </Section>
  );
}
