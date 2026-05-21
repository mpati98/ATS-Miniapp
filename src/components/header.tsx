import Logo from "./logo";
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
          top: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 96,
          height: 36,
        }}
      >
        <Logo style={{ width: "100%", height: "auto", color: "white" }} />
      </div>
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
          marginTop: 10,
        }}
      >
        {EVENT.name}
      </div>
      <div
        style={{
          fontSize: 25,
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: 6,
        }}
      >
        {EVENT.edition}
        <br />
        <span style={{ color: BRAND.orange, fontSize: 30 }}>2026</span>
      </div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        🗓 {EVENT.dates} &nbsp;·&nbsp; 📍 {EVENT.venue}
      </div>
    </div>
  );
}
