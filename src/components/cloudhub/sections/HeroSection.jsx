import React from "react";
import HeroGraphic from "../graphics/HeroGraphic";
import { heroCursorStyle, heroSectionStyles } from "./sectionStyles";

export default function HeroSection({ typed, full, onNavigate }) {
  return (
    <section className="home-hero" style={heroSectionStyles.section}>
      <div style={heroSectionStyles.contentWrap}>
        <div style={heroSectionStyles.introText}>Hi, I'm Obinna</div>
        <h1 style={heroSectionStyles.title}>
          {typed}
          <span style={heroCursorStyle(typed.length < full.length)}>|</span>
        </h1>
        <p style={heroSectionStyles.subtitle}>
          Building secure, scalable and reliable cloud solutions on Microsoft Azure and AWS.
        </p>
        <div style={heroSectionStyles.actionRow}>
          <button
            type="button"
            style={heroSectionStyles.primaryAction}
            onClick={() => onNavigate && onNavigate("projects")}
          >
            View Projects
          </button>
          <button
            type="button"
            style={heroSectionStyles.primaryAction}
            onClick={() => onNavigate && onNavigate("contact")}
          >
            Get In Touch
          </button>
        </div>
      </div>
      <HeroGraphic />
    </section>
  );
}
