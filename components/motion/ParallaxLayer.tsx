"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/gsap";
import { useMotionContext } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils/cn";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxLayer({ children, className, speed = 40 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionContext();

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, speed]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
