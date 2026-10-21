"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CertificateItem {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  thumbnail: string;
  fullImage: string;
  certificate: string;
  certificateIssuer: string;
  certificateDate: string;
}

interface CertificatePreviewModalProps {
  open: boolean;
  item: CertificateItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CertificatePreviewModal({ open, item, onClose, onNext, onPrev }: CertificatePreviewModalProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) {
      setZoomed(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onNext, onPrev]);

  if (!item) return null;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/90 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative mx-4 w-full max-w-6xl rounded-3xl border-2 border-white/20 bg-[#090A0C] p-6 sm:p-8 shadow-[10px_10px_0px_#000000] backdrop-blur-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-[#E2B36E] via-[#F4F4F5] to-[#E2B36E] opacity-90" />
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="lg:flex-1 lg:min-w-[320px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#E2B36E]">Certificate preview</p>
                    <h3 className="mt-3 text-2xl font-extrabold text-[#F4F4F5] sm:text-3xl">{item.certificate}</h3>
                    <p className="mt-2 font-mono text-xs text-[#A1A1AA]">
                      {item.certificateIssuer} • Issued {item.certificateDate}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white/20 bg-[#121316] text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    aria-label="Close certificate preview"
                  >
                    <X className="h-5 w-5 stroke-[2.5]" />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setZoomed((state) => !state)}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 bg-[#121316] px-4 py-2.5 text-xs font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <Eye className="h-4 w-4 text-[#E2B36E]" />
                    {zoomed ? "Zoom Out" : "Zoom In"}
                  </button>
                  <a
                    href={item.fullImage}
                    download
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-[#E2B36E] px-4 py-2.5 text-xs font-extrabold text-[#090A0C] shadow-[3px_3px_0px_#FFFFFF] transition-all hover:bg-[#F0C485] hover:shadow-[4px_4px_0px_#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <Download className="h-4 w-4 stroke-[2.5]" />
                    Download
                  </a>
                  <a
                    href={item.fullImage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 bg-[#17181D] px-4 py-2.5 text-xs font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    View Credential
                  </a>
                </div>
              </div>

              <div className="relative lg:flex-1">
                <motion.div
                  className="relative overflow-hidden rounded-2xl border-2 border-white/20 bg-[#111217] shadow-[6px_6px_0px_#000000]"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.img
                    src={item.fullImage}
                    alt={item.certificate}
                    className="aspect-[4/3] w-full object-contain bg-[#090A0C]"
                    initial={{ scale: 1 }}
                    animate={{ scale: zoomed ? 1.12 : 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
                    onClick={() => setZoomed((state) => !state)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#090A0C]/10 to-[#090A0C]/80" />
                </motion.div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-[#71717A]">Swipe down or press ESC to close</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white/15 bg-[#121316] text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      aria-label="Previous certificate"
                    >
                      <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white/15 bg-[#121316] text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      aria-label="Next certificate"
                    >
                      <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
