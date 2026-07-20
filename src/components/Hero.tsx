"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

const PROOF_LABELS = [
  "Multi-Agent AI",
  "Full-Stack Products",
  "Machine Learning",
  "Client Systems",
];

export default function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-20 sm:px-8 lg:px-12"
      aria-label="Introduction"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── Left column ── */}
          <div className="space-y-8">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#22D3EE]/20 bg-[#091126]/60 px-4.5 py-2 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#34D399]" />
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-[#22D3EE] uppercase">
                  AI PRODUCT BUILDER · BENGALURU, INDIA
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="space-y-3"
            >
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
                I build{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">
                  AI agents
                </span>{" "}
                and full-stack products that turn complex workflows into usable software.
              </h1>
            </motion.div>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="max-w-xl text-lg leading-8 text-[#C7D2E2]"
            >
              I&apos;m{" "}
              <span className="text-[#F8FAFC] font-semibold">Afnan B.R.</span>, a
              B.Tech CSE (AI/ML) student building multi-agent automation systems,
              client platforms and machine-learning products—from WhatsApp business
              workflows to DevOps incident response.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={scrollToWork}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] px-7 py-4 text-sm font-bold text-[#050817] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              >
                Explore My Work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href="https://github.com/Afnan-0206"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0C1530]/60 px-7 py-4 text-sm font-semibold text-[#F8FAFC] shadow-md transition-all duration-300 hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
              >
                <GithubIcon size={16} />
                View GitHub
              </a>

              <a
                href={`mailto:brafnan26@gmail.com?subject=${encodeURIComponent("Résumé request for Afnan B.R.")}`}
                className="inline-flex items-center text-sm font-semibold text-[#8FA2B8] underline underline-offset-4 transition hover:text-[#22D3EE]"
              >
                Request Résumé
              </a>
            </motion.div>

            {/* Availability badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="text-xs font-medium tracking-wide text-[#8FA2B8]"
            >
              Open to AI/full-stack internships and selected freelance projects
            </motion.p>

            {/* Proof labels */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2.5"
            >
              {PROOF_LABELS.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-[#091126]/60 px-4 py-1.5 font-mono text-xs tracking-wider text-[#C7D2E2] backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — Architecture visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div
              className="relative rounded-[1.5rem] border border-white/10 bg-[#091126]/75 p-6 backdrop-blur-md shadow-card"
              aria-label="System architecture illustration"
              role="img"
            >
              {/* Top bar */}
              <div className="mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
                <span className="h-3 w-3 rounded-full bg-[#EF4444]/80" />
                <span className="h-3 w-3 rounded-full bg-[#F59E0B]/80" />
                <span className="h-3 w-3 rounded-full bg-[#34D399]/80" />
                <span className="ml-3 font-mono text-xs text-[#8FA2B8]">multi-agent pipeline</span>
                <Sparkles size={13} className="ml-auto text-[#22D3EE]/60" aria-hidden="true" />
              </div>

              {/* Pipeline nodes */}
              <div className="space-y-2">
                {[
                  { step: "01", label: "Customer Message", sub: "Unstructured input", color: "#C7D2E2" },
                  { step: "02", label: "Intake Agent",     sub: "Parse & classify",   color: "#22D3EE" },
                  { step: "03", label: "Context Agent",    sub: "Customer lookup",     color: "#22D3EE" },
                  { step: "04", label: "Generation Agent", sub: "Quote & invoice",     color: "#8B5CF6" },
                  { step: "05", label: "Approval Agent",   sub: "Route high-value",    color: "#8B5CF6" },
                  { step: "06", label: "Review Agent",     sub: "Verify output",       color: "#34D399" },
                ].map((node, i) => (
                  <div key={node.step} className="relative flex items-center gap-3">
                    {/* Connector line */}
                    {i < 5 && (
                      <div className="absolute left-[18px] top-8 h-2.5 w-px bg-white/10" aria-hidden="true" />
                    )}
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-xs font-semibold"
                      style={{ color: node.color, borderColor: `${node.color}25` }}
                    >
                      {node.step}
                    </div>
                    <div className="min-w-0 flex-1 rounded-xl border border-white/5 bg-[#0C1530]/80 px-4 py-2.5">
                      <p className="text-xs font-semibold text-[#F8FAFC]">{node.label}</p>
                      <p className="font-mono text-[10px] text-[#8FA2B8]">{node.sub}</p>
                    </div>
                    {i === 5 && (
                      <span className="rounded-full bg-[#34D399]/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#34D399] border border-[#34D399]/20">
                        ✓ Output
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer stat */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-[#0C1530]/50 px-4 py-3">
                <span className="font-mono text-[10px] text-[#8FA2B8]">BizPilot AI — 5-agent pipeline</span>
                <span className="font-mono text-[10px] text-[#34D399] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  live
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
