"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getRouteFromPathname } from "@/lib/i18n/helpers";
import { cn } from "@/lib/utils/cn";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * The template remounts on every navigation, so plain CSS keyframes replay on
 * each page: a quick fade-up for the content and a line sweeping across the top.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const route = getRouteFromPathname(pathname, dict);

  return (
    <div className={cn("relative", className)}>
      <div className="page-sweep pointer-events-none fixed inset-x-0 top-0 z-[100] h-px bg-[var(--accent)]" aria-hidden="true" />
      <p
        className="page-route pointer-events-none fixed bottom-6 right-[var(--container-padding)] z-[100] hidden text-meta text-muted-foreground md:block"
        aria-hidden="true"
      >
        {route.index} / {route.label}
      </p>
      <div className="page-enter">{children}</div>
    </div>
  );
}
