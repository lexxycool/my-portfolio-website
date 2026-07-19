import React from "react";

const COLORS = {
  bg: "#070B14",
  panel: "#0D1322",
  panelLine: "#1B2942",
  blue1: "#74A9FF",
  blue2: "#4C84F7",
  blue3: "#2454C8",
  blue4: "#12307A",
  glow: "#59D7FF",
};

export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 520 400" width="100%" style={{ maxWidth: 520, height: "auto" }}>
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#12224A" />
          <stop offset="55%" stopColor="#08101E" />
          <stop offset="100%" stopColor={COLORS.bg} />
        </radialGradient>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.blue1} />
          <stop offset="45%" stopColor={COLORS.blue2} />
          <stop offset="100%" stopColor={COLORS.blue3} />
        </linearGradient>
        <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A2650" />
          <stop offset="100%" stopColor="#0B1020" />
        </linearGradient>
        <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#63C8FF" />
          <stop offset="100%" stopColor="#2E6BFF" />
        </linearGradient>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0.18
                    0 0 1 0 0.35
                    0 0 0 0.65 0"
          />
        </filter>
        <style>{`
          .pulse { animation: pulseDot 2.8s ease-in-out infinite; }
          .pulse2 { animation: pulseDot 2.8s ease-in-out infinite 0.9s; }
          .pulse3 { animation: pulseDot 2.8s ease-in-out infinite 1.8s; }
          @keyframes pulseDot {
            0%, 100% { opacity: 0.35; transform: scale(0.92); }
            50% { opacity: 1; transform: scale(1.12); }
          }
        `}</style>
      </defs>

      <rect x="0" y="0" width="520" height="400" rx="28" fill="url(#heroGlow)" />

      <g opacity="0.45" filter="url(#softGlow)">
        <circle cx="270" cy="130" r="78" fill="#1D3F93" />
        <circle cx="165" cy="235" r="28" fill="#1A5BD9" />
        <circle cx="365" cy="235" r="28" fill="#1A5BD9" />
      </g>

      <g transform="translate(260,110)">
        <path
          d="M-78 30
             C-78 10 -60 -4 -40 0
             C-32 -18 -10 -24 8 -14
             C20 -28 42 -26 54 -10
             C70 -10 84 4 84 22
             C102 26 112 40 112 56
             C112 76 94 92 74 92
             H-46
             C-70 92 -88 74 -88 52
             C-88 40 -84 32 -78 30Z"
          fill="url(#cloudGrad)"
        />
        <path
          d="M-58 42 C-46 34 -24 30 -10 34 C8 38 22 30 38 28 C58 24 78 34 86 50"
          fill="none"
          stroke="#B8D7FF"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>

      <g transform="translate(260,205)">
        <ellipse cx="0" cy="0" rx="56" ry="12" fill="#102049" opacity="0.75" />
        <g transform="translate(0,-4)">
          <polygon points="0,-92 44,-66 0,-40 -44,-66" fill="url(#stackGrad)" />
          <polygon points="0,-40 44,-66 44,-6 0,20" fill="#2F63E3" />
          <polygon points="0,-40 -44,-66 -44,-6 0,20" fill="#244EB8" />
          <rect x="-12" y="-84" width="24" height="6" rx="3" fill="#A9EEFF" opacity="0.9" />
        </g>
      </g>

      <g transform="translate(155,275)">
        <polygon points="0,-40 38,-18 0,4 -38,-18" fill="url(#blockGrad)" stroke={COLORS.panelLine} />
        <polygon points="0,4 38,-18 38,22 0,44" fill="#0B1120" stroke={COLORS.panelLine} />
        <polygon points="0,4 -38,-18 -38,22 0,44" fill="#090E1A" stroke={COLORS.panelLine} />
        <rect x="-7" y="-24" width="14" height="4" rx="2" fill="#5CE5FF" />
      </g>

      <g transform="translate(365,275)">
        <polygon points="0,-40 38,-18 0,4 -38,-18" fill="url(#blockGrad)" stroke={COLORS.panelLine} />
        <polygon points="0,4 38,-18 38,22 0,44" fill="#0B1120" stroke={COLORS.panelLine} />
        <polygon points="0,4 -38,-18 -38,22 0,44" fill="#090E1A" stroke={COLORS.panelLine} />
        <rect x="-7" y="-24" width="14" height="4" rx="2" fill="#5A86FF" />
      </g>

      <g transform="translate(260,318)">
        <polygon points="0,-48 52,-18 0,12 -52,-18" fill="#101A33" stroke={COLORS.panelLine} />
        <polygon points="0,12 52,-18 52,26 0,56" fill="#090E1A" stroke={COLORS.panelLine} />
        <polygon points="0,12 -52,-18 -52,26 0,56" fill="#070B14" stroke={COLORS.panelLine} />
      </g>

      <path d="M260 152 V182 M260 182 L210 214 M260 182 L310 214" stroke="#3D68D8" strokeWidth="2" opacity="0.65" />
      <path d="M210 214 L182 235 M310 214 L338 235" stroke="#2D59C8" strokeWidth="2" opacity="0.55" />

      <circle className="pulse" cx="260" cy="180" r="4" fill={COLORS.glow} />
      <circle className="pulse2" cx="210" cy="214" r="4" fill="#4C84F7" />
      <circle className="pulse3" cx="310" cy="214" r="4" fill={COLORS.glow} />
    </svg>
  );
}
