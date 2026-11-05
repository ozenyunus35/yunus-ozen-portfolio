"use client";

import type { ReactNode } from "react";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { MotionProvider } from "@/components/motion/MotionProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      {children}
      <CommandMenu />
    </MotionProvider>
  );
}
