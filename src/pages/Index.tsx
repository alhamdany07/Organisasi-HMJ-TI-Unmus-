import "@fontsource/sora/300.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import ProgramsSection from "@/components/ProgramsSection";
import StatsSection from "@/components/StatsSection"; // 👈 TAMBAH INI
import StructureSection from "@/components/StructureSection";

import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import AllMembersSection from "@/components/AllMembersSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VisionMissionSection />
        <ProgramsSection />
        <StructureSection />
        <AllMembersSection />

        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
