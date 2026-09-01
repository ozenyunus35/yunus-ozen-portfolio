"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import type { FlowNode } from "@/lib/data/projects";
import { cn } from "@/lib/utils/cn";

type MobileQrDiagramProps = {
  nodes: FlowNode[];
  className?: string;
};

export function MobileQrDiagram({ nodes, className }: MobileQrDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { disabled } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    registerGsapPlugins();

    const qr = container.querySelector("[data-qr-block]");
    const lines = container.querySelectorAll("[data-menu-line]");
    const steps = container.querySelectorAll("[data-mobile-step]");

    const ctx = gsap.context(() => {
      gsap.set(qr, { opacity: 0, scale: 0.9 });
      gsap.set(lines, { scaleX: 0, opacity: 0.3 });
      gsap.set(steps, { opacity: 0, x: -8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(qr, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" })
        .to(
          lines,
          { scaleX: 1, opacity: 0.6, duration: 0.35, stagger: 0.08, ease: "power2.out" },
          "-=0.2",
        )
        .to(
          steps,
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: "power3.out" },
          "-=0.15",
        );
    }, container);

    return () => ctx.revert();
  }, [nodes, disabled]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center",
        className,
      )}
    >
      <div
        className="relative shrink-0 border border-border bg-surface p-3 transition-transform duration-500 group-hover:-translate-y-1 md:p-4"
        aria-hidden="true"
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-border" />
        <div className="mt-3 w-[7.5rem] md:w-[8.5rem]">
          <div
            data-qr-block
            className="mx-auto mb-3 grid h-14 w-14 grid-cols-3 grid-rows-3 gap-0.5 border border-border p-1.5 transition-colors duration-500 group-hover:border-accent/50"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-border/60",
                  i % 3 === 0 && "bg-accent/30",
                  i === 4 && "bg-accent/50",
                )}
              />
            ))}
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                data-menu-line
                className="h-px origin-left bg-border"
                style={{ width: `${100 - i * 15}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <ol
        aria-label="QR to menu journey"
        className="flex w-full list-none flex-col gap-3 p-0 sm:w-auto"
      >
        {nodes.map((node) => (
          <li
            key={node.id}
            data-mobile-step
            className="border-l border-border pl-3 transition-colors duration-500 group-hover:border-accent/50"
          >
            <span className="text-label text-foreground">{node.label}</span>
            {node.meta && (
              <span className="text-mono mt-0.5 block text-muted-foreground">
                {node.meta}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
