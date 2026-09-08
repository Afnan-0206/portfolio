"use client";

import { Mail, MapPin, Zap, ArrowUpRight, Cpu } from "lucide-react";
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

const NAV_LINKS = [
  { label: "Work",         href: "/#work" },
  { label: "Network",      href: "/#network" },
  { label: "About",        href: "/#about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Journey",      href: "/#journey" },
  { label: "Credentials",  href: "/#credentials" },
  { label: "Contact",      href: "/#contact" },
];

const TECH_STACK = [
  "Next.js 14",
  "TypeScript",
  "Gemini API",
  "Supabase",
  "LangChain",
  "PostgreSQL",
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#090A0C] overflow-hidden">

      {/* Ambient glow top */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#E2B36E]/40 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[600px] rounded-full bg-[#E2B36E]/4 blur-[80px]" aria-hidden="true" />

      {/* ── CTA Strip ── */}
      <div className="relative px-6 py-10 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-sm font-mono text-[#E2B36E] uppercase tracking-widest">Open to opportunities</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] leading-tight">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-[#FFF1D0] via-[#E2B36E] to-[#C99342] bg-clip-text text-transparent">
                that matters.
              </span>
            </h2>
          </div>
          <a
            href="/#contact"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-[#F4F4F5] px-6 py-3 text-sm font-bold text-[#090A0C] shadow-lg transition hover:bg-[#FFFFFF] hover:shadow-[0_0_30px_rgba(226,179,110,0.3)] flex-shrink-0"
          >
            Start a Conversation
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="relative px-6 pt-14 pb-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-[1.4fr_auto_auto]">

            {/* Brand */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#18191E] shadow-sm">
                  <Image
                    src="/images/afnan-avatar.png"
                    alt="Afnan B.R."
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#F4F4F5] tracking-tight">Afnan B.R.</p>
                  <p className="text-xs text-[#71717A]">AI Product Builder · Full-Stack Developer</p>
                </div>
              </div>

              <p className="max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
                Building autonomous multi-agent pipelines, business platforms, and production ML tools that eliminate operational fatigue.
              </p>

              {/* Status pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/8 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#10B981] uppercase tracking-wider">Available for internships</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                <MapPin size={13} aria-hidden="true" />
                <span>Bengaluru, India</span>
              </div>
            </div>

            {/* Nav links */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-widest text-[#71717A] uppercase">Navigation</p>
              <ul className="space-y-2.5" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        if (typeof window !== "undefined" && window.location.pathname === "/") {
                          e.preventDefault();
                          handleNavClick(href);
                        }
                      }}
                      className="text-sm text-[#A1A1AA] transition hover:text-[#FFFFFF]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social + contact */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-widest text-[#71717A] uppercase">Connect</p>
              <nav aria-label="Footer social links" className="flex flex-col gap-3">
                <a
                  href="https://github.com/Afnan-0206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] transition hover:text-[#FFFFFF]"
                  aria-label="GitHub"
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/afnan-391912363"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] transition hover:text-[#FFFFFF]"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={14} />
                  LinkedIn
                </a>
                <a
                  href="mailto:brafnan26@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] transition hover:text-[#FFFFFF]"
                  aria-label="Email"
                >
                  <Mail size={14} aria-hidden="true" />
                  brafnan26@gmail.com
                </a>
              </nav>
            </div>
          </div>

          {/* Tech Stack strip */}
          <div className="mt-12 mb-8 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <Cpu size={13} className="text-[#E2B36E]" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-widest text-[#71717A] uppercase">Stack</span>
            </div>
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/5 bg-[#111217] px-3 py-1 font-mono text-[10px] text-[#52525B] tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-start gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between text-xs text-[#52525B]">
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-[#E2B36E]" aria-hidden="true" />
              <span>
                Designed &amp; engineered by Afnan B.R. —{" "}
                <span className="text-[#71717A]">every pixel, every agent, every API.</span>
              </span>
            </div>
            <p className="text-[#52525B]">© {year} Afnan B.R. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
