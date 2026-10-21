"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities } from "@/data/projects";
import { Cpu, Code2, Database, Layers, Terminal, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const CAP_META: Record<string, { icon: any; subtitle: string; codeSnippet: string }> = {
  "systems-infra": {
    icon: Cpu,
    subtitle: "C++20, Wasm & Systems Verification",
    codeSnippet: `// C++20 Transaction Dependency Graph & Tarjan SCC Cycle Search
auto sccs = tarjan_scc(dependency_graph);
for (const auto& comp : sccs) {
  if (comp.size() > 1 || comp.has_self_loop()) {
    // Flag G0 (Write Cycles) or G1c (Circular Flow) isolation anomalies
    return AnomalyVerdict::ViolationDetected("G0 Anti-Dependency Cycle", comp);
  }
}
return AnomalyVerdict::ValidAcyclic();`,
  },
  "ai-systems": {
    icon: Terminal,
    subtitle: "Multi-Agent State Machines & Fallback",
    codeSnippet: `// Multi-agent state transition with deterministic fallback
const agentState = await pipeline.dispatch({
  intake:   parsedCustomerJSON,
  context:  await catalog.resolvePricing(itemQuery),
  fallback: deterministicRuleEngine, // zero downtime on LLM rate-limit
  validate: zodDocumentSchema.strict(), // prevents hallucinated totals
});`,
  },
  "fullstack": {
    icon: Code2,
    subtitle: "Modern Web, Next.js & Strict Types",
    codeSnippet: `// Next.js App Router + TypeScript Strict Validation
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });
  const payload = await req.json();
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return Response.json(parsed.error, { status: 422 });
  return Response.json({ status: 200, data: parsed.data });
}`,
  },
  "databases-devops": {
    icon: Database,
    subtitle: "PostgreSQL, RLS & Cloud Infrastructure",
    codeSnippet: `-- PostgreSQL Row-Level Security Policy & Audit Triggers
CREATE POLICY "Admins manage property rooms"
ON public.rooms FOR ALL
USING (auth.uid() = admin_id AND active = true);

CREATE TRIGGER room_audit_log
AFTER INSERT OR UPDATE OR DELETE ON public.rooms
FOR EACH ROW EXECUTE FUNCTION record_audit_trail();`,
  },
};

export default function Capabilities() {
  const [selectedCap, setSelectedCap] = useState<string>("systems-infra");

  return (
    <section id="capabilities" className="relative px-4 py-16 sm:px-8 sm:py-24 lg:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
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
              TECHNICAL ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5]">
            The full stack,{" "}
            <span className="text-gold-metallic">
              from systems to deployment.
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
            Production software requires rigor across every layer: C++20 graph algorithms, deterministic business fallback rules, autonomous multi-agent state machines, relational schema guarantees, and edge interfaces.
          </p>
        </motion.div>

        {/* 4-Card Interactive Capability Matrix */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          {capabilities.map((group, i) => {
            const meta = CAP_META[group.id] || {
              icon: Terminal,
              subtitle: "Core Competency",
              codeSnippet: "",
            };
            const Icon = meta.icon;
            const isSelected = selectedCap === group.id;

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                onClick={() => setSelectedCap(group.id)}
                className="cursor-pointer"
              >
                <SpotlightCard
                  className={`p-4 sm:p-6 border transition-all duration-300 flex flex-col justify-between h-full ${
                    isSelected
                      ? "border-[#E2B36E] bg-[#16171D] shadow-warm-glow"
                      : "border-white/10 bg-[#111217] hover:border-white/20"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="mb-4 sm:mb-5 flex items-center gap-3 border-b border-white/5 pb-3 sm:pb-4">
                      <div className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl border ${
                        isSelected
                          ? "border-[#E2B36E] bg-[#E2B36E] text-[#090A0C]"
                          : "border-white/10 bg-[#16171D] text-[#E2B36E]"
                      }`}>
                        <Icon size={17} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#F4F4F5] leading-snug">
                          {group.title}
                        </h3>
                        <p className="font-mono text-[10px] text-[#71717A]">{meta.subtitle}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <ul className="space-y-2 mb-5 sm:mb-6" role="list">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-[#A1A1AA]"
                        >
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E2B36E]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                    <span>Click to inspect code</span>
                    <ArrowRight size={12} className={isSelected ? "text-[#E2B36E]" : ""} />
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Live Code / Schema Inspector for Selected Capability */}
        <AnimatePresence mode="wait">
          {selectedCap && CAP_META[selectedCap] && (
            <motion.div
              key={selectedCap}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full min-w-0 max-w-full overflow-hidden"
            >
              <SpotlightCard className="w-full min-w-0 max-w-full overflow-hidden p-3.5 sm:p-6 bg-[#111217] border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-white/5 pb-3 mb-3 sm:mb-4 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                    <Terminal size={14} className="text-[#E2B36E] flex-shrink-0" />
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#F4F4F5] uppercase truncate">
                      Code Implementation · {capabilities.find((c) => c.id === selectedCap)?.title}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#10B981] flex-shrink-0">Verified Engineering Artifact</span>
                </div>
                <div className="w-full min-w-0 overflow-x-auto rounded-xl bg-[#0B0C0F] border border-white/5 p-3 sm:p-4">
                  <pre className="font-mono text-[11px] sm:text-xs text-[#E4E4E7] leading-relaxed whitespace-pre inline-block min-w-full">
                    <code>{CAP_META[selectedCap].codeSnippet}</code>
                  </pre>
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
