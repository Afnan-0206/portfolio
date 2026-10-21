# Afnan B.R. — Systems & AI Engineering Portfolio

<div align="center">

![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.1-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-E2B36E?style=for-the-badge)

<br />

**Systems Software · LLM Infrastructure · Autonomous Agentic Systems · Full-Stack Products**

[Live Portfolio](https://afnan-portfolio-eta.vercel.app) · [GitHub Profile](https://github.com/Afnan-0206) · [LinkedIn](https://www.linkedin.com/in/afnan-391912363) · [Email](mailto:brafnan26@gmail.com)

</div>

---

## 🧭 Overview

A modern engineering portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Framer Motion**, engineered around an obsidian & warm gold design language (`#090A0C` / `#E2B36E`).

Designed to highlight verifiable systems engineering, empirical LLM benchmarks, and reliable agentic architectures rather than generic UI templates or toy AI wrappers.

### 🌟 Key Highlights

- ⚡ **Full Mobile Viewport Responsiveness**: Calibrated layout, touch targets ($\ge 44\times 44\text{px}$), and typography verified across 320px, 375px, 768px, 1024px, and 1440px+ displays.
- 🔬 **Interactive Systems Simulators**: Live interactive widgets demonstrating transactional dependency graph cycle detection (C++20/Wasm), LLM TTFT/ITL saturation metrics, scheduling policy comparisons, multi-agent WhatsApp quotation flows, and DevOps incident self-correction.
- 🍱 **Bento-Grid Showcase Architecture**: Strongly typed project data model rendering flagship systems and responsive bento cards with isolated widgets.
- 📑 **Comprehensive Case Studies**: Dedicated deep-dive routes (`/work/[slug]`) covering problem diagnosis, architectural designs, empirical evidence, and documented theoretical/practical limitations.
- 🏆 **Community & Summit Recognition**: Documented contributions to *AgentsNexus* (India's Premier Agentic AI Summit), *Bengaluru Tech Week Buildathon*, and verified certifications.

---

## 🛠️ Featured Engineering Projects

### 1. [IsoCheck](https://github.com/Afnan-0206/IsoCheck) — Black-Box Transactional Isolation Checker
> High-performance black-box transactional isolation checker implementing C++20 graph cycle algorithms and a Python workload harness.
- **Engine Architecture**: C++20 checking engine compiled to WebAssembly for zero-cloud in-browser execution, coupled with a Python 3.12 workload harness.
- **Anomaly Detection**: Reconstructs per-key version orders from client-observed histories (list-append micro-ops), builds directed dependency graphs ($\to_{ww}, \to_{wr}$), and executes Tarjan's Strongly Connected Components (SCC) and minimal cycle search.
- **Checked Anomalies**: G0 (Write Cycles), G1a (Aborted Reads), G1c (Circular Information Flow), and Garbage Reads.
- **Live Playground**: [isocheck.pages.dev/#/playground](https://isocheck.pages.dev/#/playground)

### 2. [InferLoad](https://github.com/Afnan-0206/inferLoad) — LLM Inference Load-Testing & Capacity Planner
> Performance-testing and capacity-analysis laboratory designed around the split prefill/decode execution mechanics of LLM serving endpoints.
- **Workload Generation**: YAML-configured closed-loop concurrency and open-loop Poisson arrival generators targeting vLLM, Ollama, and OpenAI-compatible endpoints.
- **Granular Metrics**: Decodes streaming chunks to measure Time to First Token (TTFT), First Byte Latency, Inter-Token Latency (ITL), and generation throughput (tokens/sec).
- **Analysis Engine**: Computes unrounded percentile distributions (p50, p95, p99), identifies saturation inflection points, and evaluates SLO compliance.
- **Live Console**: [inferload.onrender.com](https://inferload.onrender.com)

### 3. [FairLane](https://github.com/Afnan-0206/FairLane) — Experimental Token-Fair Scheduling for Multi-Tenant LLM Serving
> Empirical systems research benchmark evaluating token-aware scheduling and admission control policies under continuous batching constraints.
- **Policy Comparison**: Compares FIFO, request-count Round-Robin, and Virtual Token Counter (VTC) under `break` and `skip` admission modes.
- **Noisy Neighbor Protection**: Mitigates victim tenant starvation caused by flooder tenants submitting large prompt and decode lengths; measured victim slowdown drops from 160.4x under FIFO to 2.0x under VTC.
- **Empirical Rigor**: Evaluated across $N = 30$ independent random seeds with 95% non-parametric bootstrap confidence intervals and transparent pre-registration disclosures.

### 4. [BizPilot AI](https://github.com/Afnan-0206/BizPilot) — Multi-Agent Business Operations Copilot
> Multi-agent copilot that converts informal WhatsApp customer requests into verified GST quotations, invoices, and multilingual customer replies.
- **5-Agent Transparent Pipeline**: Intake $\rightarrow$ Context $\rightarrow$ Generation $\rightarrow$ Approval $\rightarrow$ Review.
- **Self-Verifying Review Engine**: Review Agent cross-checks line items and GST calculations against the product catalog with an automated 1-cycle regeneration loop; high-value orders (>₹12,000) route to an approval gate.
- **Reliability & Sharing**: Deterministic rule-based fallback when external LLM APIs face rate limits; client-side jsPDF invoice generation and WhatsApp `wa.me` prefilled link sharing.
- **Live Application**: [biz-pilot.vercel.app](https://biz-pilot.vercel.app)

### 5. [AutoFix AI](https://github.com/Afnan-0206/autofix-ai-incidents) — Autonomous DevOps Incident Response Command Center
> 6-agent collaborative incident-response command center that investigates production error traces, evaluates fixes, and drafts remediation pull requests.
- **6-Agent Architecture**: Manager, Researcher, Analyst, Tester, Writer, and Action Agent collaborating through structured state handoffs.
- **Self-Correction Feedback Loop**: Tester agent validates proposed fixes against error context; failed reproductions re-trigger the research loop with diagnostic context.
- **Artifact Generation**: Produces structured Markdown incident reports, remediation diffs, and pull-request descriptions.
- **Live Tool**: [autofix-ten-zeta.vercel.app](https://autofix-ten-zeta.vercel.app)

---

## 📦 Additional Builds & Focused Systems

- **[ScopeSentry Local](https://github.com/Afnan-0206/scopesentry-local)**: Local-first AI assistant for freelancers that compares client requests against signed agreements, identifying potential scope changes with verbatim source citations via 100% loopback Ollama inference ([Live Demo](https://scopesentry.pages.dev/)).
- **[Ask OLake](https://github.com/Afnan-0206/ask-olake)**: Citation-first technical assistant for the OLake data lakehouse engine, combining BM25 lexical retrieval across 2,454 chunks, strict citation verification, and explicit abstention when evidence is insufficient ([Live App](https://ask-olake-six.vercel.app/)).
- **[Sri Vinayaka PG](https://github.com/Afnan-0206/Shri-Vinayaka-Pg)**: Dual-surface accommodation platform combining a public room showcase website with an admin operations dashboard for resident lifecycles, rent ledgers, and Supabase PostgreSQL Row-Level Security ([Live Portal](https://shri-vinayaka-pg.vercel.app)).

---

## 💻 Tech Stack

| Domain | Technologies | Purpose |
| :--- | :--- | :--- |
| **Languages** | TypeScript (Strict), C++20, Python 3.12, SQL | Core systems, algorithms, APIs, and client applications |
| **Frameworks** | Next.js 14 (App Router), React 19, Express, FastAPI | Web frontends, server components, and microservices |
| **Styling & UI** | Tailwind CSS, Framer Motion, Lucide Icons | Responsive design system, accessible animations, and dark tokens |
| **Systems & LLM Infra** | WebAssembly, vLLM, Ollama, Continuous Batching | Browser-sandboxed verification, token streaming, and load testing |
| **Databases & Cloud** | PostgreSQL, Supabase (RLS), Vercel, Render | Relational schemas, audit triggers, and edge deployment |
| **Verification & Tools** | Tarjan SCC, BM25, jsPDF, Zod, Git | Graph cycle search, lexical retrieval, and contract validation |

---

## 📂 Project Architecture

```bash
portfolio/
├── public/
│   └── images/                 # Credentials, summit photography, and avatars
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/        # Contact form dispatch endpoint
│   │   ├── network/            # Founders & advisory directory route
│   │   ├── work/               # Dedicated, verified case study routes
│   │   │   ├── isocheck/       # IsoCheck systems case study
│   │   │   ├── inferload/      # InferLoad LLM load-testing case study
│   │   │   ├── fairlane/       # FairLane scheduling benchmark case study
│   │   │   ├── bizpilot/       # BizPilot multi-agent operations case study
│   │   │   ├── autofix-ai/     # AutoFix AI DevOps command center case study
│   │   │   └── sri-vinayaka-pg/# Sri Vinayaka PG full-stack platform case study
│   │   ├── globals.css         # Design tokens, scrollbars & overflow safety
│   │   ├── layout.tsx          # Root layout with metadata & fonts
│   │   └── page.tsx            # Main page assembly
│   ├── components/
│   │   ├── About.tsx           # Background, engineering tenets & profile specs
│   │   ├── Capabilities.tsx    # Systems, agentic AI, full-stack & DB matrix
│   │   ├── CaseStudyShell.tsx  # Reusable layout shell with Prev/Next navigation
│   │   ├── ContactSection.tsx  # Direct outreach form & quick action links
│   │   ├── Credentials.tsx     # Summit recognition & lightbox photo modal
│   │   ├── FeaturedWork.tsx    # Curated 5 featured systems with interactive widgets
│   │   ├── Footer.tsx          # Global footer, navigation & stack strip
│   │   ├── Hero.tsx            # Headline, live agent simulator & quick CTAs
│   │   ├── Journey.tsx         # Engineering milestones & trajectory trace
│   │   ├── MoreBuilds.tsx      # Curated secondary systems gallery
│   │   ├── Navbar.tsx          # Sticky navigation with mobile drawer
│   │   ├── NetworkingSection.tsx # Community & directory invitation banner
│   │   ├── ScrollProgress.tsx  # Reading progress bar & floating back-to-top button
│   │   └── SpotlightCard.tsx   # Mouse-following spotlight card wrapper
│   └── data/
│       ├── network.ts          # Advisory & founder directory models
│       └── projects.ts         # Strongly typed single source of truth for all projects
├── next.config.js              # Next.js optimization configuration
├── tailwind.config.ts          # Color palette, spacing tokens & typography
└── tsconfig.json               # Strict compiler options
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17 or higher
- **npm** or compatible package manager

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Afnan-0206/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Verification

```bash
npm run build
```

---

## 📱 Mobile Responsiveness Standards

- **Zero Horizontal Overflow**: Verified at 320px, 375px, 768px, 1024px, and 1440px.
- **Accessible Touch Targets**: All interactive elements maintain $\ge 44\times 44\text{px}$ touch targets.
- **Fluid Typography**: Dynamic scaling preventing text clipping or wrapping collisions.
- **Reduced Motion Support**: Motion components respect user accessibility preferences.

---

## 📬 Connect & Collaborate

- **Engineer**: Afnan B.R.
- **Education**: 2nd Year B.Tech CSE (AI/ML)
- **Location**: Bengaluru, India
- **Email**: [brafnan26@gmail.com](mailto:brafnan26@gmail.com)
- **LinkedIn**: [linkedin.com/in/afnan-391912363](https://www.linkedin.com/in/afnan-391912363)
- **GitHub**: [github.com/Afnan-0206](https://github.com/Afnan-0206)

---

<div align="center">
  <sub>Designed &amp; engineered by Afnan B.R. · Built with Next.js 14, TypeScript &amp; Tailwind CSS</sub>
</div>
