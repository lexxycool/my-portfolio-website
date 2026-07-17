import React from "react";
import HeroGraphic from "../graphics/HeroGraphic";
import { heroCursorStyle, heroSectionStyles } from "./sectionStyles";

export default function HeroSection({ typed, full }) {
  return (
    <section style={heroSectionStyles.section}>
      <div style={heroSectionStyles.contentWrap}>
        <div style={heroSectionStyles.introText}>Hi, I'm Obinna</div>
        <h1 style={heroSectionStyles.title}>
          {typed}
          <span style={heroCursorStyle(typed.length < full.length)}>|</span>
        </h1>
        <p style={heroSectionStyles.subtitle}>
          Building secure, scalable and reliable cloud solutions on Microsoft Azure.
        </p>
        <div style={heroSectionStyles.actionRow}>
          <button type="button" style={heroSectionStyles.primaryAction}>
            View projects
          </button>
          <button type="button" style={heroSectionStyles.secondaryAction}>
            Download resume
          </button>
        </div>
      </div>
      <HeroGraphic />
    </section>
  );
}
