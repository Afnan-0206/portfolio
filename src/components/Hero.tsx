"use client";

import { motion, animate } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, CheckCircle2, Terminal, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

const STATS = [
  { value: 5, suffix: "+", label: "Production Builds", detail: "Shipped & Tested" },
  { value: 6, suffix: "", label: "Multi-Agent Nodes", detail: "Orchestrated in AutoFix" },
  { value: 3, suffix: "+", label: "Client Platforms", detail: "Active Deployments" },
  { value: 8, suffix: "+", label: "Summits & Hackathons", detail: "AgentsNexus & BTW" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = animate(0, value, {
            duration: 1.2,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums font-bold text-[#F4F4F5]">
      {display}{suffix}
    </span>
  );
}

// Scenarios for the Live Interactive Agent Simulator
interface SimulationScenario {
  id: string;
  title: string;
  badge: string;
  input: string;
  agentSteps: {
    agent: string;
    action: string;
    duration: number;
    status: string;
  }[];
  output: string;
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: "bizpilot",
    title: "BizPilot: WhatsApp Quotation",
    badge: "Multi-Agent AI",
    input: '"Need 45 boxed lunches for tech meetup this Thursday 1pm, budget ₹250/head incl GST, send bill on WhatsApp."',
    agentSteps: [
      { agent: "01. Intake Agent", action: "Parsed JSON entity: { qty: 45, date: 'Thu', budget: 250, tax: 'GST' }", duration: 600, status: "Entities Extracted" },
      { agent: "02. Context Agent", action: "Matched caterer menu #4 + client GSTIN verified in Supabase", duration: 700, status: "Context Resolved" },
      { agent: "03. Pricing Engine", action: "Deterministic calculation: Subtotal ₹9,576 + 18% GST ₹1,724 = ₹11,300", duration: 600, status: "Math Verified" },
      { agent: "04. Output Dispatch", action: "Generated verified PDF invoice + WhatsApp-ready reply template", duration: 500, status: "Dispatched" },
    ],
    output: "Quotation #BP-4892 generated: ₹11,300 with verified GST invoice & PDF download link.",
  },
  {
    id: "autofix",
    title: "AutoFix: Sentry Crash Triage",
    badge: "Autonomous DevOps",
    input: '"TypeError: Cannot read property \'session_id\' of undefined in AuthMiddleware at line 42"',
    agentSteps: [
      { agent: "01. Manager Agent", action: "Prioritized severity: High. Assigned investigation plan to Researcher", duration: 600, status: "Triaged" },
      { agent: "02. Researcher", action: "Isolated Git commit 8a4f91b (JWT payload refactor missing null-check)", duration: 700, status: "Root Cause Found" },
      { agent: "03. Tester Agent", action: "Drafted regression test reproducing undefined token edge-case", duration: 600, status: "Repro Confirmed" },
      { agent: "04. Action Agent", action: "Constructed fix PR with optional chaining + automated test passing", duration: 500, status: "PR Ready" },
    ],
    output: "AutoFix PR #114 created: 'fix(auth): add optional chaining on session_id token'. Verified in 2.4s.",
  },
  {
    id: "pg-lease",
    title: "Vinayaka: Resident Onboarding",
    badge: "Client SaaS",
    input: '"New resident Rahul Sharma checked in Room 302, 3-sharing, ₹8,500/mo, deposit ₹15,000 paid via UPI"',
    agentSteps: [
      { agent: "01. Schema Ingress", action: "Validated KYC phone + Aadhaar hash + Room 302 availability", duration: 600, status: "KYC Verified" },
      { agent: "02. Ledger Engine", action: "PostgreSQL transaction: resident created + deposit ledger credited", duration: 700, status: "Ledger Synced" },
      { agent: "03. Policy Check", action: "Row-Level Security (RLS) confirmed admin authorization only", duration: 600, status: "Security Passed" },
      { agent: "04. Welcome Service", action: "Sent digital rent receipt + WiFi credentials to resident phone", duration: 500, status: "Onboarded" },
    ],
    output: "Resident Rahul Sharma registered in Room 302. Receipt #SV-892 sent via SMS & WhatsApp.",
  },
];

export default function Hero() {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(SCENARIOS[0]);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCompleted(false);
    setActiveStepIdx(0);

    let current = 0;
    const executeStep = () => {
      if (current < selectedScenario.agentSteps.length - 1) {
        current += 1;
        setActiveStepIdx(current);
        setTimeout(executeStep, selectedScenario.agentSteps[current].duration);
      } else {
        setIsSimulating(false);
        setCompleted(true);
      }
    };

    setTimeout(executeStep, selectedScenario.agentSteps[0].duration);
  };

  const handleScenarioChange = (scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setActiveStepIdx(-1);
    setCompleted(false);
    setIsSimulating(false);
  };

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[94vh] flex-col justify-center px-6 pt-36 pb-24 sm:px-8 lg:px-12 dot-grid-bg"
      aria-label="Introduction"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── Left column: High-Impact Typography & Action ── */}
          <div className="space-y-8">

            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#121317]/90 px-4 py-1.5 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="text-xs font-mono font-semibold tracking-wider text-[#A1A1AA] uppercase">
                AI Product Builder · Bengaluru, India
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="space-y-4"
            >
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-[#F4F4F5]">
                I build{" "}
                <span className="text-gold-metallic">
                  autonomous AI systems
                </span>{" "}
                and full-stack products that turn messy workflows into software.
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                I&apos;m <span className="text-[#F4F4F5] font-semibold">Afnan B.R.</span>, an engineer translating chaotic human communications—from informal WhatsApp requests to complex DevOps triage—into production-grade multi-agent state machines, relational backends, and snappy user interfaces.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 rounded-full bg-[#F4F4F5] px-7 py-3.5 text-xs font-bold text-[#090A0C] shadow-lg transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] active:scale-[0.98]"
              >
                Explore Selected Work
                <ArrowDown size={14} />
              </button>

              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#141519] px-6 py-3.5 text-xs font-semibold text-[#F4F4F5] transition hover:border-white/30 hover:bg-[#1A1B22]"
              >
                Let&apos;s Talk
              </button>

              <Link
                href="/network"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-5 py-3.5 text-xs font-semibold text-[#A1A1AA] transition hover:border-white/25 hover:text-[#F4F4F5]"
              >
                <span>Founders Directory</span>
                <ArrowUpRight size={13} />
              </Link>
            </motion.div>

            {/* Stats Spotlight Grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-3 border-t border-white/5"
            >
              {STATS.map((stat) => (
                <SpotlightCard
                  key={stat.label}
                  className="p-3.5 bg-[#111217]"
                >
                  <p className="text-2xl font-extrabold text-[#F4F4F5]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#E4E4E7]">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-[#71717A]">
                    {stat.detail}
                  </p>
                </SpotlightCard>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: Interactive Live Multi-Agent Simulator ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <SpotlightCard className="p-6 sm:p-7 bg-[#111217] shadow-2xl border border-white/10">
              
              {/* Simulator Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-[#E2B36E]" />
                  <span className="font-mono text-xs font-bold text-[#F4F4F5] tracking-wider uppercase">
                    LIVE MULTI-AGENT SIMULATOR
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16171D] px-2.5 py-1 text-[10px] font-mono text-[#10B981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Interactive Engine</span>
                </div>
              </div>

              {/* Scenario Switcher Tabs */}
              <div className="space-y-1.5 mb-5">
                <p className="text-[11px] font-mono uppercase text-[#71717A] tracking-wider">
                  1. Select Real-World Input Scenario:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SCENARIOS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleScenarioChange(s)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                        selectedScenario.id === s.id
                          ? "bg-[#F4F4F5] text-[#090A0C] shadow-sm font-bold"
                          : "border border-white/10 bg-[#16171D] text-[#A1A1AA] hover:border-white/20 hover:text-[#F4F4F5]"
                      }`}
                    >
                      {s.badge}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Message Card */}
              <div className="rounded-xl border border-white/10 bg-[#15171D] p-3.5 mb-5 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase">
                  <span>Raw Incoming Input</span>
                  <span className="text-[#E2B36E] font-semibold">{selectedScenario.title}</span>
                </div>
                <p className="text-xs text-[#E4E4E7] font-mono italic leading-relaxed">
                  {selectedScenario.input}
                </p>
              </div>

              {/* Agent Nodes Progress Pipeline */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] uppercase">
                  <span>2. Sequential Reasoning Pipeline:</span>
                  <span className="text-xs text-[#E2B36E]">
                    {activeStepIdx >= 0 ? `Stage ${activeStepIdx + 1}/4` : "Ready to Execute"}
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedScenario.agentSteps.map((step, idx) => {
                    const isActive = activeStepIdx === idx;
                    const isDone = activeStepIdx > idx || completed;

                    return (
                      <div
                        key={step.agent}
                        className={`flex items-start gap-3 rounded-xl border p-2.5 transition-all duration-300 ${
                          isActive
                            ? "border-[#E2B36E] bg-[#E2B36E]/10 shadow-[0_0_20px_rgba(226,179,110,0.15)]"
                            : isDone
                            ? "border-[#10B981]/30 bg-[#10B981]/5"
                            : "border-white/5 bg-[#15171D]/60 opacity-60"
                        }`}
                      >
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold ${
                            isActive
                              ? "bg-[#E2B36E] text-[#090A0C]"
                              : isDone
                              ? "bg-[#10B981] text-[#090A0C]"
                              : "border border-white/10 bg-[#111217] text-[#71717A]"
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={13} /> : `0${idx + 1}`}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold text-[#F4F4F5]">{step.agent}</p>
                            <span className="font-mono text-[9px] text-[#A1A1AA]">{step.status}</span>
                          </div>
                          <p className="text-[11px] font-mono text-[#A1A1AA] truncate mt-0.5">
                            {step.action}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Output Result or Trigger Button */}
              {completed ? (
                <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-3.5 space-y-1.5 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-[#10B981]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      Deterministic Result Verified
                    </span>
                    <button
                      type="button"
                      onClick={runSimulation}
                      className="inline-flex items-center gap-1 text-[10px] font-mono underline hover:text-[#FFFFFF]"
                    >
                      <RefreshCw size={10} /> Re-run
                    </button>
                  </div>
                  <p className="text-xs text-[#F4F4F5] leading-relaxed">
                    {selectedScenario.output}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F4F4F5] py-3 text-xs font-bold text-[#090A0C] shadow-md transition hover:bg-[#FFFFFF] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSimulating ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw size={13} className="animate-spin" />
                      Routing Data Through Agents...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play size={13} fill="currentColor" />
                      Run Live Agent Pipeline Simulator
                    </span>
                  )}
                </button>
              )}

            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
