"use client";

import { motion } from "framer-motion";
import { journeySteps } from "@/data/projects";
import { Milestone } from "lucide-react";

export default function Journey() {
  return (
    <section id="journey" className="relative px-4 py-16 sm:px-8 sm:py-24 lg:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-[#141519] px-3.5 py-1.5 shadow-[3px_3px_0px_#000000] backdrop-blur-md mb-3 sm:mb-4">
            <Milestone size={13} className="text-[#E2B36E]" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#E2B36E] uppercase">
              EXPERIENCE &amp; TRAJECTORY
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5]">
            A continuous progression,{" "}
            <span className="text-[#E2B36E]">
              not a static résumé.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
            Each milestone directly compounds on previous systems—from responsive layouts to production-grade multi-agent AI ecosystems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline trace */}
          <div
            className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10 sm:left-[27px]"
            aria-hidden="true"
          />

          <ol className="space-y-4 sm:space-y-6" role="list">
            {journeySteps.map((step, i) => {
              const isLast = i === journeySteps.length - 1;
              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative pl-11 sm:pl-16"
                >
                  {/* Step Node Icon */}
                  <div
                    className={`absolute left-0 top-1.5 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all duration-200 border-2 shadow-[2px_2px_0px_#000000] ${
                      isLast
                        ? "border-black bg-[#E2B36E] text-[#090A0C]"
                        : "border-white/15 bg-[#17181D] text-[#A1A1AA]"
                    }`}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </div>

                  {/* Card */}
                  <div
                    className={`relative rounded-2xl border-2 p-4 sm:p-6 backdrop-blur-md transition-all duration-200 hover:border-[#E2B36E] hover:shadow-[6px_6px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                      isLast
                        ? "border-white/20 bg-[#141519] shadow-[5px_5px_0px_#000000]"
                        : "border-white/15 bg-[#121316] shadow-[4px_4px_0px_#000000]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3
                        className={`text-sm sm:text-lg font-bold flex items-center gap-2 ${
                          isLast ? "text-[#F4F4F5]" : "text-[#F4F4F5]"
                        }`}
                      >
                        {step.label}
                      </h3>

                      {isLast && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#10B981]/40 bg-[#10B981]/15 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#10B981] shadow-[2px_2px_0px_#000000]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          ACTIVE FOCUS
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">
                      {step.description}
                    </p>
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
