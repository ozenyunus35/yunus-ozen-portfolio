/** Centralized motion language — do not scatter arbitrary values in components. */

export const MOTION_DURATION = {
  instant: 0.1,
  /** 150–250ms — micro interactions */
  fast: 0.2,
  /** 300–500ms — standard UI */
  base: 0.45,
  /** 400–700ms — page transitions */
  page: 0.55,
  slow: 0.8,
  /** 1–2s — diagram transitions */
  diagram: 1.2,
  /** 6–12s — ambient loops */
  ambient: 10,
  slower: 1.2,
} as const;

export const MOTION_EASE = {
  /** Primary editorial ease — smooth deceleration */
  out: [0.22, 1, 0.36, 1] as const,
  /** Subtle entrance */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** GSAP-compatible string */
  gsapOut: "power3.out",
  gsapInOut: "power2.inOut",
} as const;

export const MOTION_STAGGER = {
  tight: 0.04,
  base: 0.08,
  relaxed: 0.12,
  loose: 0.16,
} as const;

export const MOTION_DISTANCE = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
} as const;

export const MOTION_VIEWPORT = {
  once: true,
  margin: "-10% 0px -10% 0px",
  amount: 0.2,
} as const;
