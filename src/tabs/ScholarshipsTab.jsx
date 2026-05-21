import { useEffect, useMemo, useState } from "react";
import { scholarships } from "../static/scholarships";
import { BRAND } from "../static/constants";
import ScholarshipModal from "../modals/ScholarshipModal";

const COUNTRY_META = {
  ÚC: { label: "🇦🇺 Úc", flag: "🇦🇺", tag: "Úc", tagColor: BRAND.blue },
  VN: {
    label: "🇻🇳 Việt Nam",
    flag: "🇻🇳",
    tag: "Việt Nam",
    tagColor: "#2A7A2A",
  },
  "Nhiều QG": {
    label: "🌏 Nhiều QG",
    flag: "🌏",
    tag: "Nhiều QG",
    tagColor: "#7B1A1A",
  },
};

export default function ScholarshipsTab({ onSelect, initialSearch = "" }) {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch || "");
  }, [initialSearch]);

  const normalizedScholarships = useMemo(
    () =>
      scholarships.map((s) => {
        const meta = COUNTRY_META[s.Country] || {
          label: s.Country,
          flag: "🏆",
          tag: s.Country,
          tagColor: BRAND.blue,
        };
        return {
          ...s,
          flag: meta.flag,
          tag: meta.tag,
          tagColor: meta.tagColor,
          level: s.Level,
        };
      }),
    [],
  );

  const filterOptions = useMemo(
    () => [
      "ALL",
      ...Array.from(new Set(normalizedScholarships.map((s) => s.Country))),
    ],
    [normalizedScholarships],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return normalizedScholarships.filter((s) => {
      if (filter !== "ALL" && s.Country !== filter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        (s.Institution || "").toLowerCase().includes(query) ||
        (s.Name || "").toLowerCase().includes(query)
      );
    });
  }, [filter, search, normalizedScholarships]);

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

      <div style={{ marginBottom: 14 }}>
        <input
          type="text"
          placeholder="🔍 Tìm học bổng theo trường..."
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

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {filterOptions.map((c) => {
          const meta = COUNTRY_META[c];
          return (
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
              {c === "ALL" ? "Tất cả" : meta?.label || c}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
        {filtered.length} học bổng {search ? "phù hợp" : "tổng cộng"}
      </div>

      {filtered.map((s) => (
        <div
          key={s.Scholarship_ID}
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
              {s.Level}
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
            {s.Name}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: BRAND.blue,
              marginBottom: 4,
            }}
          >
            💰 {s.Value}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 12, color: "#888" }}>
              🏛️ {s.Institution}
            </span>
            <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
          </div>
        </div>
      ))}
    </div>
  );
}
