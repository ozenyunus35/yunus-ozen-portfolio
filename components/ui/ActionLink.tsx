import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
};

export function ActionLink({
  href,
  children,
  className,
  variant = "primary",
  external = false,
  download = false,
  onClick,
}: ActionLinkProps) {
  const classes = cn(
    "text-label inline-flex items-center gap-2 border transition-colors duration-300",
    "focus-visible:rounded-[var(--radius-sm)]",
    variant === "primary" &&
      "border-foreground bg-transparent px-6 py-3 text-foreground hover:bg-foreground hover:text-background",
    variant === "secondary" &&
      "border-border bg-transparent px-6 py-3 text-muted-foreground hover:border-foreground hover:text-foreground",
    className,
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download || undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
