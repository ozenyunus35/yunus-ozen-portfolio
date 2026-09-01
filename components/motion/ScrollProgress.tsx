"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type ScrollProgressProps = {
  className?: string;
};

/** Tracks overall page scroll progress — fixed to viewport top. */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const { disabled } = useMotionConfig();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || disabled) return;

    registerGsapPlugins();

    const setter = gsap.quickSetter(bar, "scaleX");

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setter(self.progress);
      },
    });

    return () => {
      trigger.kill();
      setter(0);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-border",
        className,
      )}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[var(--accent)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

type SectionScrollProgressProps = {
  sectionId: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

/**
 * Tracks scroll progress through a section.
 * Updates DOM directly via quickSetter — no React state during scroll.
 */
export function SectionScrollProgress({
  sectionId,
  className,
  orientation = "horizontal",
}: SectionScrollProgressProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const { disabled } = useMotionConfig();
  const isHorizontal = orientation === "horizontal";

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const fill = fillRef.current;
    if (!section || !fill || disabled) return;

    registerGsapPlugins();

    const setter = isHorizontal
      ? gsap.quickSetter(fill, "scaleX")
      : gsap.quickSetter(fill, "scaleY");

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        setter(self.progress);
      },
    });

    return () => {
      trigger.kill();
      setter(0);
    };
  }, [sectionId, isHorizontal, disabled]);

  if (disabled) return null;

  return (
    <div
      className={cn(
        "bg-border",
        isHorizontal ? "h-px w-full" : "h-32 w-px",
        className,
      )}
      aria-hidden="true"
    >
      <div
        ref={fillRef}
        className={cn(
          "bg-accent",
          isHorizontal
            ? "h-full w-full origin-left"
            : "h-full w-full origin-top",
        )}
        style={{ transform: isHorizontal ? "scaleX(0)" : "scaleY(0)" }}
      />
    </div>
  );
}
