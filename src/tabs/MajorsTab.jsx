import { useState } from "react";
import { BRAND } from "../static/constants";
import { majors } from "../static/majors";
import SchoolModal from "../modals/SchoolModal";

const getGroupAbbr = (label) => {
  const cleaned = label
    .replace(/^\p{Emoji_Presentation}?\s*/u, "")
    .replace(/^Bang\s+/i, "");
  const words = cleaned
    .split(/[^\p{L}0-9]+/u)
    .filter((w) => w && !/^v[àa]$/i.test(w));
  if (words.length === 0) return cleaned.slice(0, 2).toUpperCase();
  const acronym = words
    .filter((w) => w.length > 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return acronym.slice(0, 4) || words[0].slice(0, 2).toUpperCase();
};

// ── Major list view ────────────────────────────────────────────────────────────
function MajorList({ onSelect }) {
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
        Ngành học
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        Chọn ngành để xem trường phù hợp tại sự kiện
      </div>
      {majors.map((m) => {
        const total = m.groups.reduce((a, g) => a + g.schools.length, 0);
        return (
          <div
            key={m.id}
            onClick={() => onSelect(m)}
            style={{
              background: m.bg,
              border: `1.5px solid ${m.color}33`,
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: m.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {m.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: m.color }}>
                {m.label}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                {total} trường tại sự kiện
              </div>
            </div>
            <span style={{ color: "#ccc", fontSize: 20 }}>›</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Major detail view ──────────────────────────────────────────────────────────
function MajorDetail({ major, onBack, onSelectSchool }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const q = search.toLowerCase();
  const filteredGroups = major.groups
    .map((g) => ({
      ...g,
      schools: g.schools.filter((s) => s.toLowerCase().includes(q)),
    }))
    .filter((g) => g.schools.length > 0);

  const total = filteredGroups.reduce((a, g) => a + g.schools.length, 0);

  return (
    <div style={{ paddingTop: 16 }}>
      {/* Back */}
      <div
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 14,
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 20, color: BRAND.blue }}>‹</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.blue }}>
          Tất cả ngành
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
          background: major.bg,
          borderRadius: 16,
          padding: "14px 16px",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: major.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          {major.icon}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: major.color }}>
            {major.label}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#666",
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            {major.tagline}
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="🔍  Tìm tên trường..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            outline: "none",
            border: `1.5px solid ${search ? major.color : "#ddd"}`,
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 13,
            fontFamily: "inherit",
            background: "white",
          }}
        />
      </div>

      <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
        {total} trường phù hợp
      </div>

      {/* State groups */}
      {filteredGroups.map((g, gi) => {
        const isOpen = expanded === gi || search.length > 0;
        const isAU = g.label.startsWith("🇦🇺");
        const isGlobal = g.label.startsWith("🌎");
        const headerBg = isGlobal ? "#F3E8FF" : isAU ? "#EFF6FF" : "#F5F5F5";
        const headerColor = isGlobal ? "#7E22CE" : isAU ? "#1D4ED8" : "#555";

        return (
          <div
            key={gi}
            style={{
              marginBottom: 10,
              borderRadius: 12,
              overflow: "hidden",
              border: `1.5px solid ${major.color}22`,
            }}
          >
            <div
              onClick={() => setExpanded(isOpen && !search ? null : gi)}
              style={{
                background: headerBg,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  flex: 1,
                  fontWeight: 700,
                  fontSize: 12,
                  color: headerColor,
                }}
              >
                {g.label}
              </div>
              <span style={{ fontSize: 11, color: "#aaa" }}>
                {g.schools.length} trường
              </span>
              {!search && (
                <span
                  style={{
                    color: headerColor,
                    fontSize: 16,
                    display: "inline-block",
                    transform: isOpen ? "rotate(90deg)" : "none",
                    transition: ".2s",
                  }}
                >
                  ›
                </span>
              )}
            </div>
            {isOpen && (
              <div style={{ background: "white", padding: "8px 12px" }}>
                {g.schools.map((name, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      onSelectSchool?.({
                        name,
                        state: g.label,
                        stateColor: major.color,
                        stateBg: major.bg,
                        stateAbbr: getGroupAbbr(g.label),
                      })
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "7px 6px",
                      borderBottom:
                        i < g.schools.length - 1 ? "1px solid #f5f5f5" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: major.bg,
                        border: `1.5px solid ${major.color}55`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 800,
                        color: major.color,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1a1a2e",
                        lineHeight: 1.4,
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

      {filteredGroups.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div style={{ fontSize: 14 }}>Không tìm thấy trường phù hợp</div>
        </div>
      )}

      {/* CTA */}
      <div
        style={{
          background: BRAND.lightBlue,
          borderRadius: 12,
          padding: 14,
          marginTop: 4,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.blue }}>
          💡 Đến booth trường để biết thêm chi tiết, hoặc ghé Bàn Tư Vấn Chung
          để được hỗ trợ!
        </div>
      </div>
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────────
export default function MajorsTab() {
  const [selected, setSelected] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);

  return (
    <>
      {selected ? (
        <MajorDetail
          major={selected}
          onBack={() => setSelected(null)}
          onSelectSchool={setSelectedSchool}
        />
      ) : (
        <MajorList onSelect={setSelected} />
      )}
      <SchoolModal
        school={selectedSchool}
        onClose={() => setSelectedSchool(null)}
      />
    </>
  );
}
