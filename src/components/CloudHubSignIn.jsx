import React, { useState } from "react";
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
  field: {
    marginBottom: 18,
  },
  label: {
    color: COLORS.textMuted,
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 8,
  },
  input: {
    background: COLORS.surfaceAlt,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    boxSizing: "border-box",
    color: COLORS.text,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    outline: "none",
    padding: "12px 13px",
    width: "100%",
  },
  passwordRow: {
    position: "relative",
  },
  toggle: {
    background: "transparent",
    border: "none",
    color: COLORS.textMuted,
    cursor: "pointer",
    fontSize: 11,
    position: "absolute",
    right: 12,
    top: 13,
  },
  options: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    margin: "4px 0 26px",
  },
  checkboxLabel: {
    alignItems: "center",
    color: COLORS.textMuted,
    display: "flex",
    fontSize: 12,
    gap: 8,
  },
  link: {
    background: "transparent",
    border: "none",
    color: COLORS.blue,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    padding: 0,
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
  status: {
    color: COLORS.cyan,
    fontSize: 12,
    margin: "16px 0 0",
    textAlign: "center",
  },
  footer: {
    color: COLORS.textFaint,
    fontSize: 12,
    margin: "24px 0 0",
    textAlign: "center",
  },
};

export default function CloudHubSignIn({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, remember }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to sign in.");
      }
      onNavigate("admin");
    } catch (submitError) {
      setError(submitError.message || "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{FONT_FACE}</style>
      <header style={styles.header}>
        <button type="button" style={{ ...styles.brand, background: "transparent", border: "none", cursor: "pointer", padding: 0 }} onClick={() => onNavigate("home")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.2 8.1 4 4 0 0 1 17 16H7z" stroke={COLORS.blue} strokeWidth="1.6" />
          </svg>
          CloudHub
        </button>
        <button type="button" style={styles.backButton} onClick={() => onNavigate("home")}>Back to portfolio</button>
      </header>

      <main style={styles.main}>
        <section style={styles.panel}>
          <p style={styles.eyebrow}>Secure workspace access</p>
          <h1 style={styles.title}>Welcome back.</h1>
          <p style={styles.subtitle}>Sign in to continue to your CloudHub workspace and pick up where you left off.</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={(event) => setEmail(event.target.value)} style={styles.input} />
            </div>

            <div style={{ ...styles.field, marginBottom: 0 }}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.passwordRow}>
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required value={password} onChange={(event) => setPassword(event.target.value)} style={{ ...styles.input, paddingRight: 62 }} />
                <button type="button" style={styles.toggle} onClick={() => setShowPassword((current) => !current)}>{showPassword ? "Hide" : "Show"}</button>
              </div>
            </div>

            <div style={styles.options}>
              <label style={styles.checkboxLabel}><input type="checkbox" name="remember" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Remember me</label>
              <button type="button" style={styles.link}>Forgot password?</button>
            </div>

            <button type="submit" style={{ ...styles.submit, opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in to CloudHub"}</button>
            {error && <p style={{ ...styles.status, color: "#FF8D8D" }} role="alert">{error}</p>}
          </form>
        </section>
        <p style={styles.footer}>New to CloudHub? <button type="button" style={styles.link}>Create an account</button></p>
      </main>
    </div>
  );
}