"use client";

import { useEffect, useRef, Fragment } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/motion/gsap";
import type { CaseStudyFlowStep } from "@/lib/data/case-studies/types";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type ScrollFlowDiagramProps = {
  steps: CaseStudyFlowStep[];
  className?: string;
};

type StepState = "completed" | "active" | "upcoming";

function applyStates(
  stepElements: NodeListOf<Element>,
  activeIndex: number,
) {
  stepElements.forEach((element, index) => {
    let state: StepState = "upcoming";
    if (index < activeIndex) state = "completed";
    else if (index === activeIndex) state = "active";
    element.setAttribute("data-flow-state", state);
  });
}

export function ScrollFlowDiagram({ steps, className }: ScrollFlowDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const { disabled } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const stepElements = container.querySelectorAll("[data-flow-step]");

    if (disabled) {
      applyStates(stepElements, steps.length - 1);
      fill.style.transform = "scaleY(1)";
      return;
    }

    registerGsapPlugins();
    const fillSetter = gsap.quickSetter(fill, "scaleY");

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 40%",
      end: "bottom 60%",
      onUpdate: (self) => {
        fillSetter(self.progress);
        const activeIndex = Math.min(
          Math.floor(self.progress * steps.length),
          steps.length - 1,
        );
        applyStates(stepElements, activeIndex);
      },
    });

    applyStates(stepElements, 0);

    return () => {
      trigger.kill();
      fillSetter(0);
    };
  }, [steps, disabled]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className="absolute bottom-0 left-[0.9375rem] top-0 w-px bg-border md:left-4"
        aria-hidden="true"
      >
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full w-full origin-top bg-accent/60"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <ol className="relative flex list-none flex-col p-0">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            <li
              data-flow-step
              data-flow-state="upcoming"
              className="cs-flow-step grid grid-cols-[2rem_1fr] gap-x-6 md:grid-cols-[2.5rem_1fr] md:gap-x-8"
            >
              <div className="flex justify-center pt-1.5">
                <span
                  className="cs-flow-dot block h-2.5 w-2.5 rounded-full border border-border bg-background transition-all duration-500"
                  aria-hidden="true"
                />
              </div>
              <div className="pb-8 md:pb-10">
                <p className="cs-flow-label text-label transition-colors duration-500">
                  {step.label}
                </p>
                {step.annotation && (
                  <p className="cs-flow-annotation text-mono mt-1.5 transition-all duration-500">
                    {step.annotation}
                  </p>
                )}
              </div>
            </li>
            {index < steps.length - 1 && (
              <div
                className="cs-flow-connector ml-[0.9375rem] h-4 w-px bg-border transition-colors duration-500 md:ml-4"
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
