import React, { useEffect, useState } from "react";
import NavBar from "./cloudhub/layout/NavBar";
import HeroSection from "./cloudhub/sections/HeroSection";
import HighlightsSection from "./cloudhub/sections/HighlightsSection";
import ProjectsSection from "./cloudhub/sections/ProjectsSection";
import BlogSection from "./cloudhub/sections/BlogSection";
import FooterSection from "./cloudhub/sections/FooterSection";
import { FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

export default function CloudHubHome({ onNavigate }) {
  const [typed, setTyped] = useState("");
  const full = "IAM a Cloud Engineer";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Home" onNavigate={onNavigate} />
      <HeroSection typed={typed} full={full} onNavigate={onNavigate} />
      <HighlightsSection />
      <ProjectsSection onNavigate={onNavigate} />
      <BlogSection onNavigate={onNavigate} />
      <FooterSection />
    </div>
  );
}
