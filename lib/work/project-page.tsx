import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/work/CaseStudyShell";
import { getProjectBySlug } from "@/lib/data/projects";
import { createProjectMetadata } from "@/lib/seo/metadata";

type ProjectPageProps = {
  slug: string;
};

export function generateProjectMetadata(slug: string, locale: "tr" | "en" = "tr"): Metadata {
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createProjectMetadata(project.title, project.description, project.slug, locale);
}

export function ProjectPage({ slug }: ProjectPageProps) {
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyShell project={project} />;
}
