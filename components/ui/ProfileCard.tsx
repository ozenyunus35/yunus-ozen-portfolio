"use client";

import Image from "next/image";
import { GraduationCap, Mail, MapPin } from "lucide-react";
import { withBasePath } from "@/lib/data/base-path";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Photo, name, role, status and the direct links. Used on About and Contact. */
export function ProfileCard() {
  const { dict } = useI18n();
  const { site, home } = dict;

  return (
    <div className="profile-card">
      <div className="profile-card-photo">
        <Image src={withBasePath("/images/avatar.jpg")} alt={site.name} width={460} height={460} sizes="(min-width: 1024px) 28rem, 100vw" priority />
        <p className="profile-status">
          <span className="live-dot" aria-hidden />
          {home.status}
        </p>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-h1">{site.name}</p>
        <p className="text-small mt-1 text-muted-foreground">{site.role}</p>
        <ul className="mt-5 grid gap-2 text-small text-muted-foreground" role="list">
          <li className="flex items-center gap-2.5">
            <GraduationCap size={15} aria-hidden className="shrink-0 text-[var(--accent-light)]" />
            {home.education}
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin size={15} aria-hidden className="shrink-0 text-[var(--accent-light)]" />
            {site.location}
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line)] pt-5">
          <a href={`mailto:${site.email}`} className="btn-primary h-9 px-4 text-[0.8125rem]">
            <Mail size={14} aria-hidden />
            {dict.contact.actions.email}
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost h-9 px-4 text-[0.8125rem]">
            {dict.contact.actions.linkedin}
          </a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="btn-ghost h-9 px-4 text-[0.8125rem]">
            {dict.contact.actions.github}
          </a>
        </div>
      </div>
    </div>
  );
}
