"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Counts up to `value` the first time it scrolls into view, and rolls on to the new number when
 * the value changes later (live counts). The HTML carries the real number, so it is right without
 * JavaScript, with reduced motion and for screen readers.
 */
export function CountUp({ value, duration = 1400, className }: { value: number; duration?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>("-10% 0px");
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<number | null>(null);
  const from = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || reduced) return;
    const start = from.current ?? 0;
    if (start === value) return;
    let frame = 0;
    const began = performance.now();
    const length = from.current === null ? duration : Math.min(duration, 700);
    const step = (now: number) => {
      const t = Math.min(1, (now - began) / length);
      const current = Math.round(start + (value - start) * (1 - Math.pow(1 - t, 3)));
      from.current = current;
      setShown(current);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    // Background tabs don't run animation frames: land on the number anyway.
    const settle = window.setTimeout(() => {
      from.current = value;
      setShown(value);
    }, length + 150);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{reduced || shown === null ? value : shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
