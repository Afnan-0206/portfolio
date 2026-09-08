"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, MapPin, Award } from "lucide-react";
import { credentials, type Credential } from "@/data/projects";

const TYPE_CONFIG: Record<
  string,
  { label: string; badgeClass: string }
> = {
  summit: {
    label: "Live Summit",
    badgeClass: "border-[#E2B36E]/30 bg-[#E2B36E]/10 text-[#E2B36E]",
  },
  hackathon: {
    label: "Hackathon",
    badgeClass: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  },
  workshop: {
    label: "Workshop",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  certificate: {
    label: "Certificate",
    badgeClass: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  },
};

const CATEGORIES = ["All", "Summit", "Hackathon", "Workshop"] as const;

export default function Credentials() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [previewItem, setPreviewItem] = useState<Credential | null>(null);

  const filtered =
    activeCategory === "All"
      ? credentials
      : credentials.filter((c) => c.type.toLowerCase() === activeCategory.toLowerCase());

  const currentIdx = previewItem
    ? filtered.findIndex((c) => c.id === previewItem.id)
    : -1;

  const closePreview = () => setPreviewItem(null);

  const prevPreview = () => {
    if (currentIdx === -1) return;
    const nextI = (currentIdx + filtered.length - 1) % filtered.length;
    setPreviewItem(filtered[nextI]);
  };

  const nextPreview = () => {
    if (currentIdx === -1) return;
    const nextI = (currentIdx + 1) % filtered.length;
    setPreviewItem(filtered[nextI]);
  };

  return (
    <section id="credentials" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141519] px-3.5 py-1.5 backdrop-blur-md">
              <Award size={13} className="text-[#E2B36E]" />
              <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
                IN THE FIELD &amp; RECOGNITION
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F4F4F5] sm:text-4xl lg:text-5xl leading-[1.15]">
              Live Summits, Hackathons &amp;{" "}
              <span className="text-gold-metallic">Credentials.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
              Hands-on builder moments from co-organizing India&apos;s Premier Agentic AI Conference (AgentsNexus), sprinting at the Bengaluru Tech Week Buildathon, and shipping verified software under intense hackathon deadlines.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#F4F4F5] text-[#090A0C] shadow-md font-bold"
                      : "border border-white/10 bg-[#141519] text-[#A1A1AA] hover:border-white/20 hover:text-[#F4F4F5]"
                  }`}
                >
                  {cat === "All" ? "All Experiences" : `${cat}s`}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Experiences Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((cred, i) => {
              const typeCfg = TYPE_CONFIG[cred.type] || TYPE_CONFIG.certificate;
              return (
                <motion.div
                  key={cred.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative rounded-2xl border border-white/10 bg-[#121316] overflow-hidden shadow-card backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:shadow-card-hover hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  <button
                    type="button"
                    onClick={() => setPreviewItem(cred)}
                    className="relative block h-48 w-full overflow-hidden border-b border-white/5 bg-[#17181D]"
                    aria-label={`View ${cred.title}`}
                  >
                    <Image
                      src={cred.imageUrl}
                      alt={cred.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-70" aria-hidden="true" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${typeCfg.badgeClass}`}>
                        {typeCfg.label}
                      </span>
                    </div>

                    {cred.location && (
                      <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-full bg-[#090A0C]/80 px-2 py-0.5 text-[10px] font-mono text-[#A1A1AA] backdrop-blur-md">
                        <MapPin size={10} className="text-[#E2B36E]" />
                        <span>{cred.location.split(",")[0]}</span>
                      </div>
                    )}
                  </button>

                  {/* Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {cred.role && (
                        <p className="font-mono text-[10px] font-semibold text-[#E2B36E] uppercase tracking-wider mb-1">
                          {cred.role}
                        </p>
                      )}
                      <h3 className="text-base font-bold text-[#F4F4F5] leading-snug">
                        {cred.title}
                      </h3>
                      <div className="space-y-0.5 text-xs text-[#71717A] mt-2 font-medium">
                        <p>{cred.issuer}</p>
                        <p className="text-[11px] text-[#A1A1AA]">{cred.date}</p>
                      </div>
                      {cred.description && (
                        <p className="mt-2.5 text-xs leading-relaxed text-[#A1A1AA] line-clamp-2">
                          {cred.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewItem(cred)}
                      className="pt-3 border-t border-white/5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF] transition"
                    >
                      <ExternalLink size={12} aria-hidden="true" />
                      View High-Res Photo
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modal Lightbox Preview */}
        <AnimatePresence>
          {previewItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0C]/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#121316] p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${TYPE_CONFIG[previewItem.type]?.badgeClass || ""}`}>
                        {TYPE_CONFIG[previewItem.type]?.label || previewItem.type}
                      </span>
                      {previewItem.role && (
                        <span className="font-mono text-xs text-[#E2B36E] font-medium">
                          · {previewItem.role}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-[#F4F4F5] sm:text-xl">
                      {previewItem.title}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      {previewItem.issuer} · {previewItem.date} {previewItem.location ? `· ${previewItem.location}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closePreview}
                    className="rounded-full p-2 text-[#A1A1AA] hover:bg-white/5 hover:text-[#FFFFFF] transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Image Box */}
                <div className="relative flex-1 min-h-[320px] max-h-[480px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#090A0C]">
                  <Image
                    src={previewItem.imageUrl}
                    alt={previewItem.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority
                  />
                </div>

                {previewItem.description && (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#D4D4D8] bg-[#17181D]/60 p-3 rounded-xl border border-white/5">
                    {previewItem.description}
                  </p>
                )}

                {/* Modal Footer Controls */}
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <button
                    type="button"
                    onClick={prevPreview}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-4 py-1.5 text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] hover:border-white/20 transition"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <span className="font-mono text-xs text-[#71717A]">
                    {currentIdx + 1} of {filtered.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextPreview}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17181D] px-4 py-1.5 text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] hover:border-white/20 transition"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
