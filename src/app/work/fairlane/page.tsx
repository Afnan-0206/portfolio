import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "FairLane — Token-Fair LLM Scheduling Case Study",
  description:
    "An empirical systems research project evaluating token-aware scheduling and admission control policies for multi-tenant LLM serving.",
};

const BENCHMARK_METRICS = [
  {
    policy: "FIFO (break mode)",
    slowdown: "160.37x [151.46, 169.23]*",
    ttft: "52,461 ms",
    queueWait: "52,460.7 ms",
    notes: "*Unbounded / horizon-dependent due to flooder arrival rate exceeding service rate.",
  },
  {
    policy: "FIFO (skip mode)",
    slowdown: "159.20x [150.31, 168.10]*",
    ttft: "52,148 ms",
    queueWait: "52,147.4 ms",
    notes: "Flooder requests fill batch capacity; victim requests wait behind backlog.",
  },
  {
    policy: "Round-Robin (break)",
    slowdown: "2.19x [1.96, 2.45]",
    ttft: "398 ms",
    queueWait: "397.4 ms",
    notes: "Interleaves tenant dispatches but ignores request token weight heterogeneity.",
  },
  {
    policy: "Round-Robin (skip)",
    slowdown: "1.83x [1.63, 2.01]",
    ttft: "311 ms",
    queueWait: "310.7 ms",
    notes: "Skips backlogged tenants who cannot fit into remaining batch slots.",
  },
  {
    policy: "Virtual Token Counter (VTC default)",
    slowdown: "2.00x [1.82, 2.21]",
    ttft: "336 ms",
    queueWait: "336.1 ms",
    notes: "Maintains token-fair shares across tenants; protects victim from flooder saturation.",
  },
];

const POLICIES = [
  {
    name: "First-In, First-Out (FIFO)",
    desc: "Processes requests strictly in arrival order. Fails catastrophically under heterogeneous workloads when high-volume tenants saturate the queue.",
  },
  {
    name: "Request-Count Round-Robin (RR)",
    desc: "Alternates turns across active tenants by request count. Protects against simple request volume flooders but remains vulnerable to token-length disparities.",
  },
  {
    name: "Virtual Token Counter (VTC)",
    desc: "Tracks cumulative token allocations per tenant and dispatches from the tenant with the lowest accumulated virtual token count, enforcing genuine resource fairness.",
  },
];

