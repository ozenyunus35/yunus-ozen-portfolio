import type { Locale } from "@/lib/i18n/config";
import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";
import { bisevkCaseStudy as bisevkEn } from "@/lib/data/case-studies/bisevk";
import { eyfelCaseStudy as eyfelEn } from "@/lib/data/case-studies/eyfel";
import { fmdCaseStudy as fmdEn } from "@/lib/data/case-studies/fmd";
import { tavukCaseStudy as tavukEn } from "@/lib/data/case-studies/tavuk-da-tavuk";
import { bisevkCaseStudyTr } from "./tr/bisevk";
import { eyfelCaseStudyTr } from "./tr/eyfel";
import { fmdCaseStudyTr } from "./tr/fmd";
import { tavukCaseStudyTr } from "./tr/tavuk-da-tavuk";

export function getBisevkCaseStudy(locale: Locale) {
  return locale === "tr" ? bisevkCaseStudyTr : bisevkEn;
}

export function getCompactCaseStudy(slug: string, locale: Locale): CompactCaseStudy | undefined {
  const map = {
    tr: {
      eyfel: eyfelCaseStudyTr,
      fmd: fmdCaseStudyTr,
      "tavuk-da-tavuk": tavukCaseStudyTr,
    },
    en: {
      eyfel: eyfelEn,
      fmd: fmdEn,
      "tavuk-da-tavuk": tavukEn,
    },
  } as const;

  const registry = map[locale];
  return registry[slug as keyof typeof registry];
}
