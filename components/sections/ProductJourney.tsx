"use client";

import { RevealText } from "@/components/motion/RevealText";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { Section } from "@/components/ui/Section";
import { productJourneyContent } from "@/lib/data/journey";

export function ProductJourney() {
  return (
    <Section
      id="journey"
      number={productJourneyContent.sectionNumber}
      label={productJourneyContent.sectionLabel}
      headingId="journey-heading"
      bordered
      spacing="default"
    >
      <RevealText className="mb-12 md:mb-16">
        <h2
          id="journey-heading"
          className="text-h2 max-w-3xl text-foreground"
        >
          {productJourneyContent.heading}
        </h2>
      </RevealText>

      <JourneyTimeline />
    </Section>
  );
}
