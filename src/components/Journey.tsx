"use client";

import { motion } from "framer-motion";
import { journeySteps } from "@/data/projects";

export default function Journey() {
  return (
    <section id="journey" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
            JOURNEY
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            A progression, not a résumé list.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-[#22D3EE]/30 via-[#8B5CF6]/30 to-transparent sm:left-[27px]"
            aria-hidden="true"
          />

          <ol className="space-y-8" role="list">
            {journeySteps.map((step, i) => {
              const isLast = i === journeySteps.length - 1;
              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative pl-14 sm:pl-16"
                >
                  {/* Node dot */}
                  <div
                    className={`absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[10px] font-bold shadow-md ${
                      isLast
                        ? "border-[#22D3EE] bg-[#22D3EE]/15 text-[#22D3EE]"
                        : "border-white/10 bg-[#091126] text-[#8FA2B8]"
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="rounded-[1.25rem] border border-white/10 bg-[#091126]/85 p-6 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#22D3EE]/25">
                    <h3 className={`text-base font-bold flex flex-wrap items-center gap-2 ${isLast ? "text-[#22D3EE]" : "text-[#F8FAFC]"}`}>
                      {step.label}
                      {isLast && (
                        <span className="inline-flex items-center rounded-full border border-[#22D3EE]/25 bg-[#22D3EE]/10 px-3 py-0.5 font-mono text-[9px] tracking-widest text-[#22D3EE] font-bold">
                          NOW
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#C7D2E2]">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
