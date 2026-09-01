"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type ParallaxElementProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
};

export function ParallaxElement({
  children,
  className,
  speed,
  direction = "vertical",
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { disabled, parallaxSpeed } = useMotionConfig();
  const effectiveSpeed = speed ?? parallaxSpeed;

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || effectiveSpeed === 0) return;

    registerGsapPlugins();

    const prop = direction === "vertical" ? "y" : "x";
    const distance = 60 * effectiveSpeed;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { [prop]: -distance },
        {
          [prop]: distance,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, element);

    return () => ctx.revert();
  }, [disabled, effectiveSpeed, direction]);

  return (
    <div ref={ref} className={cn("motion-parallax", className)}>
      {children}
    </div>
  );
}
