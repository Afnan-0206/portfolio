"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("brafnan26@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fallback
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-8 lg:px-12">
      {/* Top divider */}
      <div className="mb-24 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-[1.5rem] border border-white/10 bg-[#091126]/85 p-8 sm:p-12 backdrop-blur-md shadow-card space-y-8"
        >
          <div className="space-y-4">
            <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              LET&apos;S BUILD SOMETHING USEFUL
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl leading-[1.15]">
              Have a workflow that should be automated?
            </h2>
            <p className="mx-auto max-w-xl text-base leading-7 text-[#C7D2E2]">
              I&apos;m open to AI and full-stack internships, hackathon collaborations
              and selected product-development projects.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:brafnan26@gmail.com?subject=${encodeURIComponent("Project or opportunity for Afnan B.R.")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] px-8 py-4 text-sm font-bold text-[#050817] shadow-lg transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Start a Conversation
            </a>
            <a
              href="https://www.linkedin.com/in/afnan-391912363"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#0C1530]/80 px-8 py-4 text-sm font-semibold text-[#C7D2E2] shadow-sm transition hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
            >
              <LinkedinIcon size={15} />
              Connect on LinkedIn
            </a>
          </div>

          {/* Copy email */}
          <div className="flex items-center justify-center gap-2.5 pt-2 border-t border-white/5">
            <span className="font-mono text-sm text-[#C7D2E2]">brafnan26@gmail.com</span>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="rounded-xl border border-white/10 p-2 text-[#8FA2B8] transition hover:border-[#22D3EE]/30 hover:text-[#22D3EE] hover:bg-[#0C1530]/60"
            >
              {copied ? (
                <Check size={14} className="text-[#34D399]" aria-hidden="true" />
              ) : (
                <Copy size={14} aria-hidden="true" />
              )}
            </button>
            {copied && (
              <span className="font-mono text-xs text-[#34D399]" role="status">
                Copied!
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
