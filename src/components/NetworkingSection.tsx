"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users2, ArrowUpRight, User, Building2, UploadCloud } from "lucide-react";
import { networkMembers } from "@/data/network";
import SpotlightCard from "@/components/SpotlightCard";

export default function NetworkingSection() {
  const [previewPhotos, setPreviewPhotos] = useState<Record<string, string>>({});

  const handleSimulatedUpload = (personId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewPhotos((prev) => ({ ...prev, [personId]: url }));
    }
  };

  return (
    <section id="network" className="relative px-4 py-16 sm:px-8 sm:py-24 lg:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 bg-[#141519] px-4 py-1.5 shadow-[3px_3px_0px_#000000] backdrop-blur-md">
              <Users2 size={13} className="text-[#E2B36E]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#E2B36E] uppercase">
                NETWORK &amp; COLLABORATORS
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4F5] leading-[1.15]">
              Network &amp;{" "}
              <span className="text-gold-metallic">Collaborators.</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#A1A1AA]">
              Engineering leaders, builders, and collaborators I exchange ideas with across AI summits, hackathons, and production systems.
            </p>
          </motion.div>
        </div>

        {/* Network Spotlight Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {networkMembers.map((person, i) => {
              const livePhoto = previewPhotos[person.id] || person.imageUrl;

              return (
                <motion.div
                  key={person.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                >
                  <SpotlightCard className="p-4 sm:p-6 bg-[#111217] border-2 border-white/15 rounded-2xl shadow-[5px_5px_0px_#000000] hover:border-[#E2B36E] hover:shadow-[7px_7px_0px_#E2B36E] transition-all flex flex-col justify-between h-full">
                    <div>
                      {/* Photo Frame Container */}
                      <div className="relative mb-4 sm:mb-5 overflow-hidden rounded-xl border-2 border-white/15 bg-[#16171D] aspect-[4/3] flex items-center justify-center group/photo shadow-[3px_3px_0px_#000000]">
                        {livePhoto ? (
                          <>
                            <Image
                              src={livePhoto}
                              alt={person.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                              quality={75}
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111217] via-transparent to-transparent opacity-60" />
                          </>
                        ) : (
                          /* Blank wireframe state with instant upload test */
                          <div className="flex flex-col items-center justify-center p-4 sm:p-5 text-center space-y-2">
                            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border-2 border-white/15 bg-[#111217] text-[#71717A] group-hover:border-[#E2B36E] group-hover:text-[#E2B36E] shadow-[2px_2px_0px_#000000] transition-colors">
                              <User size={20} strokeWidth={2} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#F4F4F5] uppercase tracking-wider">
                                Photo Slot
                              </p>
                              <p className="text-[9px] sm:text-[10px] text-[#A1A1AA] font-mono">
                                Drop image in <code className="text-[#E2B36E]">/public/network/</code>
                              </p>
                            </div>

                            {/* In-Browser Test Upload Trigger */}
                            <label className="mt-1 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#E2B36E]/40 bg-[#141519] px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#E2B36E] shadow-[2px_2px_0px_#000000] hover:bg-[#1E1F27] hover:border-[#E2B36E] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all">
                              <UploadCloud size={11} />
                              <span>Test Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleSimulatedUpload(person.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1 mb-3">
                        <h3 className="text-base sm:text-lg font-extrabold text-[#F4F4F5] tracking-tight">
                          {person.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#A1A1AA]">
                          <span className="font-bold text-[#E4E4E7]">{person.role}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-[#A1A1AA] font-mono">
                            <Building2 size={12} className="text-[#E2B36E]" />
                            {person.company}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA] mb-4">
                        {person.bio}
                      </p>
                    </div>

                    {/* Tags & Action */}
                    <div className="border-t-2 border-white/10 pt-3 sm:pt-4 mt-auto">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {person.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border-2 border-white/10 bg-[#16171D] px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-[#D4D4D8] shadow-[2px_2px_0px_#000000]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/network"
                          className="inline-flex items-center gap-1.5 rounded-lg border-2 border-white/15 bg-[#17181D] px-3 py-1 font-mono text-xs font-bold text-[#E2B36E] shadow-[2px_2px_0px_#000000] hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ml-auto sm:ml-0"
                        >
                          <span>Profile</span>
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Directory CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpotlightCard className="mt-8 sm:mt-12 p-5 sm:p-8 bg-[#111217] border-2 border-white/15 rounded-2xl shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-extrabold text-[#F4F4F5]">Looking to connect or collaborate?</h4>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">
                I actively collaborate with technical founders and builders on AI workflows, agents, and full-stack software.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Link
                href="/network"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-[#16171D] px-5 py-2.5 text-xs font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:text-[#FFFFFF] hover:shadow-[4px_4px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                View Full Directory
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#E2B36E] px-5 py-2.5 text-xs font-extrabold text-[#090A0C] shadow-[3px_3px_0px_#FFFFFF] transition-all hover:bg-[#F0C485] hover:shadow-[4px_4px_0px_#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Get In Touch
              </a>
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  );
}
