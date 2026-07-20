"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/data/projects";

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-28 sm:px-8 lg:px-12">
      {/* Subtle divider top */}
      <div className="mb-24 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
            CAPABILITIES
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            The full stack, from data to deployment.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-[1.25rem] border border-white/10 bg-[#091126]/85 p-6 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#22D3EE]/25"
            >
              <h3 className="mb-5 text-base font-bold text-[#F8FAFC] border-b border-white/5 pb-3">
                {group.title}
              </h3>
              <ul className="space-y-3" role="list">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-[#C7D2E2]"
                  >
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
