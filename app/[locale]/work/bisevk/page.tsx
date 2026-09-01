import type { Metadata } from "next";
import { BisevkExperience } from "@/components/case-study/BisevkExperience";
import { getBisevkCaseStudy } from "@/lib/i18n/case-studies";
import { createProjectMetadata } from "@/lib/seo/metadata";
import { isLocale } from "@/lib/i18n/config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isLocale(l) ? l : "tr";
  const cs = getBisevkCaseStudy(locale);
  return createProjectMetadata(cs.meta.title, cs.meta.description, cs.slug, locale);
}

export default function BisevkPage() {
  return <BisevkExperience />;
}
