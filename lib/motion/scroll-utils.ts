"use client";

import { registerGsapPlugins, ScrollTrigger } from "@/lib/motion/gsap";

export function refreshScrollTriggers(): void {
  requestAnimationFrame(() => {
    registerGsapPlugins();
    ScrollTrigger.refresh();
  });
}

export function resetScrollPosition(): void {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  registerGsapPlugins();
  ScrollTrigger.clearScrollMemory();
  ScrollTrigger.update();
}

/** Run after route changes — repeat on the next frames so layout/animations cannot restore old scroll. */
export function resetScrollPositionOnNavigation(): void {
  resetScrollPosition();

  requestAnimationFrame(() => {
    resetScrollPosition();
    requestAnimationFrame(() => {
      resetScrollPosition();
      refreshScrollTriggers();
    });
  });
}

export function scrollToTop(immediate = true): void {
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
