import type { Project } from "@/lib/data/projects";
import { BisevkFlow } from "@/components/project-visualizations/BisevkFlow";
import { EyfelKuryeFlow } from "@/components/project-visualizations/EyfelKuryeFlow";
import { FmdSystem } from "@/components/project-visualizations/FmdSystem";
import { TavukDaTavukFlow } from "@/components/project-visualizations/TavukDaTavukFlow";

type ProjectLoopVisualProps = {
  project: Project;
  compact?: boolean;
  className?: string;
};

export function ProjectLoopVisual({
  project,
  compact = false,
  className,
}: ProjectLoopVisualProps) {
  switch (project.slug) {
    case "bisevk":
      return <BisevkFlow compact={compact} className={className} />;
    case "eyfel":
      return <EyfelKuryeFlow compact={compact} className={className} />;
    case "fmd":
      return <FmdSystem compact={compact} className={className} />;
    case "tavuk-da-tavuk":
      return <TavukDaTavukFlow compact={compact} className={className} />;
    default:
      return null;
  }
}
