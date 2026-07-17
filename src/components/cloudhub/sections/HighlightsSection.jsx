import React from "react";
import { COLORS } from "../theme";
import { Highlight } from "../ui/Cards";
import { highlightsSectionStyles } from "./sectionStyles";

export default function HighlightsSection() {
  return (
    <section style={highlightsSectionStyles.section}>
      <div style={highlightsSectionStyles.grid}>
        <Highlight
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 18a4.5 4.5 0 0 1-.4-9A5.5 5.5 0 0 1 17.2 8 4 4 0 0 1 17 16H7z" stroke={COLORS.blue} strokeWidth="1.8" />
            </svg>
          )}
          title="Cloud solutions"
          desc="Designing scalable and resilient cloud architectures."
        />
        <Highlight
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 3 7v10l9 5 9-5V7z" stroke={COLORS.blue} strokeWidth="1.8" />
            </svg>
          )}
          title="Azure expertise"
          desc="Skilled in Azure services, networking, security and DevOps."
        />
        <Highlight
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 12h4l2-6 4 12 2-6h4" stroke={COLORS.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          title="Automation"
          desc="Automating infrastructure and deployments with IaC."
        />
        <Highlight
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke={COLORS.blue} strokeWidth="1.8" />
              <path d="M12 7v5l3 3" stroke={COLORS.blue} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
          title="Monitoring"
          desc="Implementing monitoring for performance and reliability."
        />
      </div>
    </section>
  );
}
