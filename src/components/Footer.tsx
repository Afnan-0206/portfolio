"use client";

import { Mail } from "lucide-react";

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#050817] px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Brand */}
          <div className="space-y-1">
            <p className="font-semibold text-sm text-[#F8FAFC]">Afnan B.R.</p>
            <p className="text-xs font-semibold text-[#8FA2B8] tracking-wide">
              AI Product Builder &amp; Full-Stack Developer
            </p>
            <p className="text-xs text-[#8FA2B8] font-medium">Bengaluru, India</p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex items-center gap-4">
            <a
              href="https://github.com/Afnan-0206"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full p-2.5 text-[#8FA2B8] transition hover:bg-white/5 hover:text-[#22D3EE]"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/afnan-391912363"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-2.5 text-[#8FA2B8] transition hover:bg-white/5 hover:text-[#22D3EE]"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="mailto:brafnan26@gmail.com"
              aria-label="Email"
              className="rounded-full p-2.5 text-[#8FA2B8] transition hover:bg-white/5 hover:text-[#22D3EE]"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-start gap-2 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8FA2B8] font-medium">
            Designed and built with product thinking, code and curiosity.
          </p>
          <p className="text-xs text-[#8FA2B8] font-medium">
            © {year} Afnan B.R.
          </p>
        </div>
      </div>
    </footer>
  );
}
