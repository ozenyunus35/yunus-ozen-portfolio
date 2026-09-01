"use client";

import { LogisticsFlowDiagram } from "@/components/work/LogisticsFlowDiagram";
import type { CaseStudyFlowStep } from "@/lib/data/case-studies/types";
import type { FlowNode } from "@/lib/data/projects";

type DeliveryFlowVisualProps = {
  steps: CaseStudyFlowStep[];
};

function toFlowNodes(steps: CaseStudyFlowStep[]): FlowNode[] {
  return steps.map((step) => ({
    id: step.id,
    label: step.label.toUpperCase(),
    meta: step.annotation,
  }));
}

export function DeliveryFlowVisual({ steps }: DeliveryFlowVisualProps) {
  return (
    <div className="overflow-x-auto border border-border bg-background p-4 sm:p-6 md:overflow-visible md:p-10">
      <LogisticsFlowDiagram
        nodes={toFlowNodes(steps)}
        layout="horizontal"
        size="sm"
        label="Order delivery flow"
      />
    </div>
  );
}
