import React from "react";
import { COLORS } from "../theme";
import { navBarStyles, navLinkColor } from "./navBarStyles";

export default function NavBar() {
  const links = ["Home", "About", "Projects", "Blog", "Resources", "Resume", "Contact"];

  return (
    <nav style={navBarStyles.nav}>
      <div style={navBarStyles.brandWrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.2 8.1 4 4 0 0 1 17 16H7z" stroke={COLORS.blue} strokeWidth="1.6" />
        </svg>
        <span style={navBarStyles.brandText}>
          CloudHub
        </span>
      </div>

      <div style={navBarStyles.linksWrap}>
        {links.map((label, index) => (
          <button
            key={label}
            type="button"
            style={{
              ...navBarStyles.linkButton,
              color: navLinkColor(index === 0),
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <button type="button" style={navBarStyles.signInButton}>
        Sign in
      </button>
    </nav>
  );
}
