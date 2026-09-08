// Central data file — single source of truth for all portfolio content
// Only facts supported by the actual project repositories and the prompt are listed.

export interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  keyContribution: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  accentColor: string;
  featured: boolean;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: "hackathon" | "workshop" | "certificate" | "summit";
  imageUrl: string;
  location?: string;
  role?: string;
  description?: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  items: string[];
}

// ─── Featured Projects ───────────────────────────────────────────────────────

export const featuredProjects: Project[] = [
  {
    id: "bizpilot",
    slug: "bizpilot",
    category: "FLAGSHIP · MULTI-AGENT AI",
    title: "BizPilot AI",
    shortDesc:
      "A multi-agent business copilot that converts informal customer messages into verified quotations, invoices and multilingual replies.",
    problem:
      "Small service businesses frequently receive unstructured requests through WhatsApp and manually calculate pricing, GST, quotations and customer replies—a slow, error-prone process.",
    solution:
      "BizPilot passes each request through a transparent five-agent pipeline: Intake → Context → Generation → Approval → Review. Each agent's output is visible so the business owner understands exactly what the system decided and why.",
    keyContribution:
      "Designed the full multi-agent architecture with rule-based fallback so the system degrades gracefully when the Gemini API is unavailable. Built the PDF export and WhatsApp-ready sharing flow.",
    tags: ["React", "Node.js", "Gemini", "Tailwind CSS"],
    repoUrl: "https://github.com/Afnan-0206/BizPilot",
    liveUrl: "https://biz-pilot.vercel.app",
    accentColor: "#22D3EE",
    featured: true,
  },
  {
    id: "sri-vinayaka-pg",
    slug: "sri-vinayaka-pg",
    category: "CLIENT PRODUCT · FULL-STACK",
    title: "Sri Vinayaka PG",
    shortDesc:
      "A complete PG accommodation platform combining a public website with a full operational management dashboard.",
    problem:
      "PG owners typically manage rooms, residents, rent, enquiries and visits through disconnected messages, notebooks or spreadsheets—with no audit trail.",
    solution:
      "A unified system containing a public room and facility website alongside an admin dashboard for resident management, rent-payment tracking, enquiry pipeline, visit scheduling, analytics and audit logs—all backed by Supabase with row-level security.",
    keyContribution:
      "Architected the Supabase schema with RLS and automated audit-log triggers. Built both the public-facing site and the admin interface as a single cohesive product.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    repoUrl: "https://github.com/Afnan-0206/Shri-Vinayaka-Pg",
    liveUrl: "https://shri-vinayaka-pg.vercel.app",
    accentColor: "#8B5CF6",
    featured: true,
  },
  {
    id: "autofix-ai",
    slug: "autofix-ai",
    category: "AUTONOMOUS AI · DEVOPS",
    title: "AutoFix AI",
    shortDesc:
      "A six-agent DevOps incident-response system that researches errors, validates proposed fixes and generates actionable technical reports.",
    problem:
      "Debugging DevOps incidents requires searching documentation, evaluating multiple solutions and writing structured reports—time-consuming work that blocks engineers from shipping.",
    solution:
      "Six specialised agents collaborate: Manager creates the investigation plan, Researcher searches relevant sources, Analyst selects the best solution, Tester validates it, Writer produces the incident report, and Action Agent drafts communication and pull-request content. When a fix is rejected, the loop restarts using the tester's feedback.",
    keyContribution:
      "Implemented the self-correction feedback loop between the Tester and Researcher agents, and designed the incident-report schema produced by the Writer agent.",
    tags: ["React", "Node.js", "Anthropic API", "Express"],
    repoUrl: "https://github.com/Afnan-0206/autofix-ai-incidents",
    accentColor: "#34D399",
    featured: true,
  },
  {
    id: "f1-race-strategy",
    slug: "f1-race-strategy",
    category: "MACHINE LEARNING · SPORTS ANALYTICS",
    title: "F1 Race Strategy AI",
    shortDesc:
      "A machine-learning system for predicting Formula 1 finishing positions and exploring race scenarios using historical data.",
    problem:
      "Predicting race outcomes requires combining driver form, qualifying positions, championship context and track characteristics in a way that generalises across seasons.",
    solution:
      "Feature engineering on historical F1 data, time-based cross-validation to avoid data leakage, and a LightGBM regression model. A Streamlit interface lets users explore scenario inputs interactively.",
    keyContribution:
      "Designed the feature engineering pipeline (driver form, grid position, championship standing) and implemented time-based train/test splitting to prevent leakage from future races.",
    tags: ["Python", "LightGBM", "Pandas", "Streamlit"],
    repoUrl: "https://github.com/Afnan-0206/f1-race-prediction",
    accentColor: "#F59E0B",
    featured: true,
  },
  {
    id: "nammafix-ai",
    slug: "nammafix-ai",
    category: "CIVIC AI · HACKATHON MVP",
    title: "NammaFix AI",
    shortDesc:
      "A civic reporting prototype that turns citizen-submitted local issues into structured, prioritised reports using Gemini-assisted analysis.",
    problem:
      "Citizens often have no structured way to report local infrastructure issues, and reports that do exist are unorganised, underprioritised and hard to act on.",
    solution:
      "Text and photo issue submission with browser geolocation, Gemini-powered categorisation and severity analysis, duplicate detection, community verification and a prototype authority dashboard with an impact scoreboard. A deterministic fallback handles API failures transparently.",
    keyContribution:
      "Built the Gemini integration for issue categorisation with a deterministic fallback, and implemented the geolocation and duplicate-detection logic.",
    tags: ["React", "Gemini", "JavaScript", "Browser APIs"],
    repoUrl: "https://github.com/Afnan-0206/nammafix-ai",
    liveUrl: "https://nammafix-ai.vercel.app",
    accentColor: "#EC4899",
    featured: true,
  },
];

