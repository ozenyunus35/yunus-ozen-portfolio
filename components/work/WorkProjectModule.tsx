import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { ProjectLoopVisual } from "@/components/work/ProjectLoopVisual";
import { cn } from "@/lib/utils/cn";

type WorkProjectModuleProps = {
  project: Project;
  index: number;
};

export function WorkProjectModule({ project, index }: WorkProjectModuleProps) {
  const isPrimary = project.tier === "primary";
  const number = String(index + 1).padStart(2, "0");
  const reversed = index % 2 === 1 && !isPrimary;

  return (
    <article
      className={cn(
        "group border border-border bg-surface transition-colors duration-500",
        "hover:border-accent/30 hover:bg-surface-elevated",
        isPrimary && "border-accent/20",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 lg:gap-0",
          reversed && "lg:[direction:rtl]",
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-between p-6 md:p-10 lg:col-span-5 lg:p-12",
            reversed && "lg:[direction:ltr]",
          )}
        >
          <div>
            <p className="text-mono text-muted-foreground">{number}</p>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="text-h2 text-foreground">{project.displayTitle}</h2>
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
            <ul className="flex flex-wrap gap-2" role="list">
              {project.roles.map((role) => (
                <li
                  key={role}
                  className="text-mono border border-border px-2 py-1 text-muted-foreground"
                >
                  {role}
                </li>
              ))}
            </ul>

            <Link
              href={project.href}
              className={cn(
                "text-label mt-8 inline-flex min-h-11 items-center gap-2 py-2",
                "text-foreground transition-colors duration-300 group-hover:text-accent",
              )}
            >
              {isPrimary ? "EXPLORE CASE STUDY" : "VIEW PROJECT"}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "border-t border-border p-6 md:p-10 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-12",
            reversed && "lg:[direction:ltr] lg:border-l-0 lg:border-r",
          )}
        >
          <div className="flex min-h-[240px] items-center justify-center md:min-h-[320px]">
            <ProjectLoopVisual project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
