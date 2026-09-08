"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiments } from "@/data/projects";

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

export default function MoreBuilds() {
  return (
    <section className="relative px-6 pt-4 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
            ADDITIONAL BUILDS &amp; EXPERIMENTS
          </p>
          <p className="mt-2 text-sm text-[#A1A1AA]">Technical tools, utility libraries, and focused explorations.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {experiments.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative rounded-2xl border border-white/10 bg-[#121316] p-6 backdrop-blur-sm shadow-card transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between"
              aria-label={exp.title}
            >
              <div>
                <h3 className="mb-2 text-base font-bold text-[#F4F4F5]">{exp.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#A1A1AA]">{exp.description}</p>
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-0.5 font-mono text-[10px] text-[#A1A1AA]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-auto">
                <a
                  href={exp.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF] transition"
                >
                  <GithubIcon size={12} />
                  <span>View Repository</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
