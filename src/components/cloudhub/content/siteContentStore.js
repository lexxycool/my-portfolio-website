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
      content: `# Introduction

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
This project also gave me hands-on experience integrating services across two cloud providers.

## Challenge #1: CloudFront Returned "Access Denied"

After configuring S3 and CloudFront, I opened the CloudFront URL expecting to see my resume. Instead, I received an Access Denied error.

My first assumption was that the S3 bucket policy or OAC configuration was incorrect. I reviewed the permissions and investigated the request path.

### Eventually, I discovered the actual issue: I had not configured CloudFront's Default Root Object.

When someone accessed the root URL, CloudFront did not know to serve index.html.

I set the Default Root Object to:
\`\`\`
index.html
\`\`\`
After the configuration change deployed, the website loaded successfully.

### What I learned: An error message doesn't always identify the root cause. Instead of immediately changing permissions, I needed to check the entire request path, including CloudFront's distribution settings.


## Challenge #2: Connecting My Custom Domain

I wanted to use my own domain instead of the long CloudFront-generated URL.

My domain, cloudwithobinna.com, used Azure DNS. Rather than moving DNS management to AWS Route 53, I created the subdomain:

resume.cloudwithobinna.com

This required connecting the subdomain to my CloudFront distribution and configuring HTTPS.

I learned that I could keep DNS in Azure while hosting the website on AWS. The important part was configuring the DNS records correctly.


## Challenge #3: Configuring HTTPS with AWS Certificate Manager

To enable HTTPS, I requested a public certificate through AWS Certificate Manager for resume.cloudwithobinna.com.

CloudFront requires its ACM certificate to be in the US East (N. Virginia) region (us-east-1), so I created the certificate there.

I selected DNS validation, and ACM provided a CNAME record that I added to my Azure DNS zone.

Initially, the certificate remained in Pending validation. After checking the record and allowing time for AWS to verify it, the certificate status changed to Issued.

One important lesson was understanding the difference between two DNS records:

ACM validation CNAME: Proves control of the domain.

Website routing record: Directs visitors to the CloudFront distribution.

They serve different purposes, and configuring one does not replace the other.


### What I Learned

This project reinforced four important lessons.

### 1. Cloud services have different responsibilities.

S3 stores the website files, CloudFront delivers content, ACM provides the certificate, DNS resolves the domain, and OAC secures access to the S3 origin.

### 2. Troubleshooting requires a systematic approach.

The missing Default Root Object taught me not to assume every Access Denied error is caused by permissions.

### 3. DNS and HTTPS solve different problems.

DNS directs traffic to the correct destination, while HTTPS protects the connection and uses a valid certificate for the domain.

### 4. Multi-cloud architectures can be practical.

I kept Azure DNS while using AWS for hosting, content delivery, and certificate management. I didn't need to move every component to a single provider.


## Conclusion

The Cloud Resume Challenge became more than a website deployment exercise. It gave me practical experience configuring cloud services, integrating DNS and HTTPS, securing an S3 origin, and troubleshooting a real deployment.

The most important lesson was that knowing what each service does is only part of working in the cloud. You also need to understand how those services interact and how to investigate problems when something doesn't work as expected.

### The biggest takeaway: I didn't just learn how to deploy a website. I learned how to troubleshoot the architecture behind it.
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
