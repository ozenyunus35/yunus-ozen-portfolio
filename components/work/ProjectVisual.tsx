import type { Project } from "@/lib/data/projects";
import { ProjectLoopVisual } from "@/components/work/ProjectLoopVisual";

type ProjectVisualProps = {
  project: Project;
  size?: "lg" | "sm";
  className?: string;
};

export function ProjectVisual({ project, size = "sm", className }: ProjectVisualProps) {
  return (
    <ProjectLoopVisual
      project={project}
      compact={size === "sm"}
      className={className}
    />
  );
}
