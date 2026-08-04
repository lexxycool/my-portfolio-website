import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

export default function CloudHubResume({ onNavigate, siteContent }) {
  const resume = siteContent.resume;

  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Resume" onNavigate={onNavigate} />
      <main style={{ padding: "64px 48px 56px", maxWidth: 860 }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, margin: "0 0 12px", color: COLORS.blue }}>
          Resume
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, margin: "0 0 8px" }}>
          {resume.summary}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textFaint, margin: "0 0 24px" }}>
          {resume.updatedAt}
        </p>
        <a
          href={resume.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#fff",
            textDecoration: "none",
            background: COLORS.blue,
            borderRadius: 8,
            padding: "12px 20px",
          }}
        >
          Open {resume.title}
        </a>
      </main>
      <FooterSection />
    </div>
  );
}
