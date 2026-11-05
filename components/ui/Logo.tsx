import { cn } from "@/lib/utils/cn";

/**
 * The site's monogram: a geometric Y and Ö on a tile in the text colour, with the umlaut dots in the accent.
 * Same drawing as public/logo.svg, which is the favicon.
 */
export function Logo({ size = 28, className, framed = false }: { size?: number; className?: string; framed?: boolean }) {
  return (
    <span className={cn("logo", framed && "logo-framed", className)} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <rect width="32" height="32" rx="8.5" fill="var(--foreground)" />
        <g fill="none" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path className="logo-path" d="M5.6 9.2 9.6 15.4 13.6 9.2M9.6 15.4V22.8" />
          <circle cx="21.4" cy="18" r="4.6" />
        </g>
        <circle cx="19.3" cy="9.8" r="1.45" fill="var(--accent-hot)" className="logo-dot" />
        <circle cx="23.5" cy="9.8" r="1.45" fill="var(--accent-hot)" className="logo-dot" />
      </svg>
    </span>
  );
}
