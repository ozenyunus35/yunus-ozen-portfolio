"use client";

import { useEffect, useState } from "react";
import { countMergedPrs, type OpenSourceStats } from "./open-source";

const KEY = "oss-stats-v2";
const FRESH_MS = 10 * 60 * 1000;

let inflight: Promise<OpenSourceStats> | null = null;

/** A count from the last ten minutes, or a new one from GitHub (saved for the next visit). */
function liveStats(): Promise<OpenSourceStats> {
  inflight ??= (async () => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { at: number; stats: OpenSourceStats } | null;
      if (saved && Date.now() - saved.at < FRESH_MS && saved.stats.total > 0) return saved.stats;
    } catch {}
    const live = await countMergedPrs();
    try {
      localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), stats: live }));
    } catch {}
    return live;
  })();
  return inflight;
}

/**
 * Starts from the numbers baked in at build time, then counts again from
 * GitHub in the browser, so a PR merged an hour ago already shows. Counts are
 * kept for ten minutes, well inside GitHub's unauthenticated search limit.
 */
export function useLiveOpenSource(initial: OpenSourceStats): OpenSourceStats {
  const [stats, setStats] = useState(initial);
  useEffect(() => {
    let alive = true;
    liveStats()
      .then((live) => {
        if (alive && live.total > 0) setStats(live);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return stats;
}
