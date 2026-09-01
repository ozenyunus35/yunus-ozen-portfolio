"use client";

import { RevealBlock } from "@/components/motion/RevealBlock";
import { RevealText } from "@/components/motion/RevealText";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/data/about";

export function About() {
  return (
    <Section
      id="about"
      number={aboutContent.sectionNumber}
      label={aboutContent.sectionLabel}
      headingId="about-heading"
      bordered
      spacing="default"
    >
      <h2 id="about-heading" className="sr-only">
        {aboutContent.sectionLabel}
      </h2>
      <div className="grid-layout gap-y-12 lg:gap-y-0">
        <RevealText className="col-span-4 md:col-span-7 lg:col-span-7">
          <div className="max-w-2xl space-y-6">
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-body text-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </RevealText>

        <RevealBlock className="col-span-4 md:col-span-5 lg:col-span-5 lg:justify-self-end">
          <dl className="space-y-6 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
            {aboutContent.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-label text-muted-foreground">{item.label}</dt>
                <dd className="text-body mt-2 text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </RevealBlock>
      </div>
    </Section>
  );
}
