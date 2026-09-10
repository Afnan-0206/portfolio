"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Compass, CheckCircle2, Terminal, Layers, Cpu, GraduationCap, MapPin, Briefcase } from "lucide-react";

const PRINCIPLES = [
  {
    id: "p1",
    title: "Engineer for the Actual Workflow",
    body: "Understand the human friction and operational bottlenecks before writing code. Software should eliminate administrative fatigue rather than introducing new steps.",
    icon: Terminal,
  },
  {
    id: "p2",
    title: "Make AI Transparent & Inspectable",
    body: "Never hide critical business logic behind a black-box prompt. Expose intermediate steps, schema validation, and deterministic fallback mechanisms.",
    icon: Cpu,
  },
  {
    id: "p3",
    title: "Ship Full-Lifecycle Products",
    body: "Row-level database security, edge latency, type safety, and responsive interfaces are core requirements, never afterthoughts.",
    icon: Layers,
  },
];

const HIGHLIGHTS = [
  { label: "Degree & Major", value: "B.Tech CSE (AI/ML)", icon: GraduationCap },
  { label: "Engineering Hub", value: "Bengaluru, India", icon: MapPin },
  { label: "Core Focus", value: "Multi-Agent Pipelines & Full-Stack", icon: Cpu },
  { label: "Availability", value: "Internships & Select Builds", icon: Briefcase },
];

export default function About() {
  return (
    <section id="about" className="relative px-4 py-16 sm:px-8 sm:py-24 lg:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] items-start">

          {/* Left Column: Narrative & Specification Box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141519] px-3.5 py-1.5 backdrop-blur-md">
                <Compass size={13} className="text-[#E2B36E]" />
                <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
                  ENGINEERING PHILOSOPHY
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5] leading-[1.15]">
                Bridging intelligent algorithms with{" "}
                <span className="text-gold-metallic">
                  production systems.
                </span>
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
              <p>
                I&apos;m <span className="text-[#F4F4F5] font-semibold">Afnan B.R.</span>, an AI and full-stack software builder based in Bengaluru. I translate manual processes—from informal customer WhatsApp communications to multi-step developer triage—into resilient, automated software.
              </p>
              <p>
                Rather than treating AI as a superficial feature wrapper, I design end-to-end architectures: multi-agent state machines, deterministic fallback engines, PostgreSQL schemas with Row-Level Security, and snappy Next.js user interfaces.
              </p>
            </div>

            {/* Engineer Profile Specification Box */}
            <div className="rounded-2xl border border-white/10 bg-[#121316] p-4 sm:p-6 shadow-card space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#E2B36E] uppercase">
                  ENGINEER PROFILE SPECIFICATION
                </span>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#10B981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  <span>Verified Data</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {HIGHLIGHTS.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div
                      key={fact.label}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#17181D] p-3 sm:p-3.5 transition-colors hover:border-white/15"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#121316] text-[#E2B36E]">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider text-[#71717A] uppercase">
                          {fact.label}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-[#F4F4F5] mt-0.5 leading-snug">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tenet Box */}
            <div className="rounded-2xl border border-white/10 bg-[#17181D] p-4 sm:p-5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-[#10B981]" />
                <p className="text-sm font-bold text-[#F4F4F5]">Engineering Principle</p>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">
                A great system balances intelligent agent autonomy with strict determinism. When LLM APIs encounter rate limits or latency degradation, the software should degrade gracefully without dropping the user&apos;s request.
              </p>
            </div>
          </motion.div>

          {/* Right Column: In the Field Portrait & Engineering Principles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Real-World Builder Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121316] p-3 sm:p-4 shadow-card group transition-all duration-300 hover:border-white/20">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5 bg-[#17181D]">
                <Image
                  src="/images/afnan-bengaluru-tech-week.jpg"
                  alt="Afnan B.R. at Bengaluru Tech Week"
                  fill
                  className="object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/90 via-transparent to-transparent opacity-70" />
                
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#090A0C]/85 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#E2B36E] uppercase backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E2B36E]" />
                    Bengaluru Tech Week
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#F4F4F5] tracking-tight">Afnan B.R.</p>
                    <p className="text-[10px] sm:text-[11px] text-[#A1A1AA] font-mono mt-0.5">
                      AgentsNexus · Scaler Buildathon
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-semibold text-[#10B981] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Active Builder</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Principles Cards */}
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-[#121316] p-4 sm:p-6 backdrop-blur-sm shadow-card transition-all duration-300 hover:border-white/20"
                >
                  <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-[#17181D] text-[#E2B36E] flex-shrink-0">
                      <Icon size={17} />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#F4F4F5]">{p.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
