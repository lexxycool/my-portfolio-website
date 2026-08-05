import React from "react";
import NavBar from "./cloudhub/layout/NavBar";
import FooterSection from "./cloudhub/sections/FooterSection";
import { cloudHubHomeStyles } from "./cloudhub/pageStyles";
import { COLORS, FONT_FACE } from "./cloudhub/theme";

const CONTACT_EMAIL = "maxirexy16@gmail.com";

export default function CloudHubContact({ onNavigate }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [status, setStatus] = React.useState({ type: "", text: "" });
  const statusTimerRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        window.clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  const scheduleStatusClear = () => {
    if (statusTimerRef.current) {
      window.clearTimeout(statusTimerRef.current);
    }

    statusTimerRef.current = window.setTimeout(() => {
      setStatus({ type: "", text: "" });
      statusTimerRef.current = null;
    }, 4500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) {
      return;
    }

    setIsSending(true);
    setStatus({ type: "", text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Message failed to send.");
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setStatus({
        type: "success",
        text: "Your message has been sent successfully. I will reply as soon as possible.",
      });
      scheduleStatusClear();
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message || "Unable to send message right now. Please try again.",
      });
      scheduleStatusClear();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={cloudHubHomeStyles.page}>
      <style>{FONT_FACE}</style>
      <NavBar activeLink="Contact" onNavigate={onNavigate} />

      <main style={{ padding: "56px 24px 56px", maxWidth: 760, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 30,
            letterSpacing: 2,
            textTransform: "uppercase",
            margin: "0 0 24px",
            color: COLORS.text,
            textAlign: "center",
          }}
        >
          Let&apos;s work together
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 620,
            margin: "0 auto",
          }}
        >
          {status.text ? (
            <div
              style={{
                marginBottom: 14,
                padding: "10px 12px",
                borderRadius: 6,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: status.type === "success" ? "#D1FAE5" : "#FEE2E2",
                background: status.type === "success" ? "#064E3B" : "#7F1D1D",
              }}
            >
              {status.text}
            </div>
          ) : null}

          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              marginBottom: 14,
              padding: "12px 18px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              background: "#F4F5F9",
              color: "#3C4A63",
            }}
          />

          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              marginBottom: 14,
              padding: "12px 18px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              background: "#F4F5F9",
              color: "#3C4A63",
            }}
          />

          <input
            type="text"
            required
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Subject"
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              marginBottom: 14,
              padding: "12px 18px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              background: "#F4F5F9",
              color: "#3C4A63",
            }}
          />

          <textarea
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="your message..."
            style={{
              width: "100%",
              minHeight: 180,
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              marginBottom: 18,
              padding: "14px 18px",
              resize: "vertical",
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              background: "#F4F5F9",
              color: "#3C4A63",
              lineHeight: 1.35,
            }}
          />

          <button
            type="submit"
            disabled={isSending}
            style={{
              border: "none",
              cursor: isSending ? "not-allowed" : "pointer",
              background: isSending ? "#6B7280" : "#2C9AD0",
              color: "#FFFFFF",
              padding: "12px 20px",
              minWidth: 150,
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.7,
              opacity: isSending ? 0.9 : 1,
            }}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textFaint, marginTop: 16, textAlign: "center" }}>
          Direct email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: COLORS.cyan, textDecoration: "none" }}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </main>

      <FooterSection />
    </div>
  );
}
