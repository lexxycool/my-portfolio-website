import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { COLORS } from "../theme";
import { navBarStyles, navLinkColor } from "./navBarStyles";

export default function NavBar({ activeLink = "Home", onNavigate }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const activeAccount = accounts[0];
  const displayName = activeAccount?.name || activeAccount?.username;

  const links = ["Home", "About", "Projects", "Labs", "Blog", "Resume", "Admin", "Contact"];

  const handleLinkClick = (label) => {
    if (!onNavigate) {
      return;
    }

    if (label === "Home") {
      onNavigate("home");
    }

    if (label === "About") {
      onNavigate("about");
    }

    if (label === "Projects") {
      onNavigate("projects");
    }

    if (label === "Blog") {
      onNavigate("blog");
    }

    if (label === "Labs") {
      onNavigate("labs");
    }

    if (label === "Resume") {
      onNavigate("resume");
    }

    if (label === "Admin") {
      onNavigate("admin");
    }

    if (label === "Contact") {
      onNavigate("contact");
    }
  };

  const handleSignOut = async () => {
    try {
      await instance.logoutPopup();
    } catch (err) {
      console.error("MSAL logout error:", err);
    }
  };

  const handleSignInClick = async () => {
    if (isAuthenticated) {
      onNavigate?.("admin");
    } else {
      onNavigate?.("signin");
    }
  };

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
        {links.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => handleLinkClick(label)}
            style={{
              ...navBarStyles.linkButton,
              color: navLinkColor(activeLink === label),
              borderBottom: activeLink === label ? `2px solid ${COLORS.blue}` : "2px solid transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {displayName && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textMuted }}>
              {displayName}
            </span>
          )}
          <button type="button" style={navBarStyles.signInButton} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <button type="button" style={navBarStyles.signInButton} onClick={() => onNavigate?.("signin")}>
          Sign in
        </button>
      )}
    </nav>
  );
}
