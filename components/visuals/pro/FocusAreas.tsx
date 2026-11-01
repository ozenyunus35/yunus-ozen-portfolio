import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getExploringStatusLabel } from "@/lib/i18n/status-labels";
import { cn } from "@/lib/utils/cn";

type FocusAreasProps = {
  areas: Dictionary["exploring"]["areas"];
  locale: Locale;
};

export function FocusAreas({ areas, locale }: FocusAreasProps) {
  return (
    <ul className="space-y-3">
      {areas.map((area, i) => (
        <li key={area.label}>
          <div className="rounded-[var(--radius-md)] border border-[var(--accent-border)] px-4 py-4 transition-colors duration-300 hover:bg-[var(--accent-subtle)] sm:px-5">
            <div className="flex items-center justify-between gap-6">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span
                  className="relative hidden h-px w-12 shrink-0 overflow-hidden bg-[var(--line-strong)] sm:block"
                  aria-hidden="true"
                >
                  <span className="focus-scan absolute inset-y-0 left-0 w-1/2 bg-[var(--accent)]" style={{ animationDelay: `${i * 0.55}s` }} />
                </span>
                <span className="text-h2 text-foreground">{area.label}</span>
              </div>
              <span
                className={cn(
                  "tag shrink-0 border-[var(--line)] text-muted-foreground",
                  area.status === "Developing" && "border-[var(--accent-border)] text-[var(--accent-light)]",
                )}
              >
                {getExploringStatusLabel(area.status, locale)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
