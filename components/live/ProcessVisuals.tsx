"use client";

import { cn } from "@/lib/utils/cn";
import { DemoFrame, Pop } from "./DemoFrame";

/** The four panels of the process story. `on` is true while their step is the one in view. */
export function RequirementsVisual({ on }: { on: boolean }) {
  const items = ["As a customer I can ask two questions in one message", "Every answer names its source", "A person can take over at any time", "Nothing is promised that the policy does not state"];
  return (
    <DemoFrame title="requirements.md">
      <ul className="space-y-2.5">
        {items.map((t, i) => (
          <li key={t} className={cn("flex gap-2 transition-all duration-500", on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")} style={{ transitionDelay: `${i * 140}ms` }}>
            <span className="mt-0.5 size-3.5 shrink-0 rounded-sm border border-[var(--accent-border)] bg-[var(--accent-subtle)]" />
            {t}
          </li>
        ))}
      </ul>
    </DemoFrame>
  );
}

export function FlowVisual({ on }: { on: boolean }) {
  const blocks = ["Chat", "Order card", "Sources", "Hand-off", "Admin inbox"];
  return (
    <DemoFrame title="flows and screens">
      <div className="flex flex-wrap items-center gap-2">
        {blocks.map((b, i) => (
          <span key={b} className={cn("flex items-center gap-2 transition-all duration-500", on ? "opacity-100" : "opacity-0")} style={{ transitionDelay: `${i * 160}ms` }}>
            <span className="rounded border border-[var(--line-strong)] bg-[var(--tint)] px-2.5 py-1.5">{b}</span>
            {i < blocks.length - 1 && <span className="text-muted-foreground">→</span>}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn("h-24 rounded border border-[var(--line)] bg-[var(--tint)] transition-all duration-700", on ? "scale-100 opacity-100" : "scale-95 opacity-0")} style={{ transitionDelay: `${500 + i * 150}ms` }}>
            <div className="m-2 h-2 w-1/2 rounded bg-[var(--tint-3)]" />
            <div className="m-2 h-2 w-3/4 rounded bg-[var(--tint-2)]" />
            <div className="m-2 mt-6 h-2 w-2/3 rounded bg-[var(--accent)]/50" />
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}

export function CodeVisual({ on }: { on: boolean }) {
  const lines = ["✓ dialog: 29, 30, 31 days keep their numbers", "✓ dialog: $149, $150, $151 shipping", "✓ dialog: new conversation carries nothing", "✓ eval: 1,200 generated conversations", "✓ e2e: follow-up keeps the topic"];
  return (
    <DemoFrame title="terminal · npm test">
      <p className="text-muted-foreground">$ npm test</p>
      <div className="mt-2 space-y-1.5 font-mono text-[11px]">
        {lines.map((l, i) => (
          <Pop key={l} show={on} className="text-[var(--success)]">
            <span style={{ transitionDelay: `${i * 220}ms` }} className="block transition-all">{l}</span>
          </Pop>
        ))}
      </div>
    </DemoFrame>
  );
}

export function ReleaseVisual({ on }: { on: boolean }) {
  const steps = ["Lint and type check", "Build static export", "Browser tests", "Deployed"];
  return (
    <DemoFrame title="release checks">
      <ol className="space-y-3">
        {steps.map((t, i) => (
          <li key={t} className={cn("flex items-center gap-3 transition-all duration-500", on ? "opacity-100" : "opacity-30")} style={{ transitionDelay: `${i * 260}ms` }}>
            <span className={cn("grid size-5 place-items-center rounded-full border text-[10px] transition-colors duration-500", on ? "border-[color-mix(in_srgb,var(--success)_45%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)]" : "border-[var(--line-strong)]")} style={{ transitionDelay: `${i * 260}ms` }}>
              ✓
            </span>
            {t}
          </li>
        ))}
      </ol>
      <p className={cn("mt-5 rounded border border-[var(--accent-border)] bg-[var(--accent-subtle)] px-3 py-2 text-[var(--accent-light)] transition-opacity duration-700", on ? "opacity-100" : "opacity-0")} style={{ transitionDelay: "1100ms" }}>
        Live on a public URL
      </p>
    </DemoFrame>
  );
}
