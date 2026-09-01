"use client";

import { useEffect, useRef, Fragment } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import type { FlowNode } from "@/lib/data/projects";
import { cn } from "@/lib/utils/cn";

type LogisticsFlowDiagramProps = {
  nodes: FlowNode[];
  className?: string;
  layout?: "vertical" | "horizontal";
  size?: "lg" | "sm";
  /** Accessible name for the flow diagram */
  label?: string;
};

export function LogisticsFlowDiagram({
  nodes,
  className,
  layout = "vertical",
  size = "lg",
  label = "Process flow",
}: LogisticsFlowDiagramProps) {
  const containerRef = useRef<HTMLOListElement>(null);
  const { disabled } = useMotionConfig();
  const isVertical = layout === "vertical";

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    registerGsapPlugins();

    const nodeEls = container.querySelectorAll("[data-flow-node]");
    const lineEls = container.querySelectorAll("[data-flow-line]");
    const metaEls = container.querySelectorAll("[data-flow-meta]");

    const ctx = gsap.context(() => {
      gsap.set(nodeEls, {
        opacity: 0.25,
        y: isVertical ? 8 : 0,
        x: isVertical ? 0 : 8,
      });
      gsap.set(lineEls, {
        scaleY: isVertical ? 0 : 1,
        scaleX: isVertical ? 1 : 0,
        opacity: 0.2,
      });
      gsap.set(metaEls, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      nodes.forEach((_, index) => {
        tl.to(
          nodeEls[index],
          { opacity: 1, y: 0, x: 0, duration: 0.4, ease: "power3.out" },
          index * 0.12,
        );
        if (index > 0 && lineEls[index - 1]) {
          tl.to(
            lineEls[index - 1],
            {
              scaleY: 1,
              scaleX: 1,
              opacity: 0.6,
              duration: 0.3,
              ease: "power2.out",
            },
            index * 0.12 - 0.06,
          );
        }
        if (metaEls[index]) {
          tl.to(
            metaEls[index],
            { opacity: 1, duration: 0.25 },
            index * 0.12 + 0.1,
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, [nodes, disabled, isVertical]);

  return (
    <ol
      ref={containerRef}
      aria-label={label}
      className={cn(
        "flow-diagram list-none p-0",
        isVertical
          ? "flex flex-col items-center"
          : "flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center",
        className,
      )}
    >
      {nodes.map((node, index) => (
        <Fragment key={node.id}>
          {index > 0 && (
            <li
              aria-hidden="true"
              className={cn(
                "flex list-none justify-center",
                isVertical ? "my-0" : "md:contents",
              )}
            >
              <div
                data-flow-line
                className={cn(
                  "bg-border transition-colors duration-500 group-hover:bg-accent/40",
                  isVertical
                    ? "my-1 h-5 w-px origin-top scale-y-0 md:h-6"
                    : "my-1 h-5 w-px origin-top scale-y-0 md:my-0 md:mx-1 md:h-px md:w-5 md:origin-left md:scale-x-0 lg:w-6",
                )}
              />
            </li>
          )}
          <li className="flex list-none flex-col items-center">
            <div
              data-flow-node
              className={cn(
                "border border-border bg-surface transition-colors duration-500",
                "group-hover:border-accent/60 group-hover:bg-surface-elevated",
                size === "lg"
                  ? "min-w-0 w-full max-w-[12rem] px-4 py-3 sm:min-w-[6.5rem] sm:w-auto md:min-w-[7.5rem]"
                  : "min-w-0 w-full max-w-[10rem] px-3 py-2 sm:min-w-[4.5rem] sm:w-auto md:min-w-[5rem]",
              )}
            >
              <span
                className={cn(
                  "text-label block text-center text-foreground",
                  size === "sm" && "text-[0.6875rem] md:text-[0.6875rem]",
                )}
              >
                {node.label}
              </span>
            </div>
            {node.meta && (
              <span
                data-flow-meta
                className={cn(
                  "text-mono mt-1.5 text-center text-muted-foreground",
                  "opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100",
                  size === "sm" && "text-[0.6875rem]",
                )}
              >
                {node.meta}
              </span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
