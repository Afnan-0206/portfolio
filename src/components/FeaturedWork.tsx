"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, MessageSquare, FileText, CheckCircle2, Gauge, Layers, Users, Zap } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import SpotlightCard from "@/components/SpotlightCard";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

// ── BizPilot Interactive Showcase ─────────────────────────────────────────
function BizPilotInteractiveShowcase() {
  const [viewMode, setViewMode] = useState<"whatsapp" | "invoice">("whatsapp");

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("whatsapp")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "whatsapp"
                ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                : "text-[#A1A1AA] hover:text-[#FFFFFF]"
            }`}
          >
            <MessageSquare size={13} />
            Raw WhatsApp Input
          </button>
          <button
            type="button"
            onClick={() => setViewMode("invoice")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "invoice"
                ? "bg-[#E2B36E]/20 text-[#E2B36E] border border-[#E2B36E]/30"
                : "text-[#A1A1AA] hover:text-[#FFFFFF]"
            }`}
          >
            <FileText size={13} />
            Generated Invoice PDF
          </button>
        </div>

        <span className="font-mono text-[10px] text-[#71717A] uppercase hidden sm:inline">
          Click tabs to toggle
        </span>
      </div>

      {/* Content Preview */}
      <AnimatePresence mode="wait">
        {viewMode === "whatsapp" ? (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-white/10 bg-[#0D0E12] p-4 space-y-2.5 font-sans"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A]">
              <span>Customer Message · Received 11:42 AM</span>
              <span className="text-[#10B981]">Unverified Raw Input</span>
            </div>
            <div className="rounded-xl bg-[#17241E] border border-[#10B981]/20 p-3.5 text-xs text-[#E4E4E7] leading-relaxed">
              &ldquo;Hey Afnan, we need 35 South Indian meals for our team offsite in Indiranagar tomorrow afternoon 1:30 PM. Please include curd vada and bill it with GST. Can you send the estimate here?&rdquo;
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] pt-1">
              <span>5 Multi-Agent Nodes Running</span>
              <span>Latency: 380ms</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="invoice"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-white/10 bg-[#16171D] p-4 space-y-3 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <p className="font-bold text-[#F4F4F5]">TAX INVOICE #BP-2026-94</p>
                <p className="text-[10px] text-[#71717A]">GSTIN: 29AAAAA0000A1Z5</p>
              </div>
              <span className="rounded-full bg-[#10B981]/20 text-[#10B981] px-2.5 py-0.5 text-[10px] font-bold">
                VERIFIED &amp; GST COMPLIANT
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>35x South Indian Executive Meals</span>
                <span className="text-[#F4F4F5]">₹7,000.00</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>35x Curd Vada Add-on</span>
                <span className="text-[#F4F4F5]">₹1,750.00</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA] border-t border-white/5 pt-1.5">
                <span>Subtotal</span>
                <span>₹8,750.00</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>CGST (2.5%) + SGST (2.5%)</span>
                <span>₹437.50</span>
              </div>
              <div className="flex justify-between font-bold text-[#E2B36E] border-t border-white/10 pt-1 text-xs">
                <span>Total Amount Due</span>
                <span>₹9,187.50</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Sri Vinayaka PG Live Widget ──────────────────────────────────────────
function SriVinayakaLiveWidget() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#16171D] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#E2B36E]" />
          <span className="text-xs font-bold text-[#F4F4F5]">Live Resident Roster</span>
        </div>
        <span className="rounded-full bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 text-[9px] font-mono font-bold">
          PostgreSQL RLS Active
        </span>
      </div>

      {/* Occupancy bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#A1A1AA]">
          <span>Building Occupancy</span>
          <span className="font-bold text-[#F4F4F5]">44 / 48 Beds (91.6%)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#0E0F13] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#E2B36E] to-[#10B981] rounded-full" style={{ width: "91.6%" }} />
        </div>
      </div>

      {/* Mini ledger status */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1">
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2">
          <p className="text-[#10B981] font-bold">42 Paid</p>
          <p className="text-[#71717A]">Rent Up-to-date</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2">
          <p className="text-[#F59E0B] font-bold">2 Pending</p>
          <p className="text-[#71717A]">Due in 48h</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2">
          <p className="text-[#E4E4E7] font-bold">₹3.74L</p>
          <p className="text-[#71717A]">Monthly Volume</p>
        </div>
      </div>
    </div>
  );
}

// ── AutoFix Consensus Widget ──────────────────────────────────────────────
function AutoFixConsensusWidget() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#16171D] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#10B981]" />
          <span className="text-xs font-bold text-[#F4F4F5]">Consensus State Machine</span>
        </div>
        <span className="text-[10px] font-mono text-[#71717A]">6 Agents Active</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Manager", "Researcher", "Analyst", "Tester", "Writer", "Action"].map((agent, i) => (
          <div key={agent} className="rounded-lg border border-white/5 bg-[#111217] p-2 text-center">
            <span className="font-mono text-[9px] text-[#71717A]">0{i + 1}</span>
            <p className="text-xs font-bold text-[#E4E4E7]">{agent}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] border-t border-white/5 pt-2">
        <span className="text-[#10B981] flex items-center gap-1">
          <CheckCircle2 size={12} /> Auto-Regression Test Passing
        </span>
        <span>Fix PR dispatched in 2.8s</span>
      </div>
    </div>
  );
}

