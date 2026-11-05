"use client";

import Link from "next/link";
import { ArrowRight, Download, GraduationCap, MapPin } from "lucide-react";
import { ParticleOpening } from "@/components/cinematic/ParticleOpening";
import { Avatar } from "@/components/ui/Avatar";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { OpenSourceStats } from "@/lib/data/open-source";

/** Entrance delays in ms; the text is in the HTML from the start, CSS only fades it in. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const AUTHOR = "ozenyunus35";

/**
 * Opening: who I am and what I do on the left; on the right an engineer's card with my photo and a terminal that lists
 * my merged pull requests, from the same GitHub count as the rest of the page. Below, a strip of the projects.
 */
export function HomeHero({ marquee, stats }: { marquee: string[]; stats: OpenSourceStats }) {
  const { dict, path } = useI18n();
  const { home, hero, site, openSource } = dict;
  const words = home.headline.lead.split(" ");
  const tail = home.headline.tail ? home.headline.tail.split(" ") : [];
  const most = Math.max(...stats.repos.map((r) => r.merged));
  const total = `${stats.total} ${openSource.totalLabel.replace("{repos}", String(stats.repoCount))}`;

  return (
    <section id="hero" className="hero-section relative isolate overflow-hidden">
      <div className="hero-wash" aria-hidden>
        <span className="hero-wash-a" />
        <span className="hero-wash-b" />
      </div>
      <div className="hero-grid-fade absolute inset-0 -z-10" aria-hidden />
      <ParticleOpening />

      <div className="container-editorial relative grid min-h-[78svh] items-center gap-12 pb-8 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="min-w-0">
          <p className="anim-fade hero-pill" style={delay(0)}>
            <span className="live-dot" aria-hidden />
            <span className="font-medium text-foreground">{home.status}</span>
            <span className="hidden text-muted-foreground sm:inline">· {site.location}</span>
          </p>

          <h1 className="text-hero font-display mt-7">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="hero-word" style={delay(80 + i * 40)}>
                {word}{" "}
              </span>
            ))}
            <span className="hero-word accent-serif hero-accent" style={delay(80 + words.length * 40)}>
              {home.headline.accent}
            </span>
            {tail.length > 0 && " "}
            {tail.map((word, i) => (
              <span key={`${word}-t${i}`} className="hero-word" style={delay(120 + (words.length + i) * 40)}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="anim-rise text-body mt-6 max-w-xl text-muted-foreground" style={delay(380)}>
            {hero.supporting}
          </p>

          <div className="anim-rise mt-8 flex flex-wrap items-center gap-3" style={delay(460)}>
            <Link href={path("/work")} className="btn-primary">
              {hero.viewWork}
              <ArrowRight size={15} />
            </Link>
            {site.cv ? (
              <a href={site.cv} download className="btn-ghost">
                <Download size={15} />
                {dict.common.downloadCv}
              </a>
            ) : (
              <Link href={path("/about")} className="btn-ghost">
                {dict.common.footerNav.about}
              </Link>
            )}
          </div>
        </div>

        <div className="anim-rise min-w-0" style={delay(260)}>
          <div className="eng-card">
            <div className="flex items-center gap-4 border-b border-[var(--line)] p-5">
              <Avatar size={56} alt={site.name} />
              <div className="min-w-0">
                <p className="text-h2">{site.name}</p>
                <p className="text-small truncate text-muted-foreground">{site.role}</p>
              </div>
            </div>
            <ul className="grid gap-2 border-b border-[var(--line)] px-5 py-4 text-small text-muted-foreground" role="list">
              <li className="flex items-center gap-2.5">
                <GraduationCap size={15} aria-hidden className="shrink-0 text-[var(--accent-light)]" />
                {home.education}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} aria-hidden className="shrink-0 text-[var(--accent-light)]" />
                {site.location}
              </li>
            </ul>
            <div className="eng-term" lang="en">
              <p className="eng-cmd">
                <span className="text-[var(--success)]">~</span> <span className="text-muted-foreground">$</span>{" "}
                <span className="eng-typed">gh search prs --author {AUTHOR} --merged</span>
              </p>
              <ul className="mt-3 space-y-1.5" role="list">
                {stats.repos.map((r, i) => (
                  <li key={r.repo} className="eng-row" style={delay(1250 + i * 110)}>
                    <span className="truncate">{r.repo}</span>
                    <span className="eng-bar" aria-hidden>
                      <span style={{ width: `${(r.merged / most) * 100}%` }} />
                    </span>
                    <span className="tabular-nums text-foreground">{r.merged}</span>
                  </li>
                ))}
              </ul>
              <p className="eng-row eng-total" style={delay(1250 + stats.repos.length * 110 + 80)}>
                <span className="text-[var(--success)]">✓</span> {total}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="anim-fade relative pb-10" style={delay(700)}>
        <p className="text-meta text-center text-muted-foreground">{home.marqueeLabel}</p>
        <div className="marquee mt-5" lang="en">
          <ul className="marquee-track" role="list">
            {[...marquee, ...marquee].map((name, i) => (
              <li key={`${name}-${i}`} aria-hidden={i >= marquee.length || undefined} className="marquee-item">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
