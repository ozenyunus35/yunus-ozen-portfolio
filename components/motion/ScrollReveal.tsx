"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionContext } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils/cn";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

export function ScrollReveal({
  children,
  className,
  y = 56,
  delay = 0,
  duration = 1.1,
  start = "top 88%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionContext();

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, y, delay, duration, start]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={reducedMotion ? undefined : { opacity: 0 }}
    >
      {children}
    </div>
  );
}
