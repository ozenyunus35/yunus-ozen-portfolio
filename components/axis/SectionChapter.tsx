import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type Theme = "void" | "frost" | "chalk" | "slate";

type SectionChapterProps = React.ComponentPropsWithoutRef<"section"> & {
  theme?: Theme;
};

export const SectionChapter = forwardRef<HTMLElement, SectionChapterProps>(
  function SectionChapter({ theme = "void", className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn(`theme-${theme}`, className)}
        {...props}
      >
        {children}
      </section>
    );
  },
);
