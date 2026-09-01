import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  size?: "default" | "narrow" | "wide";
};

const sizeStyles = {
  default: "max-w-[var(--container-max)]",
  narrow: "max-w-3xl",
  wide: "max-w-[96rem]",
};

export function Container({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-[var(--container-padding)]",
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
