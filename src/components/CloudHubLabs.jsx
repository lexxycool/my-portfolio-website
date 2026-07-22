import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

const labItems = [
  {
    title: "Azure automation experiments",
    desc: "Small prototypes for scripting repeatable Azure tasks and deployments.",
  },
  {
    title: "Security tooling playground",
    desc: "Hands-on testing for network inspection, access control, and monitoring ideas.",
  },
  {
    title: "AI workflow prototypes",
    desc: "Quick builds for assistant-style automations and productivity workflows.",
  },
];

export default function CloudHubLabs({ onNavigate }) {
  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Labs" onNavigate={onNavigate} />
      <main style={{ padding: "64px 48px 24px" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 44,
            margin: "0 0 12px",
            color: COLORS.blue,
          }}
        >
          Labs
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
          A sandbox for experiments, prototypes, and work-in-progress ideas.
        </p>
      </main>

      <section style={{ padding: "0 48px 64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {labItems.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#111827",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 18,
                  color: COLORS.text,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: COLORS.textMuted,
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
