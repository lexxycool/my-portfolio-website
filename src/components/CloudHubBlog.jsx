import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import BlogSection from "./cloudhub/sections/BlogSection";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={index} style={articleStyles.inlineCode}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\((https?:[^)]+)\)$/);
    if (link) {
      return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.cyan }}>{link[1]}</a>;
    }
    return part;
  });
}

const isTableRow = (line) => /^\s*\|.*\|\s*$/.test(line);
const splitRow = (line) => line.trim().slice(1, -1).split("|").map((cell) => cell.trim());

const BULLET = /^\s*[-*]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;
const startsBlock = (line) =>
  /^```|^#{1,6}\s|^>\s?|^-{3,}\s*$/.test(line) || isTableRow(line) || BULLET.test(line) || NUMBERED.test(line);

function renderArticleContent(content) {
  if (!content) {
    return (
      <p style={{ color: COLORS.textMuted, lineHeight: 1.8 }}>
        The content for this article has not been added yet.
      </p>
    );
  }

  const lines = content.replace(/\r\n?/g, "\n").trim().split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = blocks.length;

    if (!line.trim()) {
      i += 1;
    } else if (line.trim().startsWith("```")) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push(
        <pre key={key} style={articleStyles.code}>
          <code>{code.join("\n")}</code>
        </pre>
      );
    } else if (/^-{3,}\s*$/.test(line.trim())) {
      blocks.push(<hr key={key} style={articleStyles.rule} />);
      i += 1;
    } else if (/^#{1,6}\s/.test(line)) {
      const level = Math.min(line.match(/^#+/)[0].length + 1, 4);
      const Heading = `h${level}`;
      blocks.push(
        <Heading key={key} style={articleStyles.headings[level]}>
          {renderInline(line.replace(/^#+\s+/, ""))}
        </Heading>
      );
      i += 1;
    } else if (isTableRow(line)) {
      const rows = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(lines[i]);
        i += 1;
      }
      const body = rows.filter((row) => !/^\s*\|[\s:|-]+\|\s*$/.test(row)).map(splitRow);
      const [head, ...rest] = body;
      if (!head) continue;
      blocks.push(
        <div key={key} style={articleStyles.tableWrap}>
          <table style={articleStyles.table}>
            <thead>
              <tr>{head.map((cell, c) => <th key={c} style={articleStyles.th}>{renderInline(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {rest.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => <td key={c} style={articleStyles.td}>{renderInline(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote key={key} style={articleStyles.quote}>
          {renderInline(quote.join(" "))}
        </blockquote>
      );
    } else if (BULLET.test(line) || NUMBERED.test(line)) {
      const pattern = BULLET.test(line) ? BULLET : NUMBERED;
      const Tag = pattern === BULLET ? "ul" : "ol";
      const items = [];
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(lines[i].replace(pattern, ""));
        i += 1;
      }
      blocks.push(
        <Tag key={key} style={articleStyles.list}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    } else {
      const paragraph = [];
      while (i < lines.length && lines[i].trim() && !(paragraph.length && startsBlock(lines[i]))) {
        paragraph.push(lines[i].trim());
        i += 1;
      }
      blocks.push(
        <p key={key} style={articleStyles.paragraph}>
          {renderInline(paragraph.join(" "))}
        </p>
      );
    }
  }

  return blocks;
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
  headings: {
    2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 27,
      lineHeight: 1.35,
      color: COLORS.text,
      margin: "38px 0 14px",
    },
    3: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 22,
      lineHeight: 1.4,
      color: COLORS.text,
      margin: "30px 0 12px",
    },
    4: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 18,
      lineHeight: 1.45,
      color: COLORS.text,
      margin: "24px 0 10px",
    },
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
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13.5,
    margin: "0 0 20px",
  },
  tableWrap: { overflowX: "auto", margin: "0 0 22px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 15, lineHeight: 1.6 },
  th: {
    textAlign: "left",
    padding: "10px 14px",
    color: COLORS.text,
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
  },
  td: {
    padding: "10px 14px",
    color: COLORS.textMuted,
    border: `1px solid ${COLORS.border}`,
    verticalAlign: "top",
  },
  inlineCode: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.9em",
    color: COLORS.cyan,
    background: COLORS.surface,
    borderRadius: 4,
    padding: "2px 6px",
  },
  rule: {
    border: 0,
    borderTop: `1px solid ${COLORS.border}`,
    margin: "32px 0",
  },
  quote: {
    margin: "0 0 20px",
    padding: "4px 0 4px 18px",
    borderLeft: `3px solid ${COLORS.cyan}`,
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 1.9,
    fontStyle: "italic",
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
              <div style={articleStyles.body}>{renderArticleContent(article.content)}</div>
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
