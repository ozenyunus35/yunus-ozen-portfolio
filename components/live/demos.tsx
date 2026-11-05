"use client";

import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils/cn";
import { DemoFrame, Pop } from "./DemoFrame";
import { useStep } from "./useStep";

/** Four scripted product demos. Every name, number and message in them is made up. */

const Badge = ({ show, children }: { show: boolean; children: React.ReactNode }) => (
  <span className={cn("inline-flex items-center gap-1 rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] text-emerald-300 transition-all duration-500", show ? "opacity-100" : "opacity-0")}>
    <Check size={10} /> {children}
  </span>
);

export function TallyDemo() {
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px");
  const s = useStep(7, 1000, inView);
  const rows = [
    ["Tent footprint", "1", "48.00"],
    ["Merino base layer", "2", "64.00"],
    ["Camp stove", "1", "38.00"],
  ];
  return (
    <div ref={ref}>
      <DemoFrame title="tally · invoice INV-2041.pdf">
        <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
          <div className="rounded border border-[var(--line)] bg-white/[0.03] p-3">
            <p className={cn("font-medium transition-colors duration-500", s >= 1 && "text-[var(--accent-light)]")}>Northwind Outdoor Ltd</p>
            <p className={cn("text-muted-foreground transition-colors duration-500", s >= 1 && "text-[var(--accent-light)]")}>Issued 12 Oct 2026 · Due 11 Nov</p>
            <div className="mt-3 space-y-1.5">
              {rows.map((r, i) => (
                <Pop key={r[0]} show={s >= 2 + Math.min(i, 1)} className="flex justify-between gap-2 text-muted-foreground">
                  <span>{r[0]} × {r[1]}</span>
                  <span className="tabular-nums">{r[2]}</span>
                </Pop>
              ))}
            </div>
            <Pop show={s >= 3} className="mt-3 flex justify-between border-t border-[var(--line)] pt-2">
              <span>Total incl. VAT 20%</span>
              <span className="tabular-nums">180.00</span>
            </Pop>
          </div>
          <div className="space-y-2.5">
            <p className="text-meta text-[10px] text-muted-foreground">Checks</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge show={s >= 3}>VAT matches</Badge>
              <Badge show={s >= 3}>Totals add up</Badge>
              <Badge show={s >= 4}>Not a duplicate</Badge>
            </div>
            <Pop show={s >= 5} className="rounded border border-[var(--accent-border)] bg-[var(--accent-subtle)] p-2.5">
              <p className="text-[var(--accent-light)]">Matched to bank line</p>
              <p className="text-muted-foreground">13 Oct · NORTHWIND OUTDOOR · −180.00</p>
            </Pop>
            <Pop show={s >= 6} className="rounded border border-[var(--line)] p-2.5 text-muted-foreground">
              Exported <span className="text-foreground">accounts-oct.xlsx</span>
            </Pop>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}

export function RelayDemo() {
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px");
  const s = useStep(6, 1300, inView);
  return (
    <div ref={ref}>
      <DemoFrame title="relay · customer chat">
        <div className="space-y-2.5">
          <Pop show={s >= 0} className="ml-auto w-fit max-w-[88%] rounded-xl rounded-tr-sm bg-[var(--accent)] px-3 py-2 text-white">
            Do you ship to Canada and can I return a used tent after 45 days?
          </Pop>
          <Pop show={s >= 1} className="max-w-[92%] rounded-xl rounded-tl-sm bg-white/[0.06] px-3 py-2">
            <span className="text-muted-foreground">Shipping:</span> Yes. 5 to 10 business days, free over $150, otherwise a flat $19.
          </Pop>
          <Pop show={s >= 2} className="max-w-[92%] rounded-xl rounded-tl-sm bg-white/[0.06] px-3 py-2">
            <span className="text-muted-foreground">Return:</span> Used gear can go back for store credit within 30 days. At 45 days you are past that limit; a defect is a separate warranty path.
          </Pop>
          <Pop show={s >= 4} className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="rounded border border-[var(--line-strong)] px-1.5 py-0.5">International shipping ↗</span>
            <span className="rounded border border-[var(--line-strong)] px-1.5 py-0.5">Return policy · Used gear ↗</span>
            <span className="text-muted-foreground">2 of 2 requests answered · policy rule</span>
          </Pop>
          <Pop show={s >= 5} className="text-[10px] text-muted-foreground">Nothing was promised: a person reviews warranty claims.</Pop>
        </div>
      </DemoFrame>
    </div>
  );
}

export function AtlasDemo() {
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px");
  const s = useStep(6, 1100, inView);
  const files = [
    { name: "Q3-statement.pdf", at: 0 },
    { name: "Contract-signed.pdf", at: 2 },
    { name: "Tax-forms-2026.zip", at: 4 },
  ];
  return (
    <div ref={ref}>
      <DemoFrame title="atlas · client portal">
        <div className="mb-3 flex items-center justify-between text-muted-foreground">
          <span>Harbor &amp; Pine · 3 files</span>
          <span className="rounded border border-[var(--line)] px-1.5 py-0.5 text-[10px]">Admin view</span>
        </div>
        <div className="space-y-2">
          {files.map((f) => {
            const progress = s < f.at ? 0 : s === f.at ? 55 : 100;
            return (
              <Pop key={f.name} show={s >= f.at} className="rounded border border-[var(--line)] bg-white/[0.03] p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span>{f.name}</span>
                  <span className={cn("text-[10px]", progress === 100 ? "text-emerald-300" : "text-muted-foreground")}>{progress === 100 ? "Shared with client" : "Uploading…"}</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded bg-white/10">
                  <div className="h-full rounded bg-[var(--accent)] transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
                </div>
              </Pop>
            );
          })}
        </div>
        <Pop show={s >= 3} className="mt-3 flex items-center gap-2 text-muted-foreground">
          <span className="grid size-5 place-items-center rounded-full bg-[var(--accent-subtle)] text-[9px] text-[var(--accent-light)]">HP</span>
          Client opened Q3-statement.pdf
        </Pop>
      </DemoFrame>
    </div>
  );
}

export function ScraperDemo() {
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px");
  const s = useStep(8, 650, inView);
  const rows = [
    ["Summit Cafe", "Denver", "(303) 555-0101"],
    ["Pearl Bakery", "Portland", "(503) 555-0144"],
    ["Alder Bike Shop", "Seattle", "(206) 555-0187"],
    ["Cedar Dental", "Denver", "(303) 555-0122"],
    ["Rose Florist", "Portland", "(503) 555-0166"],
    ["Pine Print Co.", "Seattle", "(206) 555-0109"],
  ];
  const leads = Math.min(s, rows.length);
  return (
    <div ref={ref}>
      <DemoFrame title="lead scraper · daily run">
        <div className="mb-3 flex gap-4 text-muted-foreground">
          <span>
            Leads <b className="tabular-nums text-foreground">{leads}</b>
          </span>
          <span>
            Duplicates removed <b className="tabular-nums text-foreground">{s >= 4 ? 2 : 0}</b>
          </span>
        </div>
        <div className="divide-y divide-[var(--line)] rounded border border-[var(--line)]">
          {rows.map((r, i) => (
            <Pop key={r[0]} show={s > i} className="grid grid-cols-[1.3fr_1fr_1.2fr] gap-2 px-2.5 py-1.5">
              <span>{r[0]}</span>
              <span className="text-muted-foreground">{r[1]}</span>
              <span className="tabular-nums text-muted-foreground">{r[2]}</span>
            </Pop>
          ))}
        </div>
        <Pop show={s >= 7} className="mt-3 text-muted-foreground">
          Saved <span className="text-foreground">leads-2026-11-02.csv</span>
        </Pop>
      </DemoFrame>
    </div>
  );
}
