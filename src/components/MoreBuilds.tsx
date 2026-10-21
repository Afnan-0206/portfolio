"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { secondaryProjects } from "@/data/projects";

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

export default function MoreBuilds() {
  return (
    <section className="relative px-4 pt-4 pb-16 sm:px-8 sm:pb-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10 max-w-3xl"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
            ADDITIONAL BUILDS &amp; FOCUSED SYSTEMS
          </p>
          <p className="mt-2 text-sm sm:text-base text-[#A1A1AA]">
            Local-first privacy tooling, citation retrieval engines, and full-stack operational platforms.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative rounded-2xl border-2 border-white/15 bg-[#121316] p-5 sm:p-6 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:border-[#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#E2B36E] flex flex-col justify-between"
              aria-label={project.title}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold text-[#E2B36E] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.status && (
                    <span className="rounded-full bg-white/5 border-2 border-white/15 px-2 py-0.5 font-mono text-[9px] text-[#A1A1AA] shadow-[2px_2px_0px_#000000] font-bold">
                      {project.status}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#F4F4F5]">{project.title}</h3>

                <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">{project.description}</p>

                <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs text-[#71717A]">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#A1A1AA] block font-bold">Approach</span>
                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{project.approach}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border-2 border-white/10 bg-[#17181D] px-2.5 py-0.5 font-mono text-[10px] text-[#A1A1AA] shadow-[2px_2px_0px_#000000]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mt-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border-2 border-white/15 bg-[#17181D] px-2.5 py-1 text-xs font-bold text-[#A1A1AA] shadow-[2px_2px_0px_#000000] hover:border-white/30 hover:text-[#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 transition"
                  >
                    <GithubIcon size={12} />
                    <span>Source</span>
                    <ArrowUpRight size={12} />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border-2 border-black bg-[#E2B36E] px-2.5 py-1 text-xs font-extrabold text-[#090A0C] shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#F0C485] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition ml-2"
                    >
                      <ExternalLink size={11} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                {project.caseStudyUrl && (
                  <Link
                    href={project.caseStudyUrl}
                    className="inline-flex items-center gap-1 rounded-lg border-2 border-[#E2B36E]/30 bg-[#17181D] px-2.5 py-1 text-xs font-bold text-[#E2B36E] shadow-[2px_2px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 transition"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight size={11} />
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
