import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";
import { COLORS, FONT_FACE } from "./cloudhub/theme";
import { defaultSiteContent, normalizeSiteContent } from "./cloudhub/content/siteContentStore";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const fieldStyles = {
  input: {
    width: "100%",
    border: `1px solid ${COLORS.borderStrong}`,
    borderRadius: 8,
    background: COLORS.surfaceAlt,
    color: COLORS.text,
    padding: "10px 12px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 86,
    border: `1px solid ${COLORS.borderStrong}`,
    borderRadius: 8,
    background: COLORS.surfaceAlt,
    color: COLORS.text,
    padding: "10px 12px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    resize: "vertical",
    boxSizing: "border-box",
  },
};

function SectionCard({ title, children, onAdd }) {
  return (
    <section
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: COLORS.text, fontSize: 22 }}>{title}</h2>
        {onAdd ? (
          <button type="button" onClick={onAdd} style={{ background: COLORS.blue, color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
            Add item
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function RowActions({ onDelete }) {
  return (
    <div style={{ marginTop: 10, textAlign: "right" }}>
      <button
        type="button"
        onClick={onDelete}
        style={{
          background: "transparent",
          color: "#F38BA8",
          border: `1px solid #F38BA8`,
          borderRadius: 7,
          padding: "6px 10px",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default function CloudHubAdmin({ onNavigate, siteContent, onSaveContent }) {
  const [draft, setDraft] = React.useState(() => normalizeSiteContent(siteContent));
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setDraft(normalizeSiteContent(siteContent));
  }, [siteContent]);

  const updateListItem = (listName, index, field, value) => {
    setDraft((prev) => {
      const next = clone(prev);
      next[listName][index][field] = value;
      return next;
    });
  };

  const addListItem = (listName, starter) => {
    setDraft((prev) => {
      const next = clone(prev);
      next[listName].push(starter);
      return next;
    });
  };

  const removeListItem = (listName, index) => {
    setDraft((prev) => {
      const next = clone(prev);
      next[listName].splice(index, 1);
      return next;
    });
  };

  const handleProjectTagsChange = (index, value) => {
    const tags = value.split(",").map((tag) => tag.trim()).filter(Boolean);
    updateListItem("projects", index, "tags", tags);
  };

  const handleSave = () => {
    onSaveContent(draft);
    setMessage("Saved. Your site content has been updated.");
  };

  const handleReset = () => {
    const reset = normalizeSiteContent(defaultSiteContent);
    setDraft(reset);
    onSaveContent(reset);
    setMessage("Reset to default content.");
  };

  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Admin" onNavigate={onNavigate} />

      <main style={{ padding: "48px", maxWidth: 980 }}>
        <h1 style={{ margin: "0 0 8px", fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, color: COLORS.blue }}>
          Administrator
        </h1>
        <p style={{ margin: "0 0 20px", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>
          Update your projects, labs, blog posts, and resume details from one place.
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          <button
            type="button"
            onClick={handleSave}
            style={{ background: COLORS.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{ background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.borderStrong}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
          >
            Reset defaults
          </button>
          <button
            type="button"
            onClick={() => onNavigate("home")}
            style={{ background: "transparent", color: COLORS.textMuted, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
          >
            Back to site
          </button>
        </div>

        {message ? (
          <div style={{ marginBottom: 18, color: "#9AE6B4", fontFamily: "'Inter', sans-serif", fontSize: 14 }}>{message}</div>
        ) : null}

        <SectionCard
          title="Projects"
          onAdd={() => addListItem("projects", { variant: "network", title: "", desc: "", tags: [] })}
        >
          {draft.projects.map((project, index) => (
            <div key={`project-${index}`} style={{ borderTop: index ? `1px solid ${COLORS.border}` : "none", paddingTop: index ? 14 : 0, marginTop: index ? 14 : 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Variant</label>
                <select value={project.variant} onChange={(event) => updateListItem("projects", index, "variant", event.target.value)} style={fieldStyles.input}>
                  <option value="network">network</option>
                  <option value="pipeline">pipeline</option>
                  <option value="container">container</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Title</label>
                <input value={project.title} onChange={(event) => updateListItem("projects", index, "title", event.target.value)} style={fieldStyles.input} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Description</label>
                <textarea value={project.desc} onChange={(event) => updateListItem("projects", index, "desc", event.target.value)} style={fieldStyles.textarea} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Tags</label>
                <input value={(project.tags || []).join(", ")} onChange={(event) => handleProjectTagsChange(index, event.target.value)} style={fieldStyles.input} />
              </div>
              <RowActions onDelete={() => removeListItem("projects", index)} />
            </div>
          ))}
        </SectionCard>

        <SectionCard
          title="Labs"
          onAdd={() => addListItem("labs", { title: "", desc: "" })}
        >
          {draft.labs.map((lab, index) => (
            <div key={`lab-${index}`} style={{ borderTop: index ? `1px solid ${COLORS.border}` : "none", paddingTop: index ? 14 : 0, marginTop: index ? 14 : 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Title</label>
                <input value={lab.title} onChange={(event) => updateListItem("labs", index, "title", event.target.value)} style={fieldStyles.input} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Description</label>
                <textarea value={lab.desc} onChange={(event) => updateListItem("labs", index, "desc", event.target.value)} style={fieldStyles.textarea} />
              </div>
              <RowActions onDelete={() => removeListItem("labs", index)} />
            </div>
          ))}
        </SectionCard>

        <SectionCard
          title="Blog"
          onAdd={() => addListItem("blogPosts", { title: "", excerpt: "", meta: "" })}
        >
          {draft.blogPosts.map((post, index) => (
            <div key={`post-${index}`} style={{ borderTop: index ? `1px solid ${COLORS.border}` : "none", paddingTop: index ? 14 : 0, marginTop: index ? 14 : 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Title</label>
                <input value={post.title} onChange={(event) => updateListItem("blogPosts", index, "title", event.target.value)} style={fieldStyles.input} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Excerpt</label>
                <textarea value={post.excerpt} onChange={(event) => updateListItem("blogPosts", index, "excerpt", event.target.value)} style={fieldStyles.textarea} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Meta</label>
                <input value={post.meta} onChange={(event) => updateListItem("blogPosts", index, "meta", event.target.value)} style={fieldStyles.input} />
              </div>
              <RowActions onDelete={() => removeListItem("blogPosts", index)} />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Resume">
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
            <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Title</label>
            <input
              value={draft.resume.title}
              onChange={(event) => setDraft((prev) => ({ ...prev, resume: { ...prev.resume, title: event.target.value } }))}
              style={fieldStyles.input}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
            <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Summary</label>
            <textarea
              value={draft.resume.summary}
              onChange={(event) => setDraft((prev) => ({ ...prev, resume: { ...prev.resume, summary: event.target.value } }))}
              style={fieldStyles.textarea}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 10 }}>
            <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Resume URL</label>
            <input
              value={draft.resume.url}
              onChange={(event) => setDraft((prev) => ({ ...prev, resume: { ...prev.resume, url: event.target.value } }))}
              style={fieldStyles.input}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12 }}>
            <label style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textMuted, fontSize: 13 }}>Updated text</label>
            <input
              value={draft.resume.updatedAt}
              onChange={(event) => setDraft((prev) => ({ ...prev, resume: { ...prev.resume, updatedAt: event.target.value } }))}
              style={fieldStyles.input}
            />
          </div>
        </SectionCard>
      </main>

      <FooterSection />
    </div>
  );
}
