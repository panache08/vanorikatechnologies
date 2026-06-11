import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Panashe Tech Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0f1e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Left cyan accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "10%",
            width: 4,
            height: "80%",
            background: "#00d4ff",
          }}
        />

        {/* Top-left brand name */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 56,
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          PANASHE TECH SOLUTIONS
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 56,
            paddingRight: 80,
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Websites. Software.
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Cybersecurity.
            </div>
          </div>
          <div
            style={{
              color: "#00d4ff",
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            Harare, Zimbabwe — Founder-led. No middlemen.
          </div>
        </div>

        {/* Bottom-right domain */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 56,
            color: "#4a5568",
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.05em",
          }}
        >
          panashe-tech.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
