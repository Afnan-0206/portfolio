"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { featuredProjects } from "@/data/projects";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

// Pipeline steps for BizPilot visual
const PIPELINE = [
  "Customer Message",
  "Intake Agent",
  "Context Agent",
  "Generation Agent",
  "Approval Agent",
  "Review Agent",
  "Verified Output",
];

// AutoFix pipeline
const AUTOFIX_AGENTS = [
  { id: "mgr",    name: "Manager",    desc: "Investigation plan" },
  { id: "res",    name: "Researcher", desc: "Source lookup" },
  { id: "ana",    name: "Analyst",    desc: "Solution selection" },
  { id: "tst",    name: "Tester",     desc: "Validation" },
  { id: "wrt",    name: "Writer",     desc: "Incident report" },
  { id: "act",    name: "Action",     desc: "PR & comms" },
];

// F1 analytics node data
const F1_FEATURES = ["Driver Form", "Grid Position", "Championship Standing", "Historical Data", "LightGBM Model", "Race Prediction"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
      {children}
    </p>
  );
}

function TechTag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/5 bg-[#0C1530]/80 px-3 py-1 font-mono text-[10px] text-[#C7D2E2] shadow-inner">
      {label}
    </span>
  );
}

// ── Project 1: BizPilot ───────────────────────────────────────────────────
function BizPilotCard() {
  const p = featuredProjects[0];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-85px" }}
      transition={{ duration: 0.55 }}
      className="border-glow relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#091126]/85 backdrop-blur-md shadow-card"
      aria-label={`Project: ${p.title}`}
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent" aria-hidden="true" />

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Content */}
        <div className="space-y-6 p-8 sm:p-10">
          <div className="space-y-3">
            <SectionLabel>{p.category}</SectionLabel>
            <h3 className="text-3xl font-bold tracking-tight text-[#F8FAFC]">
              {p.title}
            </h3>
            <p className="text-base leading-7 text-[#C7D2E2]">{p.shortDesc}</p>
          </div>

          <div className="space-y-4 border-t border-white/5 pt-6">
            <div>
              <p className="mb-1 font-mono text-[9px] tracking-widest text-[#8FA2B8] uppercase">PROBLEM</p>
              <p className="text-sm leading-6 text-[#C7D2E2]">{p.problem}</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[9px] tracking-widest text-[#8FA2B8] uppercase">SOLUTION</p>
              <p className="text-sm leading-6 text-[#C7D2E2]">{p.solution}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => <TechTag key={t} label={t} />)}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#22D3EE] px-5 py-2.5 text-xs font-bold text-[#050817] shadow-md transition hover:bg-[#67E8F9]"
            >
              <ExternalLink size={12} aria-hidden="true" />
              Live Demo
            </a>
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0C1530]/80 px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] shadow-sm transition hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
            >
              <GithubIcon size={12} />
              GitHub
            </a>
            <Link
              href={`/work/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0C1530]/80 px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] shadow-sm transition hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
            >
              Case Study
              <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Architecture visual */}
        <div className="flex flex-col justify-center border-t border-white/5 bg-[#050817]/40 p-8 sm:p-10 lg:border-l lg:border-t-0">
          <p className="mb-5 font-mono text-[9px] tracking-widest text-[#8FA2B8] uppercase">AGENT PIPELINE</p>
          <div className="space-y-2">
            {PIPELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-mono text-[9px] font-bold ${
                    i === 0 || i === PIPELINE.length - 1
                      ? "border border-white/10 text-[#8FA2B8]"
                      : "border border-[#22D3EE]/25 text-[#22D3EE]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-xs ${
                    i === PIPELINE.length - 1
                      ? "border-[#34D399]/20 bg-[#34D399]/10 text-[#34D399]"
                      : i === 0
                      ? "border-white/5 text-[#8FA2B8]"
                      : "border-[#22D3EE]/10 bg-[#22D3EE]/5 text-[#F8FAFC]"
                  }`}
                >
                  {step}
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className="h-px w-2 flex-shrink-0 bg-white/10" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[9px] text-[#8FA2B8]">
            Rule-based fallback active when API is offline
          </p>
        </div>
      </div>
    </motion.article>
  );
}

