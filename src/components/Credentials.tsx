"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { credentials } from "@/data/projects";

const INITIAL_VISIBLE = 4;

const TYPE_LABELS: Record<string, string> = {
  hackathon: "Hackathon",
  workshop:  "Workshop",
  certificate: "Certificate",
};

const TYPE_COLORS: Record<string, string> = {
  hackathon:   "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]",
  workshop:    "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#8B5CF6]",
  certificate: "border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]",
};

export default function Credentials() {
  const [showAll, setShowAll]         = useState(false);
  const [previewIdx, setPreviewIdx]   = useState<number | null>(null);

  const visible = showAll ? credentials : credentials.slice(0, INITIAL_VISIBLE);

  const closePreview = () => setPreviewIdx(null);
  const prevPreview  = () =>
    setPreviewIdx((i) => (i === null ? null : (i + credentials.length - 1) % credentials.length));
  const nextPreview  = () =>
    setPreviewIdx((i) => (i === null ? null : (i + 1) % credentials.length));

  return (
    <section id="credentials" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
            CREDENTIALS
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Hackathons &amp; workshops.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#C7D2E2]">
            Product-building experiences from live hackathons and hands-on AI workshops.
            Certificates are secondary to the projects they inspired.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((cred, i) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative rounded-[1.25rem] border border-white/10 bg-[#091126]/85 overflow-hidden shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#22D3EE]/25 hover:shadow-card"
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => setPreviewIdx(credentials.indexOf(cred))}
                className="relative block h-44 w-full overflow-hidden border-b border-white/5"
                aria-label={`View ${cred.title} certificate`}
              >
                <Image
                  src={cred.imageUrl}
                  alt={`${cred.title} certificate`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091126] to-transparent opacity-80" aria-hidden="true" />
              </button>

              {/* Content */}
              <div className="p-5 space-y-3.5">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider ${
                    TYPE_COLORS[cred.type]
                  }`}
                >
                  {TYPE_LABELS[cred.type]}
                </span>
                <h3 className="text-base font-bold text-[#F8FAFC] leading-snug">{cred.title}</h3>
                <div className="space-y-1 text-xs text-[#8FA2B8] font-medium">
                  <p>{cred.issuer}</p>
                  <p>Issued {cred.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewIdx(credentials.indexOf(cred))}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#22D3EE] hover:underline underline-offset-4"
                >
                  <ExternalLink size={12} aria-hidden="true" />
                  View Credential
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {credentials.length > INITIAL_VISIBLE && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full border border-white/10 bg-[#0C1530]/60 px-7 py-3 text-sm font-semibold text-[#F8FAFC] shadow-md transition hover:border-[#22D3EE]/30 hover:bg-[#0C1530]"
            >
              {showAll ? "Show Fewer Credentials" : "View All Credentials"}
            </button>
          </div>
        )}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              className="absolute inset-0 bg-[#050817]/90 backdrop-blur-md"
              onClick={closePreview}
              aria-label="Close preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-10 w-full max-w-2xl rounded-[1.5rem] border border-white/10 bg-[#091126] overflow-hidden shadow-card"
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Image */}
              <div className="relative h-80 w-full sm:h-[420px] bg-[#050817]/50 p-4">
                <Image
                  src={credentials[previewIdx].imageUrl}
                  alt={`${credentials[previewIdx].title} certificate`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 672px"
                />
              </div>
              {/* Info */}
              <div className="flex items-center justify-between border-t border-white/5 bg-[#091126] px-6 py-5">
                <div>
                  <p className="text-base font-bold text-[#F8FAFC]">
                    {credentials[previewIdx].title}
                  </p>
                  <p className="text-xs font-semibold text-[#8FA2B8] mt-1">
                    {credentials[previewIdx].issuer} · Issued {credentials[previewIdx].date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevPreview}
                    className="rounded-full border border-white/10 p-2 text-[#C7D2E2] transition hover:bg-white/5 hover:text-[#22D3EE]"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPreview}
                    className="rounded-full border border-white/10 p-2 text-[#C7D2E2] transition hover:bg-white/5 hover:text-[#22D3EE]"
                    aria-label="Next certificate"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={closePreview}
                    className="ml-1 rounded-full border border-white/10 p-2 text-[#C7D2E2] transition hover:bg-white/5 hover:text-[#EF4444]"
                    aria-label="Close"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
