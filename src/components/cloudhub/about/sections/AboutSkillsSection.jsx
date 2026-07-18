import React from "react";
import { aboutStyles } from "../aboutStyles";
import { skills } from "../aboutData";
import { IconPath, SkillTile } from "../ui/AboutPrimitives";

export default function AboutSkillsSection() {
  return (
    <section style={aboutStyles.skillsSection}>
      <h2 style={aboutStyles.skillsHeading}>Skills &amp; technologies</h2>
      <div style={aboutStyles.skillsGrid}>
        {skills.map((skill) => (
          <SkillTile key={skill.label} icon={<IconPath path={skill.path} color={skill.color} />} label={skill.label} />
        ))}
      </div>
    </section>
  );
}
