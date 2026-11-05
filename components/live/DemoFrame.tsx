import { cn } from "@/lib/utils/cn";

/** A small app window around a demo. Decorative: the card next to it says in words what the demo shows. */
export function DemoFrame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[var(--ink-soft)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]", className)}>
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-white/15" />
          <i className="size-2 rounded-full bg-white/15" />
          <i className="size-2 rounded-full bg-white/15" />
        </span>
        <span className="text-meta ml-1 truncate text-[10px] text-muted-foreground">{title}</span>
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
