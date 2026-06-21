import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vanorika Technologies — Enterprise Security. Zero Compromise.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#07070D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Gold left accent bar */}
        <div style={{ position: "absolute", left: 0, top: "10%", width: 4, height: "80%", background: "#C9A84C" }} />

        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }} />

        {/* Brand label */}
        <div style={{
          position: "absolute", top: 48, left: 56,
          color: "#C9A84C", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.25em", textTransform: "uppercase",
        }}>
          VANORIKA TECHNOLOGIES
        </div>

        {/* Main text */}
        <div style={{ display: "flex", flexDirection: "column", paddingLeft: 56, paddingRight: 80, gap: 16 }}>
          <div style={{ color: "#F0EDE8", fontSize: 76, fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Enterprise Security.
          </div>
          <div style={{ color: "#C9A84C", fontSize: 76, fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Zero Compromise.
          </div>
          <div style={{ color: "#6A7890", fontSize: 24, fontWeight: 300, marginTop: 8 }}>
            CompTIA Certified · Harare, Zimbabwe · Founder-led
          </div>
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute", bottom: 48, right: 56,
          color: "#C9A84C", fontSize: 14, fontWeight: 400, letterSpacing: "0.08em",
          opacity: 0.5,
        }}>
          vanorikatechnologies.co.zw
        </div>
      </div>
    ),
    { ...size }
  );
}
