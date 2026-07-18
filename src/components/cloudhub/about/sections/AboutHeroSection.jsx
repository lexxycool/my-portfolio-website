import React from "react";
import { COLORS } from "../../theme";
import { aboutStyles } from "../aboutStyles";
import { AvatarPlaceholder, InfoRow } from "../ui/AboutPrimitives";

export default function AboutHeroSection() {
  const [avatarPreview, setAvatarPreview] = React.useState(null);
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

    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview((prev) => {
      if (prev && prev.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return objectUrl;
    });
  };

  return (
    <section style={aboutStyles.heroSection}>
      <div style={aboutStyles.heroContent}>
        <div style={aboutStyles.sectionAccent} />
        <h1 style={aboutStyles.heading}>About me</h1>
        <p style={aboutStyles.paragraph}>
          I'm a Cloud Engineer passionate about building secure, scalable and cost-effective cloud solutions.
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
            value="obinna@example.com"
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

      <div style={aboutStyles.avatarWrap}>
        <AvatarPlaceholder imageSrc={avatarPreview || "/avatar.jpg"} />
      </div>
    </section>
  );
}
