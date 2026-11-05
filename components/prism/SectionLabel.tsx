import { cn } from "@/lib/utils/cn";

type SectionLabelProps = {
  number?: string;
  label: string;
  className?: string;
};

/** Monospace section label: a number, a short rule and the name. */
export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p className={cn("eyebrow", className)}>
      {number && <span className="eyebrow-num">{number}</span>}
      <span className="eyebrow-dot" aria-hidden />
      {label}
    </p>
  );
}
