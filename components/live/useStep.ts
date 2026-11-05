"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Steps a scripted demo forward while it is on screen. The first render shows the finished state, so the
 * page is complete without JavaScript and with reduced motion; the loop starts from step 0 once it is visible.
 */
export function useStep(count: number, stepMs: number, active: boolean) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(count - 1);

  useEffect(() => {
    if (!active || reduced) return;
    const start = setTimeout(() => setStep(0), 0);
    const tick = setInterval(() => setStep((n) => (n + 1) % (count + 2)), stepMs);
    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, [active, reduced, count, stepMs]);

  return reduced ? count - 1 : Math.min(step, count - 1);
}
