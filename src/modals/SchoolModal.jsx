import { useState } from "react";
import { BRAND } from "../static/constants";
import { universitiesHN } from "../static/univesities";

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
  const logo =
    school.logo ||
    school.logoUrl ||
    universitiesHN.find((u) => u.name === school.name)?.logo ||
    null;
  return resolveLogoUrl(logo);
};

const getSchoolLink = (school) => {
  if (!school) return null;
  return (
    school.link ||
    universitiesHN.find((u) => u.name === school.name)?.link ||
    null
  );
};

const getSchoolCity = (school) => {
  if (!school) return null;
  return (
    school.city ||
    universitiesHN.find((u) => u.name === school.name)?.city ||
    null
  );
};

const getSchoolRank = (school) => {
  if (!school) return null;
  return (
    school.rank ||
    universitiesHN.find((u) => u.name === school.name)?.rank ||
    null
  );
};

const getSchoolBooth = (school) => {
  if (!school) return null;
  return (
    school.booth ||
    universitiesHN.find((u) => u.name === school.name)?.booth ||
    null
  );
};

export default function SchoolModal({ school, onClose }) {
  const [logoError, setLogoError] = useState(false);

  if (!school) return null;

  const schoolLink = getSchoolLink(school);
  const schoolRank = getSchoolRank(school);
  const schoolCity = getSchoolCity(school);
  const schoolBooth = getSchoolBooth(school);
  const schoolLogoUrl = !logoError ? getSchoolLogoUrl(school) : null;

  const handleOpenLink = () => {
    if (schoolLink) {
      window.open(schoolLink, "_blank");
    } else {
      onClose?.();
    }
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
                color: school.stateColor,
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
              {schoolCity}
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

        {/* CTA */}
        <div
          style={{
            background: BRAND.lightBlue,
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.blue }}>
            💡 Đến gặp đại diện nhà trường tại booth để được tư vấn trực tiếp về
            học phí, học bổng và lộ trình nhập học!
          </div>
        </div>

        <button
          onClick={handleOpenLink}
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
          }}
        >
          {schoolLink ? "Xem thông tin chi tiết" : "Đóng"}
        </button>
      </div>
    </div>
  );
}
