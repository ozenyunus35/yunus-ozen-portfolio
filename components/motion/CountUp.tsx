"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Counts up to `value` the first time it scrolls into view. The HTML carries the real number,
 * so it is right without JavaScript, with reduced motion and for screen readers.
 */
export function CountUp({ value, duration = 1400, className }: { value: number; duration?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>("-10% 0px");
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const played = useRef(false);

  useEffect(() => {
    if (!inView || reduced || played.current) return;
    played.current = true;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
