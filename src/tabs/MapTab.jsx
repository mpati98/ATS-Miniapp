import { useMemo, useState } from "react";
import { countries } from "../static/countries";
import { universities } from "../static/institutions";
import mapImage from "../static/MapHN.webp";

const MAP_IMAGE_SRC = mapImage;

const findInstitution = (name) => {
  if (!name) return null;
  const key = name.trim().toLowerCase();
  return (
    universities.find((u) => u.Name?.trim().toLowerCase() === key) ||
    universities.find((u) => u.Name?.trim().toLowerCase().includes(key)) ||
    universities.find((u) => key.includes(u.Name?.trim().toLowerCase())) ||
    null
  );
};

export default function MapTab({ onSelectSchool }) {
  const [expandedState, setExpandedState] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenScale, setFullscreenScale] = useState(1);

  const groupedCountries = useMemo(
    () =>
      countries.map((country) => ({
        ...country,
        states: country.states.map((state) => ({
          ...state,
          schools: state.schools.map((name) => {
            const institution = findInstitution(name);
            return {
              name,
              booth: institution?.Booth || "",
              link: institution?.Link || null,
              rank: institution?.Rank || "",
              color: institution?.Color || state.color,
              flag: institution?.Flag || country.flag,
            };
          }),
        })),
      })),
    [],
  );

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

      {/* Map image */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 8,
          marginBottom: 16,
          overflow: "hidden",
          minHeight: 260,
          maxHeight: "65vh",
        }}
      >
        <div
          style={{
            overflow: "auto",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f9f9fb",
          }}
        >
          <img
            src={MAP_IMAGE_SRC}
            alt="Sơ đồ booth sự kiện"
            style={{
              width: "100%",
              maxWidth: 980,
              borderRadius: 10,
              display: "block",
              cursor: "zoom-in",
            }}
            onClick={() => {
              setFullscreenScale(1);
              setIsFullscreen(true);
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        </div>
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

      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              pointerEvents: "none",
            }}
          >
            <img
              src={MAP_IMAGE_SRC}
              alt="Sơ đồ booth sự kiện fullscreen"
              style={{
                width: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                transform: `scale(${fullscreenScale})`,
                transformOrigin: "center center",
                borderRadius: 12,
                boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                cursor: fullscreenScale === 1 ? "zoom-out" : "grab",
                pointerEvents: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setFullscreenScale((prev) =>
                  Math.min(3, Math.max(1, Number((prev + delta).toFixed(2)))),
                );
              }}
            />
          </div>
        </div>
      )}

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

      {groupedCountries.map((c) => (
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
                      {s.label}
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
                    {s.schools.map((school, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          onSelectSchool?.({
                            name: school.name,
                            state: s.name,
                            stateColor: school.color,
                            stateBg: s.bg,
                            stateAbbr: s.abbr,
                            booth: school.booth,
                            link: school.link,
                            rank: school.rank,
                          })
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
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
                            background: school.color,
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#1a1a2e",
                            }}
                          >
                            {school.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#888",
                              marginTop: 2,
                            }}
                          >
                            Booth {school.booth || "—"}
                            {school.rank ? ` · ${school.rank}` : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
