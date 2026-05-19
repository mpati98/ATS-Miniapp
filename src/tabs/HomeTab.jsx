import { scholarships } from "@/static/scholarships";
import { majors } from "@/static/majors";
import { countries } from "@/static/schools";
import { BRAND } from "@/static/constants";
const totalSchools = countries.reduce((acc, c) => {
  if (c.states) return acc + c.states.reduce((a, s) => a + s.schools.length, 0);
  return acc + (c.schools?.length || 0);
}, 0);

const QUICK_LINKS = [
  {
    icon: "🎓",
    label: "Trường học theo quốc gia",
    sub: "Úc · Canada · Tập đoàn Giáo dục",
    t: "schools",
    color: BRAND.blue,
  },
  {
    icon: "📖",
    label: "Ngành học & trường phù hợp",
    sub: "Business · IT · Healthcare · Engineering...",
    t: "majors",
    color: "#7C3AED",
  },
  {
    icon: "🏆",
    label: "Học bổng nổi bật",
    sub: "Toàn phần & bán phần",
    t: "scholarships",
    color: BRAND.orange,
  },
  {
    icon: "🗺️",
    label: "Sơ đồ sảnh chính thức",
    sub: "3 khu: Ngoài · Trong · Booth",
    t: "map",
    color: "#15803D",
  },
];

export default function HomeTab({ onNavigate }) {
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[
          { l: "Trường", v: `${totalSchools}+`, i: "🎓" },
          { l: "Học bổng", v: "7+", i: "🏆" },
          { l: "Ngành học", v: `${majors.length}`, i: "📖" },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 14,
              flex: 1,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20 }}>{s.i}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: BRAND.blue }}>
              {s.v}
            </div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "14px 16px",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 15,
            marginBottom: 12,
            color: "#1a1a2e",
          }}
        >
          Khám phá sự kiện
        </div>
        {QUICK_LINKS.map((item) => (
          <div
            key={item.t}
            onClick={() => onNavigate(item.t)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 12,
              background: BRAND.lightBlue,
              marginBottom: 8,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>{item.sub}</div>
            </div>
            <div style={{ color: "#bbb", fontSize: 20 }}>›</div>
          </div>
        ))}
      </div>

      {/* Country overview */}
      <div
        style={{
          fontWeight: 800,
          fontSize: 15,
          marginBottom: 10,
          color: "#1a1a2e",
        }}
      >
        Quốc gia tham dự
      </div>
      {countries.map((c) => {
        const count = c.states
          ? c.states.reduce((a, s) => a + s.schools.length, 0)
          : c.schools?.length || 0;
        return (
          <div
            key={c.id}
            onClick={() => onNavigate("schools")}
            style={{
              background: "white",
              borderRadius: 14,
              padding: "12px 16px",
              marginBottom: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1.5px solid #f0f0f0",
            }}
          >
            <span style={{ fontSize: 28 }}>{c.flag}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e" }}>
                {c.name}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                {c.description}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: BRAND.blue }}>
                {count}
              </div>
              <div style={{ fontSize: 10, color: "#aaa" }}>trường</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
