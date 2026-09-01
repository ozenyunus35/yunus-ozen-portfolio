import { getPersonJsonLd } from "@/lib/seo/person-json-ld";
import type { Locale } from "@/lib/i18n/config";

export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = getPersonJsonLd(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
