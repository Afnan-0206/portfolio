"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProjects, allProjects } from "@/data/projects";
import { useEffect, useState } from "react";

function GithubIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
      setShowTop(scrolled > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="scroll-progress pointer-events-none"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Reading progress"
      />
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-50 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 border-white/20 bg-[#121316] text-[#FFFFFF] shadow-[4px_4px_0px_#000000] backdrop-blur-md transition-all duration-200 hover:border-[#E2B36E] hover:shadow-[4px_4px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Back to top"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

interface CaseStudyShellProps {
  projectId: string;
  children: React.ReactNode;
}

export default function CaseStudyShell({ projectId, children }: CaseStudyShellProps) {
  // If the project is in featuredProjects, navigate circularly within featuredProjects.
  // Otherwise, use allProjects.
  const isFeatured = featuredProjects.some((p) => p.id === projectId);
  const activeList = isFeatured ? featuredProjects : allProjects;
  const idx = activeList.findIndex((p) => p.id === projectId);
  const project = activeList[idx] || allProjects.find((p) => p.id === projectId);
  const prev = activeList[idx > 0 ? idx - 1 : activeList.length - 1];
  const next = activeList[(idx + 1) % activeList.length];

  if (!project) return null;

  const shortDescription = "shortDesc" in project ? project.shortDesc : project.description;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090A0C] font-sans noise text-[#A1A1AA]">
      
      <ScrollProgressBar />

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 border-b-2 border-white/15 bg-[#090A0C]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border-2 border-white/15 bg-[#121316] px-3.5 py-1.5 text-xs font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span><span className="hidden sm:inline">Back to Selected </span>Work</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#E2B36E] px-3.5 py-1.5 sm:px-4 text-xs font-extrabold text-[#090A0C] shadow-[3px_3px_0px_#FFFFFF] transition-all hover:bg-[#F0C485] hover:shadow-[4px_4px_0px_#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <ExternalLink size={12} aria-hidden="true" />
                <span className="hidden xs:inline">Live </span>Demo
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border-2 border-white/20 bg-[#17181D] px-3.5 py-1.5 sm:px-4 text-xs font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <GithubIcon size={12} />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border-2 border-[#E2B36E]/40 bg-[#E2B36E]/10 px-3 py-1 font-mono text-xs font-extrabold tracking-widest text-[#E2B36E] uppercase shadow-[2px_2px_0px_#000000]">
              {project.category}
            </span>
            {"status" in project && project.status && (
              <span className="rounded-lg border-2 border-white/15 bg-[#17181D] px-3 py-1 font-mono text-[10px] font-bold text-[#D4D4D8] uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5] leading-tight">
            {project.title}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
            {shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border-2 border-white/15 bg-[#121316] px-3 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#D4D4D8] shadow-[2px_2px_0px_#000000] hover:border-[#E2B36E] hover:shadow-[2px_2px_0px_#E2B36E] transition-all"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-12 sm:mb-16 h-0.5 w-full bg-white/10" aria-hidden="true" />

        {/* Dynamic Inner Case Study Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose-custom space-y-12 sm:space-y-16"
        >
          {children}
        </motion.div>
      </main>

      {/* Prev / Next navigation */}
      <nav
        className="relative z-10 border-t-2 border-white/15 px-4 py-12 sm:px-6 sm:py-16"
        aria-label="Case study navigation"
      >
        <div className="mx-auto flex max-w-4xl flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex w-full sm:max-w-[45%] flex-col gap-1.5 sm:gap-2 rounded-2xl border-2 border-white/15 bg-[#121316] p-4 sm:p-5 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:border-[#E2B36E] hover:shadow-[6px_6px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#E2B36E] uppercase font-bold tracking-wider">
              <ArrowLeft size={12} aria-hidden="true" /> Previous Case Study
            </span>
            <span className="text-sm sm:text-base font-bold text-[#F4F4F5] transition group-hover:text-[#E2B36E] leading-snug">
              {prev.title}
            </span>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="group flex w-full sm:max-w-[45%] flex-col items-start sm:items-end gap-1.5 sm:gap-2 rounded-2xl border-2 border-white/15 bg-[#121316] p-4 sm:p-5 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:border-[#E2B36E] hover:shadow-[6px_6px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#E2B36E] uppercase font-bold tracking-wider">
              Next Case Study <ArrowRight size={12} aria-hidden="true" />
            </span>
            <span className="text-sm sm:text-base font-bold text-[#F4F4F5] transition group-hover:text-[#E2B36E] leading-snug text-left sm:text-right">
              {next.title}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
