"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useSchematicPhase<T>(phases: readonly T[], intervalMs = 2200): T {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || phases.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % phases.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [phases, intervalMs, reducedMotion]);

  return phases[index] ?? phases[0];
}
