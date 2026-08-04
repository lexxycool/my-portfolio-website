import React from "react";
import { ProjectCard, SectionHeader } from "../ui/Cards";
import { projectsSectionStyles } from "./sectionStyles";
import { defaultSiteContent } from "../content/siteContentStore";

export default function ProjectsSection({ onNavigate, showCta = true, projects = defaultSiteContent.projects }) {
  return (
    <section style={projectsSectionStyles.section}>
      <SectionHeader
        title="Featured projects"
        cta={showCta ? "View all projects" : null}
        onCtaClick={() => onNavigate && onNavigate("projects")}
      />
      <div style={projectsSectionStyles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            variant={project.variant || "network"}
            title={project.title}
            desc={project.desc}
            tags={project.tags || []}
            onViewProject={() => onNavigate && onNavigate("projects")}
          />
        ))}
      </div>
    </section>
  );
}
