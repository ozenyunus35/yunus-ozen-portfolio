"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import {
  MOTION_DURATION,
  MOTION_EASE,
} from "@/lib/motion/constants";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type RevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { disabled, revealDistance } = useMotionConfig();

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || revealDistance === 0) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: revealDistance * 0.6,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: MOTION_DURATION.slow,
          delay,
          ease: MOTION_EASE.gsapOut,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, element);

    return () => ctx.revert();
  }, [disabled, revealDistance, delay]);

  return (
    <div
      ref={ref}
      className={cn("motion-reveal-text overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
