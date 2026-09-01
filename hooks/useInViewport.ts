"use client";

import { useEffect, useState, type RefObject } from "react";

type UseInViewportOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useInViewport(
  ref: RefObject<Element | null>,
  { rootMargin = "120px", threshold = 0 }: UseInViewportOptions = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const initiallyVisible =
      rect.top < window.innerHeight + parseRootMargin(rootMargin) &&
      rect.bottom > -parseRootMargin(rootMargin);
    setInView(initiallyVisible);

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}

function parseRootMargin(rootMargin: string): number {
  const match = rootMargin.match(/^(-?\d+(?:\.\d+)?)px$/);
  return match ? Math.abs(Number(match[1])) : 0;
}
