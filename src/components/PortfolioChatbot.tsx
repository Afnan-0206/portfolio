"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { MorphOrb } from "./ui/ai-thinking-orb-and-input";
import { answerPortfolioQuestion } from "@/lib/portfolio-qa";

const SUGGESTION_CHIPS = [
  "Explain IsoCheck",
  "What is InferLoad?",
  "Tell me about my AI projects",
  "What technologies do you use?",
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [externalPrompt, setExternalPrompt] = useState("");

  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Toggle open/closed state
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (launcherRef.current) {
      launcherRef.current.focus();
    }
  }, []);

  // Keyboard accessibility: Escape key closes panel
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Click outside panel closes it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        launcherRef.current &&
        !launcherRef.current.contains(target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  // Manage focus when panel opens
  useEffect(() => {
    if (isOpen) {
      // Focus close button or first interactable element smoothly
      const timer = setTimeout(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // QA callback function connected to MorphOrb
  const handleAskQuestion = async (query: string): Promise<string> => {
    const result = answerPortfolioQuestion(query);

    let finalResponse = result.answer;
    if (result.suggestedLinks && result.suggestedLinks.length > 0) {
      finalResponse += "\n\n**Helpful Links:**\n";
      for (const link of result.suggestedLinks) {
        finalResponse += `- [${link.label}](${link.url})\n`;
      }
    }

    return finalResponse;
  };

  const handleSelectChip = (chipText: string) => {
    setExternalPrompt(chipText);
  };

  const handleOrbReset = () => {
    setExternalPrompt("");
  };

  return (
    <>
      {/* ── Fixed Floating Launcher ──
          Positioned tightly at bottom-5 right-4 (sm:bottom-6 sm:right-6),
          docked in the bottom-right corner with the Back-to-Top button beside it.
      */}
      <button
        ref={launcherRef}
        type="button"
        onClick={handleToggle}
        className={`fixed z-[60] flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2B36E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090B] ${
          isOpen
            ? "bottom-5 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 border border-white/20 bg-[#121316] text-[#A1A1AA] hover:text-[#FFFFFF] hover:border-white/40 shadow-xl"
            : "bottom-5 right-4 sm:bottom-6 sm:right-6 h-14 w-14 sm:h-16 sm:w-16 border-2 border-[#E2B36E]/60 bg-[#090A0C] hover:border-[#E2B36E] hover:scale-105 shadow-[0_0_30px_rgba(226,179,110,0.35)] p-1 group"
        }`}
        aria-label={isOpen ? "Close AI portfolio assistant" : "Open AI portfolio assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <div className="relative flex items-center justify-center h-full w-full">
            <div className="relative h-full w-full rounded-full overflow-hidden border border-[#E2B36E]/40 shadow-[inset_0_0_12px_rgba(226,179,110,0.3)]">
              <Image
                src="/images/ai-orb-logo.jpg"
                alt="Afnan's AI Assistant"
                fill
                sizes="64px"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-115"
              />
            </div>
            {/* Subtle pulsing live indicator bead */}
            <span
              className="absolute -top-0.5 -right-0.5 flex h-3 w-3"
              aria-hidden="true"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2B36E] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E2B36E] border-2 border-[#090A0C]" />
            </span>
          </div>
        )}
      </button>

      {/* ── Floating Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={panelRef}
            key="portfolio-chat-panel"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-chatbot-title"
            aria-describedby="portfolio-chatbot-subtitle"
            className="fixed z-[65] flex flex-col bg-[#090A0C]/95 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(226,179,110,0.15)] overflow-hidden
              /* Mobile bounds */
              inset-x-3 bottom-[76px] max-h-[calc(100vh-92px)] h-[520px]
              /* Desktop bounds */
              sm:inset-x-auto sm:right-6 sm:bottom-[84px] sm:w-[410px] sm:h-[560px] sm:max-h-[calc(100vh-104px)]"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0F1014]/90">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[#E2B36E]/40 bg-[#15171D] shadow-[0_0_12px_rgba(226,179,110,0.3)] shrink-0">
                  <Image
                    src="/images/ai-orb-logo.jpg"
                    alt="AI Assistant Logo"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2
                    id="portfolio-chatbot-title"
                    className="text-sm font-semibold text-[#F4F4F5] tracking-tight leading-tight"
                  >
                    Afnan&apos;s AI Assistant
                  </h2>
                  <p
                    id="portfolio-chatbot-subtitle"
                    className="text-[11px] text-[#A1A1AA] leading-tight"
                  >
                    Ask me about my work
                  </p>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={handleClose}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2B36E]"
                aria-label="Close assistant"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </header>

            {/* Scrollable Panel Body with Fixed Bottom Input */}
            <div className="flex-1 min-h-0 flex flex-col p-4 overflow-hidden">
              <MorphOrb
                onSubmit={handleAskQuestion}
                minThinkMs={2400}
                speed={1}
                placeholder="Ask about my projects..."
                externalSubmitText={externalPrompt}
                onReset={handleOrbReset}
                className="w-full h-full"
              >
                {/* Welcome State & Suggestions rendered inside MorphOrb's content area */}
                <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#121316]/80 p-3 mb-3.5 shadow-sm">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#E2B36E]/40 shrink-0 shadow-[0_0_15px_rgba(226,179,110,0.3)]">
                    <Image
                      src="/images/ai-orb-logo.jpg"
                      alt="AI Assistant Logo"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#F4F4F5] leading-snug">
                      Hey! Curious about one of my projects or technical decisions?
                    </p>
                    <p className="text-[11px] text-[#A1A1AA] leading-snug mt-0.5">
                      Ask about IsoCheck, InferLoad, FairLane, tech stack, or architecture.
                    </p>
                  </div>
                </div>

                {/* Suggestion Chips */}
                <div className="space-y-1.5 mb-2">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#71717A] px-1">
                    Quick suggestions
                  </p>
                  <div className="mo-chips-grid">
                    {SUGGESTION_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleSelectChip(chip)}
                        className="mo-chip"
                        aria-label={`Ask: ${chip}`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </MorphOrb>

              {/* Footer Trust Indicator */}
              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#71717A] shrink-0">
                <span>Verified Portfolio Metadata</span>
                <span className="font-mono text-[#E2B36E]/70">Bengaluru · C++ / Python / TS</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
