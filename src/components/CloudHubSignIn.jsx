import React, { useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { COLORS, FONT_FACE } from "./cloudhub/theme";

const styles = {
  page: {
    minHeight: "100vh",
    background: `radial-gradient(circle at 18% 12%, ${COLORS.blueDim} 0, transparent 28%), ${COLORS.bg}`,
    color: COLORS.text,
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 48px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: COLORS.text,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 17,
    fontWeight: 600,
  },
  backButton: {
    background: "transparent",
    border: "none",
    color: COLORS.textMuted,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    padding: 0,
  },
  main: {
    width: "min(100% - 40px, 440px)",
    margin: "auto",
    padding: "40px 0 72px",
  },
  panel: {
    background: "rgba(17, 24, 39, 0.88)",
    border: `1px solid ${COLORS.borderStrong}`,
    borderRadius: 8,
    padding: "40px 40px 36px",
    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
  },
  eyebrow: {
    color: COLORS.cyan,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: "0.08em",
    margin: "0 0 14px",
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 32,
    lineHeight: 1.15,
    margin: "0 0 10px",
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 1.6,
    margin: "0 0 30px",
  },
  submit: {
    background: COLORS.blue,
    border: "none",
    borderRadius: 6,
    color: "#FFFFFF",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    padding: "13px 16px",
    width: "100%",
  },
  msButton: {
    background: "#202736",
    border: `1px solid ${COLORS.borderStrong}`,
    borderRadius: 6,
    color: "#FFFFFF",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    padding: "13px 16px",
    width: "100%",
    transition: "background 0.2s, border-color 0.2s",
  },
  status: {
    color: COLORS.cyan,
    fontSize: 12,
    margin: "16px 0 0",
    textAlign: "center",
  },
};

export default function CloudHubSignIn({ onNavigate }) {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      window.history.pushState({}, '', '/admin');
      onNavigate?.("admin");
    }
  }, [isAuthenticated, onNavigate]);

  const handleMicrosoftSignIn = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await instance.loginRedirect({
        ...loginRequest,
        redirectStartPage: `${window.location.origin}/admin`,
      });
    } catch (err) {
      console.error("MSAL sign-in error:", err);
      if (err?.errorCode !== "user_cancelled") {
        setError(err?.message || "Microsoft sign-in failed.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{FONT_FACE}</style>
      <header style={styles.header}>
        <button type="button" style={{ ...styles.brand, background: "transparent", border: "none", cursor: "pointer", padding: 0 }} onClick={() => onNavigate?.("home")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.2 8.1 4 4 0 0 1 17 16H7z" stroke={COLORS.blue} strokeWidth="1.6" />
          </svg>
          CloudHub
        </button>
        <button type="button" style={styles.backButton} onClick={() => onNavigate?.("home")}>Back to portfolio</button>
      </header>

      <main style={styles.main}>
        <section style={styles.panel}>
          <p style={styles.eyebrow}>Secure workspace access</p>
          <h1 style={styles.title}>Welcome back.</h1>
          <p style={styles.subtitle}>
            Sign in with your Microsoft account to access your CloudHub admin dashboard.
          </p>

          <div>
            <button
              type="button"
              style={{ ...styles.msButton, opacity: isSubmitting || inProgress !== "none" ? 0.7 : 1 }}
              onClick={handleMicrosoftSignIn}
              disabled={isSubmitting || inProgress !== "none"}
            >
              <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Sign in with Microsoft
            </button>

            {error && <p style={{ ...styles.status, color: "#FF8D8D" }} role="alert">{error}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}