import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090908",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c4b896",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {siteConfig.initials}
      </div>
    ),
    { ...size },
  );
}
