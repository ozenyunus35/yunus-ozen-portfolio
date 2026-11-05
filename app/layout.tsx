import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/data/site-url";
import "./globals.css";

/** Display headings: a light, tightly tracked sans. */
const display = Inter_Tight({
  variable: "--font-tight",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** One accent word per heading, set in an italic serif. */
const accent = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#08080b" },
  ],
};

/**
 * Runs before the first paint: picks the saved theme, or the system one, so the page never flashes the wrong colours.
 * Also marks that JavaScript is running, which is when scroll reveals may hide content.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;d.style.colorScheme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${accent.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
