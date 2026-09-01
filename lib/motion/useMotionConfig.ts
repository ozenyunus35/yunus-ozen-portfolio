"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  MOTION_DISTANCE,
  MOTION_STAGGER,
} from "@/lib/motion/constants";

export function useMotionConfig() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reducedMotion || isMobile;

  return {
    reducedMotion,
    isMobile,
    disabled,
    magnetic: !disabled,
    customCursor: !reducedMotion && !isMobile,
    parallaxSpeed: disabled ? 0 : 0.12,
    revealDistance: disabled ? 0 : isMobile ? MOTION_DISTANCE.sm : MOTION_DISTANCE.md,
    stagger: disabled ? 0 : isMobile ? MOTION_STAGGER.tight : MOTION_STAGGER.base,
  };
}
