import { useState } from "react";
import { countries } from "../static/countries";
import { BRAND } from "../static/constants";

export default function SchoolsTab({ onSelectSchool }) {
  const [activeCountry, setActiveCountry] = useState("AU");
  const [activeState, setActiveState] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState(new Set());

  const country = countries.find((c) => c.id === activeCountry) || countries[0];

  const handleCountryChange = (id) => {
    setActiveCountry(id);
    setActiveState(null);
    setSearch("");
  };

  // For AU/CA: filter by selected state or all; for global: flat list
  const filteredGroups = (() => {
    if (!country) return [];
    if (country.id === "global") {
      const q = search.toLowerCase();
      return [
        {
          state: null,
          schools: country.schools.filter((s) =>
            s.name.toLowerCase().includes(q),
          ),
        },
      ];
    }
    const states = activeState
      ? country.states.filter((s) => s.id === activeState)
      : country.states;
    const q = search.toLowerCase();
    return states
      .map((s) => ({
        ...s,
        schools: s.schools.filter((name) => name.toLowerCase().includes(q)),
      }))
      .filter((s) => s.schools.length > 0);
  })();

  const totalVisible = filteredGroups.reduce((a, g) => a + g.schools.length, 0);

  return (
    <div style={{ paddingTop: 16 }}>
      <div
        style={{
          fontWeight: 800,
          fontSize: 18,
          color: "#1a1a2e",
          marginBottom: 12,
        }}
      >
        Danh sách trường tại sự kiện
      </div>

      {/* Country selector */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {countries.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCountryChange(c.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "1.5px solid",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: activeCountry === c.id ? BRAND.blue : "white",
              color: activeCountry === c.id ? "white" : "#555",
              borderColor: activeCountry === c.id ? BRAND.blue : "#ddd",
            }}
          >
            {c.flag} {c.label}
          </button>
        ))}
      </div>

      {/* State chips — AU / CA only */}
      {country?.states && (
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 12,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          <button
            onClick={() => setActiveState(null)}
            style={{
              padding: "4px 12px",
              borderRadius: 16,
              border: "1.5px solid",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: !activeState ? "#1a1a2e" : "white",
              color: !activeState ? "white" : "#666",
              borderColor: !activeState ? "#1a1a2e" : "#ddd",
            }}
          >
            Tất cả
          </button>
          {country.states.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveState(activeState === s.id ? null : s.id)}
              style={{
                padding: "4px 12px",
                borderRadius: 16,
                border: "1.5px solid",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                background: activeState === s.id ? s.color : s.bg,
                color: s.color,
                borderColor: s.color + "66",
              }}
            >
              {s.id}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: 14 }}>
        <input
          type="text"
          placeholder="🔍  Tìm tên trường..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            outline: "none",
            border: `1.5px solid ${search ? BRAND.blue : "#ddd"}`,
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 13,
            fontFamily: "inherit",
            background: "white",
          }}
        />
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
        {totalVisible} trường {search ? "phù hợp" : "tại sự kiện"}
      </div>

      {/* Global org list */}
      {country?.id === "global" &&
        filteredGroups[0]?.schools.map((s, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 8,
              border: "1.5px solid #f0f0f0",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 14,
                color: "#1a1a2e",
                marginBottom: 4,
              }}
            >
              🌏 {s.label}
            </div>
            <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>
              {s.desc}
            </div>
          </div>
        ))}

      {/* State groups */}
      {country?.id !== "global" &&
        filteredGroups.map((g) => {
          const isOpen = expandedGroups.has(g.id);
          return (
            <div key={g.id} style={{ marginBottom: 12 }}>
              {/* State header */}
              <div
                onClick={() => {
                  setExpandedGroups((prev) => {
                    const next = new Set(prev);
                    if (next.has(g.id)) {
                      next.delete(g.id);
                    } else {
                      next.add(g.id);
                    }
                    return next;
                  });
                }}
                style={{
                  background: g.bg,
                  borderRadius: "12px 12px 0 0",
                  padding: "10px 14px",
                  borderBottom: `2px solid ${g.color}33`,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{ fontWeight: 800, fontSize: 13, color: g.color }}
                    >
                      {g.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                      {g.desc}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                      {g.highlight}
                    </div>
                  </div>
                  {/* <div style={{ fontSize: 12, color: "#555", fontWeight: 700 }}>
                    {isOpen ? "Ẩn" : "Hiện"}
                  </div> */}
                </div>
              </div>
              {/* Schools */}
              {isOpen && (
                <div
                  style={{
                    background: "white",
                    borderRadius: "0 0 12px 12px",
                    border: `1.5px solid ${g.color}22`,
                    borderTop: "none",
                    padding: "8px 10px",
                  }}
                >
                  {g.schools.map((name, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        onSelectSchool?.({
                          name,
                          state: g.name,
                          stateColor: g.color,
                          stateBg: g.bg,
                          stateAbbr: g.abbr,
                        })
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 8px",
                        borderRadius: 10,
                        marginBottom: 4,
                        cursor: "pointer",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = g.bg)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: g.color,
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
                      <span style={{ color: "#ddd", fontSize: 14 }}>›</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

      {totalVisible === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div style={{ fontSize: 14 }}>Không tìm thấy trường phù hợp</div>
        </div>
      )}
    </div>
  );
}
