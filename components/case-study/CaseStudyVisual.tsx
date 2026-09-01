"use client";

import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";
import { EyfelRouteVisual } from "@/components/continuum/EyfelRouteVisual";
import { FmdModuleVisual } from "@/components/continuum/FmdModuleVisual";
import { TavukFlowVisual } from "@/components/continuum/TavukFlowVisual";

type CaseStudyVisualProps = {
  study: CompactCaseStudy;
};

export function CaseStudyVisual({ study }: CaseStudyVisualProps) {
  switch (study.visual) {
    case "delivery-horizontal":
      return <EyfelRouteVisual className="w-full" />;
    case "dashboard-ia":
      return <FmdModuleVisual className="w-full" />;
    case "qr-journey":
      return <TavukFlowVisual className="w-full" />;
    default:
      return null;
  }
}
