"use client";

import { cn } from "@/lib/utils/cn";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * The template remounts on every navigation, so plain CSS keyframes replay on
 * each page: a quick fade-up for the content.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="page-enter">{children}</div>
    </div>
  );
}
