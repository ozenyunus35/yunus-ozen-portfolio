"use client";

import { AmbientSystemBackground } from "@/components/motion/AmbientSystemBackground";
import { BisevkFlow } from "@/components/project-visualizations/BisevkFlow";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

export function HeroBackground() {
  const { reducedMotion } = useMotionConfig();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <AmbientSystemBackground intensity={1.2} showCoordinates />

      {!reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.12]">
          <div className="w-full max-w-2xl px-8">
            <BisevkFlow compact />
          </div>
        </div>
      )}

      <div
        className={cn(
          "hero-grid absolute inset-0 mix-blend-soft-light",
          !reducedMotion && "hero-grid-animate",
        )}
        style={{ opacity: 0.2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
    </div>
  );
}
