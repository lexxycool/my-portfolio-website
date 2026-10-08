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
      slug: "understanding-azure-vnets",
      category: "Azure networking",
      title: "Understanding Azure VNets",
      excerpt: "A deep dive into Azure virtual networks and best practices.",
      meta: "May 12, 2026  ·  5 min read",
      content: `## What is an Azure virtual network?

An Azure Virtual Network (VNet) is the private network boundary for resources such as virtual machines, private endpoints, and application services. It lets those resources communicate with each other, the internet, and on-premises networks through rules you control.

A VNet belongs to one Azure region and is divided into one or more subnets. Each subnet groups resources that share routing and security requirements. Plan address ranges before deploying: overlapping ranges make it difficult to connect VNets or extend a network to another environment.

## Subnets, routes, and security

Subnets are useful boundaries, but they do not automatically isolate every workload. Network Security Groups (NSGs) contain inbound and outbound allow or deny rules. Keep rules narrow, use clear names, and avoid exposing management ports such as SSH or RDP to the entire internet.

Route tables can direct subnet traffic through a firewall or another network appliance. User-defined routes should be introduced with a clear understanding of the expected path, because an incorrect route can interrupt connectivity even when security rules allow the traffic.

## Connecting networks

VNet peering connects networks over the Azure backbone and is commonly used when applications are split across VNets. VPN Gateway and ExpressRoute provide connectivity to on-premises networks. Choose based on the required throughput, resilience, cost, and operational model.

## A practical planning checklist

- Reserve non-overlapping address space for each environment and future connections.
- Separate workloads into subnets based on trust and routing needs.
- Apply least-privilege NSG rules and review effective security rules when troubleshooting.
- Document peering, gateways, DNS, and custom routes so the traffic path is easy to follow.

Good VNet design is less about creating many network objects and more about making traffic paths explicit, secure, and supportable.`,
    },
    {
      slug: "deploying-flask-to-azure",
      category: "App deployment",
      title: "Deploying Flask to Azure",
      excerpt: "Step-by-step guide to deploy a Flask app to Azure App Service.",
      meta: "May 5, 2026  ·  7 min read",
      content: `## Prepare the Flask application

Before deployment, make sure the app exposes an application object that a production server can load. Keep development-only settings out of production, bind the server to the port supplied by the hosting environment, and list runtime dependencies in a requirements file.

Do not commit credentials or connection strings. Configure secrets and environment-specific values in the App Service configuration, and use managed identity when the application needs to access supported Azure services.

## Choose a deployment path

For a small project, a GitHub Actions workflow can install dependencies, run checks, and deploy a package to Azure App Service on each push. Another option is to deploy from the Azure portal or CLI while you are learning the platform. Whichever path you use, keep the deployed artifact reproducible.

The app's startup command must point to the correct module and WSGI application. For example, if the file is \`app.py\` and the Flask instance is named \`app\`, the WSGI target is typically \`app:app\`. Confirm the configured Python version and startup command match the project.

## Verify the deployment

After publishing, open the App Service log stream and inspect startup output before debugging the browser. A successful deployment does not guarantee a successful application startup: missing dependencies, an incorrect module path, or a missing environment variable can all prevent the app from serving requests.

- Check the deployment action or deployment logs for package and upload errors.
- Check application logs for import errors and startup failures.
- Test the health endpoint and one representative application route.
- Confirm configuration and secrets are set in the target App Service.

## Keep it maintainable

Use separate settings for development and production, pin dependencies deliberately, and add a lightweight health check. A repeatable deployment pipeline and useful logs make future changes safer than relying on manual portal edits.`,
    },
    {
      slug: "azure-functions-vs-app-service",
      category: "Azure compute",
      title: "Azure Functions vs App Service",
      excerpt: "When to use Azure Functions or App Service for your workloads.",
      meta: "Apr 28, 2026  ·  6 min read",
      content: `## Start with the workload

Azure Functions is designed for event-driven code: a function runs in response to a timer, queue message, HTTP request, or another supported trigger. Azure App Service is a managed hosting platform for web applications and APIs that typically run continuously and serve many routes.

Both can host HTTP endpoints, so the decision is not simply “API or no API.” Consider how the application runs, how its traffic behaves, and which operational model best fits the team.

## When Functions are a good fit

Choose Functions for focused tasks that react to events, scheduled jobs, integrations, and workloads that benefit from scaling based on incoming work. The programming model and hosting plan affect startup behavior, scaling limits, networking, and cost, so validate those requirements before choosing a plan.

## When App Service is a good fit

Choose App Service for a conventional web application or API that has a persistent application process, several related routes, or a deployment model centered on an app package or container. It provides managed deployment slots, custom domains, TLS configuration, and application settings.

## A quick comparison

- **Trigger model:** Functions are organized around events; App Service hosts an application.
- **Execution pattern:** Functions are often short-lived or event-driven; App Service commonly serves continuously.
- **Scaling:** Both can scale, but the available behavior depends on the selected hosting plan.
- **Operations:** App Service suits an application lifecycle; Functions suit independently triggered work.

## Make the choice deliberately

Map the expected request volume, execution duration, networking needs, deployment workflow, and budget to the current plan options. If an application needs a web front end and background processing, combining App Service with Functions can be more appropriate than forcing both workloads into one hosting model.`,
    },
    {
      slug: "building-my-cloud-resume",
      category: "AWS & Azure",
      title: "Building My Cloud Resume: From HTML Resume to a Multi-Cloud AWS Deployment",
      excerpt: "How I built a cloud resume with S3, CloudFront, HTTPS, and Azure DNS—and what I learned while troubleshooting it.",
      meta: "Oct 6, 2026  ·  8 min read",
      content: `## Introduction

The Cloud Resume Challenge gave me a way to bring together HTML, CSS, JavaScript, AWS, DNS, and security in a working project. Rather than only listing cloud technologies on a resume, I wanted to build and deploy a resume website and document the problems I had to solve along the way.

The finished project uses Amazon S3 to store the site, CloudFront to deliver it, AWS Certificate Manager (ACM) for HTTPS, and Azure DNS to manage the domain. The services have separate responsibilities, which made the project a useful exercise in understanding the full request path.

## The goal and the website

The goal was to build a resume website with a visitor counter and deploy it using AWS. I separated the resume into HTML, CSS, and JavaScript files so that the content, presentation, and client-side behavior were easier to work on independently.

The challenge was not only to make the page render. I also wanted to use a custom domain, serve the site over HTTPS, and avoid exposing the S3 bucket as the public-facing endpoint.

## Hosting with S3 and CloudFront

I stored the static website files in an S3 bucket and put a CloudFront distribution in front of that origin. I configured CloudFront Origin Access Control (OAC) so CloudFront could retrieve objects from S3 without making the bucket publicly readable.

The initial request to the CloudFront URL returned **Access Denied**. My first instinct was to focus on the bucket policy. After reviewing the OAC permissions, I checked the rest of the request path and found that the distribution had no Default Root Object configured. A request to the site root did not automatically resolve to the resume page.

Setting the Default Root Object to \`index.html\` fixed the root request after the distribution configuration deployed. The key lesson was that an error response can originate from a different part of the request path than its wording first suggests.

## Connecting a custom domain

My domain's DNS was managed in Azure DNS, while the website was delivered by AWS CloudFront. I kept the DNS zone in Azure and created a record for the resume subdomain that pointed to the CloudFront distribution.

For HTTPS, I requested a public certificate in ACM for the custom hostname. CloudFront requires its ACM certificate to be in the \`us-east-1\` region. I selected DNS validation, then added the CNAME record ACM provided to the Azure DNS zone.

The validation CNAME and the website's routing record serve different purposes. ACM's CNAME proves control of the domain; the separate record for the resume subdomain sends visitors to CloudFront. After ACM issued the certificate, I attached it to the distribution and configured the custom hostname.

## The request path

When a visitor opens the HTTPS resume URL, DNS resolves the hostname to CloudFront. CloudFront presents the ACM certificate, then uses OAC to request the site files from S3. The response travels back through CloudFront to the browser.

That path involves several independent pieces: DNS, the certificate, the CloudFront distribution, OAC, the bucket policy, and the S3 objects. Checking each boundary made it easier to find configuration mistakes.

## What I learned

- S3 stores the files; CloudFront delivers them; ACM provides the certificate; DNS resolves the hostname.
- DNS validation and visitor routing are separate DNS records with different purposes.
- A CloudFront **Access Denied** response is not proof that the bucket policy is the only problem.
- Troubleshooting works best when each step of the request path is verified instead of guessing from the final error.

This project became a practical multi-cloud deployment: Azure DNS manages the domain while AWS hosts and delivers the resume. More than any single service, the biggest value was learning to understand and troubleshoot how the pieces work together.`,
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
