import React from "react";
import { COLORS } from "../theme";

export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 420 360" width="100%" style={{ maxWidth: 440, height: "auto" }}>
      <defs>
        <style>{`
          .pulse { animation: pulseDot 2.4s ease-in-out infinite; }
          .pulse2 { animation: pulseDot 2.4s ease-in-out infinite 0.8s; }
          .pulse3 { animation: pulseDot 2.4s ease-in-out infinite 1.6s; }
          @keyframes pulseDot {
            0%, 100% { opacity: 0.25; r: 3; }
            50% { opacity: 1; r: 5; }
          }
        `}</style>
      </defs>

      <path
        d="M210 120 L210 180 M150 210 L210 180 L270 210 M90 250 L150 210 M270 210 L330 250"
        stroke={COLORS.blueDim}
        strokeWidth="2"
        fill="none"
      />

      <g transform="translate(210,70)">
        <polygon points="0,0 42,24 0,48 -42,24" fill={COLORS.blue} opacity="0.9" />
        <polygon points="0,48 42,24 42,54 0,78" fill="#2C5FC4" />
        <polygon points="0,48 -42,24 -42,54 0,78" fill="#25519F" />
        <path d="M-14,20 a10,10 0 0 1 3,-19 a13,13 0 0 1 24,-2 a9,9 0 0 1 10,15 z" fill="#0A0E17" opacity="0.18" />
      </g>

      <g transform="translate(90,215)">
        <polygon points="0,0 42,24 0,48 -42,24" fill={COLORS.surface} stroke={COLORS.borderStrong} />
        <polygon points="0,48 42,24 42,54 0,78" fill="#0D1420" stroke={COLORS.border} />
        <polygon points="0,48 -42,24 -42,54 0,78" fill="#0A0E17" stroke={COLORS.border} />
        <rect x="-10" y="16" width="20" height="6" rx="1" fill={COLORS.cyan} opacity="0.8" />
      </g>

      <g transform="translate(330,215)">
        <polygon points="0,0 42,24 0,48 -42,24" fill={COLORS.surface} stroke={COLORS.borderStrong} />
        <polygon points="0,48 42,24 42,54 0,78" fill="#0D1420" stroke={COLORS.border} />
        <polygon points="0,48 -42,24 -42,54 0,78" fill="#0A0E17" stroke={COLORS.border} />
        <rect x="-10" y="16" width="20" height="6" rx="1" fill={COLORS.blue} opacity="0.8" />
      </g>

      <g transform="translate(210,255)">
        <polygon points="0,0 55,30 0,60 -55,30" fill={COLORS.surfaceAlt} stroke={COLORS.borderStrong} />
        <polygon points="0,60 55,30 55,66 0,96" fill="#0A0E17" stroke={COLORS.border} />
        <polygon points="0,60 -55,30 -55,66 0,96" fill="#080B12" stroke={COLORS.border} />
      </g>

      <circle className="pulse" cx="210" cy="150" r="3" fill={COLORS.cyan} />
      <circle className="pulse2" cx="150" cy="210" r="3" fill={COLORS.blue} />
      <circle className="pulse3" cx="270" cy="210" r="3" fill={COLORS.cyan} />
    </svg>
  );
}
