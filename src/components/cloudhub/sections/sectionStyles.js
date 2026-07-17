import { COLORS } from "../theme";

export const heroSectionStyles = {
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "72px 48px 56px",
    gap: 40,
    flexWrap: "wrap",
  },
  contentWrap: {
    maxWidth: 520,
  },
  introText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 22,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: 44,
    lineHeight: 1.1,
    color: COLORS.blue,
    margin: "0 0 20px",
    minHeight: 54,
  },
  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 1.6,
    marginBottom: 30,
  },
  actionRow: {
    display: "flex",
    gap: 14,
  },
  primaryAction: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    color: "#fff",
    background: COLORS.blue,
    border: "none",
    borderRadius: 7,
    padding: "12px 22px",
    cursor: "pointer",
  },
  secondaryAction: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    color: COLORS.text,
    background: "transparent",
    border: `1px solid ${COLORS.borderStrong}`,
    borderRadius: 7,
    padding: "12px 22px",
    cursor: "pointer",
  },
};

export function heroCursorStyle(show) {
  return { opacity: show ? 1 : 0, color: COLORS.cyan };
}

export const highlightsSectionStyles = {
  section: { padding: "0 48px 64px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
};

export const projectsSectionStyles = {
  section: { padding: "0 48px 64px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
  },
};

export const blogSectionStyles = {
  section: { padding: "0 48px 72px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
  },
};

export const footerSectionStyles = {
  footer: {
    borderTop: `1px solid ${COLORS.border}`,
    padding: "28px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  copyrightText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: COLORS.textFaint,
  },
  linkRow: {
    display: "flex",
    gap: 18,
  },
  linkButton: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: COLORS.textMuted,
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
};
