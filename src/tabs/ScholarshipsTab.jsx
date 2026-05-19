import { useState } from "react";
import { scholarships } from "../static/scholarships";
import { BRAND } from "../static/constants";
import ScholarshipModal from "../modals/ScholarshipModal";
export default function ScholarshipsTab({ onSelect }) {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL"
      ? scholarships
      : scholarships.filter((s) => s.country === filter);

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
        Học bổng nổi bật
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {["ALL", "AU", "US", "CA"].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "5px 14px",
              borderRadius: 20,
              border: "1.5px solid",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: filter === c ? BRAND.blue : "white",
              color: filter === c ? "white" : "#666",
              borderColor: filter === c ? BRAND.blue : "#ddd",
            }}
          >
            {c === "ALL"
              ? "Tất cả"
              : c === "AU"
                ? "🇦🇺 Úc"
                : c === "US"
                  ? "🇺🇸 Mỹ"
                  : "🇨🇦 Canada"}
          </button>
        ))}
      </div>

      {filtered.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelect(s)}
          style={{
            background: "white",
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            cursor: "pointer",
            borderLeft: `4px solid ${s.tagColor}`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 6,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 14 }}>{s.flag}</span>
            <span
              style={{
                background: s.tagColor + "22",
                color: s.tagColor,
                padding: "2px 9px",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {s.tag}
            </span>
            <span
              style={{
                background: "#f0f0f0",
                color: "#666",
                padding: "2px 9px",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {s.level}
            </span>
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 14,
              color: "#1a1a2e",
              marginBottom: 4,
            }}
          >
            {s.name}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: BRAND.blue,
              marginBottom: 4,
            }}
          >
            💰 {s.value}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 12, color: "#888" }}>
              📅 Hạn: {s.deadline}
            </span>
            <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
          </div>
        </div>
      ))}
    </div>
  );
}
