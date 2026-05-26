import Logo from "./logo";
import { BRAND, EVENT, PAGE_TITLES } from "@/static/constants";

/**
 * Header — two modes:
 *
 * 1. Hero banner  (canGoBack=false, tab="home")
 *    Full gradient card with event name, title, date/location.
 *
 * 2. Nav bar      (canGoBack=true OR tab≠"home")
 *    Sticky white bar: [← back] [title]
 *    Follows the ZaUI pattern used in zaui-market / zaui-shop templates.
 */

export default function Header({
  canGoBack = false,
  onBack,
  tab = "home",
  selectedMajor = null,
}) {
  const isHome = tab === "home" && !canGoBack;
  const rawTitle = PAGE_TITLES[tab] ?? "Sự kiện";
  // When deep inside majors, show the major label as title
  const pageTitle =
    tab === "majors" && selectedMajor ? selectedMajor.label : rawTitle;
  // ── Hero banner (home page) ──────────────────────────────────────────────
  if (isHome) {
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
  // ── Nav bar (sub-pages) ──────────────────────────────────────────────────
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "white",
        borderBottom: "1px solid #F0F0F0",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        height: 52,
        padding: "0 4px",
      }}
    >
      {/* Back button — 44×52 tap area */}
      {canGoBack ? (
        <button
          onClick={onBack}
          aria-label="Quay lại"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 52,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            flexShrink: 0,
            borderRadius: 8,
            transition: "background 0.12s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          onTouchStart={(e) => (e.currentTarget.style.background = "#F0F0F0")}
          onTouchEnd={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {/* Chevron left — matches ZaUI icon style */}
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M9 1L1 9L9 17"
              stroke="#1A1A2E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        /* Placeholder to keep title centred */
        <div style={{ width: 44, flexShrink: 0 }} />
      )}

      {/* Page title — centred */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#1A1A2E",
            lineHeight: 1,
          }}
        >
          {pageTitle}
        </span>
      </div>

      {/* Right placeholder — keeps title visually centred */}
      <div style={{ width: 44, flexShrink: 0 }} />
    </div>
  );
}
