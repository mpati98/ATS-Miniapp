import { useState } from "react";
import { BRAND } from "../static/constants";
import HomeTab from "@/tabs/HomeTab";
import MajorsTab from "@/tabs/MajorsTab";
import MapTab from "@/tabs/MapTab";
import ScholarshipsTab from "@/tabs/ScholarshipsTab";
import SchoolsTab from "@/tabs/SchoolsTab";
import BottomNav from "@/components/bottomNav";
import Header from "@/components/header";
import SchoolModal from "@/modals/SchoolModal";
import ScholarshipModal from "@/modals/ScholarshipModal";
// import InteractMap from "@/tabs/interactMap";
export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleNavigate = (newTab) => {
    setTab(newTab);
  };

  return (
    <div
      style={{
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: BRAND.lightBlue,
        paddingBottom: 72,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }
        input  { font-family: inherit; }
      `}</style>

      <Header />

      <div style={{ padding: "0 16px" }}>
        {tab === "home" && <HomeTab onNavigate={handleNavigate} />}
        {tab === "schools" && <SchoolsTab onSelectSchool={setSelectedSchool} />}
        {tab === "majors" && <MajorsTab />}
        {tab === "scholarships" && (
          <ScholarshipsTab onSelect={setSelectedScholarship} />
        )}
        {tab === "map" && <MapTab onSelectSchool={setSelectedSchool} />}
      </div>

      <BottomNav activeTab={tab} onTabChange={handleTabChange} />

      {/* Modals */}
      <SchoolModal
        school={selectedSchool}
        onClose={() => setSelectedSchool(null)}
      />
      <ScholarshipModal
        scholarship={selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
      />
    </div>
  );
}
