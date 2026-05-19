export const BRAND = {
  blue: "#0E7DBB",
  orange: "#FF9E17",
  lightBlue: "#E9F7FF",
  darkBlue: "#0A5E8A",
  orangeLight: "#FFF4E0",
};
 
export const EVENT = {
  name:     "Lễ hội Du học & Học bổng 2026",
  edition:  "May Fair 2026",
  dates:    "30 Tháng 5, 2026",
  venue:    "Du Parc Hotel, P. Hai Bà Trưng – Hà Nội",
};

export const navItems = [
          { t: "home", icon: "🏠", label: "Trang chủ" },
          { t: "schools", icon: "🎓", label: "Booth/Trường" },
          { t:"majors",   icon:"📖", label:"Ngành học"},
          { t: "scholarships", icon: "🏆", label: "Học bổng" },
          { t: "map", icon: "🗺️", label: "Sơ đồ" },
        ];


export const ZONE_META = {
  SA:      { label: "Nam Úc · Adelaide",              color: "#E07B00", bg: "#FFF3E0", flag: "🇦🇺" },
  WA:      { label: "Tây Úc · Perth",                 color: "#1A4A8A", bg: "#E8EEF8", flag: "🇦🇺" },
  QLD:     { label: "Queensland · Brisbane",           color: "#6B2FA0", bg: "#F3ECF9", flag: "🇦🇺" },
  VIC:     { label: "Victoria · Melbourne",            color: "#2A7A2A", bg: "#EAF5EA", flag: "🇦🇺" },
  TAS:     { label: "Tasmania · Hobart",               color: "#333333", bg: "#EBEBEB", flag: "🇦🇺" },
  ACT:     { label: "ACT · Canberra",                  color: "#008899", bg: "#E0F5F7", flag: "🇦🇺" },
  NSW:     { label: "New South Wales · Sydney",        color: "#B52020", bg: "#FAEAEA", flag: "🇦🇺" },
  MULTI:   { label: "Úc / Mỹ / Canada / Châu Âu",     color: "#7B1A1A", bg: "#F5EAEA", flag: "🌏" },
  HS:      { label: "Nhóm trường trung học",           color: "#8B4DA0", bg: "#F5EDF9", flag: "🏫" },
  PARTNER: { label: "Đối tác ATS",                    color: "#A07800", bg: "#FFFBE0", flag: "🤝" },
};

export const booths = {
  1:  { name: "Torrens University", zone: "SA" },
  2:  { name: "Kaplan International Pathways ANZ", zone: "SA" },
  3:  { name: "Flinders University", zone: "SA" },
  4:  { name: "Kaplan Business School", zone: "SA" },
  5:  { name: "Adelaide University", zone: "SA" },
  6:  { name: "Curtin University", zone: "WA" },
  7:  { name: "The University of Western Australia", zone: "WA" },
  8:  { name: "Edith Cowan University", zone: "WA" },
  9:  { name: "Murdoch University", zone: "WA" },
  10: { name: "The University of Queensland", zone: "QLD" },
  11: { name: "James Cook University", zone: "QLD" },
  12: { name: "Griffith University", zone: "QLD" },
  13: { name: "Central Queensland University", zone: "QLD" },
  14: { name: "Queensland University of Technology", zone: "QLD" },
  15: { name: "Monash University", zone: "VIC" },
  16: { name: "La Trobe University", zone: "VIC" },
  17: { name: "Deakin University", zone: "VIC" },
  18: { name: "RMIT University", zone: "VIC" },
  19: { name: "Victoria University", zone: "VIC" },
  20: { name: "Swinburne University of Technology", zone: "VIC" },
  21: { name: "Federation University", zone: "VIC" },
  22: { name: "The University of Melbourne & Trinity College", zone: "VIC" },
  23: { name: "University of Tasmania", zone: "TAS" },
  24: { name: "University of Canberra", zone: "ACT" },
  25: { name: "Navitas Group | Úc, New Zealand, Singapore", zone: "MULTI" },
  26: { name: "Uni of Wollongong & UOW College", zone: "NSW" },
  27: { name: "Macquarie University", zone: "NSW" },
  28: { name: "University of New South Wales", zone: "NSW" },
  29: { name: "TAFE New South Wales", zone: "NSW" },
  30: { name: "University of Newcastle", zone: "NSW" },
  31: { name: "Uni of Technology Sydney & UTS College", zone: "NSW" },
  32: { name: "Australian Catholic University", zone: "NSW" },
  33: { name: "Excelsia University College", zone: "NSW" },
  34: { name: "The University of Sydney", zone: "NSW" },
  35: { name: "Intl College of Management Sydney (ICMS)", zone: "NSW" },
  36: { name: "Western Sydney University", zone: "NSW" },
  37: { name: "University of New Brunswick | Canada", zone: "MULTI" },
  38: { name: "Study Group | Mỹ", zone: "MULTI" },
  39: { name: "Kaplan International | Canada", zone: "MULTI" },
  40: { name: "Oregon State University | Mỹ", zone: "MULTI" },
  41: { name: "Stony Brook University | Mỹ", zone: "MULTI" },
  42: { name: "INTO Group | Úc, Mỹ", zone: "MULTI" },
  43: { name: "Navitas Group | Bắc Mỹ", zone: "MULTI" },
  44: { name: "Oxford Intl Education Group | Châu Âu", zone: "MULTI" },
  45: { name: "Australian Schools Alliance Vietnam | Úc", zone: "MULTI" },
  46: { name: "Trường trung học bang Nam Úc", zone: "HS" },
  47: { name: "Trường trung học bang New South Wales", zone: "HS" },
  48: { name: "EZYREMIT | Chuyển tiền quốc tế", zone: "PARTNER" },
  49: { name: "PTE Helper | Luyện thi PTE", zone: "PARTNER" },
  50: { name: "Annalink | Bảo hiểm du học", zone: "PARTNER" },
};

export const SA_WALL = [5, 4, 3, 2, 1];
export const ROW1 = [6,7,8,9,10,11,12,13,14,15,16];
export const ROW2 = [26,25,24,23,22,21,20,19,18,17];
export const ROW3L = [27,28];
export const ROW3R = [29,30,31,32,33,34,35,36,37];
export const ROW4 = [47,46,45,44,43,42,41,40,39,38];
export const ROW5 = [48,49,50];


export const countryLabel = { AU: "Úc", US: "Mỹ", CA: "Canada", ALL: "Tất cả" };
export const countryColors = { AU: BRAND.blue, US: "#B22234", CA: "#D52B1E" };