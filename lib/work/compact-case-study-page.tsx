import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CompactCaseStudyPage } from "@/components/case-study/CompactCaseStudyPage";
import { getCompactCaseStudy } from "@/lib/i18n/case-studies";
import { createProjectMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import { isLocale } from "@/lib/i18n/config";

export function generateCompactCaseStudyMetadata(slug: string, locale: Locale): Metadata {
  const study = getCompactCaseStudy(slug, locale);
  if (!study) return {};
  return createProjectMetadata(study.meta.title, study.meta.description, study.slug, locale);
}

export function CompactCaseStudyRoute({ slug, locale }: { slug: string; locale: Locale }) {
  const study = getCompactCaseStudy(slug, locale);
  if (!study) notFound();
  return <CompactCaseStudyPage study={study} />;
}

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : "tr";
}
