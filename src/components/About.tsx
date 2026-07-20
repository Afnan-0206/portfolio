"use client";

import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    id: "p1",
    title: "Build for the workflow",
    body: "Understand what the user currently does before designing the software. The best tools reduce friction, not just add features.",
  },
  {
    id: "p2",
    title: "Make AI inspectable",
    body: "Show the reasoning pipeline, validation steps and fallback behaviour instead of hiding everything behind one button.",
  },
  {
    id: "p3",
    title: "Ship the complete experience",
    body: "Treat deployment, responsiveness, empty states, errors and documentation as part of the product—not afterthoughts.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
                ABOUT
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl leading-[1.15]">
                Building at the intersection of AI, software and real-world operations.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#C7D2E2]">
              <p>
                I&apos;m <span className="text-[#F8FAFC] font-semibold">Afnan B.R.</span>, a
                B.Tech Computer Science student specialising in AI and machine learning.
                I enjoy taking practical problems—manual business administration,
                incident response, property operations or public reporting—and turning
                them into structured digital products.
              </p>
              <p>
                My strongest work combines a polished interface with the system
                underneath it: APIs, databases, AI workflows, validation, fallback
                logic and deployment. I care about more than making interfaces look
                good. I build the workflow behind them.
              </p>
            </div>

            {/* Introductory statement */}
            <blockquote className="relative border-l-3 border-[#22D3EE] pl-6 py-1">
              <p className="text-xl font-bold leading-9 text-[#F8FAFC]">
                I care about more than making interfaces look good. I build the
                workflow behind them—data, automation, AI reasoning, validation and
                the final user experience.
              </p>
            </blockquote>
          </motion.div>

          {/* Right: principles */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="font-mono text-[9px] tracking-widest text-[#8FA2B8] uppercase">PRINCIPLES</p>
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="rounded-[1.25rem] border border-white/10 bg-[#091126]/85 p-6 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#22D3EE]/20"
              >
                <p className="mb-2 font-mono text-xs font-bold tracking-widest text-[#22D3EE]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2.5 text-base font-bold text-[#F8FAFC]">{p.title}</h3>
                <p className="text-sm leading-6 text-[#C7D2E2]">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
