import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { cn } from "@/lib/utils/cn";

type SecondaryLayout = "stacked" | "split" | "visual-emphasis";

type ProjectCardSecondaryProps = {
  project: Project;
  layout: SecondaryLayout;
};

const layoutStyles: Record<
  SecondaryLayout,
  { container: string; visual: string; content: string }
> = {
  stacked: {
    container: "flex flex-col",
    visual:
      "border-b border-border p-6 md:p-8 flex items-center justify-center min-h-[180px]",
    content: "p-6 md:p-8 flex flex-col flex-1",
  },
  split: {
    container: "grid grid-cols-1 md:grid-cols-2",
    visual:
      "border-t md:border-t-0 md:border-l border-border p-6 md:p-8 flex items-center justify-center min-h-[200px] order-first md:order-last",
    content: "p-6 md:p-8 flex flex-col justify-between",
  },
  "visual-emphasis": {
    container: "flex flex-col md:grid md:grid-cols-5",
    visual:
      "md:col-span-2 border-b md:border-b-0 md:border-r border-border p-6 md:p-8 flex items-center justify-center min-h-[200px] bg-muted/30",
    content: "md:col-span-3 p-6 md:p-8 flex flex-col justify-between",
  },
};

export function ProjectCardSecondary({
  project,
  layout,
}: ProjectCardSecondaryProps) {
  const styles = layoutStyles[layout];

  return (
    <Link
      href={project.href}
      data-cursor="project"
      className={cn(
        "group relative block h-full border border-border bg-surface",
        "transition-all duration-500",
        "hover:border-accent/40 hover:bg-surface-elevated",
        "focus-visible:rounded-[var(--radius-sm)]",
        "motion-safe:hover:-translate-y-1",
      )}
    >
      <div className={styles.container}>
        {/* Visual — top for stacked, side for others */}
        {layout === "stacked" && (
          <div
            className={cn(
              styles.visual,
              "transition-transform duration-700 motion-safe:group-hover:scale-[1.02]",
            )}
          >
            <ProjectVisual project={project} />
          </div>
        )}

        <div className={styles.content}>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-h3 text-foreground">{project.displayTitle}</h3>
            </div>
            <p className="text-label mt-2 text-muted-foreground">
              {project.period}
            </p>
            <p className="text-label mt-2 text-accent">{project.industry}</p>
            <p className="text-small mt-4 text-muted-foreground line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="mt-6">
            <ul
              className="flex flex-wrap gap-1.5 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              role="list"
            >
              {project.roles.slice(0, 3).map((role) => (
                <li
                  key={role}
                  className="text-mono border border-border px-2 py-1 text-[0.6875rem] text-muted-foreground transition-colors duration-500 group-hover:border-accent/30 group-hover:text-foreground md:text-[0.6875rem]"
                >
                  {role}
                </li>
              ))}
              {project.roles.length > 3 && (
                <li className="text-mono px-2 py-1 text-[0.6875rem] text-muted-foreground">
                  +{project.roles.length - 3}
                </li>
              )}
            </ul>

            <div className="mt-5 flex items-center gap-2">
              <span className="text-label text-foreground transition-colors duration-300 group-hover:text-accent">
                VIEW CASE STUDY
              </span>
              <ArrowUpRight
                size={12}
                className="text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {layout !== "stacked" && (
          <div
            className={cn(
              styles.visual,
              "transition-transform duration-700 motion-safe:group-hover:scale-[1.02]",
            )}
          >
            <ProjectVisual project={project} />
          </div>
        )}
      </div>
    </Link>
  );
}
