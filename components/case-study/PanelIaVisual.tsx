"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";

type FocusItem = {
  id: string;
  label: string;
  description: string;
};

type PanelIaVisualProps = {
  items: FocusItem[];
};

export function PanelIaVisual({ items }: PanelIaVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { disabled } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    registerGsapPlugins();

    const panels = container.querySelectorAll("[data-ia-panel]");

    const ctx = gsap.context(() => {
      gsap.from(panels, {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [items, disabled]);

  return (
    <div
      ref={containerRef}
      className="border border-border bg-background p-4 md:p-6"
      role="img"
      aria-label="Management panel information architecture preview"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
        <div className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
        <div className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
        <div className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
        <span className="text-mono ml-2 text-muted-foreground">
          Management Panel
        </span>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-3">
        <nav
          aria-label="Panel navigation"
          className="flex gap-2 overflow-x-auto pb-1 md:col-span-3 md:flex-col md:overflow-visible md:border-r md:border-border md:pr-3"
        >
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              data-ia-panel
              className="shrink-0 border border-border bg-surface px-3 py-2 md:px-3 md:py-2.5"
            >
              <span className="text-mono whitespace-nowrap text-[0.6875rem] text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        <div className="space-y-2 md:col-span-9 md:space-y-3">
          <div
            data-ia-panel
            className="border border-accent/30 bg-surface-elevated p-3 md:p-4"
          >
            <span className="text-label text-accent">
              {items[0]?.label ?? "Overview"}
            </span>
            <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 border border-border bg-background md:h-10" />
              ))}
            </div>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              data-ia-panel
              className="border border-border bg-surface p-3 md:p-4"
            >
              <span className="text-label text-foreground">{item.label}</span>
              <p className="text-small mt-2 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
