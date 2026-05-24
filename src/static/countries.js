// schools.js — Danh sách trường theo Quốc gia → Bang

export const countries = [
  {
    id: "AU",
    label: "Úc",
    flag: "🇦🇺",
    color: "#0E7DBB",
    bg: "#E9F7FF",
    desc: "7 bang & vùng lãnh thổ",
    intro:
      "Ở Úc có nhiều trường tại sự kiện, ATS chia theo từng bang để bạn dễ tìm kiếm.",
    states: [
      {
        id: "NSW",
        label: "New South Wales",
        flag: "🏙️",
        color: "#B91C1C",
        bg: "#FEE2E2",
        desc: "Sydney · Newcastle · Wollongong",
        highlight: "Thủ đô văn hóa, giáo dục hàng đầu nước Úc.",
        schools: [
          "Macquarie University",
          "Torrens University Australia",
          "Southern Cross University",
          "University of New South Wales",
          "University of Newcastle",
          "Western Sydney University",
          "University of Wollongong",
          "University of Wollongong College",
          "University of Technology Sydney",
          "University of Technology Sydney College",
          "New South Wales Government Schools",
        ],
      },
      {
        id: "VIC",
        label: "Victoria",
        flag: "🌆",
        color: "#B91C1C",
        bg: "#ffeb3b",
        desc: "Melbourne · Geelong",
        highlight: "Trung tâm kinh tế, nhiều việc làm, cộng đồng Việt lớn.",
        schools: [
          "Swinburne University of Technology",
          "Chisholm Institute",
          "University of Melbourne",
          "Trinity College",
          "Federation University",
          "Monash University",
          "RMIT University",
          "La Trobe University",
          "Deakin University",
        ],
      },
      {
        id: "QLD",
        label: "Queensland",
        flag: "☀️",
        color: "#FFF",
        bg: "#504caf",
        desc: "Brisbane · Gold Coast",
        highlight: "Khí hậu ấm áp, chi phí hợp lý, phát triển du lịch.",
        schools: [
          "The University of Queensland",
          "Queensland University of Technology",
          "Education Queensland International",
        ],
      },
      {
        id: "SA",
        label: "South Australia",
        flag: "🌿",
        color: "#FFF",
        bg: "#ff5722",
        desc: "Adelaide · Mount Gambier",
        highlight:
          "Chi phí phải chăng, môi trường sống yên bình, nhiều hỗ trợ.",
        schools: [
          "Study Adelaide",
          "Adelaide University",
          "Flinders University",
          "South Australian Department for Education International",
        ],
      },
      {
        id: "WA",
        label: "Western Australia",
        flag: "⛏️",
        color: "#FFF",
        bg: "#3f51b5",
        desc: "Perth · Fremantle",
        highlight: "Kinh tế mạnh, nhiều việc làm, chính sách định cư tốt.",
        schools: ["Murdoch University", "TAFE International"],
      },
      {
        id: "ACT",
        label: "Australian Capital Territory",
        flag: "🏛️",
        color: "#B91C1C",
        bg: "#00fff6",
        desc: "Canberra",
        highlight: "Thủ đô an toàn, giáo dục chất lượng, cơ hội định cư cao.",
        schools: ["Australian National University"],
      },
    ],
  },
  {
    id: "CA",
    label: "Canada",
    flag: "🇨🇦",
    color: "#D52B1E",
    bg: "#FDE8E8",
    desc: "Chính sách định cư rộng mở",
    intro:
      "Canada là điểm đến lý tưởng với chính sách định cư rộng mở và chất lượng giáo dục đẳng cấp thế giới.",
    states: [
      {
        id: "CA",
        label: "Canada",
        flag: "🏙️",
        color: "#FFF",
        bg: "#922820",
        // desc: "Toronto · Ottawa · Hamilton",
        highlight:
          "Canada là điểm đến lý tưởng với chính sách định cư rộng mở và chất lượng giáo dục đẳng cấp thế giới.",
        schools: ["Sault College", "Algonquin College"],
      },
    ],
  },
  {
    id: "PT",
    label: "Partner",
    flag: "🤝",
    color: "#D52B1E",
    bg: "#000000",
    desc: "Đối tác của ATS",
    intro:
      "Các đối tác chiến lược của ATS sẽ mang đến những cơ hội học tập và định cư tuyệt vời tại nhiều quốc gia khác nhau.",
    states: [
      {
        id: "PT",
        label: "Đối tác tuyển sinh",
        flag: "🎓",
        color: "#B91C1C",
        bg: "#922820",
        desc: "VN - AUS",
        highlight:
          "Đối tác tuyển sinh hàng đầu tại Việt Nam, chuyên hỗ trợ du học Úc và các quốc gia khác.",
        schools: [
          "British University Vietnam",
          "Học viện Ngoại giao",
          "Singapore Airlines",
          "PTE Helper",
          "Career Mentor",
        ],
      },
    ],
  },
  {
    id: "GLOBAL",
    label: "Tổ chức Giáo dục",
    flag: "🌏",
    color: "#7E22CE",
    bg: "#F3E8FF",
    desc: "Lộ trình chuyển tiếp đa quốc gia",
    intro:
      "Chưa đủ điều kiện đầu vào trực tiếp hoặc muốn tìm lộ trình đa quốc gia? Các tập đoàn hàng đầu này sẽ là cầu nối vững chắc.",
    states: [
      {
        id: "global_orgs",
        label: "Tập đoàn Quốc tế",
        flag: "🌐",
        color: "#FFF",
        bg: "#922820",
        desc: "Úc · Mỹ · Canada · Anh · Châu Âu",
        schools: [
          "Kaplan International",
          "Study Group",
          "INTO Group",
          "Navitas Group",
        ],
        orgDetails: {
          "Kaplan International":
            "Chuyên cung cấp lộ trình vào các trường hàng đầu tại Mỹ, Canada và Anh Quốc.",
          "Study Group":
            "Đối tác chiến lược của nhiều đại học danh giá tại Úc, Mỹ, Anh, New Zealand và Châu Âu.",
          "INTO Group":
            "Hỗ trợ sinh viên quốc tế vào các trường đại học nghiên cứu hàng đầu tại Mỹ, Anh và Úc.",
          "Navitas Group":
            "Mạng lưới giáo dục khổng lồ với chương trình chuyển tiếp tại Úc, NZ, Singapore và nhiều nơi khác.",
        },
      },
    ],
  },
];
