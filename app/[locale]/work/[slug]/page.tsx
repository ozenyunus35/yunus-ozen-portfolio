import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createProjectMetadata } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getDictionary(locale).projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = isLocale(l) ? l : "en";
  const project = getDictionary(locale).projects.find((p) => p.slug === slug);
  if (!project) return {};
  return createProjectMetadata(`${project.title} — ${project.tagline}`, project.description, slug, locale);
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !getDictionary(locale).projects.some((p) => p.slug === slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
