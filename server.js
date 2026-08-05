const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env"), override: true });

const app = express();
const port = process.env.PORT || 3001;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: "All fields are required." });
  }

  const gmailUser = (process.env.GMAIL_USER || "").trim();
  const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  const toEmail = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword) {
    return res.status(500).json({
      ok: false,
      error: "SMTP is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `CloudHub Contact <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${String(message).replace(/\n/g, "<br>")}</p>`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("SMTP send failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`SMTP server running on http://localhost:${port}`);
});