// ─── Experiments & Additional Builds ────────────────────────────────────────

export const experiments: Experiment[] = [
  {
    id: "cloudops",
    title: "CloudOps Responder",
    description:
      "A technical experiment in Python and Docker that simulates cloud incident environments, grades automated responses and evaluates incident-handling logic in isolated containers.",
    tags: ["Python", "Docker", "Incident Response"],
    repoUrl: "https://github.com/Afnan-0206/cloud-incident-openenv",
  },
  {
    id: "formgenius",
    title: "FormGenius",
    description:
      "A zero-prompt AI career-intelligence application that accepts structured inputs, analyses résumé data using Gemini and surfaces tailored insights through a Streamlit interface.",
    tags: ["Python", "Gemini", "Streamlit"],
    repoUrl: "https://github.com/Afnan-0206/formgenius",
  },
  {
    id: "edusphere",
    title: "EduSphere School",
    description:
      "A polished school landing page built as a client-facing frontend exercise, demonstrating responsive layout, component structure and clean visual hierarchy.",
    tags: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/Afnan-0206/edusphere-school-landing-page",
  },
];

// ─── Credentials & Summit Experiences ──────────────────────────────────────

export const credentials: Credential[] = [
  {
    id: "agentsnexus-arch",
    title: "AgentsNexus: India's Premier Conference on Agentic AI",
    issuer: "AgentsNexus Organizing Team & Community",
    date: "Sep 2026",
    type: "summit",
    imageUrl: "/images/agentsnexus-team-arch.jpg",
    location: "Bengaluru, India",
    role: "Organizing Crew & AI Builder",
    description:
      "Core organizing team bringing together top AI researchers, founders, and autonomous agent builders from across India at the premier national Agentic AI summit.",
  },
  {
    id: "btw-buildathon",
    title: "Bengaluru Tech Week Buildathon 2026",
    issuer: "Scaler School of Technology × BTW",
    date: "Sep 2026",
    type: "hackathon",
    imageUrl: "/images/btw-buildathon-scaler.jpg",
    location: "Bengaluru, India",
    role: "Buildathon Hacker & Fellow",
    description:
      "Intensive 48-hour buildathon sprint at Scaler School of Technology developing edge AI prototypes, civic intelligence systems, and high-concurrency architectures.",
  },
  {
    id: "agentsnexus-stage",
    title: "AgentsNexus Main Stage & Builder Cohort",
    issuer: "AgentsNexus Stage & Crew",
    date: "Sep 2026",
    type: "summit",
    imageUrl: "/images/agentsnexus-stage-crew.jpg",
    location: "Bengaluru, India",
    role: "Stage Crew & Developer Advocate",
    description:
      "High-energy builder cohort celebration on the main conference stage with industry sponsors Qualcomm, Logitech, Coderabbit, and leading AI pioneers.",
  },
  {
    id: "agentsnexus-monument",
    title: "The Future Runs on AI Agents",
    issuer: "AgentsNexus Flagship Summit",
    date: "Sep 2026",
    type: "summit",
    imageUrl: "/images/agentsnexus-banner.jpg",
    location: "Bengaluru, India",
    role: "Summit Monument & Vision",
    description:
      "Flagship visual and keynote theme highlighting how multi-agent state machines and deterministic validation are transforming enterprise engineering.",
  },
  {
    id: "murf-hackathon",
    title: "Murf.AI Hackathon",
    issuer: "Murf.AI × NxtWave",
    date: "26 Mar 2026",
    type: "hackathon",
    imageUrl: "/certificates/certificate-1.jpg",
    location: "Bengaluru, India",
    role: "Hackathon Builder",
    description:
      "Built an AI-first collaborative prototype with rapid speech synthesis and automated customer response workflows.",
  },
  {
    id: "google-flows",
    title: "Google Flows Workshop",
    issuer: "S-VYASA & NxtWave",
    date: "06 Mar 2026",
    type: "workshop",
    imageUrl: "/certificates/certificate-2.jpg",
    location: "Bengaluru, India",
    role: "Workshop Participant",
    description:
      "Explored generative AI pipelines, prompt structuring, and practical workflow application design.",
  },
  {
    id: "base44",
    title: "Base44 Workshop",
    issuer: "Base44 × NxtWave",
    date: "18 Nov 2025",
    type: "workshop",
    imageUrl: "/certificates/certificate-3.jpg",
    location: "Bengaluru, India",
    role: "Frontend Engineer",
    description:
      "Designed modern UI components, interaction patterns, and performance-first web delivery techniques.",
  },
  {
    id: "autonomous-vehicle",
    title: "Autonomous Vehicle Workshop",
    issuer: "NxtWave Robotics",
    date: "15 Nov 2025",
    type: "workshop",
    imageUrl: "/certificates/certificate-4.jpg",
    location: "Bengaluru, India",
    role: "Robotics Systems Student",
    description:
      "Robotics-led sessions focused on autonomous vehicle control loops and sensor-driven decision systems.",
  },
];

