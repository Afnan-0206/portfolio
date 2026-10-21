"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Building2, Mail } from "lucide-react";
import { networkMembers, type NetworkPerson } from "@/data/network";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NetworkPage() {
  const [selectedPerson, setSelectedPerson] = useState<NetworkPerson | null>(null);

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F4F4F5] font-sans selection:bg-white/20">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 sm:mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 bg-[#121316] px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#F4F4F5] shadow-[3px_3px_0px_#000000] hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <ArrowLeft size={14} className="stroke-[2.5]" />
            Back to Portfolio
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-10 sm:mb-16 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 bg-[#141519] px-4 py-1.5 shadow-[3px_3px_0px_#000000] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E2B36E]" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#E2B36E] uppercase">
              FOUNDERS &amp; NETWORK DIRECTORY
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5]">
            Network &amp; <span className="text-[#E2B36E]">Advisory.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
            This page is reserved for founders, CTOs, and technical mentors. All profile slots below are currently staged with blank placeholder frames so you can easily update photos, titles, and collaboration details later.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {networkMembers.map((person, idx) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => setSelectedPerson(person)}
              className="cursor-pointer group relative rounded-2xl border-2 border-white/15 bg-[#121316] p-4 sm:p-6 shadow-[5px_5px_0px_#000000] transition-all duration-200 hover:border-[#E2B36E] hover:shadow-[7px_7px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                {/* Photo Slot */}
                <div className="relative mb-4 sm:mb-5 overflow-hidden rounded-xl border-2 border-white/15 bg-[#17181D] aspect-[4/3] flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                  {person.imageUrl ? (
                    <Image
                      src={person.imageUrl}
                      alt={person.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      quality={75}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Blank Placeholder State */
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-2">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border-2 border-white/15 bg-[#121316] text-[#71717A] group-hover:border-[#E2B36E] group-hover:text-[#E2B36E] shadow-[2px_2px_0px_#000000] transition-colors">
                        <User size={22} strokeWidth={2} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#F4F4F5] tracking-wider uppercase">
                          Photo Blank Frame
                        </p>
                        <p className="text-[10px] text-[#A1A1AA] font-mono">
                          Ready for founder photo
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Information */}
                <div className="space-y-1 mb-2.5 sm:mb-3">
                  <h2 className="text-base sm:text-lg font-extrabold text-[#F4F4F5] tracking-tight group-hover:text-[#FFFFFF]">
                    {person.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                    <span className="font-bold text-[#E4E4E7]">{person.role}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#A1A1AA] font-mono">
                      <Building2 size={12} className="text-[#E2B36E]" />
                      {person.company}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA] mb-4 line-clamp-3">
                  {person.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="border-t-2 border-white/10 pt-3 sm:pt-4 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {person.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border-2 border-white/10 bg-[#17181D] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#D4D4D8] shadow-[2px_2px_0px_#000000]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal / Detail Drawer for Blank Profile */}
        <AnimatePresence>
          {selectedPerson && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#090A0C]/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg rounded-3xl border-2 border-white/20 bg-[#090A0C] p-5 sm:p-8 shadow-[12px_12px_0px_#000000] max-h-[92vh] overflow-y-auto"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 rounded-xl border-2 border-white/20 bg-[#121316] p-2 text-[#F4F4F5] shadow-[2px_2px_0px_#000000] transition-all hover:border-[#E2B36E] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 bg-[#17181D] h-44 sm:h-56 flex items-center justify-center shadow-[3px_3px_0px_#000000]">
                    {selectedPerson.imageUrl ? (
                      <>
                        <Image
                          src={selectedPerson.imageUrl}
                          alt={selectedPerson.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 500px"
                          quality={80}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-60" />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center space-y-2 p-4">
                        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-[#121316] text-[#E2B36E] shadow-[3px_3px_0px_#000000]">
                          <User size={28} />
                        </div>
                        <p className="font-mono text-xs font-bold text-[#F4F4F5] break-words">
                          Profile Page Ready · Update in <code className="text-[#E2B36E]">src/data/network.ts</code>
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#F4F4F5] mt-1">{selectedPerson.name}</h3>
                    <p className="text-xs sm:text-sm font-bold text-[#E2B36E] font-mono">{selectedPerson.role} · {selectedPerson.company}</p>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA] border-t-2 border-white/10 pt-3">
                    {selectedPerson.bio}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4">
                    <a
                      href="mailto:brafnan26@gmail.com"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#E2B36E] px-5 py-2.5 text-xs font-extrabold text-[#090A0C] shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#F0C485] hover:shadow-[4px_4px_0px_#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <Mail size={14} className="stroke-[2.5]" />
                      Connect via Afnan
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedPerson(null)}
                      className="rounded-xl border-2 border-white/15 bg-[#17181D] px-5 py-2.5 text-xs font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] hover:border-white/30 hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
