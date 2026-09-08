"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities } from "@/data/projects";
import { Cpu, Code2, Database, BarChart3, Layers, Terminal, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const CAP_META: Record<string, { icon: any; subtitle: string; codeSnippet: string }> = {
  "ai-systems": {
    icon: Cpu,
    subtitle: "Autonomous & Multi-Agent Logic",
    codeSnippet: `// Multi-agent state transition logic
const agentState = await pipeline.dispatch({
  intake:    parsedWhatsAppJSON,
  context:   await supabase.rpc('get_client_terms'),
  fallback:  ruleBasedPricingEngine,
  validate:  zodInvoiceSchema.strict()
});`,
  },
  "full-stack": {
    icon: Code2,
    subtitle: "Modern Web & Distributed APIs",
    codeSnippet: `// Next.js App Router + Server Actions
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return unauthorized();
  return Response.json({ status: 200, edge: true });
}`,
  },
  "data-ml": {
    icon: BarChart3,
    subtitle: "Predictive Models & Pipelines",
    codeSnippet: `// LightGBM race prediction feature set
features = ['grid_position', 'telemetry_delta', 'compound_deg']
model = lgb.Booster(model_file='f1_predictor.txt')
predicted_lap_time = model.predict(driver_features)`,
  },
  "databases-devops": {
    icon: Database,
    subtitle: "Cloud DBs, RLS & Deployment",
    codeSnippet: `-- PostgreSQL Row-Level Security Policy
CREATE POLICY "Tenants only access own rooms"
ON public.residents FOR SELECT
USING (auth.uid() = admin_id AND active = true);`,
  },
};

export default function Capabilities() {
  const [selectedCap, setSelectedCap] = useState<string>("ai-systems");

  return (
    <section id="capabilities" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
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
              TECHNICAL ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#F4F4F5] sm:text-4xl lg:text-5xl">
            The full stack,{" "}
            <span className="text-gold-metallic">
              from data to deployment.
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
            Production software requires mastery across every layer: deterministic business rules, autonomous LLM state machines, relational schema guarantees, and edge interfaces.
          </p>
        </motion.div>

        {/* 4-Card Interactive Capability Matrix */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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
                  className={`p-6 border transition-all duration-300 flex flex-col justify-between h-full ${
                    isSelected
                      ? "border-[#E2B36E] bg-[#16171D] shadow-warm-glow"
                      : "border-white/10 bg-[#111217] hover:border-white/20"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="mb-5 flex items-center gap-3 border-b border-white/5 pb-4">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${
                        isSelected
                          ? "border-[#E2B36E] bg-[#E2B36E] text-[#090A0C]"
                          : "border-white/10 bg-[#16171D] text-[#E2B36E]"
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#F4F4F5] leading-snug">
                          {group.title}
                        </h3>
                        <p className="font-mono text-[10px] text-[#71717A]">{meta.subtitle}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <ul className="space-y-2 mb-6" role="list">
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
            >
              <SpotlightCard className="p-6 bg-[#111217] border border-white/10">
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-[#E2B36E]" />
                    <span className="font-mono text-xs font-bold text-[#F4F4F5] uppercase">
                      Code Architecture Example · {capabilities.find((c) => c.id === selectedCap)?.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#10B981]">Synthesizing Real Implementation</span>
                </div>
                <pre className="font-mono text-xs text-[#E4E4E7] overflow-x-auto p-4 rounded-xl bg-[#0B0C0F] border border-white/5 leading-relaxed">
                  <code>{CAP_META[selectedCap].codeSnippet}</code>
                </pre>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
