import { useId } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * The site's mark: a Y drawn as a small merge graph, two branches joining into one line, with a node at each end.
 * Same drawing as public/logo.svg, which is the favicon.
 */
export function Logo({ size = 30, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={cn("logo", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-hot)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <path d="M10.5 10 16 16.6 21.5 10M16 16.6V22.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="logo-path" />
      <circle cx="10.5" cy="10" r="2.5" fill="#fff" />
      <circle cx="21.5" cy="10" r="2.5" fill="#fff" />
      <circle cx="16" cy="22.5" r="2.5" fill="#fff" />
    </svg>
  );
}
