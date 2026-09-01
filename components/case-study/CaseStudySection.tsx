import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CaseStudySectionProps = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export function CaseStudySection({
  id,
  number,
  title,
  children,
  className,
  wide = false,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={cn("border-t border-border py-[var(--section-spacing-sm)] md:py-[var(--section-spacing)]", className)}
      aria-labelledby={`${id}-heading`}
    >
      <div
        className={cn(
          "mx-auto w-full px-[var(--container-padding)]",
          wide ? "max-w-[var(--container-max)]" : "max-w-3xl",
        )}
      >
        <header className="mb-8 md:mb-10">
          <p className="text-label text-muted-foreground">{number}</p>
          <h2
            id={`${id}-heading`}
            className="text-h2 mt-2 text-foreground"
          >
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
