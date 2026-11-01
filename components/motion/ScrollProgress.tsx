"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

type ScrollProgressProps = {
  className?: string;
};

/** Thin bar at the top of the viewport that fills as the page scrolls. Writes to the DOM, never to React state. */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn("pointer-events-none fixed inset-x-0 top-0 z-[60] h-px", className)}
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
