import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type GridProps = {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
};

const colStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
};

export function Grid({ children, className, cols = 12 }: GridProps) {
  return (
    <div
      className={cn(
        "grid gap-[var(--grid-gap)]",
        colStyles[cols],
        className,
      )}
    >
      {children}
    </div>
  );
}
