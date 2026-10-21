"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  FileText,
  CheckCircle2,
  Layers,
  Cpu,
  Activity,
  GitCompare,
  Zap,
} from "lucide-react";
import { featuredProjects } from "@/data/projects";
import SpotlightCard from "@/components/SpotlightCard";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

// ── 1. IsoCheck Interactive Isolation Graph Simulator ─────────────────────
function IsoCheckInteractiveWidget() {
  const [historyType, setHistoryType] = useState<"clean" | "g0" | "g1a">("g0");

  const scenarios = {
    clean: {
      name: "Clean Serializable",
      status: "PASS",
      statusColor: "#10B981",
      verdict: "Valid Acyclic History — 0 Anomalies",
      details: "T1 [W(x_1)] → T2 [R(x_1), W(y_1)] → T3 [R(y_1)]",
      graphNodes: [
        { id: "T1", status: "committed", color: "#10B981" },
        { id: "T2", status: "committed", color: "#10B981" },
        { id: "T3", status: "committed", color: "#10B981" },
      ],
      edges: ["T1 →wr T2", "T2 →wr T3"],
      isCycle: false,
    },
    g0: {
      name: "G0: Write Cycle",
      status: "CYCLE DETECTED",
      statusColor: "#EF4444",
      verdict: "Anomaly: Anti-Dependency Write-Write Cycle",
      details: "T1 [W(x_1), W(y_2)] ⇄ T2 [W(y_1), W(x_2)]",
      graphNodes: [
        { id: "T1", status: "conflict", color: "#EF4444" },
        { id: "T2", status: "conflict", color: "#EF4444" },
      ],
      edges: ["T1 →ww T2", "T2 →ww T1 (Cycle Detected)"],
      isCycle: true,
    },
    g1a: {
      name: "G1a: Aborted Read",
      status: "ANOMALY",
      statusColor: "#EF4444",
      verdict: "Anomaly: T2 read rolled-back version from T1",
      details: "T1 [W(x_1), ABORT] → T2 [R(x_1), COMMIT]",
      graphNodes: [
        { id: "T1", status: "aborted", color: "#F59E0B" },
        { id: "T2", status: "dirty-read", color: "#EF4444" },
      ],
      edges: ["T1 (Aborted) →wr T2 (Dirty Read)"],
      isCycle: false,
    },
  };

  const current = scenarios[historyType];

  return (
    <div className="space-y-3 sm:space-y-4 rounded-xl border border-white/10 bg-[#0E1015] p-3 sm:p-5">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHistoryType("clean")}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
              historyType === "clean"
                ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                : "text-[#A1A1AA] hover:text-[#FFFFFF] bg-white/5"
            }`}
          >
            Clean History
          </button>
          <button
            type="button"
            onClick={() => setHistoryType("g0")}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
              historyType === "g0"
                ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30"
                : "text-[#A1A1AA] hover:text-[#FFFFFF] bg-white/5"
            }`}
          >
            G0 Write-Cycle
          </button>
          <button
            type="button"
            onClick={() => setHistoryType("g1a")}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
              historyType === "g1a"
                ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30"
                : "text-[#A1A1AA] hover:text-[#FFFFFF] bg-white/5"
            }`}
          >
            G1a Aborted Read
          </button>
        </div>

        <span className="font-mono text-[10px] text-[#71717A] uppercase flex items-center gap-1">
          <Cpu size={11} className="text-[#10B981]" />
          C++20 Engine · Wasm
        </span>
      </div>

      {/* Simulator Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={historyType}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="space-y-3 font-mono text-xs"
        >
          {/* Status Verdict Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 rounded-lg border border-white/5 bg-[#14161E] p-2.5">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-wider block">Graph Verdict</span>
              <span className="font-bold text-[#F4F4F5] text-xs">{current.verdict}</span>
            </div>
            <span
              className="self-start sm:self-auto rounded px-2 py-0.5 text-[10px] font-bold"
              style={{
                backgroundColor: `${current.statusColor}22`,
                color: current.statusColor,
                border: `1px solid ${current.statusColor}44`,
              }}
            >
              {current.status}
            </span>
          </div>

          {/* Graph Visualization nodes */}
          <div className="rounded-lg border border-white/5 bg-[#0A0B0E] p-3 space-y-2">
            <div className="text-[10px] text-[#71717A] flex justify-between">
              <span>Observed History Tracing</span>
              <span>Tarjan SCC / Cycle Search</span>
            </div>
            <div className="py-2 flex items-center justify-center gap-4 sm:gap-6">
              {current.graphNodes.map((n) => (
                <div key={n.id} className="flex flex-col items-center gap-1">
                  <div
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border shadow-md transition-transform"
                    style={{
                      borderColor: n.color,
                      backgroundColor: `${n.color}18`,
                      color: n.color,
                    }}
                  >
                    {n.id}
                  </div>
                  <span className="text-[9px] uppercase text-[#71717A]">{n.status}</span>
                </div>
              ))}
            </div>

            {/* Edge details */}
            <div className="border-t border-white/5 pt-2 text-[10px] text-[#A1A1AA] flex flex-wrap gap-2 justify-center">
              {current.edges.map((e, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded ${
                    current.isCycle
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-white/5 text-[#A1A1AA]"
                  }`}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#71717A] pt-1">
            <span className="truncate mr-2">Trace: {current.details}</span>
            <span className="text-[#10B981] flex-shrink-0">Client-Side Zero-Cloud</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── 2. InferLoad Metrics & Saturation Widget ───────────────────────────────
