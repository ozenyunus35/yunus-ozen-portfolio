import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { Section } from "@/components/ui/Section";

type CaseStudyShellProps = {
  project: Project;
  children?: ReactNode;
};

export function CaseStudyShell({ project, children }: CaseStudyShellProps) {
  return (
    <article>
      <Section spacing="sm" bordered>
        <Link
          href="/#work"
          className="text-label inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-[var(--radius-sm)]"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Work
        </Link>

        <header className="mt-12 max-w-3xl">
          <p className="text-label text-muted-foreground">
            Case Study
            {project.status === "ongoing" && " — Ongoing"}
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="text-h1 text-foreground">{project.title}</h1>
            <span className="text-label text-muted-foreground">
              {project.period}
            </span>
          </div>
          <p className="text-label mt-3 text-accent">{project.industry}</p>
          <p className="text-body mt-6 text-muted-foreground">
            {project.tagline}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" role="list">
            {project.roles.map((role) => (
              <li
                key={role}
                className="text-mono border border-border px-2 py-1 text-muted-foreground"
              >
                {role}
              </li>
            ))}
          </ul>
        </header>
      </Section>

      <Section spacing="default" containerClassName="max-w-3xl">
        {children ?? (
          <div className="rounded-[var(--radius-md)] border border-border bg-surface p-8 md:p-12">
            <p className="text-label text-accent">Case study in progress</p>
            <p className="text-body mt-4 text-muted-foreground">
              {project.description}
            </p>
          </div>
        )}
      </Section>
    </article>
  );
}
