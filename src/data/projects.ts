// Central data file — single source of truth for all portfolio content
// Only facts supported by actual project repositories, benchmarks, and live deployments are listed.

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  category: string;
  badge: string;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  keyContribution: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  image?: string;
  status: "Active Web Tool" | "Research Benchmark" | "Live Application" | "Production Portal" | "Local-First Tool" | "Open Source CLI";
  accentColor: string;
  featured: boolean;
  metrics: ProjectMetric[];
}

export interface SecondaryProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  status: string;
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

export interface JourneyStep {
  id: string;
  label: string;
  description: string;
}

// ─── Featured Projects (Curated Top 5) ───────────────────────────────────────

export const featuredProjects: Project[] = [
  {
    id: "isocheck",
    slug: "isocheck",
    category: "SYSTEMS · DATABASE INTERNALS",
    badge: "LEAD PROJECT · SYSTEMS CORRECTNESS",
    title: "IsoCheck",
    shortDesc:
      "A black-box transactional isolation checker with a C++20 checking engine and Python workload harness that infers dependency graphs and detects isolation anomalies from client-observed histories.",
    problem:
      "Modern relational and distributed databases frequently violate advertised isolation levels under concurrent multi-client load. Verifying isolation traditionally requires internal lock tables or write-ahead logs, which managed cloud databases never expose.",
    solution:
      "IsoCheck treats the database strictly as a black box, recording client-observed transactions using unique list-append micro-operations. It reconstructs per-key version orders, synthesizes directed dependency graphs (wr and ww edges), and runs Tarjan's Strongly Connected Components (SCC) and minimal cycle search to find isolation anomalies.",
    keyContribution:
      "Engineered the C++20 checking engine compiled to WebAssembly for zero-install in-browser checking; verified G0 (Write Cycles), G1a (Aborted Reads), G1c (Circular Flow), and Garbage Reads against formal theoretical frameworks (Adya 1999, Elle).",
    tags: ["C++20", "WebAssembly", "Python 3.12", "PostgreSQL", "Graph Theory", "Tarjan SCC"],
    repoUrl: "https://github.com/Afnan-0206/IsoCheck",
    liveUrl: "https://isocheck.pages.dev/#/playground",
    caseStudyUrl: "/work/isocheck",
    image: "/images/projects/isocheck.jpg",
    status: "Active Web Tool",
    accentColor: "#10B981",
    featured: true,
    metrics: [
      { label: "Core Engine", value: "C++20 & WebAssembly" },
      { label: "Anomalies Checked", value: "G0, G1a, G1c, Garbage Reads" },
      { label: "Client Execution", value: "100% In-Browser Sandbox" },
    ],
  },
  {
    id: "inferload",
    slug: "inferload",
    category: "DEVELOPER TOOLS · LLM INFRASTRUCTURE",
    badge: "LLM BENCHMARKING & CAPACITY",
    title: "InferLoad",
    shortDesc:
      "A client-side performance-testing and capacity-planning laboratory for LLM inference endpoints (vLLM, Ollama, OpenAI-compatible) designed around the split mechanics of generative prefill and decode.",
    problem:
      "Standard HTTP load tools (wrk, k6, Locust) measure generic request round-trip latency, obscuring critical generative inference dynamics: compute-bound prefill vs memory-bound auto-regressive decode, time to first token (TTFT), inter-token latency (ITL), and KV-cache starvation.",
    solution:
      "InferLoad generates YAML-defined synthetic workloads across closed-loop concurrency and open-loop Poisson arrival streams. It parses chunked streaming responses to measure TTFT, first-byte network latency, ITL, and aggregate tokens per second, calculating unrounded percentiles (p50, p95, p99) and flagging SLO threshold breaches.",
    keyContribution:
      "Implemented the streaming token parser and statistical distribution engine; built automated saturation inflection analysis to pinpoint where server queueing degrades TTFT below operational latency targets.",
    tags: ["Python 3.12", "LLM Serving", "vLLM", "Ollama", "FastAPI", "AsyncIO", "Capacity Planning"],
    repoUrl: "https://github.com/Afnan-0206/inferLoad",
    liveUrl: "https://inferload.onrender.com",
    caseStudyUrl: "/work/inferload",
    image: "/images/projects/inferload.jpg",
    status: "Live Application",
    accentColor: "#22D3EE",
    featured: true,
    metrics: [
      { label: "Granular Metrics", value: "TTFT, ITL, Tokens/sec" },
      { label: "Workload Models", value: "Closed-Loop & Poisson Arrival" },
      { label: "Analysis Engine", value: "Saturation & SLO Inflection" },
    ],
  },
  {
    id: "fairlane",
    slug: "fairlane",
    category: "SYSTEMS RESEARCH · LLM SCHEDULING",
    badge: "RESEARCH BENCHMARK · EMPIRICAL DATA",
    title: "FairLane",
    shortDesc:
      "An experimental token-fair scheduling and admission-control benchmark comparing FIFO, Round-Robin, and Virtual Token Counter (VTC) policies under continuous batching constraints for multi-tenant LLM serving.",
    problem:
      "Under continuous batching, standard FIFO and request-count round-robin queues allow tenants submitting large prompts or long generations to monopolize GPU KV-cache capacity, subjecting co-located tenants with shorter requests to catastrophic queueing delays.",
    solution:
      "FairLane models continuous-batching LLM schedulers and compares FIFO, request-count Round-Robin, and Virtual Token Counter (VTC) algorithms under both break and skip admission modes across heterogeneous workloads (short interactive chat vs long-context RAG).",
    keyContribution:
      "Executed rigorous benchmarks across N = 30 independent random seeds with 95% non-parametric bootstrap confidence intervals; documented transparent hypothesis pre-registration, horizon-dependent FIFO degradation (up to 160x slowdown), and VTC fairness guarantees.",
    tags: ["Python", "Go", "Continuous Batching", "Scheduling Algorithms", "Bootstrap Statistics", "Systems Research"],
    repoUrl: "https://github.com/Afnan-0206/FairLane",
    caseStudyUrl: "/work/fairlane",
    image: "/images/projects/fairlane.jpg",
    status: "Research Benchmark",
    accentColor: "#F59E0B",
    featured: true,
    metrics: [
      { label: "Statistical Rigor", value: "N = 30 Seeds, 95% Bootstrap CI" },
      { label: "Policies Evaluated", value: "FIFO, Round-Robin, VTC" },
      { label: "Measured Slowdown", value: "160.4x (FIFO) → 2.0x (VTC)" },
    ],
  },
  {
    id: "bizpilot",
    slug: "bizpilot",
    category: "AGENTIC WORKFLOWS · OPERATIONS PRODUCT",
    badge: "MULTI-AGENT BUSINESS COPILOT",
    title: "BizPilot AI",
    shortDesc:
      "A multi-agent business operations copilot that converts informal WhatsApp customer requests into verified GST quotations, invoices, and multilingual customer replies.",
    problem:
      "Small service businesses (caterers, repair shops, contractors) receive informal customer requests on chat apps and manually compute unit pricing, GST, and quotations—a slow, error-prone friction that delays customer responses.",
    solution:
      "BizPilot passes each request through a transparent 5-agent pipeline: Intake → Context → Generation → Approval → Review. The Review Agent verifies line items and GST calculations against a catalog with an automated regeneration loop, and high-value orders trigger an approval gate.",
    keyContribution:
      "Engineered the full multi-agent pipeline with deterministic rule-based fallback when external LLM APIs encounter rate limits, built client-side jsPDF invoice generation, and created one-tap WhatsApp wa.me prefilled sharing.",
    tags: ["React 19", "Node.js", "Express", "Gemini API", "jsPDF", "Tailwind CSS"],
    repoUrl: "https://github.com/Afnan-0206/BizPilot",
    liveUrl: "https://biz-pilot.vercel.app",
    caseStudyUrl: "/work/bizpilot",
    image: "/images/projects/bizpilot.jpg",
    status: "Live Application",
    accentColor: "#E2B36E",
    featured: true,
    metrics: [
      { label: "Pipeline Nodes", value: "5 Collaborative Agents" },
      { label: "Verification", value: "Catalog Cross-Check & Fallback" },
      { label: "Sharing Flow", value: "Client jsPDF + WhatsApp wa.me" },
    ],
  },
  {
    id: "autofix-ai",
    slug: "autofix-ai",
    category: "DEVELOPER TOOLS · AGENTIC DEVOPS",
    badge: "AUTONOMOUS INCIDENT RESPONSE",
    title: "AutoFix AI",
    shortDesc:
      "A 6-agent autonomous DevOps incident-response command center that investigates production error traces, evaluates fixes in a self-correcting feedback loop, and drafts pull requests.",
    problem:
      "Debugging production incidents requires searching technical documentation and issue trackers, verifying patch viability, writing incident post-mortems, and drafting stakeholder communications—consuming valuable developer time during outages.",
    solution:
      "Six specialised agent nodes collaborate: Manager plans the investigation, Researcher searches documentation and GitHub issues, Analyst synthesizes solutions, Tester validates against error context with an automated feedback loop, Writer produces the incident report, and Action Agent drafts PR content.",
    keyContribution:
      "Implemented the self-correction loop between Tester and Researcher agents, designed structured incident post-mortem schemas, and built an interactive agent command center with real-time log streaming.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Multi-Agent AI", "DevOps Tooling"],
    repoUrl: "https://github.com/Afnan-0206/autofix-ai-incidents",
    liveUrl: "https://autofix-ten-zeta.vercel.app",
    caseStudyUrl: "/work/autofix-ai",
    image: "/images/projects/autofix-ai.jpg",
    status: "Live Application",
    accentColor: "#34D399",
    featured: true,
    metrics: [
      { label: "Agent Nodes", value: "6 Orchestrated Agents" },
      { label: "Correction Loop", value: "Tester → Researcher Retry" },
      { label: "Artifacts", value: "Structured Incident Report + PR Diff" },
    ],
  },
];

