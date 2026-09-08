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

      <main className="pt-32 pb-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-16 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141519] px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E2B36E]" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
              FOUNDERS &amp; NETWORK DIRECTORY
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-[#F4F4F5] sm:text-5xl lg:text-6xl">
            Network &amp; <span className="text-[#E2B36E]">Advisory.</span>
          </h1>

          <p className="text-lg leading-relaxed text-[#A1A1AA]">
            This page is reserved for founders, CTOs, and technical mentors. All profile slots below are currently staged with blank placeholder frames so you can easily update photos, titles, and collaboration details later.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {networkMembers.map((person, idx) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => setSelectedPerson(person)}
              className="cursor-pointer group relative rounded-2xl border border-white/10 bg-[#121316] p-6 backdrop-blur-md shadow-card transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Photo Slot */}
                <div className="relative mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#17181D] aspect-[4/3] flex items-center justify-center">
                  {person.imageUrl ? (
                    <Image
                      src={person.imageUrl}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Blank Placeholder State */
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#121316] text-[#71717A] group-hover:border-[#E2B36E]/40 group-hover:text-[#E2B36E] transition-colors">
                        <User size={24} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[11px] font-semibold text-[#A1A1AA] tracking-wider uppercase">
                          Photo Blank Frame
                        </p>
                        <p className="text-[10px] text-[#71717A]">
                          Ready for founder photo
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Information */}
                <div className="space-y-1 mb-3">
                  <h2 className="text-lg font-bold text-[#F4F4F5] tracking-tight group-hover:text-[#FFFFFF]">
                    {person.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                    <span className="font-medium text-[#E4E4E7]">{person.role}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#71717A]">
                      <Building2 size={12} />
                      {person.company}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[#A1A1AA] mb-4">
                  {person.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="border-t border-white/5 pt-4 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {person.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/5 bg-[#17181D] px-2.5 py-0.5 font-mono text-[10px] text-[#A1A1AA]"
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0C]/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#121316] p-8 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-4 right-4 rounded-full p-2 text-[#A1A1AA] hover:bg-white/5 hover:text-[#FFFFFF]"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#17181D] h-56 flex items-center justify-center">
                    {selectedPerson.imageUrl ? (
                      <>
                        <Image
                          src={selectedPerson.imageUrl}
                          alt={selectedPerson.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-60" />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#121316] text-[#E2B36E]">
                          <User size={28} />
                        </div>
                        <p className="font-mono text-xs text-[#A1A1AA]">
                          Profile Page Ready · Update in <code className="text-[#E2B36E]">src/data/network.ts</code>
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#F4F4F5] mt-1">{selectedPerson.name}</h3>
                    <p className="text-sm font-medium text-[#A1A1AA]">{selectedPerson.role} · {selectedPerson.company}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-[#A1A1AA] border-t border-white/5 pt-3">
                    {selectedPerson.bio}
                  </p>

                  <div className="flex items-center gap-3 pt-4">
                    <a
                      href="mailto:brafnan26@gmail.com"
                      className="inline-flex items-center gap-2 rounded-full bg-[#F4F4F5] px-5 py-2.5 text-xs font-bold text-[#090A0C] hover:bg-[#FFFFFF]"
                    >
                      <Mail size={14} />
                      Connect via Afnan
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedPerson(null)}
                      className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#F4F4F5]"
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