function InferLoadMetricWidget() {
  const [loadLevel, setLoadLevel] = useState<"nominal" | "saturated">("nominal");

  return (
    <div className="rounded-xl border border-white/10 bg-[#16171D] p-3.5 sm:p-5 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Activity size={14} className="text-[#22D3EE] flex-shrink-0" />
          <span className="text-xs font-bold text-[#F4F4F5] truncate">Inference Load &amp; SLO Telemetry</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setLoadLevel("nominal")}
            className={`rounded px-2 py-0.5 transition ${
              loadLevel === "nominal"
                ? "bg-[#22D3EE]/20 text-[#22D3EE] font-bold border border-[#22D3EE]/30"
                : "text-[#71717A] hover:text-[#FFFFFF]"
            }`}
          >
            c = 4 (Nominal)
          </button>
          <button
            type="button"
            onClick={() => setLoadLevel("saturated")}
            className={`rounded px-2 py-0.5 transition ${
              loadLevel === "saturated"
                ? "bg-[#F59E0B]/20 text-[#F59E0B] font-bold border border-[#F59E0B]/30"
                : "text-[#71717A] hover:text-[#FFFFFF]"
            }`}
          >
            c = 32 (Saturated)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono">
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2 min-w-0">
          <p className="text-[10px] text-[#71717A] truncate">TTFT p50</p>
          <p className="text-xs sm:text-sm font-bold text-[#22D3EE]">
            {loadLevel === "nominal" ? "38 ms" : "142 ms"}
          </p>
          <p className="text-[9px] text-[#71717A] truncate">{loadLevel === "nominal" ? "Fast Prefill" : "Queue Delay"}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2 min-w-0">
          <p className="text-[10px] text-[#71717A] truncate">TTFT p99</p>
          <p className={`text-xs sm:text-sm font-bold ${loadLevel === "nominal" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {loadLevel === "nominal" ? "62 ms" : "840 ms"}
          </p>
          <p className="text-[9px] text-[#71717A] truncate">{loadLevel === "nominal" ? "Tail Stable" : "SLO Breach"}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2 min-w-0">
          <p className="text-[10px] text-[#71717A] truncate">Throughput</p>
          <p className="text-xs sm:text-sm font-bold text-[#F4F4F5]">
            {loadLevel === "nominal" ? "68 tok/s" : "210 tok/s"}
          </p>
          <p className="text-[9px] text-[#71717A] truncate">{loadLevel === "nominal" ? "Headroom OK" : "KV Cache Thrash"}</p>
        </div>
      </div>

      {/* Latency Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-[#A1A1AA]">
          <span>Continuous Batching Saturation</span>
          <span className="font-bold text-[#F4F4F5]">
            {loadLevel === "nominal" ? "24% KV-Cache Utilization" : "96% KV-Cache Bound (Preemptions)"}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#0E0F13] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              loadLevel === "nominal" ? "bg-[#22D3EE]" : "bg-gradient-to-r from-[#F59E0B] to-[#EF4444]"
            }`}
            style={{ width: loadLevel === "nominal" ? "24%" : "96%" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#71717A] border-t border-white/5 pt-2">
        <span>Stream: Chunk-Decoded ITL</span>
        <span className={loadLevel === "nominal" ? "text-[#10B981]" : "text-[#F59E0B]"}>
          {loadLevel === "nominal" ? "SLO: 100ms Target Met" : "Inflection Point Detected"}
        </span>
      </div>
    </div>
  );
}

// ── 3. FairLane Scheduling Benchmark Widget ───────────────────────────────
function FairLaneSchedulingWidget() {
  const [policy, setPolicy] = useState<"fifo" | "vtc">("vtc");

  return (
    <div className="rounded-xl border border-white/10 bg-[#16171D] p-3.5 sm:p-5 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <GitCompare size={14} className="text-[#F59E0B] flex-shrink-0" />
          <span className="text-xs font-bold text-[#F4F4F5] truncate">Scheduling Policy Benchmark (N=30)</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setPolicy("fifo")}
            className={`rounded px-2 py-0.5 transition ${
              policy === "fifo"
                ? "bg-[#EF4444]/20 text-[#EF4444] font-bold border border-[#EF4444]/30"
                : "text-[#71717A] hover:text-[#FFFFFF]"
            }`}
          >
            FIFO Queue
          </button>
          <button
            type="button"
            onClick={() => setPolicy("vtc")}
            className={`rounded px-2 py-0.5 transition ${
              policy === "vtc"
                ? "bg-[#F59E0B]/20 text-[#F59E0B] font-bold border border-[#F59E0B]/30"
                : "text-[#71717A] hover:text-[#FFFFFF]"
            }`}
          >
            VTC Token-Fair
          </button>
        </div>
      </div>

      {/* Comparison metrics */}
      <div className="space-y-2.5 font-mono text-xs">
        <div className="rounded-lg border border-white/5 bg-[#111217] p-2.5 space-y-1">
          <div className="flex justify-between text-[11px] text-[#A1A1AA]">
            <span>Victim Tenant Slowdown (vs Solo)</span>
            <span className={`font-bold ${policy === "fifo" ? "text-[#EF4444]" : "text-[#10B981]"}`}>
              {policy === "fifo" ? "160.37x [151.46, 169.23]" : "2.00x [1.82, 2.21]"}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#0E0F13] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                policy === "fifo" ? "bg-[#EF4444]" : "bg-[#10B981]"
              }`}
              style={{ width: policy === "fifo" ? "100%" : "2.5%" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded border border-white/5 bg-[#111217] p-2">
            <span className="text-[#71717A] block">Mean Queue Wait</span>
            <span className={`font-bold text-xs ${policy === "fifo" ? "text-[#EF4444]" : "text-[#F4F4F5]"}`}>
              {policy === "fifo" ? "52,460 ms (52.4s)" : "336.1 ms"}
            </span>
          </div>
          <div className="rounded border border-white/5 bg-[#111217] p-2">
            <span className="text-[#71717A] block">Flooder Batch Saturation</span>
            <span className="font-bold text-xs text-[#E2B36E]">
              {policy === "fifo" ? "Monopolized (100%)" : "Fair Batch Share"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#71717A] border-t border-white/5 pt-2">
        <span>Empirical Poisson Benchmark</span>
        <span className="text-[#E2B36E]">95% Bootstrap Confidence Interval</span>
      </div>
    </div>
  );
}

// ── 4. BizPilot Interactive Showcase ──────────────────────────────────────
function BizPilotInteractiveShowcase() {
  const [viewMode, setViewMode] = useState<"whatsapp" | "invoice">("whatsapp");

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setViewMode("whatsapp")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold transition ${
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
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold transition ${
              viewMode === "invoice"
                ? "bg-[#E2B36E]/20 text-[#E2B36E] border border-[#E2B36E]/30"
                : "text-[#A1A1AA] hover:text-[#FFFFFF]"
            }`}
          >
            <FileText size={13} />
            Generated Tax Invoice
          </button>
        </div>

        <span className="font-mono text-[10px] text-[#71717A] uppercase hidden md:inline">
          5-Agent Pipeline
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
            className="rounded-xl border border-white/10 bg-[#0D0E12] p-3 sm:p-4 space-y-2.5 font-sans"
          >
            <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-[#71717A]">
              <span>Customer Message · Received 11:42 AM</span>
              <span className="text-[#10B981]">Unverified Raw Input</span>
            </div>
            <div className="rounded-xl bg-[#17241E] border border-[#10B981]/20 p-3 sm:p-3.5 text-xs text-[#E4E4E7] leading-relaxed">
              &ldquo;Hey Afnan, we need 35 South Indian meals for our team offsite in Indiranagar tomorrow afternoon 1:30 PM. Please include curd vada and bill it with GST. Can you send the estimate here?&rdquo;
            </div>
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#71717A] pt-1">
              <span>Intake → Context → Pricing → Approval → Review</span>
              <span className="text-[#10B981]">Fallback: Deterministic Rule Engine</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="invoice"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-white/10 bg-[#16171D] p-3 sm:p-4 space-y-2.5 sm:space-y-3 font-mono text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-2">
              <div>
                <p className="font-bold text-[#F4F4F5] text-xs">TAX INVOICE #BP-2026-94</p>
                <p className="text-[9px] sm:text-[10px] text-[#71717A]">GSTIN: 29AAAAA0000A1Z5</p>
              </div>
              <span className="self-start sm:self-auto rounded-full bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 text-[9px] sm:text-[10px] font-bold">
                VERIFIED &amp; GST COMPLIANT
              </span>
            </div>

            <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-[11px]">
              <div className="flex justify-between text-[#A1A1AA]">
                <span className="truncate mr-2">35x South Indian Executive Meals</span>
                <span className="text-[#F4F4F5] flex-shrink-0">₹7,000.00</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span className="truncate mr-2">35x Curd Vada Add-on</span>
                <span className="text-[#F4F4F5] flex-shrink-0">₹1,750.00</span>
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

// ── 5. AutoFix AI Consensus & Feedback Widget ─────────────────────────────
function AutoFixConsensusWidget() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#16171D] p-3 sm:p-5 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Zap size={14} className="text-[#34D399] flex-shrink-0" />
          <span className="text-xs font-bold text-[#F4F4F5] truncate">DevOps Incident State Machine</span>
        </div>
        <span className="text-[10px] font-mono text-[#71717A] flex-shrink-0">6 Agent Nodes</span>
      </div>

      <div className="grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-2">
        {["Manager", "Researcher", "Analyst", "Tester", "Writer", "Action"].map((agent, i) => (
          <div key={agent} className="rounded-lg border border-white/5 bg-[#111217] p-1.5 sm:p-2 text-center min-w-0">
            <span className="font-mono text-[9px] text-[#71717A]">0{i + 1}</span>
            <p className="text-[11px] sm:text-xs font-bold text-[#E4E4E7] truncate">{agent}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-2.5 text-[10px] font-mono text-[#F4F4F5] space-y-1">
        <div className="flex items-center justify-between text-[#E2B36E]">
          <span className="font-bold">Self-Correction Feedback Loop</span>
          <span>Tester ➔ Researcher Retry</span>
        </div>
        <p className="text-[#A1A1AA] text-[9px] leading-relaxed">
          If candidate fix fails reproduction tests, the loop restarts with failure logs as context before generating final report.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[9px] sm:text-[10px] font-mono text-[#71717A] border-t border-white/5 pt-2">
        <span className="text-[#34D399] flex items-center gap-1">
          <CheckCircle2 size={12} /> Incident Post-Mortem Schema
        </span>
        <span>Remediation PR Ready</span>
      </div>
    </div>
  );
}

// ── Widget Dispatcher Helper ──────────────────────────────────────────────
function renderProjectWidget(projectId: string) {
  switch (projectId) {
    case "isocheck":
      return <IsoCheckInteractiveWidget />;
    case "inferload":
      return <InferLoadMetricWidget />;
    case "fairlane":
      return <FairLaneSchedulingWidget />;
    case "bizpilot":
      return <BizPilotInteractiveShowcase />;
    case "autofix-ai":
      return <AutoFixConsensusWidget />;
    default:
      return null;
  }
}

// ── Main FeaturedWork Component ───────────────────────────────────────────
export default function FeaturedWork() {
  const leadProject = featuredProjects[0]; // IsoCheck
  const otherProjects = featuredProjects.slice(1); // InferLoad, FairLane, BizPilot, AutoFix

  return (
    <section id="work" className="relative px-4 py-16 sm:px-8 sm:py-24 lg:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-16 max-w-3xl space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141519] px-3.5 py-1.5 backdrop-blur-md">
            <Layers size={13} className="text-[#E2B36E]" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
              FEATURED ENGINEERING SYSTEMS
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5] leading-[1.15]">
            Engineered with systems depth,{" "}
            <span className="text-gold-metallic">not toy prompts.</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
            Production-grade systems engineering: transactional isolation checking in C++20/Wasm, LLM inference load testing, empirical scheduling research, and resilient multi-agent automation.
          </p>
        </motion.div>

        {/* ── BENTO SHOWCASE GRID ── */}
        <div className="space-y-6 sm:space-y-8">

          {/* 1. Flagship Lead Bento: IsoCheck */}
          {leadProject && (
            <SpotlightCard className="p-4 sm:p-8 lg:p-10 border border-white/10 bg-[#111217]">
              <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-[#10B981] uppercase tracking-wider">
                      {leadProject.badge}
                    </span>
                    <span className="rounded-full border border-white/10 bg-[#16171D] px-2.5 py-0.5 font-mono text-[9px] text-[#A1A1AA]">
                      {leadProject.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F4F4F5]">
                    {leadProject.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
                    {leadProject.shortDesc}
                  </p>

                  <div className="space-y-2.5 border-t border-white/5 pt-3 sm:pt-4 text-xs sm:text-sm">
                    <div>
                      <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider block">Problem</span>
                      <p className="text-[#A1A1AA] text-xs leading-relaxed mt-0.5">{leadProject.problem}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider block">Approach &amp; Contribution</span>
                      <p className="text-[#E4E4E7] text-xs leading-relaxed mt-0.5">{leadProject.keyContribution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {leadProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] text-[#A1A1AA]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-3">
                    {leadProject.liveUrl && (
                      <a
                        href={leadProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-[#090A0C] shadow-sm transition hover:bg-[#FFFFFF]"
                      >
                        <ExternalLink size={13} />
                        Live Web Playground
                      </a>
                    )}
                    <a
                      href={leadProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1E1F27]"
                    >
                      <GithubIcon size={13} />
                      Source Code
                    </a>
                    {leadProject.caseStudyUrl && (
                      <Link
                        href={leadProject.caseStudyUrl}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1E1F27]"
                      >
                        Case Study
                        <ArrowUpRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Interactive Simulator on Right */}
                <div>
                  {renderProjectWidget(leadProject.id)}
                </div>
              </div>
            </SpotlightCard>
          )}

          {/* 2. Bento Grid: Remaining 4 Featured Projects */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {otherProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                className="p-4 sm:p-7 lg:p-8 border border-white/10 bg-[#111217] flex flex-col justify-between"
              >
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-[#A1A1AA]">
                      {project.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F4F5]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#A1A1AA]">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Interactive / Custom Widget */}
                  <div>
                    {renderProjectWidget(project.id)}
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-mono text-[9px] text-[#71717A] uppercase tracking-wider block">Key Engineering Contribution</span>
                    <p className="text-[#D4D4D8] leading-relaxed text-xs">{project.keyContribution}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-0.5 sm:py-1 font-mono text-[10px] text-[#A1A1AA]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-t border-white/5 pt-4 sm:pt-5 mt-5 sm:mt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-[#090A0C] hover:bg-[#FFFFFF]"
                    >
                      <ExternalLink size={12} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1E1F27]"
                  >
                    <GithubIcon size={12} />
                    Source Code
                  </a>
                  {project.caseStudyUrl && (
                    <Link
                      href={project.caseStudyUrl}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
