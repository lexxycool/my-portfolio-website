import React from "react";
import { COLORS } from "../../theme";
import { aboutStyles } from "../aboutStyles";

export function IconPath({ path, color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d={path} stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AvatarPlaceholder({ imageSrc = "/avatar.jpg", alt = "Profile photo", onClick }) {
  const [hasImageError, setHasImageError] = React.useState(false);

  React.useEffect(() => {
    setHasImageError(false);
  }, [imageSrc]);

  if (!hasImageError) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", cursor: onClick ? "pointer" : "default" }}
        onError={() => setHasImageError(true)}
        onClick={onClick}
      />
    );
  }

  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block", cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <rect width="220" height="220" fill="#D9DDE3" />
      <circle cx="110" cy="88" r="38" fill="#0A0E17" opacity="0.82" />
      <path d="M40 210 C40 150 70 122 110 122 C150 122 180 150 180 210 Z" fill="#0A0E17" opacity="0.82" />
      <circle cx="110" cy="88" r="38" fill="none" stroke={COLORS.blue} strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export function InfoRow({ icon, label, value }) {
  return (
    <div style={aboutStyles.infoRow}>
      <div style={aboutStyles.infoIconWrap}>{icon}</div>
      <div>
        <div style={aboutStyles.infoLabel}>{label}</div>
        <div style={aboutStyles.infoValue}>{value}</div>
      </div>
    </div>
  );
}

export function SkillTile({ icon, label }) {
  return (
    <div style={aboutStyles.skillTile}>
      <div style={aboutStyles.skillIconWrap}>{icon}</div>
      <span style={aboutStyles.skillLabel}>{label}</span>
    </div>
  );
}