// ─── Capabilities ─────────────────────────────────────────────────────────────

export const capabilities: CapabilityGroup[] = [
  {
    id: "ai-systems",
    title: "AI Systems",
    items: [
      "Multi-agent workflows",
      "Gemini & Anthropic integrations",
      "Structured generation",
      "AI fallback logic",
      "Prompt & output validation",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    items: ["React", "Next.js", "TypeScript", "Node.js", "Express", "REST APIs"],
  },
  {
    id: "data-ml",
    title: "Data & Machine Learning",
    items: [
      "Python",
      "Pandas",
      "NumPy",
      "LightGBM",
      "Scikit-learn",
      "Model evaluation",
    ],
  },
  {
    id: "databases-deployment",
    title: "Databases & Deployment",
    items: [
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "Vercel",
      "Render",
      "Git & GitHub",
    ],
  },
];

// ─── Journey ──────────────────────────────────────────────────────────────────

export interface JourneyStep {
  id: string;
  label: string;
  description: string;
}

export const journeySteps: JourneyStep[] = [
  {
    id: "j1",
    label: "Web Foundations",
    description:
      "Started building responsive web interfaces, learning HTML, CSS and JavaScript through real client-facing exercises.",
  },
  {
    id: "j2",
    label: "Client Projects",
    description:
      "Built education and client-facing websites, developing a sense for visual hierarchy, usability and clean component structure.",
  },
  {
    id: "j3",
    label: "Database-Backed Platforms",
    description:
      "Progressed into database-backed admin platforms with Supabase and PostgreSQL, adding authentication, row-level security and audit logging.",
  },
  {
    id: "j4",
    label: "AI & Multi-Agent Systems",
    description:
      "Developed AI and multi-agent products for hackathons—building visible reasoning pipelines, fallback logic and structured output validation.",
  },
  {
    id: "j5",
    label: "Now · Summits & Production",
    description:
      "Co-organizing India's Premier Conference on Agentic AI (AgentsNexus), hacking at Bengaluru Tech Week Buildathons, and shipping resilient full-stack multi-agent systems.",
  },
];
