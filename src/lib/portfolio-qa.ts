import {
  featuredProjects,
  secondaryProjects,
  capabilities,
} from "@/data/projects";

/**
 * Deterministic, local portfolio knowledge retrieval engine.
 * Powered strictly by verified project metadata, benchmark findings, and technical facts.
 */

interface QAResult {
  answer: string;
  matchedCategory?: string;
  suggestedLinks?: { label: string; url: string; external?: boolean }[];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function answerPortfolioQuestion(rawQuestion: string): QAResult {
  const q = normalize(rawQuestion);

  if (!q) {
    return {
      answer: "Please enter a question about Afnan's projects, systems work, architecture decisions, or tech stack.",
    };
  }

  // 1. IsoCheck
  if (q.includes("isocheck") || (q.includes("isolation") && (q.includes("check") || q.includes("database") || q.includes("transaction")))) {
    const p = featuredProjects.find((x) => x.id === "isocheck")!;
    return {
      answer: `**IsoCheck** is Afnan's lead systems correctness project. It is a high-performance black-box transactional isolation checker with a **C++20 checking engine** compiled to **WebAssembly** and a Python 3.12 workload harness.

**The Problem:**
Modern cloud databases frequently violate advertised isolation levels under concurrent multi-client load, but lock tables and write-ahead logs are hidden from external users.

**How IsoCheck Works:**
- Records client-observed transactions using unique list-append micro-operations against PostgreSQL or CockroachDB.
- Synthesizes directed dependency graphs (wr and ww edges).
- Executes Tarjan's Strongly Connected Components (SCC) and minimal cycle search in C++20 / Wasm.
- Detects verified anomalies: **G0 (Write Cycles)**, **G1a (Aborted Reads)**, **G1c (Circular Flow)**, and **Garbage Reads**.

The entire engine runs zero-install in the browser sandbox via WebAssembly.`,
      matchedCategory: "IsoCheck · Systems & Database Internals",
      suggestedLinks: [
        { label: "Read Case Study", url: "/work/isocheck" },
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Interactive Playground", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 2. InferLoad
  if (q.includes("inferload") || (q.includes("infer") && q.includes("load")) || q.includes("ttft") || q.includes("vllm") || q.includes("benchmark llm") || q.includes("inference capacity")) {
    const p = featuredProjects.find((x) => x.id === "inferload")!;
    return {
      answer: `**InferLoad** is a client-side performance-testing and capacity-planning laboratory for LLM inference endpoints (vLLM, Ollama, OpenAI-compatible APIs).

**Key Technical Mechanics:**
- Traditional load testers (wrk, k6) only measure generic HTTP round-trip latency, missing generative dynamics.
- InferLoad splits measurements into compute-bound **prefill** vs memory-bound autoregressive **decode**.
- Measures granular metrics: **Time To First Token (TTFT)**, First-byte network latency, **Inter-Token Latency (ITL)**, and aggregate tokens/sec.
- Supports closed-loop concurrency and open-loop **Poisson arrival streams** to discover saturation inflection points where KV-cache starvation causes latency spikes.`,
      matchedCategory: "InferLoad · Developer Tools & LLM Infrastructure",
      suggestedLinks: [
        { label: "Read Case Study", url: "/work/inferload" },
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Application", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 3. FairLane
  if (q.includes("fairlane") || (q.includes("fair") && q.includes("lane")) || q.includes("vtc") || q.includes("continuous batching") || (q.includes("scheduling") && q.includes("llm"))) {
    const p = featuredProjects.find((x) => x.id === "fairlane")!;
    return {
      answer: `**FairLane** is an empirical systems research benchmark investigating **token-fair scheduling** and admission-control algorithms for continuous-batching LLM serving.

**Research Highlights:**
- Demonstrates that under continuous batching, standard FIFO and request-count Round-Robin allow long-prompt or long-generation tenants to monopolize GPU KV-cache, causing up to **160.4x slowdown** for short interactive requests.
- Evaluates the **Virtual Token Counter (VTC)** algorithm, which brings tenant slowdown variance down to a fair **2.0x**.
- Evaluated across **N = 30 independent seeds** with 95% non-parametric bootstrap confidence intervals and pre-registered hypotheses.`,
      matchedCategory: "FairLane · Systems Research & LLM Scheduling",
      suggestedLinks: [
        { label: "Read Case Study", url: "/work/fairlane" },
        { label: "GitHub Repository", url: p.repoUrl, external: true },
      ],
    };
  }

  // 4. BizPilot AI
  if (q.includes("bizpilot") || (q.includes("biz") && q.includes("pilot")) || q.includes("whatsapp") || (q.includes("invoice") && q.includes("gst"))) {
    const p = featuredProjects.find((x) => x.id === "bizpilot")!;
    return {
      answer: `**BizPilot AI** is a multi-agent business operations copilot designed for small service businesses. It converts informal, unstructured WhatsApp inquiries into verified GST quotations, PDF invoices, and localized customer responses.

**5-Agent Architecture:**
1. **Intake Agent:** Parses raw customer messages into structured order intent.
2. **Context Agent:** Looks up product catalog items and standard rates.
3. **Generation Agent:** Drafts pricing breakdown and itemized quotations.
4. **Approval Agent:** Triggers human-in-the-loop review for high-value orders.
5. **Review Agent:** Verifies GST percentages and math against the catalog, initiating an automated regeneration loop if discrepancies occur.

Includes client-side **jsPDF generation** and deterministic rule-based fallback if external LLM APIs face rate limits.`,
      matchedCategory: "BizPilot AI · Multi-Agent Operations Copilot",
      suggestedLinks: [
        { label: "Read Case Study", url: "/work/bizpilot" },
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Application", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 5. AutoFix AI
  if (q.includes("autofix") || (q.includes("auto") && q.includes("fix")) || q.includes("incident") || (q.includes("devops") && q.includes("agent"))) {
    const p = featuredProjects.find((x) => x.id === "autofix-ai")!;
    return {
      answer: `**AutoFix AI** is an autonomous 6-agent DevOps incident-response command center that diagnoses production error traces and drafts verified PR solutions.

**6-Agent Orchestration:**
- **Manager Agent:** Analyzes the stack trace and plans the diagnostic run.
- **Researcher Agent:** Indexes codebase context, relevant documentation, and past issues.
- **Analyst Agent:** Synthesizes root-cause hypotheses and bug fixes.
- **Tester Agent:** Validates patches with an automated **Tester → Researcher feedback loop** upon test failures.
- **Writer Agent:** Assembles structured incident post-mortems.
- **Action Agent:** Formats ready-to-merge GitHub pull request diffs.`,
      matchedCategory: "AutoFix AI · Developer Tools & Agentic DevOps",
      suggestedLinks: [
        { label: "Read Case Study", url: "/work/autofix-ai" },
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Application", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 6. ScopeSentry Local
  if (q.includes("scopesentry") || (q.includes("scope") && q.includes("sentry")) || (q.includes("local") && q.includes("contract"))) {
    const p = secondaryProjects.find((x) => x.id === "scopesentry-local")!;
    return {
      answer: `**ScopeSentry Local** is a local-first AI agreement analyzer for freelancers and agencies. It flags potential out-of-scope client requests with verbatim source citations while ensuring **zero cloud data transmission**.

**Highlights:**
- Runs 100% locally through **Ollama (Qwen2.5)** bound strictly to localhost loopback.
- Contains a deterministic citation verifier that cross-checks quotes word-for-word against the agreement to eliminate hallucinations.
- Categorizes requests conservatively into *INCLUDED*, *POTENTIAL SCOPE CHANGE*, or *NEEDS CLARIFICATION*.`,
      matchedCategory: "ScopeSentry Local · Local-First Privacy AI",
      suggestedLinks: [
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Web Demo", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 7. Ask OLake
  if (q.includes("olake") || (q.includes("lakehouse") && q.includes("rag")) || q.includes("bm25")) {
    const p = secondaryProjects.find((x) => x.id === "ask-olake")!;
    return {
      answer: `**Ask OLake** is a citation-first technical assistant for querying the OLake open lakehouse documentation and codebases.

**Highlights:**
- Indexes **2,454 documentation and code chunks** with BM25 lexical retrieval.
- Verifies citations against indexed sources, enforcing strict attribution and explicit abstention when technical evidence is insufficient.
- Features multi-model failover across providers (GLM-4.7 Flash → Gemini 2.5 Flash Lite → DeepSeek).`,
      matchedCategory: "Ask OLake · Citation-First Technical Retrieval",
      suggestedLinks: [
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Web Tool", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 8. Sri Vinayaka PG
  if (q.includes("vinayaka") || q.includes("pg") || (q.includes("hostel") || q.includes("tenant"))) {
    const p = secondaryProjects.find((x) => x.id === "sri-vinayaka-pg")!;
    return {
      answer: `**Sri Vinayaka PG** is a full-stack dual-portal accommodation management system for Bangalore hostels.

**Architecture:**
- **Public Showcase:** Room visualizer, pricing, amenities, and visit scheduling.
- **Admin Management Portal:** Tenant check-ins/outs, rent ledgers, deposit tracking, and automated write audit trails.
- Built with **React 19, TypeScript, Supabase PostgreSQL**, and strict Row-Level Security (RLS) policies.`,
      matchedCategory: "Sri Vinayaka PG · Full-Stack Operations Management",
      suggestedLinks: [
        { label: "Read Case Study", url: "/work/sri-vinayaka-pg" },
        { label: "GitHub Repository", url: p.repoUrl, external: true },
        { label: "Live Production Portal", url: p.liveUrl!, external: true },
      ],
    };
  }

  // 9. LLM Infrastructure & Systems Projects
  if (q.includes("llm") || q.includes("infrastructure") || q.includes("serving") || (q.includes("systems") && (q.includes("project") || q.includes("strongest")))) {
    return {
      answer: `Afnan's strongest systems and LLM infrastructure projects focus on empirical evaluation, serving dynamics, and transactional correctness:

1. **IsoCheck (Lead Systems Project):** Black-box database transactional isolation verification using C++20, WebAssembly, and Tarjan's SCC graph cycle detection.
2. **InferLoad (LLM Capacity Planning):** Synthetic load benchmarking designed specifically around generative prefill vs autoregressive decode mechanics (TTFT, ITL, KV-cache starvation).
3. **FairLane (Research Benchmark):** Continuous-batching LLM scheduling benchmark demonstrating how Virtual Token Counter (VTC) cures the 160x slowdown caused by standard FIFO queues.
4. **ScopeSentry Local & Ask OLake:** Local-first Ollama models and citation-verified retrieval systems.`,
      matchedCategory: "Systems & LLM Infrastructure Focus",
      suggestedLinks: [
        { label: "Explore IsoCheck", url: "/work/isocheck" },
        { label: "Explore InferLoad", url: "/work/inferload" },
        { label: "Explore FairLane", url: "/work/fairlane" },
      ],
    };
  }

  // 10. AI & Agentic Projects
  if (q.includes("agent") || q.includes("ai project") || q.includes("autonomous") || q.includes("multi agent")) {
    return {
      answer: `Afnan has built several multi-agent and local AI systems:

- **AutoFix AI:** 6-agent autonomous DevOps command center featuring a self-correcting Tester ↔ Researcher retry loop.
- **BizPilot AI:** 5-agent business operations copilot that converts informal chat messages into verified GST quotations and PDF invoices with deterministic fallback.
- **ScopeSentry Local:** 100% offline local AI (Ollama/Qwen2.5) with verbatim contract citation validation.
- **Ask OLake:** BM25 citation-first documentation retrieval engine with multi-provider failover.`,
      matchedCategory: "Agentic AI & Multi-Agent Workflows",
      suggestedLinks: [
        { label: "AutoFix AI Case Study", url: "/work/autofix-ai" },
        { label: "BizPilot Case Study", url: "/work/bizpilot" },
      ],
    };
  }

  // 11. Tech Stack & Technologies
  if (q.includes("tech") || q.includes("stack") || q.includes("skill") || q.includes("language") || q.includes("tool") || q.includes("framework")) {
    const list = capabilities
      .map((c) => `**${c.title}:** ${c.items.join(", ")}`)
      .join("\n\n");
    return {
      answer: `Here is Afnan's core verified engineering stack:

${list}

Specializing in C++20/Wasm for performance kernels, Python for systems harnesses and LLM benchmarking, and TypeScript/Next.js/React 19 for resilient production frontends.`,
      matchedCategory: "Engineering Capabilities & Tech Stack",
    };
  }

  // 12. Contact, Socials, & Hiring
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("talk") || q.includes("message") || q.includes("github") || q.includes("linkedin")) {
    return {
      answer: `You can reach out to Afnan directly through multiple channels:

- **Email:** [brafnan26@gmail.com](mailto:brafnan26@gmail.com)
- **GitHub:** [github.com/Afnan-0206](https://github.com/Afnan-0206)
- **Location:** Bengaluru, India
- **Portfolio Contact Form:** Available on the homepage [Contact section](#contact).

Afnan is currently open to conversations regarding systems engineering, LLM infrastructure, and multi-agent systems engineering roles.`,
      matchedCategory: "Contact & Collaboration",
      suggestedLinks: [
        { label: "Go to Contact Form", url: "#contact" },
        { label: "View GitHub Profile", url: "https://github.com/Afnan-0206", external: true },
      ],
    };
  }

  // 13. Source Code / Repositories
  if (q.includes("source code") || q.includes("repository") || q.includes("repo") || q.includes("code")) {
    return {
      answer: `All of Afnan's flagship projects are open source with code available on GitHub:

- **IsoCheck:** [github.com/Afnan-0206/IsoCheck](https://github.com/Afnan-0206/IsoCheck) (C++20, Wasm, Python)
- **InferLoad:** [github.com/Afnan-0206/inferLoad](https://github.com/Afnan-0206/inferLoad) (Python 3.12, vLLM load lab)
- **FairLane:** [github.com/Afnan-0206/FairLane](https://github.com/Afnan-0206/FairLane) (Continuous batching scheduling research)
- **BizPilot:** [github.com/Afnan-0206/BizPilot](https://github.com/Afnan-0206/BizPilot) (React, Express, Multi-Agent)
- **AutoFix AI:** [github.com/Afnan-0206/autofix-ai-incidents](https://github.com/Afnan-0206/autofix-ai-incidents) (Agentic DevOps command center)
- **ScopeSentry Local:** [github.com/Afnan-0206/scopesentry-local](https://github.com/Afnan-0206/scopesentry-local) (Local-first Ollama)
- **Ask OLake:** [github.com/Afnan-0206/ask-olake](https://github.com/Afnan-0206/ask-olake) (BM25 citation assistant)
- **Portfolio:** [github.com/Afnan-0206/portfolio](https://github.com/Afnan-0206/portfolio) (Next.js 14, TypeScript)`,
      matchedCategory: "Open Source Codebases",
      suggestedLinks: [
        { label: "Afnan's GitHub", url: "https://github.com/Afnan-0206", external: true },
      ],
    };
  }

  // 14. Summits & Events (AgentsNexus, BTW, etc.)
  if (q.includes("nexus") || q.includes("conference") || q.includes("summit") || q.includes("hackathon") || q.includes("scaler") || q.includes("btw")) {
    return {
      answer: `Afnan is actively engaged in the Bengaluru systems & AI builder ecosystem:

- **AgentsNexus (Sep 2026):** Organizing crew member for India's premier national conference on Agentic AI, bringing together researchers and founders with industry partners (Qualcomm, Logitech, CodeRabbit).
- **Bengaluru Tech Week (BTW) Buildathon:** 48-hour buildathon sprint at Scaler School of Technology developing edge AI prototypes and high-concurrency systems.
- **Hackathons & Workshops:** Murf.AI Hackathon builder, Google Flows workshop participant, and robotics systems studies.`,
      matchedCategory: "Summits, Hackathons & Community",
      suggestedLinks: [
        { label: "View Credentials & Gallery", url: "#credentials" },
      ],
    };
  }

  // 15. About Afnan / Background
  if (q.includes("who is") || q.includes("about afnan") || q.includes("background") || q.includes("bio") || q.includes("journey")) {
    return {
      answer: `**Afnan B.R.** is an AI product builder and systems engineer based in **Bengaluru, India**.

He focuses on the systems and workflows behind modern software:
1. **Systems Correctness:** Black-box transactional isolation checking (IsoCheck) and concurrency verification.
2. **LLM Infrastructure:** Generative prefill vs decode load benchmarking (InferLoad) and continuous-batching token-fair scheduling (FairLane).
3. **Agentic Workflows:** Multi-agent pipelines with deterministic verification loops (AutoFix AI, BizPilot AI).
4. **Resilient Web Applications:** Type-safe full-stack products with PostgreSQL, Row-Level Security, and Supabase.`,
      matchedCategory: "About Afnan B.R.",
      suggestedLinks: [
        { label: "View Journey", url: "#journey" },
        { label: "View Featured Work", url: "#work" },
      ],
    };
  }

  // Honest Fallback
  return {
    answer: `I don't have verified documentation in Afnan's portfolio regarding that specific topic. 

This assistant is strictly indexed on Afnan's verified projects, systems benchmarks, and published codebases (**IsoCheck**, **InferLoad**, **FairLane**, **BizPilot AI**, **AutoFix AI**, **ScopeSentry Local**, and **Sri Vinayaka PG**).

You can ask me about:
- **IsoCheck** (C++20/Wasm isolation checking)
- **InferLoad** (LLM inference capacity testing)
- **FairLane** (Token-fair scheduling research)
- **BizPilot AI** or **AutoFix AI** (Multi-agent systems)
- **Afnan's engineering tech stack & capabilities**
- **How to get in touch**`,
    suggestedLinks: [
      { label: "Contact Afnan directly", url: "#contact" },
      { label: "Browse Featured Projects", url: "#work" },
    ],
  };
}
