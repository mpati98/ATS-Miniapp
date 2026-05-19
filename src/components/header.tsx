import { BRAND, EVENT } from "@/static/constants";

export default function Header() {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.blue})`,
        padding: "20px 20px 26px",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,158,23,.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: 40,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "rgba(255,255,255,.06)",
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          opacity: 0.75,
          textTransform: "uppercase",
          marginBottom: 5,
        }}
      >
        {EVENT.name}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: 6,
        }}
      >
        {EVENT.edition} 🌏
        <br />
        <span style={{ color: BRAND.orange }}>ATS Study Fair</span>
      </div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        🗓 {EVENT.dates} &nbsp;·&nbsp; 📍 {EVENT.venue}
      </div>
    </div>
  );
}
