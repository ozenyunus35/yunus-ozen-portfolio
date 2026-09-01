import type { Metadata } from "next";
import {
  CompactCaseStudyRoute,
  generateCompactCaseStudyMetadata,
  resolveLocale,
} from "@/lib/work/compact-case-study-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return generateCompactCaseStudyMetadata("tavuk-da-tavuk", locale);
}

export default async function TavukPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <CompactCaseStudyRoute slug="tavuk-da-tavuk" locale={locale} />;
}
