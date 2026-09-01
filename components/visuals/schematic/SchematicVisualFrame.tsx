"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SchematicVisualFrameProps = {
  children: ReactNode;
  aspectRatio: number;
  className?: string;
};

/** Centers a schematic at its natural aspect ratio — full diagram visible, no crop. */
export function SchematicVisualFrame({ children, aspectRatio, className }: SchematicVisualFrameProps) {
  return (
    <div className={cn("flex w-full flex-1 items-center justify-center", className)}>
      <div className="w-full" style={{ aspectRatio }}>
        {children}
      </div>
    </div>
  );
}
