"use client";

import type { ReactNode } from "react";
import { CustomCursor } from "@/components/motion/CustomCursor";
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
        <CustomCursor />
        <ScrollProgress />
        {children}
      </SmoothScrollProvider>
    </MotionProvider>
  );
}