// ─── Selected Secondary Projects (Curated Top 3) ────────────────────────────

export const secondaryProjects: SecondaryProject[] = [
  {
    id: "scopesentry-local",
    slug: "scopesentry-local",
    title: "ScopeSentry Local",
    category: "LOCAL AI · CLIENT CONTRACTS",
    description:
      "A local-first AI assistant for freelancers and agencies that analyzes client requests against signed agreements, identifying potential scope changes with verbatim source citations and zero cloud API transmission.",
    problem:
      "Pasting confidential client agreements into cloud LLM APIs violates non-disclosure agreements, while manually verifying whether client requests fall within agreed deliverables causes billing disputes.",
    approach:
      "Runs 100% locally via Ollama (Qwen2.5) bound strictly to loopback. Features a deterministic evidence verifier that cross-checks citations verbatim against the raw agreement text, preventing hallucinated quotes, and classifies requests conservatively into INCLUDED, POTENTIAL SCOPE CHANGE, or NEEDS CLARIFICATION.",
    tags: ["Ollama", "Qwen2.5", "React", "Express", "Local-First", "Privacy"],
    repoUrl: "https://github.com/Afnan-0206/scopesentry-local",
    liveUrl: "https://scopesentry.pages.dev/",
    status: "Live Web Demo",
  },
  {
    id: "ask-olake",
    slug: "ask-olake",
    title: "Ask OLake",
    category: "CITATION-FIRST AI · DEV TOOLS",
    description:
      "A citation-first technical assistant for answering questions about the OLake data lakehouse engine, indexing 2,454 knowledge chunks across official documentation and repositories with strict source attribution.",
    problem:
      "Developer assistants frequently hallucinate configuration flags, connector capabilities, and Iceberg table maintenance settings when documentation is dense or evolving.",
    approach:
      "Combines warm-index BM25 lexical retrieval, structured citation verification and renumbering, multi-provider model failover (GLM-4.7 Flash → Gemini 2.5 Flash Lite → DeepSeek), and explicit abstention when technical evidence is insufficient.",
    tags: ["BM25 Retrieval", "Express", "React", "OpenRouter", "Documentation Engine"],
    repoUrl: "https://github.com/Afnan-0206/ask-olake",
    liveUrl: "https://ask-olake-six.vercel.app/",
    status: "Live Web Tool",
  },
  {
    id: "sri-vinayaka-pg",
    slug: "sri-vinayaka-pg",
    title: "Sri Vinayaka PG",
    category: "FULL-STACK · OPERATIONS MANAGEMENT",
    description:
      "A complete PG accommodation platform combining a public room showcase website with a full operational management dashboard for tenant lifecycles, rent ledgers, and audit logging.",
    problem:
      "Hostel owners manage resident check-ins, rent payments, room allocations, and visitor enquiries across disconnected notebooks and spreadsheets with no audit trail.",
    approach:
      "Dual-portal architecture built with React 19, TypeScript, and Supabase PostgreSQL. Implements Row-Level Security policies, automated audit-log triggers on write operations, visit scheduling, and live occupancy tracking.",
    tags: ["React 19", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Tailwind CSS"],
    repoUrl: "https://github.com/Afnan-0206/Shri-Vinayaka-Pg",
    liveUrl: "https://shri-vinayaka-pg.vercel.app",
    caseStudyUrl: "/work/sri-vinayaka-pg",
    status: "Live Production Portal",
  },
];

// Backwards-compatible alias for any consumer expecting experiments
export const experiments = secondaryProjects.map((sp) => ({
  id: sp.id,
  title: sp.title,
  description: sp.description,
  tags: sp.tags,
  repoUrl: sp.repoUrl,
  liveUrl: sp.liveUrl,
  caseStudyUrl: sp.caseStudyUrl,
  category: sp.category,
}));

// All active projects helper
export const allProjects: (Project | SecondaryProject)[] = [
  ...featuredProjects,
  ...secondaryProjects,
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
    id: "systems-infra",
    title: "Systems & Infrastructure",
    items: [
      "C++20 & WebAssembly",
      "Transactional isolation verification",
      "Dependency graph analysis (SCC)",
      "LLM inference benchmarking (TTFT/ITL)",
      "Continuous batching & scheduling",
      "Docker & Linux environments",
    ],
  },
  {
    id: "ai-systems",
    title: "Agentic AI & LLMs",
    items: [
      "Multi-agent state machines",
      "Self-correcting feedback loops",
      "Deterministic verification & fallback",
      "Local inference (Ollama)",
      "BM25 lexical retrieval & citations",
      "Structured JSON schemas",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    items: [
      "React 19 & Next.js 14",
      "TypeScript (Strict)",
      "Node.js & Express REST APIs",
      "Tailwind CSS & Framer Motion",
      "Browser Web APIs",
      "Client-side PDF & share flows",
    ],
  },
  {
    id: "databases-devops",
    title: "Databases & Cloud",
    items: [
      "PostgreSQL & Supabase",
      "Row-Level Security (RLS)",
      "Database schema & audit triggers",
      "Vercel & Render deployment",
      "Git & GitHub Actions",
      "RESTful API design",
    ],
  },
];

// ─── Journey ──────────────────────────────────────────────────────────────────

export const journeySteps: JourneyStep[] = [
  {
    id: "j1",
    label: "Systems & Web Foundations",
    description:
      "Built rigorous programming foundations in C++, Python, and modern web architectures, focusing on data structures, networking, and clean system interfaces.",
  },
  {
    id: "j2",
    label: "Full-Stack Client Systems",
    description:
      "Architected database-backed applications with PostgreSQL and Supabase, implementing Row-Level Security, automated audit logs, and responsive administrative dashboards.",
  },
  {
    id: "j3",
    label: "Multi-Agent AI & Workflows",
    description:
      "Engineered multi-agent systems with transparent reasoning pipelines, self-correction feedback loops, and deterministic fallbacks for business operations and DevOps.",
  },
  {
    id: "j4",
    label: "LLM Systems & Experimental Evaluation",
    description:
      "Built empirical infrastructure: black-box transactional isolation checking (C++20/Wasm), LLM inference load testing (TTFT/ITL metrics), and token-fair scheduling under continuous batching constraints.",
  },
  {
    id: "j5",
    label: "Now · Systems Depth & Summits",
    description:
      "Organizing crew at AgentsNexus (India's Premier Agentic AI Summit), hacking at Bengaluru Tech Week, and engineering verifiable, reliable AI and systems software.",
  },
];
