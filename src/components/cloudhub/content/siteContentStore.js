const STORAGE_KEY = "cloudhub.siteContent.v1";

export const defaultSiteContent = {
  projects: [
    {
      variant: "network",
      title: "Home network scanner",
      desc: "A Python-based network scanner with Azure deployment and monitoring.",
      tags: ["Python", "Azure VM", "Nmap"],
    },
    {
      variant: "pipeline",
      title: "Azure CI/CD pipeline",
      desc: "End-to-end CI/CD pipeline using GitHub Actions and Azure.",
      tags: ["Azure DevOps", "GitHub Actions", "YAML"],
    },
    {
      variant: "container",
      title: "AI calendar assistant",
      desc: "AI agent that manages Google Calendar with natural language.",
      tags: ["Python", "Azure OpenAI", "Functions"],
    },
  ],
  labs: [
    {
      title: "Azure automation experiments",
      desc: "Small prototypes for scripting repeatable Azure tasks and deployments.",
    },
    {
      title: "Security tooling playground",
      desc: "Hands-on testing for network inspection, access control, and monitoring ideas.",
    },
    {
      title: "AI workflow prototypes",
      desc: "Quick builds for assistant-style automations and productivity workflows.",
    },
  ],
  blogPosts: [
    {
      title: "Understanding Azure VNets",
      excerpt: "A deep dive into Azure virtual networks and best practices.",
      meta: "May 12, 2024  ·  5 min read",
    },
    {
      title: "Deploying Flask to Azure",
      excerpt: "Step-by-step guide to deploy a Flask app to Azure App Service.",
      meta: "May 5, 2024  ·  7 min read",
    },
    {
      title: "Azure Functions vs App Service",
      excerpt: "When to use Azure Functions or App Service for your workloads.",
      meta: "Apr 28, 2024  ·  6 min read",
    },
  ],
  resume: {
    title: "Cloud Engineer Resume",
    summary: "Download my latest resume for skills, certifications, and project highlights.",
    url: "#",
    updatedAt: "Updated Aug 2026",
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeProject(item) {
  return {
    variant: item?.variant || "network",
    title: item?.title || "Untitled project",
    desc: item?.desc || "",
    tags: Array.isArray(item?.tags) ? item.tags.filter(Boolean) : [],
  };
}

function normalizeLab(item) {
  return {
    title: item?.title || "Untitled lab",
    desc: item?.desc || "",
  };
}

function normalizePost(item) {
  return {
    title: item?.title || "Untitled post",
    excerpt: item?.excerpt || "",
    meta: item?.meta || "",
  };
}

export function normalizeSiteContent(content) {
  const source = content || {};
  return {
    projects: Array.isArray(source.projects) ? source.projects.map(normalizeProject) : clone(defaultSiteContent.projects),
    labs: Array.isArray(source.labs) ? source.labs.map(normalizeLab) : clone(defaultSiteContent.labs),
    blogPosts: Array.isArray(source.blogPosts) ? source.blogPosts.map(normalizePost) : clone(defaultSiteContent.blogPosts),
    resume: {
      title: source.resume?.title || defaultSiteContent.resume.title,
      summary: source.resume?.summary || defaultSiteContent.resume.summary,
      url: source.resume?.url || defaultSiteContent.resume.url,
      updatedAt: source.resume?.updatedAt || defaultSiteContent.resume.updatedAt,
    },
  };
}

export function loadSiteContent() {
  if (typeof window === "undefined") {
    return clone(defaultSiteContent);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return clone(defaultSiteContent);
  }

  try {
    const parsed = JSON.parse(raw);
    return normalizeSiteContent(parsed);
  } catch (error) {
    return clone(defaultSiteContent);
  }
}

export function saveSiteContent(content) {
  const normalized = normalizeSiteContent(content);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}