// ── F1 Telemetry Visualizer ───────────────────────────────────────────────
function F1TelemetryWidget() {
  const [compound, setCompound] = useState<"soft" | "medium" | "hard">("medium");

  return (
    <div className="rounded-xl border border-white/10 bg-[#16171D] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Gauge size={14} className="text-[#F59E0B]" />
          <span className="text-xs font-bold text-[#F4F4F5]">F1 Predictive Strategy</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono">
          {(["soft", "medium", "hard"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCompound(c)}
              className={`rounded px-1.5 py-0.5 uppercase ${
                compound === c ? "bg-[#F59E0B] text-[#090A0C] font-bold" : "text-[#71717A] hover:text-[#FFFFFF]"
              }`}
            >
              {c[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#A1A1AA]">
          <span>Simulated Tire Degradation ({compound.toUpperCase()})</span>
          <span className="font-bold text-[#F4F4F5]">
            {compound === "soft" ? "78% (Lap 14 Pit)" : compound === "medium" ? "42% (Lap 24 Pit)" : "26% (Lap 38 Pit)"}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#0E0F13] overflow-hidden">
          <div
            className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
            style={{ width: compound === "soft" ? "78%" : compound === "medium" ? "42%" : "26%" }}
          />
        </div>
      </div>

      <p className="text-[10px] font-mono text-[#71717A]">
        LightGBM Model · 84.2% podium prediction accuracy across 2021-2024 season telemetry
      </p>
    </div>
  );
}

export default function FeaturedWork() {
  const p1 = featuredProjects[0]; // BizPilot
  const p2 = featuredProjects[1]; // Sri Vinayaka PG
  const p3 = featuredProjects[2]; // AutoFix
  const p4 = featuredProjects[3]; // F1 Strategy
  const p5 = featuredProjects[4]; // NammaFix

  return (
    <section id="work" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141519] px-3.5 py-1.5 backdrop-blur-md">
            <Layers size={13} className="text-[#E2B36E]" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
              SELECTED PRODUCTION WORK
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#F4F4F5] sm:text-4xl lg:text-5xl leading-[1.15]">
            Engineered around real workflows,{" "}
            <span className="text-gold-metallic">not toy prompts.</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
            Production multi-agent systems, client management platforms, and predictive machine learning models built from problem diagnosis to production deployment.
          </p>
        </motion.div>

        {/* ── BENTO SHOWCASE GRID ── */}
        <div className="space-y-8">

          {/* 1. Flagship Bento: BizPilot AI */}
          <SpotlightCard className="p-8 sm:p-10 border border-white/10 bg-[#111217]">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16171D] px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  <span className="font-mono text-[10px] font-semibold text-[#E2B36E] uppercase tracking-wider">
                    FLAGSHIP · MULTI-AGENT AI COPILOT
                  </span>
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl">
                  {p1.title}
                </h3>

                <p className="text-base leading-relaxed text-[#A1A1AA]">
                  {p1.shortDesc} Built for small service businesses overwhelmed by unstructured customer messages on WhatsApp, manually computing quotes, GST, and invoices.
                </p>

                <div className="space-y-3 border-t border-white/5 pt-4 text-sm">
                  <div>
                    <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">Architecture</span>
                    <p className="text-[#E4E4E7] text-xs leading-relaxed mt-0.5">{p1.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p1.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/5 bg-[#17181D] px-3 py-1 font-mono text-[10px] text-[#A1A1AA]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <a
                    href={p1.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-5 py-2.5 text-xs font-bold text-[#090A0C] shadow-sm transition hover:bg-[#FFFFFF]"
                  >
                    <ExternalLink size={13} />
                    Live Production App
                  </a>
                  <a
                    href={p1.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-5 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1E1F27]"
                  >
                    <GithubIcon size={13} />
                    GitHub Source
                  </a>
                  <Link
                    href={`/work/${p1.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-5 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1E1F27]"
                  >
                    Case Study
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Interactive Split Simulator on Right */}
              <div>
                <BizPilotInteractiveShowcase />
              </div>
            </div>
          </SpotlightCard>

          {/* 2. Bento Pair: Sri Vinayaka PG & AutoFix AI */}
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Sri Vinayaka PG */}
            <SpotlightCard className="p-8 border border-white/10 bg-[#111217] flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
                    {p2.category}
                  </span>
                  <span className="rounded-full bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 text-[10px] font-semibold">
                    In Production
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
                  {p2.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  {p2.shortDesc} Designed with Next.js, Supabase Row-Level Security, and dynamic room status tracking.
                </p>

                {/* Live Widget */}
                <SriVinayakaLiveWidget />

                <div className="flex flex-wrap gap-1.5">
                  {p2.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-1 font-mono text-[10px] text-[#A1A1AA]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-5 mt-6">
                {p2.liveUrl && (
                  <a
                    href={p2.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2 text-xs font-bold text-[#090A0C] hover:bg-[#FFFFFF]"
                  >
                    <ExternalLink size={12} />
                    Live Website
                  </a>
                )}
                <a
                  href={p2.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-4 py-2 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1E1F27]"
                >
                  <GithubIcon size={12} />
                  GitHub
                </a>
                <Link
                  href={`/work/${p2.slug}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  <span>Case Study</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </SpotlightCard>

            {/* AutoFix AI */}
            <SpotlightCard className="p-8 border border-white/10 bg-[#111217] flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
                    {p3.category}
                  </span>
                  <span className="rounded-full bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 text-[10px] font-semibold">
                    Multi-Agent Architecture
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
                  {p3.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  {p3.shortDesc} A self-correcting 6-agent system that analyzes stack traces, reproduces bugs in sandbox tests, and drafts pull requests.
                </p>

                {/* Consensus Widget */}
                <AutoFixConsensusWidget />

                <div className="flex flex-wrap gap-1.5">
                  {p3.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-1 font-mono text-[10px] text-[#A1A1AA]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-5 mt-6">
                <a
                  href={p3.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2 text-xs font-bold text-[#090A0C] hover:bg-[#FFFFFF]"
                >
                  <GithubIcon size={12} />
                  Explore Source
                </a>
                <Link
                  href={`/work/${p3.slug}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  <span>Case Study</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </SpotlightCard>

          </div>

          {/* 3. Bento Pair: F1 Race Strategy & NammaFix AI */}
          <div className="grid gap-8 lg:grid-cols-2">

            {/* F1 Strategy */}
            <SpotlightCard className="p-8 border border-white/10 bg-[#111217] flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
                    {p4.category}
                  </span>
                  <span className="rounded-full bg-[#F59E0B]/15 text-[#F59E0B] px-2.5 py-0.5 text-[10px] font-semibold">
                    ML / FastF1 API
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
                  {p4.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  {p4.shortDesc} Machine-learning predictive pipeline trained on historical telemetry to forecast optimal pit-stop windows and finishing orders.
                </p>

                {/* Telemetry Visualizer */}
                <F1TelemetryWidget />

                <div className="flex flex-wrap gap-1.5">
                  {p4.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-1 font-mono text-[10px] text-[#A1A1AA]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-5 mt-6">
                <a
                  href={p4.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2 text-xs font-bold text-[#090A0C] hover:bg-[#FFFFFF]"
                >
                  <GithubIcon size={12} />
                  View Model Code
                </a>
                <Link
                  href={`/work/${p4.slug}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  <span>Case Study</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </SpotlightCard>

            {/* NammaFix AI */}
            <SpotlightCard className="p-8 border border-white/10 bg-[#111217] flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
                    {p5.category}
                  </span>
                  <span className="rounded-full bg-[#E2B36E]/15 text-[#E2B36E] px-2.5 py-0.5 text-[10px] font-semibold">
                    Civic Tech MVP
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
                  {p5.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  {p5.shortDesc} Municipal issue triaging pipeline integrating vision classifiers, severity scoring, and geolocation grouping with graceful fallback logic.
                </p>

                {/* Pipeline visual */}
                <div className="rounded-xl border border-white/10 bg-[#16171D] p-5 space-y-3">
                  <span className="text-xs font-bold text-[#F4F4F5]">Automated Issue Triaging Flow</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Citizen Photo Upload", "Severity Tagging", "GPS Deduplication", "Municipal Routing"].map((s, idx) => (
                      <span key={s} className="rounded-md border border-white/5 bg-[#111217] px-2.5 py-1 font-mono text-[10px] text-[#E4E4E7]">
                        {idx + 1}. {s}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-[#10B981]">
                    Built for rapid community reporting and civic accountability
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p5.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-1 font-mono text-[10px] text-[#A1A1AA]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-5 mt-6">
                <a
                  href={p5.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2 text-xs font-bold text-[#090A0C] hover:bg-[#FFFFFF]"
                >
                  <GithubIcon size={12} />
                  View MVP Repository
                </a>
                <Link
                  href={`/work/${p5.slug}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  <span>Case Study</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </SpotlightCard>

          </div>

        </div>

      </div>
    </section>
  );
}
