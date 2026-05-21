import { useState } from "react";
import { BRAND } from "../static/constants";
import { scholarships } from "../static/scholarships";
import { universities } from "../static/institutions";

// Get school logo
const resolveLogoUrl = (logo) => {
  if (!logo) return null;
  if (logo.startsWith("http://") || logo.startsWith("https://")) {
    return logo;
  }
  try {
    return new URL(logo, import.meta.url).href;
  } catch {
    return logo;
  }
};

const getSchoolLogoUrl = (school) => {
  if (!school) return null;
  const logo = universities.find((u) => u.Name === school.name)?.Logo || null;
  return resolveLogoUrl(logo);
};

const getSchoolLink = (school) => {
  if (!school) return null;
  return (
    school.link ||
    universities.find((u) => u.Name === school.name)?.Link ||
    null
  );
};

const getSchoolState = (school) => {
  if (!school) return null;
  return universities.find((u) => u.Name === school.name)?.State || null;
};

const getSchoolRank = (school) => {
  if (!school) return null;
  return universities.find((u) => u.Name === school.name)?.Rank || null;
};

const getSchoolBooth = (school) => {
  if (!school) return null;
  return universities.find((u) => u.Name === school.name)?.Booth || null;
};

const getRelatedScholarships = (school) => {
  if (!school?.name) return [];
  const schoolName = school.name.toLowerCase();
  return scholarships.filter((s) => {
    const institution = (s.Institution || "").toLowerCase();
    const title = (s.Name || "").toLowerCase();
    if (!institution) return false;
    if (
      institution === schoolName ||
      institution.includes(schoolName) ||
      schoolName.includes(institution)
    ) {
      return true;
    }
    return title.includes(schoolName);
  });
};

export default function SchoolModal({ school, onClose, onOpenScholarships }) {
  const [logoError, setLogoError] = useState(false);

  if (!school) return null;

  const schoolLink = getSchoolLink(school);
  const schoolRank = getSchoolRank(school);
  const schoolState = getSchoolState(school);
  const schoolBooth = getSchoolBooth(school);
  const schoolLogoUrl = !logoError ? getSchoolLogoUrl(school) : null;

  const relatedScholarships = getRelatedScholarships(school);
  const relatedPreview = relatedScholarships.slice(0, 2);

  const handleOpenLink = () => {
    if (schoolLink) {
      window.open(schoolLink, "_blank");
    } else {
      onClose?.();
    }
  };

  const handleOpenScholarshipTab = () => {
    onClose?.();
    onOpenScholarships?.(school.name);
  };

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
          maxHeight: "80vh",
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
        {/* School name header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: schoolLogoUrl ? "#f5f7fb" : school.stateColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "white",
              fontWeight: 800,
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {schoolLogoUrl ? (
              <img
                src={schoolLogoUrl}
                alt={`${school.name} logo`}
                onError={() => setLogoError(true)}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              school.stateAbbr
            )}
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "000",
                marginBottom: 3,
              }}
            >
              {school.name} - {schoolRank}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#1a1a2e",
                lineHeight: 1.3,
              }}
            >
              {schoolState}
            </div>
          </div>
        </div>
        {/* Info row */}
        <div
          style={{
            background: school.stateBg,
            borderRadius: 12,
            padding: 14,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#888",
              marginBottom: 4,
            }}
          >
            VỊ TRÍ TẠI SỰ KIỆN
          </div>
          <div
            style={{ fontWeight: 700, fontSize: 14, color: school.stateColor }}
          >
            📍 Booth {schoolBooth}
          </div>
        </div>
        {/* <div
          style={{
            background: BRAND.lightBlue,
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
          }}
        >
          {/* <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.blue }}>
            💡 Trường đang có nhiều học bổng, xem ngay!
          </div> 
        </div> */}

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 13 }}>
              Học bổng nổi bật
            </div>
            {relatedScholarships.length > 2 && (
              <div style={{ fontSize: 11, color: "#666" }}>
                {relatedScholarships.length} học bổng
              </div>
            )}
          </div>

          {relatedPreview.length > 0 ? (
            relatedPreview.map((item) => (
              <div
                key={item.Scholarship_ID}
                style={{
                  borderRadius: 12,
                  border: "1px solid #eee",
                  padding: 12,
                  marginBottom: 10,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    marginBottom: 4,
                  }}
                >
                  {item.Name}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {item.Value || "Liên hệ ATS"} · {item.Level || "N/A"}
                </div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 12, color: "#666" }}>
              Chưa tìm thấy học bổng liên quan cho trường này.
            </div>
          )}
        </div>

        <button
          onClick={handleOpenScholarshipTab}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            background: BRAND.blue,
            color: "white",
            fontWeight: 800,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
            marginBottom: schoolLink ? 10 : 0,
          }}
        >
          Xem học bổng của trường
        </button>

        <button
          onClick={handleOpenLink}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            background: schoolLink ? "#1a1a2e" : BRAND.blue,
            color: "white",
            fontWeight: 800,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
          }}
        >
          {schoolLink ? "Xem thông tin chi tiết" : "Đóng"}
        </button>
      </div>
    </div>
  );
}
