import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090908",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#f2f0ea",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.08em",
            color: "#8a8780",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.initials}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            marginTop: 24,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 24,
            color: "#c4b896",
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          Product & Project Management
        </div>
      </div>
    ),
    { ...size },
  );
}
