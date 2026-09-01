"use client";

import { RevealBlock } from "@/components/motion/RevealBlock";
import { ConceptMap } from "@/components/product-engineering/ConceptMap";
import { Section } from "@/components/ui/Section";
import { productEngineeringContent } from "@/lib/data/product-engineering";

export function ProductEngineering() {
  return (
    <Section
      id="product-engineering"
      number={productEngineeringContent.sectionNumber}
      label={productEngineeringContent.sectionLabel}
      headingId="product-engineering-heading"
      bordered
      spacing="default"
    >
      <RevealBlock>
        <ConceptMap />
      </RevealBlock>
    </Section>
  );
}
