import { BRAND } from "../static/constants";
const ROWS = [
  { icon: "💰", label: "Giá trị học bổng", key: "Value" },
  { icon: "✅", label: "Bậc học", key: "Level" },
  { icon: "📍", label: "Gặp tại", key: "Booth" },
];

export default function ScholarshipModal({ scholarship, onClose }) {
  if (!scholarship) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "24px 24px 0 0",
          padding: "20px 20px 44px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 40,
            height: 4,
            background: "#ddd",
            borderRadius: 4,
            margin: "0 auto 18px",
          }}
        />

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 18 }}>{scholarship.flag}</span>
          <span
            style={{
              background: scholarship.tagColor + "22",
              color: scholarship.tagColor,
              padding: "3px 10px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {scholarship.tag}
          </span>
          <span
            style={{
              background: "#f0f0f0",
              color: "#555",
              padding: "3px 10px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {scholarship.Level}
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontWeight: 800,
            fontSize: 18,
            color: "#1a1a2e",
            marginBottom: 16,
            lineHeight: 1.3,
          }}
        >
          {scholarship.Name}
        </div>

        {/* Info rows */}
        {ROWS.map((row) => (
          <div
            key={row.key}
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 10,
              padding: "10px 12px",
              background: BRAND.lightBlue,
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>{row.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 700 }}>
                {row.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>
                {scholarship[row.key]}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop: 8,
            width: "100%",
            padding: 12,
            borderRadius: 12,
            background: BRAND.blue,
            color: "white",
            fontWeight: 800,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
          }}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
