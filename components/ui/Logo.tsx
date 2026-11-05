import { cn } from "@/lib/utils/cn";

/** Paths of the mark, shared with public/logo.svg: a Y drawn as a merge in a commit graph. */
export const LOGO_BRANCHES = "M9 8.5c0 5 7 5.5 7 10M23 8.5c0 5-7 5.5-7 10M16 18.5V23";

/**
 * The site's mark in the text colour: two branches with open commits on top merge into one line that ends
 * in a filled commit. With `framed`, it sits on a small tile (the tech orbit, the 404 page).
 */
export function Logo({ size = 28, className, framed = false }: { size?: number; className?: string; framed?: boolean }) {
  return (
    <span className={cn("logo", framed && "logo-framed", className)} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <path d={LOGO_BRANCHES} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="logo-path" />
        <circle cx="9" cy="7" r="2.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="23" cy="7" r="2.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="16" cy="25" r="3" fill="var(--accent)" />
      </svg>
    </span>
  );
}
