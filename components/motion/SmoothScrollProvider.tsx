"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/motion/gsap";
import { refreshScrollTriggers } from "@/lib/motion/scroll-utils";

const HEADER_OFFSET = 80;

type ScrollContextValue = {
  scrollTo: (target: string) => void;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useSmoothScroll(): ScrollContextValue {
  const context = useContext(ScrollContext);
  if (!context) {
    return {
      scrollTo: (target: string) => {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    };
  }
  return context;
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const { disabled } = useMotionConfig();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback((target: string) => {
    const element = document.querySelector(target) as HTMLElement | null;
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -HEADER_OFFSET });
      return;
    }

    const top =
      element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: disabled ? "auto" : "smooth" });
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;

    registerGsapPlugins();
    ScrollTrigger.config({ limitCallbacks: true });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      ScrollTrigger.clearScrollMemory();
    };
  }, [disabled]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    refreshScrollTriggers();
  }, [pathname]);

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}
