"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { featuredProjects } from "@/data/projects";
import WorksWheel, { type WorksWheelItem } from "@/components/ui/works-wheel";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

export default function FeaturedWork() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(featuredProjects[0].id);

  // Derive items for WorksWheel component
  const wheelItems: WorksWheelItem[] = featuredProjects.map((project) => ({
    title: project.title,
    image: project.image || `/images/projects/${project.slug}.jpg`,
    href: project.caseStudyUrl || `/work/${project.slug}`,
  }));

  const activeProject = featuredProjects.find((p) => p.id === selectedProjectId) || featuredProjects[0];

  return (
    <section id="work" className="relative px-4 pt-16 sm:pt-24 pb-8 sm:pb-14 sm:px-8 lg:px-12 bg-[#090A0C]">
      <div className="mx-auto max-w-7xl">

        {/* Section Header (Outside the animated stage) */}
        <div className="mb-6 sm:mb-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
                01 / CURATED WORK
              </span>
              <span className="h-px w-8 bg-[#E2B36E]/30" />
            </div>

            <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F5]">
              Featured Engineering Works
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
              A perspective-driven 3D project index covering database transactional isolation checkers,
              LLM capacity planning, token-fair schedulers, and autonomous multi-agent systems.
            </p>
          </motion.div>
        </div>

        {/* 3D WorksWheel Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl border border-white/10 bg-[#0C0D10] shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Subtle atmospheric ambient glow */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[#E2B36E]/5 blur-[120px]" />

          {/* The 3D Wheel */}
          <WorksWheel
            items={wheelItems}
            label="Selected Work"
            action="View case study"
            className="w-full"
          />

          {/* Quick interaction bar at bottom of stage */}
          <div className="relative border-t border-white/5 bg-[#0A0B0E]/80 backdrop-blur-xs px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#71717A]">
            <div className="flex items-center gap-2 font-mono">
              <span className="inline-block size-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Scroll or drag vertically to rotate · Click card to open case study</span>
            </div>
            <div className="flex items-center gap-4 text-[#A1A1AA] font-mono text-[11px]">
              <span>5 Curated Flagship Systems</span>
              <span className="text-[#3F3F46]">|</span>
              <span className="text-[#E2B36E]">3D Perspective Drum</span>
            </div>
          </div>
        </motion.div>

        {/* Technical Architecture & Specs Matrix (Preserves core metrics & direct actions) */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <p className="font-mono text-[11px] font-semibold text-[#E2B36E] uppercase tracking-wider">
                System Deep-Dive &amp; Benchmarks
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F5] mt-0.5">
                Architecture, Metrics &amp; Live Deployments
              </h3>
            </div>

            {/* Project Selector Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl border border-white/5 bg-[#121316]">
              {featuredProjects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                    selectedProjectId === p.id
                      ? "bg-[#E2B36E] text-[#090A0C] font-bold shadow-sm"
                      : "text-[#A1A1AA] hover:text-[#FFFFFF]"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Project Spec Card */}
          <div className="rounded-2xl border border-white/10 bg-[#121316] p-5 sm:p-7 backdrop-blur-sm shadow-card">
            <div className="grid gap-6 lg:grid-cols-12 items-start">

              {/* Left Column: Summary & Problem/Solution */}
              <div className="space-y-4 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
                    {activeProject.category}
                  </span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-[#A1A1AA]">
                    {activeProject.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#F4F4F5]">
                    {activeProject.title}
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">
                    {activeProject.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#71717A] block">Core Problem</span>
                    <p className="text-[#D4D4D8] mt-0.5">{activeProject.problem}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#71717A] block">Engineered Solution</span>
                    <p className="text-[#D4D4D8] mt-0.5">{activeProject.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeProject.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-0.5 font-mono text-[10px] text-[#A1A1AA]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Metrics & Direct Action Links */}
              <div className="space-y-4 lg:col-span-5 flex flex-col justify-between h-full bg-[#17181D]/60 p-4 sm:p-5 rounded-xl border border-white/5">
                <div>
                  <span className="font-mono text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-3">
                    Empirical Metrics &amp; Verification
                  </span>
                  <div className="space-y-2.5">
                    {activeProject.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b border-white/5 pb-2 text-xs"
                      >
                        <span className="text-[#71717A] font-mono text-[11px]">{metric.label}</span>
                        <span className="font-mono font-bold text-[#F4F4F5] text-[11px] text-right">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Links */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-3.5 py-1.5 text-xs font-bold text-[#090A0C] transition hover:bg-[#FFFFFF]"
                    >
                      <ExternalLink size={12} />
                      <span>Live Deployment</span>
                    </a>
                  )}

                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#20222A] px-3.5 py-1.5 text-xs font-semibold text-[#F4F4F5] hover:bg-[#2A2C37] transition"
                  >
                    <GithubIcon size={12} />
                    <span>Source</span>
                  </a>

                  {activeProject.caseStudyUrl && (
                    <Link
                      href={activeProject.caseStudyUrl}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#E2B36E] hover:text-[#FFF] transition"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
