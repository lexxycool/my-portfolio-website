import { COLORS } from "../theme";

export const navBarStyles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 48px",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: 17,
    color: COLORS.text,
  },
  linksWrap: {
    display: "flex",
    gap: 30,
  },
  linkButton: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  signInButton: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    color: COLORS.text,
    background: "transparent",
    border: `1px solid ${COLORS.borderStrong}`,
    borderRadius: 6,
    padding: "8px 18px",
    cursor: "pointer",
  },
};

export function navLinkColor(isActive) {
  return isActive ? COLORS.blue : COLORS.textMuted;
}
