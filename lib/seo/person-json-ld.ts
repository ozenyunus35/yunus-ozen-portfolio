import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export function getPersonJsonLd(locale: Locale) {
  const { site } = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: site.role,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İzmir",
      addressCountry: "TR",
    },
    sameAs: [site.social.linkedin, site.social.github],
  };
}
