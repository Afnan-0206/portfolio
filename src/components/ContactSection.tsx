"use client";

import { useState, useMemo, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  Copy,
  Check,
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

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

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("brafnan26@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const validation = useMemo(() => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) errors.message = "Please write a message.";
    return errors;
  }, [form]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || `Inquiry from Portfolio`,
        message: form.message.trim(),
        workshop: "General Contact",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to send message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please email directly.");
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          
          {/* Left Column: Direct Outreach Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141519] px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span className="font-mono text-xs font-semibold tracking-widest text-[#E2B36E] uppercase">
                  GET IN TOUCH
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#F4F4F5] sm:text-4xl lg:text-5xl leading-[1.15]">
                Let&apos;s build something{" "}
                <span className="text-[#E2B36E]">exceptional.</span>
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
                Whether you have an autonomous multi-agent pipeline in mind, need a full-stack platform built, or have an engineering role to discuss—I&apos;d love to connect.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="rounded-2xl border border-white/10 bg-[#121316] p-6 shadow-card">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                Direct Email
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-base font-semibold text-[#F4F4F5] selection:bg-white/20">
                  brafnan26@gmail.com
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#17181D] px-4 py-2 text-xs font-semibold text-[#F4F4F5] transition hover:border-white/25 hover:bg-[#1D1E24]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#10B981]" />
                      <span className="text-[#10B981]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <a
                href="mailto:brafnan26@gmail.com"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#121316] p-3 text-xs font-semibold text-[#A1A1AA] transition hover:border-white/20 hover:text-[#F4F4F5]"
              >
                <Mail size={14} />
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/afnan-391912363"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#121316] p-3 text-xs font-semibold text-[#A1A1AA] transition hover:border-white/20 hover:text-[#F4F4F5]"
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
              <a
                href="https://github.com/Afnan-0206"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#121316] p-3 text-xs font-semibold text-[#A1A1AA] transition hover:border-white/20 hover:text-[#F4F4F5]"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
            </div>

            {/* Location & Status Pill */}
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#141519]/70 px-4 py-3 text-xs text-[#A1A1AA]">
              <MapPin size={15} className="text-[#E2B36E] flex-shrink-0" />
              <span>Bengaluru, India · Open for internships &amp; select builds · Typically responds within 24h</span>
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-[#121316] p-6 sm:p-8 shadow-card"
          >
            <h3 className="text-xl font-bold text-[#F4F4F5] mb-2">Send a Message</h3>
            <p className="text-xs text-[#A1A1AA] mb-6">Fill in the fields below and I will get back to you directly.</p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-8 text-center space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981] mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-[#F4F4F5]">Message Received</h4>
                  <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto">
                    Thank you for reaching out. I&apos;ve received your note and will reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-[#17181D] px-5 py-2 text-xs font-semibold text-[#F4F4F5] hover:bg-[#1D1E24]"
                  >
                    Send another note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-xs text-[#71717A] mb-1.5 uppercase">
                      Name <span className="text-[#E2B36E]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                      className={`w-full rounded-xl border bg-[#17181D] px-4 py-3 text-sm text-[#F4F4F5] transition focus:outline-none ${
                        touched.name && validation.name
                          ? "border-[#EF4444]/60 focus:border-[#EF4444]"
                          : "border-white/10 focus:border-white/30"
                      }`}
                    />
                    {touched.name && validation.name && (
                      <p className="mt-1 text-xs text-[#EF4444]">{validation.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-xs text-[#71717A] mb-1.5 uppercase">
                      Email <span className="text-[#E2B36E]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                      className={`w-full rounded-xl border bg-[#17181D] px-4 py-3 text-sm text-[#F4F4F5] transition focus:outline-none ${
                        touched.email && validation.email
                          ? "border-[#EF4444]/60 focus:border-[#EF4444]"
                          : "border-white/10 focus:border-white/30"
                      }`}
                    />
                    {touched.email && validation.email && (
                      <p className="mt-1 text-xs text-[#EF4444]">{validation.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-mono text-xs text-[#71717A] mb-1.5 uppercase">
                      Subject (Optional)
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g. AI Workflow Collaboration / Internship"
                      value={form.subject}
                      onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-[#17181D] px-4 py-3 text-sm text-[#F4F4F5] transition focus:border-white/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-xs text-[#71717A] mb-1.5 uppercase">
                      Message <span className="text-[#E2B36E]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell me about your project, idea, or questions..."
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                      className={`w-full rounded-xl border bg-[#17181D] px-4 py-3 text-sm text-[#F4F4F5] transition focus:outline-none resize-none ${
                        touched.message && validation.message
                          ? "border-[#EF4444]/60 focus:border-[#EF4444]"
                          : "border-white/10 focus:border-white/30"
                      }`}
                    />
                    {touched.message && validation.message && (
                      <p className="mt-1 text-xs text-[#EF4444]">{validation.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/10 p-3 text-xs text-[#EF4444]">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F4F4F5] py-3.5 text-xs font-bold text-[#090A0C] shadow-sm transition hover:bg-[#FFFFFF] hover:shadow-warm-glow disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
