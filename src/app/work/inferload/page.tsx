import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "InferLoad — LLM Inference Load-Testing Case Study",
  description:
    "An empirical performance-testing and capacity-planning laboratory for LLM inference systems, measuring TTFT, ITL, and saturation dynamics.",
};

const METRICS_COLLECTED = [
  {
    name: "Time to First Token (TTFT)",
    desc: "Elapsed duration from request dispatch to arrival and decoding of the first streamed token chunk, isolating prefill computation.",
  },
  {
    name: "First Byte Latency",
    desc: "Time from request dispatch to receipt of initial HTTP response headers, isolating network RTT from model computation.",
  },
  {
    name: "Inter-Token Latency (ITL)",
    desc: "Time deltas between consecutive token arrivals, capturing token generation fluidity and memory-bandwidth stalls.",
  },
  {
    name: "Generation Throughput",
    desc: "Tokens generated per second per individual request, alongside aggregate token production across the entire server.",
  },
  {
    name: "Statistical Distributions",
    desc: "p50, p95, and p99 percentiles computed with linear interpolation on unrounded measurements to expose tail latencies.",
  },
  {
    name: "SLO Compliance & Saturation",
    desc: "Inflection point analysis detecting the exact concurrency threshold where queueing triggers KV-cache preemption.",
  },
];

const ARCHITECTURE_FLOW = [
  {
    step: "01. Workload Specification",
    tech: "YAML Configuration",
    desc: "Define target endpoint, model name, prompt distribution, token budgets, and concurrency or arrival rate models.",
  },
  {
    step: "02. Dual Arrival Engine",
    tech: "Closed-Loop & Poisson",
    desc: "Supports closed-loop fixed concurrency (client sends next request immediately upon receipt) and open-loop Poisson arrival streams.",
  },
  {
    step: "03. Streaming Token Decoder",
    tech: "Server-Sent Events (SSE)",
    desc: "Decodes streaming chunks from Ollama, vLLM, or OpenAI-compatible endpoints with high-resolution monotonic timestamps.",
  },
  {
    step: "04. Statistical Inference",
    tech: "Python 3.12 Math Engine",
    desc: "Aggregates latency distributions, detects outliers, and evaluates service level objectives (SLO) against predefined target budgets.",
  },
];

export default function InferLoadCaseStudy() {
  return (
    <CaseStudyShell projectId="inferload">

      {/* 1. Project Overview */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Project overview
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          InferLoad is an empirical performance-testing and capacity-analysis tool designed specifically for LLM
          inference endpoints (vLLM, Ollama, and OpenAI-compatible APIs). Sitting outside the model server, it generates
          controlled workloads, decodes streaming responses in real time, and produces comprehensive statistical and SLO
          reports.
        </p>
      </section>

      {/* 2. The Problem */}
      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          The problem: Why standard HTTP load testing fails on LLMs
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Standard load testing tools such as wrk, k6, or Locust treat endpoints as static request-response systems.
          They measure end-to-end round-trip latency, which completely obscures the fundamental execution mechanics of
          generative inference:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-[#94A3B8] list-disc list-inside">
          <li>
            <strong className="text-[#F8FAFC]">Prefill vs. Decode Split:</strong> The compute-bound prompt ingestion phase (prefill) operates under entirely different hardware constraints than the memory-bandwidth-bound auto-regressive generation phase (decode).
          </li>
          <li>
            <strong className="text-[#F8FAFC]">Time to First Token (TTFT):</strong> In interactive user applications, TTFT determines perceived responsiveness, while round-trip time depends heavily on requested generation length.
          </li>
          <li>
            <strong className="text-[#F8FAFC]">KV-Cache Starvation:</strong> Under concurrent load, continuous batching engines run out of GPU KV-cache slots, causing request queueing, chunk preemption, and extreme p99 tail latency spikes that average metrics conceal.
          </li>
        </ul>
      </section>

      {/* 3. System Architecture */}
      <section aria-labelledby="architecture-heading">
        <h2 id="architecture-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          Architecture &amp; execution flow
        </h2>

        <div className="space-y-3">
          {ARCHITECTURE_FLOW.map((f, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 rounded-xl border border-[#1E293B] bg-[#0B1018] p-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#22D3EE]">{f.step}</span>
                <p className="text-sm leading-6 text-[#94A3B8]">{f.desc}</p>
              </div>
              <span className="self-start rounded-full border border-white/10 bg-[#121316] px-2.5 py-0.5 font-mono text-[10px] text-[#E2B36E] shrink-0">
                {f.tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Metrics & Statistical Engine */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          What InferLoad measures
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {METRICS_COLLECTED.map((m) => (
            <div key={m.name} className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4 space-y-1.5">
              <p className="text-sm font-semibold text-[#F8FAFC]">{m.name}</p>
              <p className="text-xs leading-5 text-[#94A3B8]">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Saturation Analysis & Trade-offs */}
      <section aria-labelledby="saturation-heading">
        <h2 id="saturation-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Saturation analysis &amp; capacity planning
        </h2>
        <div className="space-y-3 text-base leading-8 text-[#94A3B8]">
          <p>
            InferLoad helps infrastructure engineers identify the exact operating ceiling of an LLM cluster before
            latency degrades. By scaling concurrency in stepping intervals, InferLoad plots the inflection curve where
            GPU memory reaches capacity and batch prefill queue times start scaling linearly.
          </p>
          <div className="rounded-xl border border-[#22D3EE]/20 bg-[#22D3EE]/5 p-4 text-xs text-[#E4E4E7]">
            <p className="font-bold text-[#22D3EE] mb-1">Operational Guarantee</p>
            InferLoad does not invent synthetic token counts or drop failed stream chunks. Every metric is computed
            directly from client-received chunk deltas, preserving statistical truth for capacity planning decisions.
          </div>
        </div>
      </section>

      {/* 6. Technical Stack */}
      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Technical architecture &amp; tools
        </h2>
        <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
          <ul className="space-y-1.5 text-sm text-[#94A3B8]">
            <li><span className="text-[#F8FAFC] font-medium">Core Runtime:</span> Python 3.12, AsyncIO, HTTPX streaming client</li>
            <li><span className="text-[#F8FAFC] font-medium">Web Console:</span> FastAPI backend, Render cloud deployment</li>
            <li><span className="text-[#F8FAFC] font-medium">Target Compatibility:</span> Ollama, vLLM, DeepSeek, OpenAI-compatible APIs</li>
            <li><span className="text-[#F8FAFC] font-medium">Distribution Engine:</span> Exact unrounded percentiles (p50, p95, p99), histogram interpolation</li>
            <li><span className="text-[#F8FAFC] font-medium">Configuration:</span> Strict YAML schemas for repeatable experiment definitions</li>
          </ul>
        </div>
      </section>

    </CaseStudyShell>
  );
}
