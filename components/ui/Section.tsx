import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  spacing?: "default" | "sm" | "none";
  bordered?: boolean;
  label?: string;
  number?: string;
  /** ID of the section's primary content heading for aria-labelledby */
  headingId?: string;
};

const spacingStyles = {
  default: "py-[var(--section-spacing)]",
  sm: "py-[var(--section-spacing-sm)]",
  none: "",
};

export function Section({
  children,
  id,
  className,
  containerClassName,
  spacing = "default",
  bordered = false,
  label,
  number,
  headingId,
}: SectionProps) {
  const labelledBy =
    headingId ?? (label && id ? `${id}-label` : undefined);

  return (
    <section
      id={id}
      className={cn(
        spacingStyles[spacing],
        bordered && "border-t border-border",
        className,
      )}
      aria-labelledby={labelledBy}
    >
      <Container className={containerClassName}>
        {(label || number) && (
          <header className="mb-8 flex items-baseline gap-4 md:mb-12">
            {number && (
              <span className="text-label text-muted-foreground">{number}</span>
            )}
            {label && id && (
              <p
                id={`${id}-label`}
                className="text-label text-muted-foreground"
              >
                {label}
              </p>
            )}
            {label && !id && (
              <p className="text-label text-muted-foreground">{label}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