export default function FairLaneCaseStudy() {
  return (
    <CaseStudyShell projectId="fairlane">

      {/* 1. Project Overview */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Project overview
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          FairLane is an empirical systems research project that evaluates token-aware scheduling and admission control
          policies at the queue layer for multi-tenant LLM inference servers. By modeling continuous batching dynamics,
          FairLane compares how different scheduling policies affect fairness, queue wait times, and tail latency when
          co-located tenants have asymmetric workload characteristics.
        </p>
      </section>

      {/* 2. The Problem: Flooder vs. Victim Tenant Starvation */}
      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          The problem: Monopolization under continuous batching
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          In multi-tenant LLM serving environments, clients share GPU compute and KV-cache memory. When standard FIFO
          or naive request-count scheduling is used, a single &ldquo;flooder&rdquo; tenant submitting high-token requests
          (e.g., long-context RAG prompts of 1,024 to 4,000 tokens) will saturate available batch slots.
        </p>
        <p className="mt-3 text-base leading-8 text-[#94A3B8]">
          A co-located &ldquo;victim&rdquo; tenant submitting lightweight, latency-sensitive requests (e.g., 128 prompt / 64 decode tokens)
          is forced to wait behind the flooder&apos;s massive queue. In measured experiments, this results in the victim
          experiencing an astounding <strong className="text-[#EF4444]">160x slowdown</strong> and mean queue wait times
          surpassing 52 seconds.
        </p>
      </section>

      {/* 3. Implemented Scheduling Policies */}
      <section aria-labelledby="policies-heading">
        <h2 id="policies-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          Implemented scheduling policies
        </h2>

        <div className="space-y-3">
          {POLICIES.map((p) => (
            <div key={p.name} className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4 space-y-1">
              <span className="font-semibold text-sm text-[#F8FAFC]">{p.name}</span>
              <p className="text-sm leading-6 text-[#94A3B8]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Measured Benchmark Results */}
      <section aria-labelledby="benchmark-heading">
        <h2 id="benchmark-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          Measured experimental benchmark results (N = 30 Seeds)
        </h2>

        <p className="text-sm text-[#94A3B8] mb-4">
          Experimental setup: Flooder tenant (240 requests, 1,024 prompt / 256 decode, 83.3 req/s Poisson arrival)
          co-located with a Victim tenant (60 requests, 128 prompt / 64 decode, 20 req/s Poisson). Server KV capacity:
          4,096 tokens, max batch size: 16. Evaluated with 95% non-parametric bootstrap confidence intervals.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0B0C0F]">
          <table className="w-full font-mono text-xs text-left">
            <thead className="border-b border-white/10 bg-[#141519] text-[#71717A]">
              <tr>
                <th className="p-3">Policy</th>
                <th className="p-3">Victim Slowdown (95% CI)</th>
                <th className="p-3">Victim TTFT Mean</th>
                <th className="p-3">Queue Wait Mean</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#E4E4E7]">
              {BENCHMARK_METRICS.map((row) => (
                <tr key={row.policy} className="hover:bg-white/5">
                  <td className="p-3 font-semibold text-[#F4F4F5]">{row.policy}</td>
                  <td className={`p-3 font-bold ${row.policy.includes("FIFO") ? "text-[#EF4444]" : "text-[#10B981]"}`}>
                    {row.slowdown}
                  </td>
                  <td className="p-3">{row.ttft}</td>
                  <td className="p-3">{row.queueWait}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-[11px] font-mono text-[#71717A]">
          *Note on FIFO Slowdown: The measured 160.37x ratio is horizon-dependent because the flooder arrival rate exceeds the single-node service rate, compounding queue backlog over time.
        </p>
      </section>

      {/* 5. Scientific Transparency & Documented Disclosures */}
      <section aria-labelledby="transparency-heading">
        <h2 id="transparency-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Scientific transparency &amp; falsification
        </h2>
        <div className="space-y-4 text-base leading-8 text-[#94A3B8]">
          <p>
            FairLane is presented strictly as a research project with empirical methodology. Key methodology disclosures
            include:
          </p>
          <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-5 space-y-2 text-xs text-[#E4E4E7]">
            <p className="font-bold text-[#F59E0B] uppercase">Pre-Registration &amp; Falsification Notes</p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-[#F8FAFC]">Initial Hypothesis Falsification:</strong> The original finite-trace hypothesis was falsified due to the tokens conservation invariant (total served tokens must identically equal submitted tokens over finite drain horizons).
              </li>
              <li>
                <strong className="text-[#F8FAFC]">Pilot-Informed Steady-State:</strong> Steady-state Poisson evaluations were refined based on pilot simulation runs before freezing experiment configurations.
              </li>
              <li>
                <strong className="text-[#F8FAFC]">Scope Limitation:</strong> Evaluates single-node queue scheduling algorithms rather than distributed cluster orchestration across multiple GPU nodes.
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
            <li><span className="text-[#F8FAFC] font-medium">Simulation Kernel:</span> Python &amp; Go discrete-event simulation harness</li>
            <li><span className="text-[#F8FAFC] font-medium">Batching Model:</span> Continuous batching with dynamic KV-cache slot allocation</li>
            <li><span className="text-[#F8FAFC] font-medium">Statistical Analysis:</span> Non-parametric bootstrap (1,000 resamples, 95% CI), Jain&apos;s Fairness Index</li>
            <li><span className="text-[#F8FAFC] font-medium">Workload Distributions:</span> Synthetic Poisson arrival with heterogeneous prompt/decode token distributions</li>
          </ul>
        </div>
      </section>

    </CaseStudyShell>
  );
}
