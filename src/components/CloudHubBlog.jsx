import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import BlogSection from "./cloudhub/sections/BlogSection";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

export default function CloudHubBlog({ onNavigate }) {
  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Blog" onNavigate={onNavigate} />
      <main style={{ padding: "64px 48px 8px" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 44,
            margin: "0 0 12px",
            color: COLORS.blue,
          }}
        >
          Blog
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: COLORS.textMuted,
            maxWidth: 620,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Notes, tutorials, and cloud engineering write-ups from recent work.
        </p>
      </main>
      <BlogSection showCta={false} />
      <FooterSection />
    </div>
  );
}
