import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import AboutHeroSection from "./cloudhub/about/sections/AboutHeroSection";
import AboutSkillsSection from "./cloudhub/about/sections/AboutSkillsSection";
import { FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

export default function CloudHubAbout({ onNavigate }) {
  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="About" onNavigate={onNavigate} />
      <AboutHeroSection />
      <AboutSkillsSection />
      <FooterSection />
    </div>
  );
}
