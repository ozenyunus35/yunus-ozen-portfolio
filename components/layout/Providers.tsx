"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ScrollRestoration } from "@/components/motion/ScrollRestoration";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <SmoothScrollProvider>
        <ScrollRestoration />
        <ScrollProgress />
        {children}
      </SmoothScrollProvider>
    </MotionProvider>
  );
}
