"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import type { CaseStudyFlowStep } from "@/lib/data/case-studies/types";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type QrJourneyVisualProps = {
  steps: CaseStudyFlowStep[];
};

export function QrJourneyVisual({ steps }: QrJourneyVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { disabled } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.from("[data-qr-step]", {
        opacity: 0,
        y: 20,
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
  }, [disabled]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-6 border border-border bg-background p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-10"
    >
      {/* Phone + QR */}
      <div className="flex justify-center">
        <div className="border border-border bg-surface p-4">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
          <div className="w-[9rem] md:w-[10rem]">
            <div
              data-qr-step
              className="mx-auto mb-4 grid h-16 w-16 grid-cols-3 grid-rows-3 gap-0.5 border border-accent/40 p-1.5"
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-border/50",
                    i === 4 && "bg-accent/40",
                  )}
                />
              ))}
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-px bg-border"
                  style={{ width: `${100 - i * 20}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Journey steps */}
      <div className="flex flex-col justify-center gap-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            data-qr-step
            className="flex items-start gap-4 border-l border-border pl-4 transition-colors hover:border-accent/50"
          >
            <span className="text-mono text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-label text-foreground">{step.label}</p>
              {step.annotation && (
                <p className="text-mono mt-1 text-muted-foreground">
                  {step.annotation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
