import { BRAND } from "../static/constants";

const TABS = [
  { id: "home", icon: "🏠", label: "Trang chủ" },
  { id: "schools", icon: "🎓", label: "Trường" },
  { id: "majors", icon: "📖", label: "Ngành học" },
  { id: "scholarships", icon: "🏆", label: "Học bổng" },
  { id: "map", icon: "🗺️", label: "Sơ đồ" },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "white",
        borderTop: "1px solid #eee",
        display: "flex",
        zIndex: 50,
      }}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onTabChange(t.id)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            border: "none",
            background: "none",
            flex: 1,
            padding: "7px 0",
            color: activeTab === t.id ? BRAND.blue : "#aaa",
          }}
        >
          <span style={{ fontSize: 19 }}>{t.icon}</span>
          <span style={{ fontSize: 9.5, fontWeight: 700 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
