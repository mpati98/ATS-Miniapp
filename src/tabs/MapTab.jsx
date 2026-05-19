import { useState } from "react";
import { countries } from "../static/schools";
import mapImage from "../static/mapHN.jpg";

const MAP_IMAGE_SRC = mapImage;

export default function MapTab({ onSelectSchool }) {
  const [expandedState, setExpandedState] = useState(null);

  return (
    <div style={{ paddingTop: 16 }}>
      <div
        style={{
          fontWeight: 800,
          fontSize: 18,
          color: "#1a1a2e",
          marginBottom: 4,
        }}
      >
        Sơ đồ Booth
      </div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>
        📍 Hà Nội, 2026 · Sảnh chính
      </div>

      {/* Map image */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 8,
          marginBottom: 16,
          overflowX: "auto",
        }}
      >
        <img
          src={MAP_IMAGE_SRC}
          alt="Sơ đồ booth sự kiện"
          style={{ width: "100%", borderRadius: 10, display: "block" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          style={{
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            color: "#aaa",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 4,
              color: "#333",
            }}
          >
            Đang cập nhật sơ đồ
          </div>
          <div style={{ fontSize: 12, textAlign: "center" }}>
            Sơ đồ chi tiết sẽ được cập nhật trước sự kiện
          </div>
        </div>
      </div>

      {/* Khu vực legend */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        {[
          {
            label: "Sảnh ngoài",
            color: "#16A34A",
            bg: "#F0FDF4",
            desc: "Check-in · Quà",
          },
          {
            label: "Sảnh trong",
            color: "#475569",
            bg: "#F8FAFC",
            desc: "Visa · ATS · Partners",
          },
          {
            label: "Phòng booth",
            color: "#0E7DBB",
            bg: "#E9F7FF",
            desc: "Booth trường học",
          },
        ].map((z) => (
          <div
            key={z.label}
            style={{
              flex: 1,
              background: z.bg,
              border: `1.5px solid ${z.color}44`,
              borderRadius: 10,
              padding: "6px 8px",
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 800, color: z.color }}>
              {z.label}
            </div>
            <div style={{ fontSize: 8, color: "#888", marginTop: 1 }}>
              {z.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Directory by country & state */}
      <div
        style={{
          fontWeight: 800,
          fontSize: 15,
          color: "#1a1a2e",
          marginBottom: 10,
        }}
      >
        Tra cứu theo vùng
      </div>

      {countries.map((c) => (
        <div key={c.id} style={{ marginBottom: 12 }}>
          {/* Country header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 18 }}>{c.flag}</span>
            <span style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e" }}>
              {c.name}
            </span>
          </div>

          {/* States */}
          {c.states?.map((s) => {
            const key = `${c.id}-${s.id}`;
            const open = expandedState === key;
            return (
              <div
                key={s.id}
                style={{
                  marginBottom: 6,
                  border: `1.5px solid ${s.color}33`,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  onClick={() => setExpandedState(open ? null : key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    background: s.bg,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontWeight: 800, fontSize: 12, color: s.color }}
                    >
                      {s.abbr} · {s.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#999" }}>
                      {s.schools.length} trường
                    </div>
                  </div>
                  <span
                    style={{
                      color: s.color,
                      fontSize: 16,
                      display: "inline-block",
                      transform: open ? "rotate(90deg)" : "none",
                      transition: ".2s",
                    }}
                  >
                    ›
                  </span>
                </div>
                {open && (
                  <div style={{ background: "white", padding: "8px 12px" }}>
                    {s.schools.map((name, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          onSelectSchool?.({
                            name,
                            state: s.name,
                            stateColor: s.color,
                            stateBg: s.bg,
                            stateAbbr: s.abbr,
                          })
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "7px 6px",
                          borderBottom:
                            i < s.schools.length - 1
                              ? "1px solid #f5f5f5"
                              : "none",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: s.color,
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#1a1a2e",
                            flex: 1,
                          }}
                        >
                          {name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Global orgs – flat */}
          {c.id === "global" && (
            <div
              style={{
                background: "white",
                borderRadius: 12,
                padding: "10px 14px",
                border: "1.5px solid #e0e0e0",
              }}
            >
              {c.schools.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom:
                      i < c.schools.length - 1 ? "1px solid #f5f5f5" : "none",
                  }}
                >
                  <span style={{ fontSize: 16 }}>🌏</span>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#1a1a2e",
                      }}
                    >
                      {s.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
