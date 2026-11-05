"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Builds a mailto: link from three fields and opens the visitor's own email app. There is no backend. */
export function ComposeForm() {
  const { dict } = useI18n();
  const t = dict.inner.compose;
  const id = useId();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(0);
  const [message, setMessage] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = `${t.topics[topic]}${name ? ` · ${name}` : ""}`;
    window.location.href = `mailto:${dict.site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <form onSubmit={submit} className="compose">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${id}-name`}>{t.name}</label>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-topic`}>{t.topic}</label>
          <div className="select">
            <select id={`${id}-topic`} value={topic} onChange={(e) => setTopic(Number(e.target.value))}>
              {t.topics.map((label, i) => (
                <option key={label} value={i}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden />
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-message`}>{t.message}</label>
        <textarea id={`${id}-message`} value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required maxLength={4000} />
      </div>
      <div className="flex flex-col-reverse gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small max-w-sm text-muted-foreground">{t.note}</p>
        <button type="submit" className="btn-primary shrink-0">
          {t.send}
          <ArrowUpRight size={15} aria-hidden />
        </button>
      </div>
    </form>
  );
}
