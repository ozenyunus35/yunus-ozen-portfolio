"use client";

import { RevealText } from "@/components/motion/RevealText";
import { CapabilityMap } from "@/components/positioning/CapabilityMap";
import { Section } from "@/components/ui/Section";
import { positioningContent } from "@/lib/data/site";

export function Positioning() {
  return (
    <Section
      id="positioning"
      number="02"
      label="Positioning"
      headingId="positioning-heading"
      bordered
      spacing="default"
    >
      <RevealText>
        <blockquote className="max-w-4xl">
          <h2 id="positioning-heading" className="text-h2 text-foreground">
            {positioningContent.statement[0]}
          </h2>
          <p className="text-h2 mt-2 text-muted-foreground md:mt-4">
            {positioningContent.statement[1]}
          </p>
        </blockquote>
      </RevealText>

      <div className="mt-16 border-t border-border pt-16">
        <CapabilityMap />
      </div>
    </Section>
  );
}
