import React from "react";
import { ProjectCard, SectionHeader } from "../ui/Cards";
import { projectsSectionStyles } from "./sectionStyles";

export default function ProjectsSection({ onNavigate, showCta = true }) {
  return (
    <section style={projectsSectionStyles.section}>
      <SectionHeader
        title="Featured projects"
        cta={showCta ? "View all projects" : null}
        onCtaClick={() => onNavigate && onNavigate("projects")}
      />
      <div style={projectsSectionStyles.grid}>
        <ProjectCard
          variant="network"
          title="Home network scanner"
          desc="A Python-based network scanner with Azure deployment and monitoring."
          tags={["Python", "Azure VM", "Nmap"]}
          onViewProject={() => onNavigate && onNavigate("projects")}
        />
        <ProjectCard
          variant="pipeline"
          title="Azure CI/CD pipeline"
          desc="End-to-end CI/CD pipeline using GitHub Actions and Azure."
          tags={["Azure DevOps", "GitHub Actions", "YAML"]}
          onViewProject={() => onNavigate && onNavigate("projects")}
        />
        <ProjectCard
          variant="container"
          title="AI calendar assistant"
          desc="AI agent that manages Google Calendar with natural language."
          tags={["Python", "Azure OpenAI", "Functions"]}
          onViewProject={() => onNavigate && onNavigate("projects")}
        />
      </div>
    </section>
  );
}
