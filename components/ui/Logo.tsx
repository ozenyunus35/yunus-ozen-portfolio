import { useId } from "react";
import { cn } from "@/lib/utils/cn";

/** The area under a rising line: low start, a dip, then a climb to the top right. */
const LOGO_AREA = "M0 23.5 11 14.5 17 19 32 6V32H0Z";

/**
 * The site's mark: an area chart inside a rounded square frame, drawn in the text colour.
 * Same drawing as public/logo.svg, which is the favicon.
 */
export function Logo({ size = 28, className, framed = false }: { size?: number; className?: string; framed?: boolean }) {
  const clip = useId();
  return (
    <span className={cn("logo", framed && "logo-framed", className)} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <clipPath id={clip}>
          <rect x="5.2" y="5.2" width="21.6" height="21.6" rx="5.6" />
        </clipPath>
        <rect x="1.8" y="1.8" width="28.4" height="28.4" rx="9" fill="none" stroke="var(--foreground)" strokeWidth="2.6" />
        <g clipPath={`url(#${clip})`}>
          <path className="logo-area" d={LOGO_AREA} fill="var(--foreground)" />
        </g>
      </svg>
    </span>
  );
}
