"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { featuredProjects } from "@/data/projects";

function GithubIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

interface CaseStudyShellProps {
  projectId: string;
  children: React.ReactNode;
}

export default function CaseStudyShell({ projectId, children }: CaseStudyShellProps) {
  const idx     = featuredProjects.findIndex((p) => p.id === projectId);
  const project = featuredProjects[idx];
  const prev    = featuredProjects[idx > 0 ? idx - 1 : featuredProjects.length - 1];
  const next    = featuredProjects[(idx + 1) % featuredProjects.length];

  if (!project) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050817] font-sans noise text-[#C7D2E2]">
      
      {/* Dynamic ambient background spotlights */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050817]" aria-hidden="true">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#22D3EE]/4 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/4 blur-[100px]" />
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050817]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8FA2B8] transition hover:text-[#22D3EE]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Work
          </Link>
          <div className="flex items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#22D3EE] px-4 py-2 text-xs font-bold text-[#050817] shadow-sm transition hover:bg-[#67E8F9]"
              >
                <ExternalLink size={11} aria-hidden="true" />
                Live Demo
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0C1530]/80 px-4 py-2 text-xs font-semibold text-[#F8FAFC] transition hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
            >
              <GithubIcon size={11} />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 space-y-5"
        >
          <p className="font-mono text-xs font-bold tracking-widest text-[#22D3EE] uppercase">
            {project.category}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-5xl leading-tight">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#C7D2E2]">
            {project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/5 bg-[#091126] px-3.5 py-1.5 font-mono text-xs text-[#C7D2E2]"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Inner Case Study Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose-custom space-y-16"
        >
          {children}
        </motion.div>
      </main>

      {/* Prev / Next navigation */}
      <nav
        className="relative z-10 border-t border-white/10 px-6 py-16"
        aria-label="Case study navigation"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex max-w-[45%] flex-col gap-2 rounded-[1.25rem] border border-white/10 bg-[#091126]/80 p-5 shadow-sm transition-all duration-300 hover:border-[#22D3EE]/30"
          >
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#8FA2B8] uppercase font-bold">
              <ArrowLeft size={11} aria-hidden="true" /> Previous
            </span>
            <span className="text-sm font-bold text-[#C7D2E2] transition group-hover:text-[#F8FAFC] leading-snug">
              {prev.title}
            </span>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="group flex max-w-[45%] flex-col items-end gap-2 rounded-[1.25rem] border border-white/10 bg-[#091126]/80 p-5 shadow-sm transition-all duration-300 hover:border-[#22D3EE]/30"
          >
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#8FA2B8] uppercase font-bold">
              Next <ArrowRight size={11} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold text-[#C7D2E2] transition group-hover:text-[#F8FAFC] leading-snug">
              {next.title}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
