import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RICH Knowledge Repository";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f1f0f 0%, #1a3a1a 45%, #2d5a27 75%, #4a8c3f 100%)",
          padding: "60px",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#4a8c3f",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 42,
              fontWeight: 900,
            }}
          >
            R
          </div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 800, letterSpacing: 6 }}>RICH</div>
        </div>
        <div style={{ marginTop: 32, color: "white", fontSize: 54, fontWeight: 500, lineHeight: 1.1, fontFamily: "Playfair Display, serif" }}>
          Knowledge Repository
        </div>
        <div style={{ marginTop: 16, color: "rgba(255,255,255,0.8)", fontSize: 22, maxWidth: 900 }}>
          Africa&apos;s Central Platform for Climate AI Knowledge — research, case studies, ecosystem insights and policy resources.
        </div>
        <div style={{ marginTop: 24, color: "#a0d88a", fontSize: 14, letterSpacing: 4, fontWeight: 700 }}>RICH.AFRICA · REGIONAL INNOVATION AND CLIMATE HUB</div>
      </div>
    ),
    { ...size }
  );
}
