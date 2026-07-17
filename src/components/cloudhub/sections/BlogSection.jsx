import React from "react";
import { BlogCard, SectionHeader } from "../ui/Cards";
import { blogSectionStyles } from "./sectionStyles";

export default function BlogSection() {
  return (
    <section style={blogSectionStyles.section}>
      <SectionHeader title="Latest from the blog" cta="View all posts" />
      <div style={blogSectionStyles.grid}>
        <BlogCard
          seed={1}
          title="Understanding Azure VNets"
          excerpt="A deep dive into Azure virtual networks and best practices."
          meta="May 12, 2024  ·  5 min read"
        />
        <BlogCard
          seed={2}
          title="Deploying Flask to Azure"
          excerpt="Step-by-step guide to deploy a Flask app to Azure App Service."
          meta="May 5, 2024  ·  7 min read"
        />
        <BlogCard
          seed={3}
          title="Azure Functions vs App Service"
          excerpt="When to use Azure Functions or App Service for your workloads."
          meta="Apr 28, 2024  ·  6 min read"
        />
      </div>
    </section>
  );
}
