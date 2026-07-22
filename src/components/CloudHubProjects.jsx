import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import ProjectsSection from "./cloudhub/sections/ProjectsSection";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

export default function CloudHubProjects({ onNavigate }) {
  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Projects" onNavigate={onNavigate} />
      <main style={{ padding: "64px 48px 8px" }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, margin: "0 0 12px", color: COLORS.blue }}>
          Projects
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: COLORS.textMuted, maxWidth: 620, lineHeight: 1.6, margin: 0 }}>
          A selection of cloud, automation, and AI work I've built recently.
        </p>
      </main>
      <ProjectsSection showCta={false} />
      <FooterSection />
    </div>
  );
}
