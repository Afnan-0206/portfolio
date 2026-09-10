# Afnan B.R. — Engineering & AI Systems Portfolio

<div align="center">

![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-E2B36E?style=for-the-badge)

<br />

**Autonomous Multi-Agent Systems · Full-Stack Web Architecture · Production AI Tooling**

[Live Portfolio](https://afnan-portfolio.vercel.app) · [Report Bug](https://github.com/Afnan-0206/portfolio/issues) · [LinkedIn](https://www.linkedin.com/in/afnan-391912363) · [Email](mailto:brafnan26@gmail.com)

</div>

---

## 🧭 Overview

A modern, cinematic portfolio engineered with **Next.js 14 (App Router)**, **TypeScript**, and **Framer Motion**, built around an obsidian & warm gold design language (`#090A0C` / `#E2B36E`). 

Designed from the ground up to showcase production-grade autonomous agent systems, live business dashboards, and full-stack software products without generic templates or bloated dependencies.

### 🌟 Key Highlights

- ⚡ **Full Mobile Viewport Responsiveness**: Pixel-perfect scaling and touch interactions engineered across 320px, 375px, 768px, and 4K displays.
- 🤖 **Interactive Multi-Agent Simulators**: Live browser demonstrations of agent handoffs, consensus resolution, and real-time telemetry streaming.
- 🍱 **Bento-Grid Showcase Architecture**: Dynamic widgets for invoice previews, occupancy tracking, and tire wear simulation embedded directly into project cards.
- 📑 **Comprehensive Case Studies**: Dedicated deep-dive routes (`/work/[slug]`) covering problem statements, technical architecture, and honest trade-offs.
- 🏆 **Field Recognition & Summits**: Verified gallery documenting contributions to *AgentsNexus* (India's Premier Agentic AI Conference), *Bengaluru Tech Week Buildathon*, and hackathon builds.

---

## 🛠️ Flagship Systems & Builds

### 1. [BizPilot AI](https://github.com/Afnan-0206/BizPilot) — Autonomous Business Operations Copilot
> Multi-agent pipeline converting messy informal WhatsApp messages into verified quotations, invoices, and multilingual customer replies.
- **5-Agent Architecture**: Intake $\rightarrow$ Context $\rightarrow$ Generation $\rightarrow$ Approval $\rightarrow$ Review.
- **Verification Engine**: Automatic price cross-checks, GST calculations, rule-based fallback when APIs time out, and high-value order approval gates.
- **Tech**: React 19, Tailwind CSS, Google Gemini API, jsPDF, WhatsApp prefilled link automation.

### 2. [Sri Vinayaka PG Management](https://github.com/Afnan-0206/sri-vinayaka-pg) — Multi-Property Operations System
> Production dashboard built for real-world hostel operations managing 37 rooms and 70+ tenants across 3 physical properties.
- **Real-Time Operations**: Tracks payment statuses, rent collection cycles, tenant check-ins/check-outs, and maintenance requests.
- **Tech**: Next.js 14, Supabase (PostgreSQL), TypeScript, Tailwind CSS, Server Actions.

### 3. [AutoFix AI](https://github.com/Afnan-0206/AutoFix-AI) — Multi-Agent Vehicle Telemetry & Diagnostics
> Consensus engine resolving diagnostic contradictions across multiple specialized diagnostic AI agents.
- **Multi-Agent Consensus**: Mechanical, Electrical, and Sensor-Analysis agents debate fault likelihood before committing customer diagnostic reports.
- **Tech**: Python, LangChain, FastAPI, Next.js, WebSockets.

### 4. [F1 Race Strategy Simulator](https://github.com/Afnan-0206/f1-race-strategy) — Real-Time Telemetry & Pit-Window Forecasting
> Formula 1 simulation sandbox analyzing tire degradation, stint length, undercut/overcut margins, and weather forecasting.
- **Monte Carlo Modeling**: Real-time pit window optimizations based on simulated track temps and compound degradation curves.
- **Tech**: Next.js 14, Canvas API, TypeScript, Framer Motion.

### 5. [NammaFix AI](https://github.com/Afnan-0206/NammaFix-AI) — Civic Infrastructure Reporting Prototype
> Civic reporting MVP turning citizen-submitted infrastructure complaints into AI-categorized, geolocated, and prioritized tickets.
- **Reliability**: Deterministic keyword fallback ensuring zero service interruption during external LLM outages.
- **Tech**: React, Gemini API, Browser Geolocation API, Tailwind CSS.

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Static site generation, server components, and dynamic routing |
| **Language** | TypeScript (Strict) | End-to-end type safety and contract integrity |
| **Styling** | Tailwind CSS & Vanilla CSS | Modular utility styles, responsive design tokens, and fluid layout |
| **Animations** | Framer Motion | Gestures, viewport-triggered reveals, and micro-interactions |
| **AI / LLMs** | Google Gemini API & LangChain | Multi-agent orchestration, structured JSON generation, fallback logic |
| **Database** | Supabase & PostgreSQL | Real-time operations data, session storage, and state persistence |
| **Icons & Assets** | Lucide React | Clean, lightweight SVG iconography |
| **Quality** | ESLint + TypeScript Compiler | Zero-warning build pipeline and production bundle optimization |

---

## 📂 Project Architecture

```bash
portfolio/
├── public/
│   └── images/                 # Optimized credentials, logos, and preview assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/        # API endpoint for direct message dispatch
│   │   ├── network/            # Founders & advisory directory route
│   │   ├── work/               # Standalone case study routes
│   │   │   ├── autofix-ai/
│   │   │   ├── bizpilot/
│   │   │   ├── f1-race-strategy/
│   │   │   ├── nammafix-ai/
│   │   │   └── sri-vinayaka-pg/
│   │   ├── globals.css         # Global tokens, safety overflow & scrollbars
│   │   ├── layout.tsx          # Root shell + metadata + mobile viewport config
│   │   └── page.tsx            # Main scrollytelling assembly
│   ├── components/
│   │   ├── About.tsx           # Builder background, principles & stats
│   │   ├── Capabilities.tsx    # Technical skills matrix & interactive code tabs
│   │   ├── CaseStudyShell.tsx  # Layout container for case study pages
│   │   ├── ContactSection.tsx  # Direct outreach form & quick action links
│   │   ├── Credentials.tsx     # Summit recognition & lightbox photo modal
│   │   ├── FeaturedWork.tsx    # Flagship Bento showcase with live widgets
│   │   ├── Footer.tsx          # Global footer with CTA strip & stack tokens
│   │   ├── Hero.tsx            # Headline, live agent simulator & quick CTAs
│   │   ├── Journey.tsx         # Milestone trace & engineering journey
│   │   ├── MoreBuilds.tsx      # Secondary project gallery
│   │   ├── Navbar.tsx          # Sticky navigation with mobile drawer
│   │   ├── NetworkingSection.tsx # Community & directory invitation banner
│   │   └── ScrollProgress.tsx  # Reading progress bar & floating back-to-top button
│   └── data/
│       ├── network.ts          # Advisory & founder directory models
│       └── projects.ts         # Project metadata, credentials & experience timeline
├── next.config.js              # Next.js optimization and image remote patterns
├── tailwind.config.ts          # Color palette, spacing tokens & typography
└── tsconfig.json               # Strict compiler options
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17 or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Afnan-0206/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for contact form testing):
   ```bash
   cp .env.example .env.local
   ```

4. Launch the local development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Verify type checking, linting, and bundle generation:
```bash
npm run build
npm run start
```

---

## 📱 Mobile Responsiveness Standards

Every component in this repository adheres to rigorous responsive design guidelines:
- **Zero Horizontal Overflow**: Guaranteed across any device width ($\ge 320\text{px}$).
- **Accessible Touch Targets**: All interactive elements, tabs, and buttons maintain $\ge 44\times 44\text{px}$ touch zones.
- **Fluid Typography**: Dynamic clamp scaling preventing clipping or text overlaps on smaller screens.
- **Hardware-Accelerated Modals**: Lightbox and detail drawers feature contained scrolling (`max-h-[92vh] overflow-y-auto`) and body scroll locking.

---

## 📬 Connect & Collaborate

- **Engineer**: Afnan B.R.
- **Location**: Bengaluru, India
- **Email**: [brafnan26@gmail.com](mailto:brafnan26@gmail.com)
- **LinkedIn**: [linkedin.com/in/afnan-391912363](https://www.linkedin.com/in/afnan-391912363)
- **GitHub**: [github.com/Afnan-0206](https://github.com/Afnan-0206)

---

<div align="center">
  <sub>Designed &amp; engineered by Afnan B.R. · Built with Next.js 14 &amp; Tailwind CSS</sub>
</div>
