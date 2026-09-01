"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import {
  MOTION_DURATION,
  MOTION_EASE,
} from "@/lib/motion/constants";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type RevealBlockProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function RevealBlock({
  children,
  className,
  delay = 0,
  distance,
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { disabled, revealDistance } = useMotionConfig();
  const travel = distance ?? revealDistance;

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || travel === 0) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: travel,
        duration: MOTION_DURATION.base,
        delay,
        ease: MOTION_EASE.gsapOut,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [disabled, travel, delay]);

  return (
    <div ref={ref} className={cn("motion-reveal-block", className)}>
      {children}
    </div>
  );
}
