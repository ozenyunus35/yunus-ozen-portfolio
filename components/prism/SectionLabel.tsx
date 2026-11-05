import { cn } from "@/lib/utils/cn";

type SectionLabelProps = {
  /** Kept for the pages that still pass one; the label no longer shows numbers. */
  number?: string;
  label: string;
  className?: string;
};

/** Small eyebrow pill above a section heading. */
export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <p className={cn("eyebrow", className)}>
      <span className="eyebrow-dot" aria-hidden />
      {label}
    </p>
  );
}
