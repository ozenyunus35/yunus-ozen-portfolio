"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { ParticleOpening } from "@/components/cinematic/ParticleOpening";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Entrance delays in ms; the text is in the HTML from the start, CSS only fades it in. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Centered opening: who, one headline, two actions, and a strip of the projects my code was merged into. */
export function HomeHero({ marquee }: { marquee: string[] }) {
  const { dict, path } = useI18n();
  const { home, hero, site } = dict;
  const words = home.headline.lead.split(" ");
  const tail = home.headline.tail.split(" ");

  return (
    <section id="hero" className="hero-section relative isolate overflow-hidden">
      <div className="hero-wash" aria-hidden>
        <span className="hero-wash-a" />
        <span className="hero-wash-b" />
        <span className="hero-wash-c" />
      </div>
      <div className="hero-grid-fade absolute inset-0 -z-10" aria-hidden />
      <ParticleOpening />

      <div className="container-editorial relative flex min-h-[92svh] flex-col items-center justify-center pb-10 pt-28 text-center">
        <p className="anim-fade hero-pill" style={delay(0)}>
          <span className="live-dot" aria-hidden />
          <span className="font-medium text-foreground">{site.name}</span>
          <span className="hidden text-muted-foreground sm:inline">· {site.role}</span>
        </p>

        <h1 className="text-hero font-display mt-8 max-w-[15ch] sm:max-w-[17ch]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="hero-word" style={delay(90 + i * 45)}>
              {word}{" "}
            </span>
          ))}
          <span className="hero-word accent-serif hero-accent" style={delay(90 + words.length * 45)}>
            {home.headline.accent}
          </span>{" "}
          {tail.map((word, i) => (
            <span key={`${word}-t${i}`} className="hero-word" style={delay(135 + (words.length + i) * 45)}>
              {word}{" "}
            </span>
          ))}
        </h1>

        <p className="anim-rise text-body mt-7 max-w-xl text-muted-foreground" style={delay(420)}>
          {hero.supporting}
        </p>

        <div className="anim-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={delay(520)}>
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

      <div className="anim-fade relative pb-12" style={delay(700)}>
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
