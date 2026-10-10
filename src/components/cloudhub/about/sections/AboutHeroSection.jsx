import React from "react";
import { COLORS } from "../../theme";
import { aboutStyles } from "../aboutStyles";
import { AvatarPlaceholder, InfoRow } from "../ui/AboutPrimitives";

const AVATAR_STORAGE_KEY = "cloudhub.about.avatar";

const CERTIFICATIONS = [
  {
    name: "AWS Certified Cloud Practitioner",
    dates: "Sep 2026 – Sep 2029",
    verifyUrl: "https://aws.amazon.com/verification",
    idLabel: "Validation Number",
    id: "71ccdacbf4864e008690940343888eb4",
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    dates: "Jul 2026 – Jul 2027",
    idLabel: "Credential ID",
    id: "BAA39DF82A92FF7",
  },
  {
    name: "CompTIA Security+",
    dates: "Apr 2026 – Apr 2029",
    idLabel: "Credential ID",
    id: "dc72e254-dc31-443e-81ab-992610621539",
  },
];

export default function AboutHeroSection() {
  const [avatarPreview, setAvatarPreview] = React.useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(AVATAR_STORAGE_KEY);
  });
  const fileInputRef = React.useRef(null);

  const handlePickPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : null;
      if (!dataUrl) {
        return;
      }

      setAvatarPreview(dataUrl);
      window.localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="about-hero" style={aboutStyles.heroSection}>
      <div style={aboutStyles.heroContent}>
        <div style={aboutStyles.sectionAccent} />
        <h1 style={aboutStyles.heading}>About me</h1>
        <p style={aboutStyles.paragraph}>
          I began my career as a Software Engineer, where I developed and maintained applications while collaborating closely with Site Reliability Engineers (SREs).
          Working alongside the SRE team exposed me to cloud infrastructure, automation, system reliability, and production operations. 
          Seeing how cloud technologies improved scalability, reliability, and deployment processes sparked my interest in cloud engineering.
          <br></br><br></br>IAM a Cloud Engineer passionate about building secure, scalable and cost-effective cloud solutions.
        </p>

        <div style={aboutStyles.infoGrid}>
          <InfoRow
            icon={(
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 8v4l3 2" stroke={COLORS.blue} strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke={COLORS.blue} strokeWidth="1.7" />
              </svg>
            )}
            label="Experience"
            value="3+ Years"
          />
          <InfoRow
            icon={(
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z" stroke={COLORS.blue} strokeWidth="1.7" />
                <circle cx="12" cy="9.5" r="2.3" stroke={COLORS.blue} strokeWidth="1.7" />
              </svg>
            )}
            label="Location"
            value="Houston, Texas"
          />
          <InfoRow
            icon={(
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke={COLORS.blue} strokeWidth="1.7" />
                <path d="M3 7l9 6 9-6" stroke={COLORS.blue} strokeWidth="1.7" />
              </svg>
            )}
            label="Email"
            value="maxirexy16@gmail.com"
          />
          <InfoRow
            icon={(
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke={COLORS.blue} strokeWidth="1.7" />
                <path d="M8 10v6M8 8h.01M12 16v-3a2 2 0 0 1 4 0v3" stroke={COLORS.blue} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            label="LinkedIn"
            value={(
              <a
                href="https://www.linkedin.com/in/obinna-alex-mokwe/"
                target="_blank"
                rel="noreferrer"
                style={aboutStyles.infoLink}
              >
                linkedin.com/in/obinna-alex-mokwe
              </a>
            )}
          />
        </div>

        <div style={aboutStyles.uploadRow}>
          <button type="button" style={aboutStyles.uploadButton} onClick={handlePickPhoto}>
            Upload photo
          </button>
          <span style={aboutStyles.uploadHint}>JPG, PNG, WEBP supported</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handlePhotoChange}
            style={aboutStyles.hiddenFileInput}
          />
        </div>

      </div>

      <div className="about-avatar" style={aboutStyles.avatarWrap}>
        <AvatarPlaceholder imageSrc={avatarPreview || "/avatar.jpg"} onClick={handlePickPhoto} />
      </div>

      <div style={aboutStyles.certifications}>
        <h2 style={aboutStyles.certificationsHeading}>Certifications</h2>
        <div className="certification-list" style={aboutStyles.certificationList}>{CERTIFICATIONS.map((cert) => (
          <p key={cert.name} style={aboutStyles.certification}>
            <strong style={aboutStyles.certificationName}>{cert.name}</strong>
            {cert.dates}
            {cert.verifyUrl ? (
              <>
                <br />
                Validate at:{" "}
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer" style={aboutStyles.certificationLink}>
                  {cert.verifyUrl}
                </a>
              </>
            ) : null}
            <br />
            <span style={aboutStyles.certificationId}>{cert.idLabel}: {cert.id}</span>
          </p>
        ))}</div>
      </div>
    </section>
  );
}
