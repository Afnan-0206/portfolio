"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Work",         href: "/#work" },
  { label: "Network",      href: "/#network" },
  { label: "About",        href: "/#about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Journey",      href: "/#journey" },
  { label: "Credentials",  href: "/#credentials" },
  { label: "Contact",      href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActive]    = useState<string>("");
  const menuRef                       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["work", "network", "about", "capabilities", "journey", "credentials", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  return (
    <>
      {/* Floating Island Navigation Dock */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none" role="banner">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 rounded-full border border-white/10 bg-[#121316]/85 px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-xl shadow-2xl transition-all duration-300 w-full max-w-5xl ${
            scrolled ? "border-white/15 bg-[#121316]/95 shadow-[0_12px_40px_rgba(0,0,0,0.8)]" : ""
          }`}
          aria-label="Main navigation"
        >
          {/* Brand Monogram */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 sm:gap-3 flex-shrink-0"
            aria-label="Afnan B.R. — back to top"
          >
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#18191E] group-hover:border-[#E2B36E]/60 transition-colors shadow-sm">
              <Image
                src="/images/afnan-avatar.png"
                alt="Afnan B.R."
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight text-[#F4F4F5] group-hover:text-[#FFFFFF]">
                Afnan B.R.
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span className="text-[10px] font-mono text-[#71717A] tracking-wider uppercase">
                  Available
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {NAV_ITEMS.map(({ label, href }) => {
              const id = href.replace("/#", "");
              const isActive = activeSection === id;
              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      if (window.location.pathname === "/") {
                        e.preventDefault();
                        handleNavClick(href);
                      }
                    }}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#F4F4F5]"
                        : "text-[#A1A1AA] hover:text-[#F4F4F5]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill-indicator"
                        className="absolute inset-0 rounded-full bg-[#1A1B20] border border-white/10"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Afnan-0206"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden rounded-full p-2 text-[#A1A1AA] transition hover:bg-white/5 hover:text-[#F4F4F5] sm:flex"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/afnan-391912363"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden rounded-full p-2 text-[#A1A1AA] transition hover:bg-white/5 hover:text-[#F4F4F5] sm:flex"
            >
              <LinkedinIcon size={16} />
            </a>

            <a
              href="/#contact"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("/#contact");
                }
              }}
              className="rounded-full bg-[#F4F4F5] px-3.5 py-1.5 sm:px-4 text-[11px] sm:text-xs font-bold text-[#090A0C] shadow-sm transition hover:bg-[#FFFFFF] hover:shadow-warm-glow flex-shrink-0"
            >
              Let&apos;s Talk
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-full p-2 text-[#A1A1AA] transition hover:bg-white/5 hover:text-[#F4F4F5] lg:hidden flex-shrink-0"
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark backdrop overlay to capture outside taps on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 sm:inset-x-4 top-16 sm:top-20 z-50 rounded-2xl border border-white/10 bg-[#121316]/98 p-5 sm:p-6 backdrop-blur-xl shadow-2xl lg:hidden max-w-md mx-auto max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <ul className="space-y-1" role="list">
                {NAV_ITEMS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => handleNavClick(href)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-[#A1A1AA] transition hover:bg-white/5 hover:text-[#F4F4F5] active:bg-white/10"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-5 sm:mt-6 flex items-center gap-2 border-t border-white/5 pt-4">
                <a
                  href="https://github.com/Afnan-0206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#17181D] py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/afnan-391912363"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#17181D] py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  <LinkedinIcon size={14} />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