// ── Shared compact project card ───────────────────────────────────────────
function CompactProjectCard({
  project,
  index,
  visual,
}: {
  project: typeof featuredProjects[0];
  index: number;
  visual?: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-glow group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#091126]/85 backdrop-blur-md shadow-card"
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual area */}
      {visual && (
        <div className="border-b border-white/5 bg-[#050817]/40 px-6 pt-6 pb-2">
          {visual}
        </div>
      )}

      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <SectionLabel>{project.category}</SectionLabel>
          <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
            {project.title}
          </h3>
          <p className="text-sm leading-6 text-[#C7D2E2]">{project.shortDesc}</p>
        </div>

        <div>
          <p className="mb-1 font-mono text-[9px] tracking-widest text-[#8FA2B8] uppercase">KEY CONTRIBUTION</p>
          <p className="text-sm leading-6 text-[#C7D2E2]">{project.keyContribution}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => <TechTag key={t} label={t} />)}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#22D3EE] px-4.5 py-2 text-xs font-bold text-[#050817] shadow-sm transition hover:bg-[#67E8F9]"
            >
              <ExternalLink size={11} aria-hidden="true" />
              Live Demo
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0C1530]/80 px-4.5 py-2 text-xs font-semibold text-[#F8FAFC] shadow-sm transition hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
          >
            <GithubIcon size={11} />
            GitHub
          </a>
          <Link
            href={`/work/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#8FA2B8] underline underline-offset-4 transition hover:text-[#22D3EE]"
          >
            Case Study <ArrowUpRight size={11} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ── AutoFix visual ────────────────────────────────────────────────────────
function AutoFixVisual() {
  return (
    <div className="pb-3">
      <div className="grid grid-cols-3 gap-2">
        {AUTOFIX_AGENTS.map((a) => (
          <div
            key={a.id}
            className="rounded-lg border border-white/5 bg-[#0C1530]/60 px-3 py-2 text-center"
          >
            <p className="text-xs font-bold text-[#34D399]">{a.name}</p>
            <p className="font-mono text-[9px] text-[#8FA2B8]">{a.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/5 bg-[#050817]/40 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
        <span className="font-mono text-[9px] text-[#8FA2B8]">Self-correction: Tester → Researcher on rejection</span>
      </div>
    </div>
  );
}

// ── F1 visual ─────────────────────────────────────────────────────────────
function F1Visual() {
  return (
    <div className="pb-3">
      <div className="grid grid-cols-3 gap-2">
        {F1_FEATURES.map((f) => (
          <div
            key={f}
            className="rounded-lg border border-white/5 bg-[#0C1530]/60 px-2 py-2 text-center"
          >
            <p className="font-mono text-[9px] text-[#F59E0B] font-semibold">{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NammaFix visual ───────────────────────────────────────────────────────
function NammaFixVisual() {
  const steps = ["Submit", "Locate", "Classify", "Severity", "Deduplicate", "Dashboard"];
  return (
    <div className="pb-3">
      <div className="flex flex-wrap gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <span className="rounded-lg border border-white/5 bg-[#0C1530]/60 px-2.5 py-1 font-mono text-[9px] text-[#EC4899]">
              {s}
            </span>
            {i < steps.length - 1 && <span className="text-white/20 text-xs">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-white/5 bg-[#050817]/40 px-3 py-2">
        <p className="font-mono text-[9px] text-[#8FA2B8]">Hackathon MVP · Prototype · Fallback classifier included</p>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <SectionLabel>SELECTED WORK</SectionLabel>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Products built around real workflows, not demo prompts.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#C7D2E2]">
            A selection of AI systems, client platforms and machine-learning projects
            designed from problem definition through implementation.
          </p>
        </motion.div>

        {/* Flagship */}
        <div className="mb-10">
          <BizPilotCard />
        </div>

        {/* Sri Vinayaka PG */}
        <div className="mb-10">
          <CompactProjectCard project={featuredProjects[1]} index={0} />
        </div>

        {/* 3-across grid: AutoFix, F1, NammaFix */}
        <div className="grid gap-6 lg:grid-cols-3">
          <CompactProjectCard
            project={featuredProjects[2]}
            index={0}
            visual={<AutoFixVisual />}
          />
          <CompactProjectCard
            project={featuredProjects[3]}
            index={1}
            visual={<F1Visual />}
          />
          <CompactProjectCard
            project={featuredProjects[4]}
            index={2}
            visual={<NammaFixVisual />}
          />
        </div>
      </div>
    </section>
  );
}
