"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Work",        href: "#work" },
  { label: "About",       href: "#about" },
  { label: "Capabilities",href: "#capabilities" },
  { label: "Journey",     href: "#journey" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActive]    = useState<string>("");
  const menuRef                       = useRef<HTMLDivElement>(null);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050817]/80 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3"
            aria-label="Afnan B.R. — back to top"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] text-sm font-bold text-[#050817] shadow-lg">
              AB
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-[#F8FAFC]">
                Afnan B.R.
              </span>
              <span className="text-[10px] tracking-widest text-[#8FA2B8] uppercase">
                AI Product Builder
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1.5 lg:flex" role="list">
            {NAV_ITEMS.map(({ label, href }) => {
              const id      = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(href)}
                    className={`relative rounded-full px-4.5 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#22D3EE]"
                        : "text-[#C7D2E2] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Afnan-0206"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden rounded-full p-2.5 text-[#C7D2E2] transition hover:bg-white/5 hover:text-[#22D3EE] lg:flex"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/afnan-391912363"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden rounded-full p-2.5 text-[#C7D2E2] transition hover:bg-white/5 hover:text-[#22D3EE] lg:flex"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:brafnan26@gmail.com?subject=${encodeURIComponent("Project or opportunity for Afnan B.R.")}`}
              className="hidden rounded-full bg-gradient-to-r from-[#22D3EE]/10 to-[#8B5CF6]/10 border border-[#22D3EE]/30 px-6 py-2.5 text-sm font-semibold text-[#22D3EE] shadow-md transition-all duration-300 hover:from-[#22D3EE] hover:to-[#8B5CF6] hover:text-[#050817] hover:border-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] lg:inline-flex"
            >
              Let's Talk
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-full p-2.5 text-[#C7D2E2] transition hover:bg-white/5 hover:text-[#F8FAFC] lg:hidden"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 z-40 border-b border-white/10 bg-[#050817]/95 px-6 py-8 backdrop-blur-lg lg:hidden"
          >
            <ul className="space-y-1.5" role="list">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(href)}
                    className="w-full rounded-xl px-4 py-3.5 text-left text-base font-semibold text-[#C7D2E2] transition hover:bg-[#22D3EE]/10 hover:text-[#22D3EE]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <a
                href="https://github.com/Afnan-0206"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#091126]/60 px-4 py-3 text-sm font-medium text-[#C7D2E2] transition hover:border-[#22D3EE]/30 hover:text-[#22D3EE]"
              >
                <GithubIcon size={18} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/afnan-391912363"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#091126]/60 px-4 py-3 text-sm font-medium text-[#C7D2E2] transition hover:border-[#22D3EE]/30 hover:text-[#22D3EE]"
              >
                <LinkedinIcon size={18} />
                LinkedIn
              </a>
              <a
                href={`mailto:brafnan26@gmail.com?subject=${encodeURIComponent("Project or opportunity for Afnan B.R.")}`}
                className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] px-4 py-3 text-sm font-semibold text-[#050817] shadow-md"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
