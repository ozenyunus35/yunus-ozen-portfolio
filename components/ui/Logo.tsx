import { cn } from "@/lib/utils/cn";

/**
 * The site's monogram: a geometric Y and O on a tile in the text colour, with an accent dot in the O.
 * Same drawing as public/logo.svg, which is the favicon.
 */
export function Logo({ size = 28, className, framed = false }: { size?: number; className?: string; framed?: boolean }) {
  return (
    <span className={cn("logo", framed && "logo-framed", className)} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <rect width="32" height="32" rx="8" fill="var(--foreground)" />
        <g fill="none" stroke="var(--ink)" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
          <path className="logo-path" d="M5.2 9.6 9.1 15.3 13 9.6M9.1 15.3V22.4" />
          <circle cx="21.3" cy="16" r="5.5" />
        </g>
        <circle cx="21.3" cy="16" r="1.75" fill="var(--accent-hot)" className="logo-dot" />
      </svg>
    </span>
  );
}
