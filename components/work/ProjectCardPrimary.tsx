import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { cn } from "@/lib/utils/cn";

type ProjectCardPrimaryProps = {
  project: Project;
};

export function ProjectCardPrimary({ project }: ProjectCardPrimaryProps) {
  return (
    <Link
      href={project.href}
      data-cursor="project"
      className={cn(
        "group relative block border border-border bg-surface",
        "transition-all duration-500",
        "hover:border-accent/40 hover:bg-surface-elevated",
        "focus-visible:rounded-[var(--radius-sm)]",
        "motion-safe:hover:-translate-y-1",
      )}
    >
      <div className="grid-layout gap-0">
        {/* Content */}
        <div className="col-span-4 flex flex-col justify-between p-6 md:col-span-5 md:p-10 lg:p-12">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h3 className="text-h2 text-foreground">{project.displayTitle}</h3>
              <span className="text-label text-muted-foreground">
                {project.period}
              </span>
            </div>
            <p className="text-label mt-3 text-accent">{project.industry}</p>
            <p className="text-body mt-6 max-w-md text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <ul
              className="flex flex-wrap gap-2 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              role="list"
            >
              {project.roles.map((role) => (
                <li
                  key={role}
                  className="text-mono border border-border px-2 py-1 text-muted-foreground transition-colors duration-500 group-hover:border-accent/30 group-hover:text-foreground"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2">
              <span className="text-label text-foreground transition-colors duration-300 group-hover:text-accent">
                VIEW CASE STUDY
              </span>
              <ArrowUpRight
                size={14}
                className="text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="col-span-4 border-t border-border p-6 md:col-span-7 md:border-t-0 md:border-l md:p-10 lg:p-12">
          <div className="flex h-full min-h-[280px] items-center justify-center transition-transform duration-700 motion-safe:group-hover:scale-[1.02] md:min-h-[360px]">
            <ProjectVisual project={project} size="lg" />
          </div>
          {project.status === "ongoing" && (
            <p className="text-mono mt-4 text-center text-muted-foreground md:text-right">
              Ongoing project
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
