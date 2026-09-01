import { eyfelCaseStudy } from "./eyfel";
import { fmdCaseStudy } from "./fmd";
import { tavukCaseStudy } from "./tavuk-da-tavuk";
import type { CompactCaseStudy, CompactCaseStudySlug } from "./compact-types";

const registry: Record<CompactCaseStudySlug, CompactCaseStudy> = {
  eyfel: eyfelCaseStudy,
  fmd: fmdCaseStudy,
  "tavuk-da-tavuk": tavukCaseStudy,
};

export function getCompactCaseStudy(
  slug: string,
): CompactCaseStudy | undefined {
  return registry[slug as CompactCaseStudySlug];
}

export function isCompactCaseStudySlug(
  slug: string,
): slug is CompactCaseStudySlug {
  return slug in registry;
}

export { eyfelCaseStudy, fmdCaseStudy, tavukCaseStudy };
