"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { Reveal } from "@/components/prism/Reveal";
import { FocusAreas } from "@/components/visuals/pro/FocusAreas";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getContactLinks } from "@/lib/i18n/helpers";

export function HomeClosing() {
  const { dict, path, locale } = useI18n();
  const links = getContactLinks(dict);

  return (
    <>
      <SectionChapter theme="void" id="focus" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid">
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <SectionLabel number="04" label={dict.exploring.sectionLabel} />
              <h2 className="text-section mt-6 font-display">{dict.exploring.heading}</h2>
              <p className="text-body mt-5 text-muted-foreground">{dict.exploring.supporting}</p>
            </Reveal>
          </div>
          <div className="col-span-12 mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <Reveal delay={0.1}>
              <FocusAreas areas={dict.exploring.areas} locale={locale} />
            </Reveal>
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="frost" id="contact" className="py-[var(--space-xl)]">
        <div className="container-editorial">
          <Reveal>
            <SectionLabel label={dict.contact.sectionLabel} />
            <h2 className="text-section mt-6 max-w-lg font-display text-[var(--foreground-dark)]">
              {dict.contact.headline[0]} {dict.contact.headline[1]}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(link.download ? { download: true } : {})}
                className="btn-ghost text-[var(--foreground-dark)]"
              >
                {link.label}
                {link.external && <ArrowUpRight size={14} />}
              </a>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <Link href={path("/contact")} className="link-form text-meta text-[var(--foreground-dark-muted)]">
              {dict.common.contactPage}
              <ArrowUpRight size={13} />
            </Link>
          </Reveal>
        </div>
      </SectionChapter>
    </>
  );
}
