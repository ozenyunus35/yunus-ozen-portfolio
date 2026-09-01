"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

export function ScrollIndicator() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <span className="text-label text-muted-foreground">Scroll</span>
      <div className="relative h-12 w-px bg-border">
        <span
          className={cn(
            "absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-accent",
            !reducedMotion && "scroll-indicator-line",
          )}
        />
      </div>
    </div>
  );
}
