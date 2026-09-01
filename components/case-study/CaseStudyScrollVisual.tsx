"use client";

import { EyfelVelocityVisual } from "@/components/visuals/EyfelVelocityVisual";
import { FmdModularVisual } from "@/components/visuals/FmdModularVisual";
import { TavukPhysicalVisual } from "@/components/visuals/TavukPhysicalVisual";
import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";

type CaseStudyScrollVisualProps = {
  study: CompactCaseStudy;
  activeBeat: number;
};

export function CaseStudyScrollVisual({ study, activeBeat }: CaseStudyScrollVisualProps) {
  switch (study.visual) {
    case "delivery-horizontal":
      return <EyfelVelocityVisual activeStep={activeBeat} fill />;
    case "dashboard-ia":
      return <FmdModularVisual activeStep={activeBeat} fill />;
    case "qr-journey":
      return <TavukPhysicalVisual activeStep={activeBeat} fill />;
    default:
      return null;
  }
}
