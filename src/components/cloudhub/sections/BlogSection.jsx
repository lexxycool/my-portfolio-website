import React from "react";
import { BlogCard, SectionHeader } from "../ui/Cards";
import { blogSectionStyles } from "./sectionStyles";
import { defaultSiteContent } from "../content/siteContentStore";

export default function BlogSection({
  onNavigate,
  showCta = true,
  layout = "grid",
  posts = defaultSiteContent.blogPosts,
}) {
  const isReadingList = layout === "list";

  return (
    <section
      aria-label={isReadingList ? "Blog articles" : undefined}
      style={isReadingList ? blogSectionStyles.listSection : blogSectionStyles.section}
    >
      <SectionHeader
        title={isReadingList ? "All articles" : "Latest from the blog"}
        cta={showCta ? "View all posts" : null}
        onCtaClick={() => onNavigate && onNavigate("blog")}
      />
      <div style={isReadingList ? blogSectionStyles.list : blogSectionStyles.grid}>
        {posts.map((post, index) => (
          <BlogCard
            key={post.title}
            seed={index + 1}
            title={post.title}
            excerpt={post.excerpt}
            meta={post.meta}
            category={post.category}
            layout={layout}
            onClick={() => onNavigate && onNavigate("blog", post.slug)}
          />
        ))}
      </div>
    </section>
  );
}
