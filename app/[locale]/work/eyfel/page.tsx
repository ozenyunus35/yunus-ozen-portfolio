import type { Metadata } from "next";
import { StaticRedirect } from "@/components/seo/StaticRedirect";
import { withBasePath } from "@/lib/data/base-path";
import {
  generateCompactCaseStudyMetadata,
  resolveLocale,
} from "@/lib/work/compact-case-study-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return generateCompactCaseStudyMetadata("eyfel", locale);
}

export default async function EyfelRedirectPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <StaticRedirect target={withBasePath(`/${locale}/work/eyfel-kurye/`)} />;
}
