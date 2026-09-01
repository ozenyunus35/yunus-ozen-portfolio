"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MotionContextValue = {
  reducedMotion: boolean;
  isMobile: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  isMobile: false,
});

export function useMotionContext(): MotionContextValue {
  return useContext(MotionContext);
}

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reducedMotion);
    document.documentElement.dataset.mobile = String(isMobile);
  }, [reducedMotion, isMobile]);

  return (
    <MotionContext.Provider value={{ reducedMotion, isMobile }}>
      {children}
    </MotionContext.Provider>
  );
}
