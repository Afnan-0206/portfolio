"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CheckCircle, XCircle, X, Send } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  workshopTitle?: string | null;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactModal({ open, onClose, workshopTitle }: ContactModalProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(() => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) {
      errors.name = "Full name is required.";
    }
    if (!form.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!form.subject.trim()) {
      errors.subject = "Subject is required.";
    }
    if (!form.message.trim()) {
      errors.message = "Message is required.";
    }
    return errors;
  }, [form]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const resetForm = () => {
    setForm(initialState);
    setTouched({});
    setError(null);
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(validation).length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          workshop: workshopTitle || "General inquiry",
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const errorMessage = body?.error || "Unable to send message right now.";
        throw new Error(errorMessage);
      }

      setSuccess(true);
      resetForm();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#090A0C]/85 backdrop-blur-md"
            onClick={handleClose}
            aria-label="Close contact form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-3xl border-2 border-white/20 bg-[#090A0C] shadow-[12px_12px_0px_#000000] overflow-hidden"
            initial={{ y: 24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Top accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#E2B36E] via-[#F4F4F5] to-[#E2B36E]" aria-hidden="true" />

            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="font-mono text-xs font-bold tracking-widest text-[#E2B36E] uppercase">
                    Contact form
                  </p>
                  <h2
                    id="contact-modal-title"
                    className="mt-3 text-2xl font-extrabold text-[#F4F4F5] sm:text-3xl"
                  >
                    Send a message
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#A1A1AA]">
                    Reach out with details and I&apos;ll get back to you within one business day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-shrink-0 rounded-xl border-2 border-white/20 bg-[#121316] p-2.5 text-[#F4F4F5] shadow-[2px_2px_0px_#000000] transition-all hover:border-[#E2B36E] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  aria-label="Close contact form"
                >
                  <X size={16} className="stroke-[2.5]" aria-hidden="true" />
                </button>
              </div>

              {/* Success state */}
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="flex flex-col items-center gap-5 py-12 text-center"
                    role="status"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#10B981]/40 bg-[#10B981]/10 shadow-[4px_4px_0px_#000000]">
                      <CheckCircle size={32} className="text-[#10B981]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-[#F4F4F5]">Message sent successfully!</p>
                      <p className="mt-1.5 text-sm text-[#A1A1AA]">
                        I&apos;ll review it and get back to you within one business day.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-2 rounded-xl border-2 border-black bg-[#E2B36E] px-7 py-3 text-sm font-extrabold text-[#090A0C] shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#F0C485] hover:shadow-[4px_4px_0px_#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-1.5 text-sm text-[#F4F4F5]">
                        <span className="font-bold font-mono text-xs text-[#E4E4E7] uppercase tracking-wider">Full Name</span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(event) => handleChange("name", event.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder="Your name"
                          autoComplete="name"
                          className={`w-full rounded-xl border-2 bg-[#121316] px-4 py-3 text-base sm:text-sm text-[#F4F4F5] placeholder-[#52525B] outline-none shadow-[2px_2px_0px_#000000] transition-all focus:border-[#E2B36E] focus:shadow-[4px_4px_0px_#E2B36E] ${
                            touched.name && validation.name
                              ? "border-red-500 focus:border-red-500"
                              : "border-white/15 focus:border-[#E2B36E]"
                          }`}
                        />
                        {touched.name && validation.name ? (
                          <p className="text-xs font-mono text-red-400 font-semibold">{validation.name}</p>
                        ) : null}
                      </label>
                      <label className="flex flex-col gap-1.5 text-sm text-[#F4F4F5]">
                        <span className="font-bold font-mono text-xs text-[#E4E4E7] uppercase tracking-wider">Email Address</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) => handleChange("email", event.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="hello@example.com"
                          autoComplete="email"
                          className={`w-full rounded-xl border-2 bg-[#121316] px-4 py-3 text-base sm:text-sm text-[#F4F4F5] placeholder-[#52525B] outline-none shadow-[2px_2px_0px_#000000] transition-all focus:border-[#E2B36E] focus:shadow-[4px_4px_0px_#E2B36E] ${
                            touched.email && validation.email
                              ? "border-red-500 focus:border-red-500"
                              : "border-white/15 focus:border-[#E2B36E]"
                          }`}
                        />
                        {touched.email && validation.email ? (
                          <p className="text-xs font-mono text-red-400 font-semibold">{validation.email}</p>
                        ) : null}
                      </label>
                    </div>

                    <label className="flex flex-col gap-1.5 text-sm text-[#F4F4F5]">
                      <span className="font-bold font-mono text-xs text-[#E4E4E7] uppercase tracking-wider">Subject</span>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(event) => handleChange("subject", event.target.value)}
                        onBlur={() => handleBlur("subject")}
                        placeholder={
                          workshopTitle
                            ? `Inquiry about ${workshopTitle}`
                            : "Project, collaboration or question"
                        }
                        className={`w-full rounded-xl border-2 bg-[#121316] px-4 py-3 text-base sm:text-sm text-[#F4F4F5] placeholder-[#52525B] outline-none shadow-[2px_2px_0px_#000000] transition-all focus:border-[#E2B36E] focus:shadow-[4px_4px_0px_#E2B36E] ${
                          touched.subject && validation.subject
                            ? "border-red-500 focus:border-red-500"
                            : "border-white/15 focus:border-[#E2B36E]"
                        }`}
                      />
                      {touched.subject && validation.subject ? (
                        <p className="text-xs font-mono text-red-400 font-semibold">{validation.subject}</p>
                      ) : null}
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm text-[#F4F4F5]">
                      <span className="font-bold font-mono text-xs text-[#E4E4E7] uppercase tracking-wider">Message</span>
                      <textarea
                        value={form.message}
                        onChange={(event) => handleChange("message", event.target.value)}
                        onBlur={() => handleBlur("message")}
                        rows={5}
                        placeholder="Tell me about your idea, timeline, or available budget."
                        className={`w-full resize-none rounded-xl border-2 bg-[#121316] px-4 py-3 text-base sm:text-sm text-[#F4F4F5] placeholder-[#52525B] outline-none shadow-[2px_2px_0px_#000000] transition-all focus:border-[#E2B36E] focus:shadow-[4px_4px_0px_#E2B36E] ${
                          touched.message && validation.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-white/15 focus:border-[#E2B36E]"
                        }`}
                      />
                      {touched.message && validation.message ? (
                        <p className="text-xs font-mono text-red-400 font-semibold">{validation.message}</p>
                      ) : null}
                    </label>

                    {/* Error banner */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex flex-col gap-2 rounded-xl border-2 border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300 shadow-[3px_3px_0px_#000000]"
                          role="alert"
                        >
                          <div className="flex items-start gap-3">
                            <XCircle size={16} className="mt-0.5 flex-shrink-0 text-red-400" aria-hidden="true" />
                            <span>{error}</span>
                          </div>
                          <a
                            href={`mailto:brafnan26@gmail.com?subject=${encodeURIComponent(
                              form.subject.trim() || `Inquiry from ${form.name.trim() || "Portfolio"}`
                            )}&body=${encodeURIComponent(
                              `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`
                            )}`}
                            className="ml-7 inline-flex items-center gap-1.5 font-bold text-[#E2B36E] hover:underline text-xs"
                          >
                            Click here to open pre-filled in your email app &rarr;
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#E2B36E] px-7 py-3.5 text-sm font-extrabold text-[#090A0C] shadow-[4px_4px_0px_#FFFFFF] transition-all hover:bg-[#F0C485] hover:shadow-[6px_6px_0px_#FFFFFF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#090A0C] border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 stroke-[2.5]" aria-hidden="true" />
                            Send Message
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="inline-flex items-center justify-center rounded-xl border-2 border-white/15 bg-[#17181D] px-7 py-3.5 text-sm font-bold text-[#F4F4F5] shadow-[3px_3px_0px_#000000] transition-all hover:border-[#E2B36E] hover:shadow-[3px_3px_0px_#E2B36E] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
