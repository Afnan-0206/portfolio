import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "IsoCheck — Transactional Isolation Checker Case Study",
  description:
    "A high-performance black-box transactional isolation checker implemented in C++20 and WebAssembly with a Python workload harness.",
};

const ANOMALIES_DETECTED = [
  {
    code: "G0",
    name: "Write Cycles (Dirty Write)",
    desc: "Two or more transactions overwrite shared keys in conflicting orders, violating total write order.",
  },
  {
    code: "G1a",
    name: "Aborted Reads",
    desc: "A transaction reads a version produced by a transaction that subsequently aborted or rolled back.",
  },
  {
    code: "G1c",
    name: "Circular Information Flow",
    desc: "Transactions exhibit circular dependencies in their read-write relationships (T1 reads from T2 while T2 reads from T1).",
  },
  {
    code: "Garbage Read",
    name: "Unwritten Version Reads",
    desc: "A transaction observes a data version that was never committed by any transaction in the history.",
  },
];

const ARCHITECTURE_STAGES = [
  {
    step: "01. Workload Generation",
    tech: "Python 3.12 Harness",
    desc: "Executes concurrent transactional clients using list-append micro-operations against target databases (PostgreSQL, CockroachDB).",
  },
  {
    step: "02. History Parsing",
    tech: "JSONL Event Stream",
    desc: "Extracts client-observed invocation and completion timestamps, transaction IDs, read results, and committed write sets.",
  },
  {
    step: "03. Version Order Inference",
    tech: "Per-Key Monotonicity",
    desc: "Infers the serialization sequence for each individual key by analyzing client-observed list extensions and prefix relationships.",
  },
  {
    step: "04. Dependency Graph Construction",
    tech: "Directed Graph (wr, ww)",
    desc: "Synthesizes directed edges: write-to-read (wr) when a transaction reads another's write, and write-to-write (ww) from version orders.",
  },
  {
    step: "05. Cycle Detection & SCC Search",
    tech: "C++20 & Tarjan Algorithm",
    desc: "Runs Tarjan's Strongly Connected Components (SCC) and minimal cycle search to isolate dependency cycles and produce proof witnesses.",
  },
  {
    step: "06. WebAssembly Client Sandbox",
    tech: "Emscripten Wasm",
    desc: "Compiles the full C++20 checking engine into WebAssembly, enabling zero-install, zero-cloud verification directly in the browser.",
  },
];

