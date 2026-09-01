"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import type { FlowNode } from "@/lib/data/projects";
import { cn } from "@/lib/utils/cn";

type DashboardDiagramProps = {
  nodes: FlowNode[];
  className?: string;
};

export function DashboardDiagram({ nodes, className }: DashboardDiagramProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const { disabled } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    registerGsapPlugins();

    const panels = container.querySelectorAll("[data-dashboard-panel]");

    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0.2, y: 12 });

      gsap.to(panels, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [nodes, disabled]);

  return (
    <ul
      ref={containerRef}
      aria-label="Dashboard structure"
      className={cn("grid list-none grid-cols-2 gap-2 p-0 md:gap-3", className)}
    >
      {nodes.map((node, index) => (
        <li
          key={node.id}
          data-dashboard-panel
          className={cn(
            "border border-border bg-surface p-3 transition-colors duration-500 md:p-4",
            "group-hover:border-accent/50 group-hover:bg-surface-elevated",
            index === 0 && "col-span-2",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-label text-foreground">{node.label}</span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-border transition-colors duration-500 group-hover:bg-accent"
              aria-hidden="true"
            />
          </div>
          {node.meta && (
            <span className="text-mono text-muted-foreground">{node.meta}</span>
          )}
          <div className="mt-3 space-y-1.5" aria-hidden="true">
            <div className="h-px w-full bg-border" />
            <div className="h-px w-3/4 bg-border/60" />
            <div className="h-px w-1/2 bg-border/40" />
          </div>
        </li>
      ))}
    </ul>
  );
}
