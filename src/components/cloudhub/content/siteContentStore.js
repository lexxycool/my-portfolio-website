const STORAGE_KEY = "cloudhub.siteContent.v2";
const LEGACY_STORAGE_KEY = "cloudhub.siteContent.v1";

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
      slug: "building-my-cloud-resume",
      category: "AWS & Azure",
      title: "Building My Cloud Resume: From HTML Resume to a Multi-Cloud AWS Deployment",
      excerpt: "How I built a cloud resume with S3, CloudFront, HTTPS, and Azure DNS—and what I learned while troubleshooting it.",
      meta: "Oct 6, 2026  ·  10 min read",
      content: `## Introduction

The Cloud Resume Challenge is often described as a way to demonstrate cloud skills by building and deploying a resume website using cloud technologies.

For me, the project became much more than simply putting an HTML resume online.

It gave me an opportunity to take concepts I had been learning—AWS, S3, CloudFront, DNS, SSL/TLS, IAM, JavaScript, and infrastructure configuration—and put them together into a real working project.

More importantly, I wanted to document the problems I encountered along the way.

A project that works perfectly after following a tutorial doesn't necessarily demonstrate that you understand the technology. Troubleshooting a project when something goes wrong is where much of the real learning happens.

This blog documents how I built my cloud resume, the architecture I ended up with, the challenges I encountered, and how I solved them

## The Archecture

The goal was straightforward:

### Build a resume website and deploy it to the cloud using AWS.

I wanted the finished project to include:

 * An HTML/CSS resume

 * Amazon S3 for hosting the website files

 * Amazon CloudFront for content delivery

 * AWS Certificate Manager (ACM) for HTTPS

 * DNS configuration

 * Secure access between CloudFront and S3

I also wanted the project to become part of my broader cloud portfolio.

Instead of simply having a resume that said I understood AWS, I wanted to be able to point to an actual AWS deployment and explain how it worked.

The website files were stored in Amazon S3, while CloudFront handled content delivery and HTTPS. I used Origin Access Control to allow CloudFront to access the S3 origin securely, without making the bucket's objects publicly accessible.

I also connected a custom subdomain, resume.cloudwithobinna.com, using Azure DNS.

The architecture looked like this:
    
   \`\`\`
    Visitor
      |
      v
   Azure DNS
      |
      v
  resume.cloudwithobinna.com
      |
      v
  AWS CloudFront + HTTPS
      |
      v
  Origin Access Control (OAC)
      |
      v
  Amazon S3
      |
      ├── index.html
      └── style.cs
  \`\`\`
  This was important because the Cloud Resume Challenge isn't only about infrastructure. It also requires demonstrating that you can build and work with the application itself.

### Hosting the Resume in Amazon S3

Once the website was ready, I created an Amazon S3 bucket to store the website files.

The basic architecture was:

      \`\`\`
      Browser
         |
         v
      Amazon S3
         |
         ├── index.html
         └── style.css
      \`\`\`

This project also gave me hands-on experience integrating services across two cloud providers.
`,
    },
  ],
  resume: {
    title: "Cloud Engineer Resume",
    summary: "View my latest resume for skills, certifications, and project highlights.",
    url: "#",
    updatedAt: "Updated Oct 2026",
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

function slugify(text) {
  return (text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizePost(item) {
  const title = item?.title || "Untitled post";

  return {
    slug: item?.slug || slugify(title),
    category: item?.category || "",
    title,
    excerpt: item?.excerpt || "",
    meta: item?.meta || "",
    content: item?.content || "",
  };
}

function uniqueSlugs(posts) {
  const used = new Set();
  return posts.map((post) => {
    const base = slugify(post.slug) || slugify(post.title) || "post";
    let slug = base;
    for (let n = 2; used.has(slug); n += 1) slug = `${base}-${n}`;
    used.add(slug);
    return { ...post, slug };
  });
}

export function normalizeSiteContent(content) {
  const source = content || {};
  return {
    projects: Array.isArray(source.projects) ? source.projects.map(normalizeProject) : clone(defaultSiteContent.projects),
    labs: Array.isArray(source.labs) ? source.labs.map(normalizeLab) : clone(defaultSiteContent.labs),
    blogPosts: Array.isArray(source.blogPosts) ? uniqueSlugs(source.blogPosts.map(normalizePost)) : clone(defaultSiteContent.blogPosts),
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

  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    if (current) {
      return normalizeSiteContent(JSON.parse(current));
    }

    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacy) {
      return clone(defaultSiteContent);
    }

    // Carry saved v1 content forward, adding the post introduced after v1 was saved.
    const legacyContent = JSON.parse(legacy);
    // v1 posts predate slug/topic/content, so fill them in from the built-in post once.
    if (Array.isArray(legacyContent.blogPosts)) {
      legacyContent.blogPosts = legacyContent.blogPosts.map((post) => {
        const builtIn = defaultSiteContent.blogPosts.find((item) => item.title === post?.title);
        return builtIn ? { ...builtIn, ...post, slug: post.slug || builtIn.slug, category: post.category || builtIn.category, content: post.content || builtIn.content } : post;
      });
    }
    const migrated = normalizeSiteContent(legacyContent);
    const cloudResumePost = defaultSiteContent.blogPosts.find((post) => post.slug === "building-my-cloud-resume");
    if (!migrated.blogPosts.some((post) => post.slug === cloudResumePost.slug)) {
      migrated.blogPosts.push(clone(cloudResumePost));
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
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