export default function IsoCheckCaseStudy() {
  return (
    <CaseStudyShell projectId="isocheck">

      {/* 1. Project Overview */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Project overview
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          IsoCheck is a high-performance black-box transactional isolation checker implemented in{" "}
          <strong className="text-[#F8FAFC]">C++20</strong> with a{" "}
          <strong className="text-[#F8FAFC]">Python 3.12</strong> workload harness and an in-browser{" "}
          <strong className="text-[#F8FAFC]">WebAssembly</strong> playground. It observes concurrent database
          operations purely from the client perspective, reconstructs per-key version orders, synthesizes directed
          dependency graphs, and identifies isolation anomalies via cycle search.
        </p>
      </section>

      {/* 2. The Problem */}
      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          The problem: Verifying isolation without lock-table access
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Modern distributed and relational databases frequently advertise ACID transactional isolation levels such as{" "}
          <em className="text-[#F8FAFC]">Read Committed</em>, <em className="text-[#F8FAFC]">Repeatable Read</em>, or{" "}
          <em className="text-[#F8FAFC]">Serializable</em>. However, race conditions, edge-case lock acquisitions, and
          distributed consensus optimizations often introduce silent isolation bugs under concurrent load.
        </p>
        <p className="mt-3 text-base leading-8 text-[#94A3B8]">
          Traditionally, verifying isolation required white-box inspection: auditing internal lock tables, parsing
          write-ahead logs (WAL), or instrumenting the database kernel. In managed cloud environments, database users do
          not have administrative server access. IsoCheck solves this by inferring isolation anomalies purely from
          client-observable read and write histories.
        </p>
      </section>

      {/* 3. System Architecture */}
      <section aria-labelledby="architecture-heading">
        <h2 id="architecture-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          System architecture &amp; pipeline
        </h2>

        <div className="space-y-3">
          {ARCHITECTURE_STAGES.map((s, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 rounded-xl border border-[#1E293B] bg-[#0B1018] p-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#10B981]">{s.step}</span>
                <p className="text-sm leading-6 text-[#94A3B8]">{s.desc}</p>
              </div>
              <span className="self-start rounded-full border border-white/10 bg-[#121316] px-2.5 py-0.5 font-mono text-[10px] text-[#E2B36E] shrink-0">
                {s.tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Anomaly Classification */}
      <section aria-labelledby="anomalies-heading">
        <h2 id="anomalies-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          Checked isolation anomalies
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {ANOMALIES_DETECTED.map((a) => (
            <div key={a.code} className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#10B981]/15 px-2 py-0.5 font-mono text-xs font-bold text-[#10B981]">
                  {a.code}
                </span>
                <span className="font-mono text-[10px] text-[#71717A]">Adya (1999) / Elle</span>
              </div>
              <p className="text-sm font-semibold text-[#F8FAFC]">{a.name}</p>
              <p className="text-xs leading-5 text-[#94A3B8]">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Theoretical Foundation & Documented Limitations */}
      <section aria-labelledby="limitations-heading">
        <h2 id="limitations-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Theoretical foundation &amp; explicit limitations
        </h2>
        <div className="space-y-4 text-base leading-8 text-[#94A3B8]">
          <p>
            IsoCheck grounds its checking logic directly in the formalisms of Atul Adya&apos;s generalized isolation theory
            (1999) and Elle (Kingsbury &amp; Alvaro, 2020). By using list-append registers where every written value is
            unique, the checker can establish total version orders per key without ambiguous overwrites.
          </p>

          <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-5 space-y-2">
            <p className="font-mono text-xs font-bold text-[#F59E0B] uppercase">Explicit Black-Box Limitations</p>
            <ul className="space-y-1.5 text-xs text-[#E4E4E7] list-disc list-inside">
              <li>
                <strong className="text-[#F8FAFC]">Unobserved Internal States:</strong> Transactions aborted before the client receives an acknowledgment cannot be reconstructed unless their intermediate writes leak to concurrent reads.
              </li>
              <li>
                <strong className="text-[#F8FAFC]">Predicate-Level Anomalies:</strong> Phantom reads and predicate locks cannot be verified without observing the database catalog schema or range scans.
              </li>
              <li>
                <strong className="text-[#F8FAFC]">Clock Skew in Timelines:</strong> Client-side invocation/completion ordering requires synchronized client clocks or monotonic local counters to prevent false timeline waterflow drift.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Technical Stack Summary */}
      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Technical architecture &amp; tools
        </h2>
        <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
          <ul className="space-y-1.5 text-sm text-[#94A3B8]">
            <li><span className="text-[#F8FAFC] font-medium">Checking Engine:</span> C++20 (GCC 14 / Clang 18, CMake)</li>
            <li><span className="text-[#F8FAFC] font-medium">Web Playground:</span> WebAssembly via Emscripten, Cloudflare Pages</li>
            <li><span className="text-[#F8FAFC] font-medium">Workload Harness:</span> Python 3.12, AsyncIO, psycopg3</li>
            <li><span className="text-[#F8FAFC] font-medium">Graph Algorithms:</span> Tarjan&apos;s Strongly Connected Components (SCC), Johnson&apos;s cycle search</li>
            <li><span className="text-[#F8FAFC] font-medium">Verified Targets:</span> PostgreSQL 17.2, SQLite 3, CockroachDB</li>
          </ul>
        </div>
      </section>

    </CaseStudyShell>
  );
}
