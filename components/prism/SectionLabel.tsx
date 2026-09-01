import { cn } from "@/lib/utils/cn";

type SectionLabelProps = {
  number?: string;
  label: string;
  className?: string;
};

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p className={cn("text-meta text-muted-foreground", className)}>
      {number && <span>{number} — </span>}
      {label}
    </p>
  );
}
