"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionChapterProps = {
  theme?: "ink" | "paper" | "warm";
  children: ReactNode;
  className?: string;
  id?: string;
};

export const SectionChapter = forwardRef<HTMLElement, SectionChapterProps>(
  function SectionChapter({ theme = "ink", children, className, id }, ref) {
    return (
      <section
        ref={ref as React.Ref<HTMLDivElement>}
        id={id}
        className={cn(
          "relative",
          theme === "ink" && "theme-ink",
          theme === "paper" && "theme-paper",
          theme === "warm" && "theme-warm",
          className,
        )}
      >
        {children}
      </section>
    );
  },
);
