import { ImageResponse } from "next/og";
import { locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project preview";

export function generateStaticParams() {
  return locales.flatMap((locale) => getDictionary(locale).projects.map((p) => ({ locale, slug: p.slug })));
}

/** Share preview for a project page: name, one-line summary and stack on the site's dark blue field. */
export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale === "tr" ? "tr" : "en");
  const project = dict.projects.find((p) => p.slug === slug) ?? dict.projects[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 80% 70% at 70% 30%, #0f2a5c 0%, #050508 65%)",
          color: "#f0f0f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.12em", color: "#60a5fa", textTransform: "uppercase" }}>
          {project.industry}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{project.title}</div>
          <div style={{ fontSize: 36, marginTop: 24, color: "#a8a8bc", maxWidth: 950, lineHeight: 1.3 }}>{project.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 22, color: "#8888a0" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <div key={tech} style={{ display: "flex", border: "1px solid #2a3550", padding: "6px 14px" }}>
                {tech}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#f0f0f5" }}>{dict.site.name}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
