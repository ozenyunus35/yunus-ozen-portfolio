"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Builds a mailto: link from three fields and opens the visitor's own email app. There is no backend. */
export function ComposeForm() {
  const { dict } = useI18n();
  const t = dict.inner.compose;
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(0);
  const [message, setMessage] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = `${t.topics[topic]}${name ? ` · ${name}` : ""}`;
    const href = `mailto:${dict.site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = href;
  };

  return (
    <form onSubmit={submit} className="compose">
      <p className="text-h1">{t.title}</p>
      <label className="field">
        <span className="spec-label">{t.name}</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} />
      </label>
      <fieldset className="field">
        <legend className="spec-label">{t.topic}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.topics.map((label, i) => (
            <button key={label} type="button" className="seg-btn border border-[var(--line)]" aria-pressed={topic === i} onClick={() => setTopic(i)}>
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="field">
        <span className="spec-label">{t.message}</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required maxLength={4000} />
      </label>
      <button type="submit" className="btn-primary self-start">
        <Send size={15} aria-hidden />
        {t.send}
      </button>
      <p className="text-small text-muted-foreground">{t.note}</p>
    </form>
  );
}
