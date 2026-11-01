"use client";

import type { ReactNode } from "react";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <ScrollProgress />
      {children}
      <CommandMenu />
    </MotionProvider>
  );
}
