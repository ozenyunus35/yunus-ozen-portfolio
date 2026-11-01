import type { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";
import { SiteShell } from "@/components/layout/SiteShell";
import { withBasePath } from "@/lib/data/base-path";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizedPath } from "@/lib/i18n/paths";
import { createPageMetadata } from "@/lib/seo/metadata";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = createPageMetadata(
  dict.pages.home.title,
  dict.pages.home.description,
  localizedPath("/", defaultLocale),
  defaultLocale,
);

/**
 * The root shows the English home straight away instead of a "Redirecting…"
 * page. Visitors who picked Turkish before are sent on before the first paint.
 */
const rememberLocale = `try{var l=localStorage.getItem("NEXT_LOCALE");if(l&&l!=="${defaultLocale}"&&/^(tr|en)$/.test(l))location.replace("${withBasePath("/")}"+l+"/")}catch(e){}`;

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: rememberLocale }} />
      <SiteShell locale={defaultLocale}>
        <HomeContent />
      </SiteShell>
    </>
  );
}
