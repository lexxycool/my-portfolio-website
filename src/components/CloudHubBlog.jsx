import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import BlogSection from "./cloudhub/sections/BlogSection";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

function stripInlineMarkdown(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");
}

function renderArticleContent(content) {
  if (!content) {
    return (
      <p style={{ color: COLORS.textMuted, lineHeight: 1.8 }}>
        The content for this article has not been added yet.
      </p>
    );
  }

  return content
    .trim()
    .split(/\n{2,}/)
    .map((block, index) => {
      const trimmed = block.trim();

      if (trimmed.startsWith("```")) {
        return (
          <pre key={index} style={articleStyles.code}>
            <code>{trimmed.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "")}</code>
          </pre>
        );
      }

      if (/^#{1,3}\s/.test(trimmed)) {
        const level = Math.min(trimmed.match(/^#+/)[0].length, 3);
        const Heading = `h${level}`;
        return (
          <Heading key={index} style={articleStyles.heading}>
            {trimmed.replace(/^#{1,3}\s+/, "")}
          </Heading>
        );
      }

      const lines = trimmed.split("\n");
      if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
        return (
          <ul key={index} style={articleStyles.list}>
            {lines.map((line, itemIndex) => (
              <li key={itemIndex}>
                {stripInlineMarkdown(line.replace(/^\s*[-*]\s+/, ""))}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} style={articleStyles.paragraph}>
          {stripInlineMarkdown(trimmed)}
        </p>
      );
    });
}

const articleStyles = {
  page: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "64px clamp(20px, 6vw, 48px) 88px",
  },
  backButton: {
    color: COLORS.cyan,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    background: "none",
    border: 0,
    padding: 0,
    marginBottom: 36,
    cursor: "pointer",
  },
  category: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: COLORS.cyan,
    margin: "0 0 14px",
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(34px, 6vw, 48px)",
    lineHeight: 1.15,
    color: COLORS.text,
    margin: "0 0 16px",
  },
  excerpt: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 17,
    lineHeight: 1.75,
    color: COLORS.textMuted,
    margin: "0 0 18px",
  },
  meta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: COLORS.textFaint,
    margin: "0 0 32px",
  },
  body: {
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: 24,
    fontFamily: "'Inter', sans-serif",
  },
  heading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 24,
    lineHeight: 1.35,
    color: COLORS.text,
    margin: "32px 0 12px",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 1.9,
    color: COLORS.textMuted,
    margin: "0 0 18px",
  },
  list: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 1.9,
    paddingLeft: 24,
    margin: "0 0 20px",
  },
  code: {
    overflowX: "auto",
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: 16,
    color: COLORS.cyan,
    lineHeight: 1.6,
  },
  notFound: {
    maxWidth: 820,
    minHeight: 320,
    margin: "0 auto",
    padding: "72px clamp(20px, 6vw, 48px)",
    color: COLORS.textMuted,
    fontFamily: "'Inter', sans-serif",
  },
};

export default function CloudHubBlog({ onNavigate, siteContent, articleSlug }) {
  const article = articleSlug
    ? siteContent.blogPosts.find((post) => post.slug === articleSlug)
    : null;

  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Blog" onNavigate={onNavigate} />
      {articleSlug ? (
        article ? (
          <main style={articleStyles.page}>
            <button type="button" style={articleStyles.backButton} onClick={() => onNavigate("blog")}>
              &larr; All articles
            </button>
            <article>
              {article.category ? <p style={articleStyles.category}>{article.category}</p> : null}
              <h1 style={articleStyles.title}>{article.title}</h1>
              {article.excerpt ? <p style={articleStyles.excerpt}>{article.excerpt}</p> : null}
              {article.meta ? <p style={articleStyles.meta}>{article.meta}</p> : null}
              <div>{renderArticleContent(article.content)}</div>
            </article>
          </main>
        ) : (
          <main style={articleStyles.notFound}>
            <h1>Article not found</h1>
            <p>This blog article may have been removed or its link may be incorrect.</p>
            <button type="button" style={articleStyles.backButton} onClick={() => onNavigate("blog")}>
              &larr; All articles
            </button>
          </main>
        )
      ) : (
        <>
          <main
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "72px clamp(20px, 6vw, 48px) 12px",
            }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: COLORS.cyan,
                letterSpacing: "0.08em",
                margin: "0 0 12px",
                textTransform: "uppercase",
              }}
            >
              Field notes &amp; tutorials
            </p>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 48,
                lineHeight: 1.1,
                margin: "0 0 16px",
                color: COLORS.text,
              }}
            >
              The blog
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: COLORS.textMuted,
                maxWidth: 660,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Practical notes on cloud engineering, projects, and lessons learned along the way.
            </p>
          </main>
          <BlogSection showCta={false} layout="list" onNavigate={onNavigate} posts={siteContent.blogPosts} />
        </>
      )}
      <FooterSection />
    </div>
  );
}
