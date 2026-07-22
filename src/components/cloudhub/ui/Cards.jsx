import React from "react";
import { COLORS } from "../theme";
import { cardStyles } from "./cardStyles";

export function Highlight({ icon, title, desc }) {
  return (
    <div style={cardStyles.highlightCard}>
      <div style={cardStyles.highlightIconWrap}>
        {icon}
      </div>
      <div style={cardStyles.highlightTitle}>
        {title}
      </div>
      <div style={cardStyles.highlightDesc}>{desc}</div>
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span style={cardStyles.tag}>
      {children}
    </span>
  );
}

function ProjectThumb({ variant }) {
  const shapes = {
    network: (
      <>
        <circle cx="40" cy="30" r="7" fill={COLORS.blue} />
        <circle cx="20" cy="55" r="7" fill={COLORS.surfaceAlt} stroke={COLORS.borderStrong} />
        <circle cx="60" cy="55" r="7" fill={COLORS.surfaceAlt} stroke={COLORS.borderStrong} />
        <line x1="40" y1="30" x2="20" y2="55" stroke={COLORS.borderStrong} strokeWidth="1.5" />
        <line x1="40" y1="30" x2="60" y2="55" stroke={COLORS.borderStrong} strokeWidth="1.5" />
      </>
    ),
    pipeline: (
      <>
        <rect x="10" y="35" width="16" height="16" rx="3" fill={COLORS.blue} />
        <rect x="42" y="35" width="16" height="16" rx="3" fill={COLORS.surfaceAlt} stroke={COLORS.borderStrong} />
        <rect x="74" y="35" width="16" height="16" rx="3" fill={COLORS.cyan} opacity="0.8" />
        <line x1="26" y1="43" x2="42" y2="43" stroke={COLORS.borderStrong} strokeWidth="1.5" />
        <line x1="58" y1="43" x2="74" y2="43" stroke={COLORS.borderStrong} strokeWidth="1.5" />
      </>
    ),
    container: (
      <>
        <rect x="24" y="20" width="52" height="20" rx="3" fill={COLORS.surfaceAlt} stroke={COLORS.borderStrong} />
        <rect x="24" y="44" width="52" height="20" rx="3" fill={COLORS.blueDim} stroke={COLORS.borderStrong} />
        <circle cx="34" cy="30" r="2.5" fill={COLORS.cyan} />
        <circle cx="34" cy="54" r="2.5" fill={COLORS.blue} />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 100 74" width="100%" height="120" style={cardStyles.thumbSvg}>
      <rect x="0" y="0" width="100" height="74" fill={COLORS.surfaceAlt} />
      {shapes[variant]}
    </svg>
  );
}

export function ProjectCard({ variant, title, desc, tags, onViewProject }) {
  return (
    <div style={cardStyles.projectCard}>
      <ProjectThumb variant={variant} />
      <div style={cardStyles.projectBody}>
        <div style={cardStyles.projectTitle}>
          {title}
        </div>
        <div style={cardStyles.projectDesc}>
          {desc}
        </div>
        <div style={cardStyles.tagsRow}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <button
          type="button"
          style={cardStyles.inlineLinkButton}
          onClick={onViewProject}
        >
          View project &rarr;
        </button>
      </div>
    </div>
  );
}

function BlogThumb({ seed }) {
  const rand = (index) => {
    const x = Math.sin(seed * 999 + index * 37) * 10000;
    return x - Math.floor(x);
  };

  const points = Array.from({ length: 5 }, (_, index) => `${(index / 4) * 100},${20 + rand(index) * 40}`).join(" ");

  return (
    <svg viewBox="0 0 200 100" width="100%" height="110" style={cardStyles.thumbSvg}>
      <rect width="200" height="100" fill={COLORS.surfaceAlt} />
      <polyline points={points} fill="none" stroke={COLORS.blue} strokeWidth="2" opacity="0.7" />
      <polyline points={points} fill="none" stroke={COLORS.cyan} strokeWidth="1" opacity="0.4" transform="translate(0,8)" />
      {[0, 1, 2, 3, 4].map((index) => (
        <circle key={index} cx={(index / 4) * 200} cy={20 + rand(index) * 40} r="3" fill={COLORS.cyan} />
      ))}
    </svg>
  );
}

export function BlogCard({ seed, title, excerpt, meta }) {
  return (
    <div style={cardStyles.blogCard}>
      <BlogThumb seed={seed} />
      <div style={cardStyles.blogBody}>
        <div style={cardStyles.blogTitle}>
          {title}
        </div>
        <div style={cardStyles.blogExcerpt}>
          {excerpt}
        </div>
        <div style={cardStyles.blogMeta}>{meta}</div>
      </div>
    </div>
  );
}

export function SectionHeader({ title, cta, onCtaClick }) {
  return (
    <div style={cardStyles.sectionHeader}>
      <h2 style={cardStyles.sectionTitle}>
        {title}
      </h2>
      {cta ? (
        <button type="button" style={cardStyles.inlineLinkButton} onClick={onCtaClick}>
          {cta} &rarr;
        </button>
      ) : null}
    </div>
  );
}
