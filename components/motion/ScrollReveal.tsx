"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds, kept short so content never waits on the animation. */
  delay?: number;
};

let observer: IntersectionObserver | null = null;

/** One observer for every reveal on the page; each element is unobserved after it appears. */
function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  return observer;
}

/**
 * Fades content up as it scrolls into view. The hidden state only applies once
 * the `js` class is on <html>, so the content is never lost without JavaScript.
 */
export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${Math.min(delay, 0.3)}s` } : undefined}
    >
      {children}
    </div>
  );
}
