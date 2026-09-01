"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import {
  MOTION_DURATION,
  MOTION_EASE,
} from "@/lib/motion/constants";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  stagger?: number;
  delay?: number;
};

export function StaggerGroup({
  children,
  className,
  itemSelector = "[data-stagger-item]",
  stagger,
  delay = 0,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { disabled, stagger: defaultStagger, revealDistance } =
    useMotionConfig();
  const staggerValue = stagger ?? defaultStagger;

  useEffect(() => {
    const container = ref.current;
    if (!container || disabled || revealDistance === 0) return;

    const items = container.querySelectorAll(itemSelector);
    if (items.length === 0) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: revealDistance,
        duration: MOTION_DURATION.base,
        stagger: staggerValue,
        delay,
        ease: MOTION_EASE.gsapOut,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [disabled, staggerValue, revealDistance, delay, itemSelector]);

  return (
    <div ref={ref} className={cn("motion-stagger-group", className)}>
      {children}
    </div>
  );
}
