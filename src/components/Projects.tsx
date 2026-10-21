"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

interface CardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121316] p-6 hover:border-white/20 transition-all duration-300"
    >
      <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-mono text-[10px] font-bold text-[#E2B36E] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-[#A1A1AA]">
              {project.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#F4F4F5] mb-2">{project.title}</h3>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{project.shortDesc}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#17181D] border border-white/5 text-[#A1A1AA]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF] transition"
          >
            <GithubIcon size={12} />
            <span>Repository</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#E2B36E] hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="relative px-4 py-16 sm:px-8 sm:py-24 lg:px-12 bg-[#090A0C]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-[#E2B36E]">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Systems engineering, empirical LLM benchmarks, and reliable agentic architectures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
