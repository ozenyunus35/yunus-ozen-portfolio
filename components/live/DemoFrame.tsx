import { cn } from "@/lib/utils/cn";

/** A small app window around a demo. Decorative: the card next to it says in words what the demo shows. */
export function DemoFrame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--ink-soft)] shadow-[var(--shadow-card)]", className)}>
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-[#ff5f57]/80" />
          <i className="size-2 rounded-full bg-[#febc2e]/80" />
          <i className="size-2 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="text-mono ml-1 truncate text-[11px] text-muted-foreground">{title}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[var(--accent-light)]">
          <span className="live-dot" />
          live
        </span>
      </div>
      <div className="min-h-[260px] p-4 text-[12px] leading-relaxed sm:p-5">{children}</div>
    </div>
  );
}

/** Fades and lifts its children in when `show` turns true. */
export function Pop({ show, children, className }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("transition-all duration-500 ease-out", show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0", className)}>{children}</div>
  );
}
