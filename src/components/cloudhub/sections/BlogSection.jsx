import React from "react";
import { BlogCard, SectionHeader } from "../ui/Cards";
import { blogSectionStyles } from "./sectionStyles";
import { defaultSiteContent } from "../content/siteContentStore";

export default function BlogSection({ onNavigate, showCta = true, posts = defaultSiteContent.blogPosts }) {
  return (
    <section style={blogSectionStyles.section}>
      <SectionHeader
        title="Latest from the blog"
        cta={showCta ? "View all posts" : null}
        onCtaClick={() => onNavigate && onNavigate("blog")}
      />
      <div style={blogSectionStyles.grid}>
        {posts.map((post, index) => (
          <BlogCard
            key={post.title}
            seed={index + 1}
            title={post.title}
            excerpt={post.excerpt}
            meta={post.meta}
          />
        ))}
      </div>
    </section>
  );
}
