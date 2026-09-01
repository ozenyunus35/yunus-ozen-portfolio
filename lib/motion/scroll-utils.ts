"use client";

import { ScrollTrigger } from "@/lib/motion/gsap";

export function refreshScrollTriggers(): void {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export function scrollToTop(immediate = true): void {
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
