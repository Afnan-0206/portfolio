"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X, Send, Mail } from "lucide-react";

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
  const [success, setSuccess] = useState(false);

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
  };

  const handleClose = () => {
    setSuccess(false);
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

  const [mailLinks, setMailLinks] = useState({ gmailUrl: "", mailtoUrl: "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(validation).length > 0) {
      return;
    }

    const targetEmail = "brafnan26@gmail.com";
    const subjectText = form.subject.trim() || `Inquiry: ${workshopTitle || "Portfolio"}`;
    const bodyText = `Hi Afnan,\n\n${form.message.trim()}\n\n---\nSender Name: ${form.name.trim()}\nSender Email: ${form.email.trim()}${
      workshopTitle ? `\nTopic: ${workshopTitle}` : ""
    }`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      targetEmail
    )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(bodyText)}`;

    setMailLinks({ gmailUrl, mailtoUrl });

    // Open Gmail directly in a new tab
    const newWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.href = mailtoUrl;
    }

    setSuccess(true);
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
            className="absolute inset-0 bg-[#050817]/80 backdrop-blur-[18px]"
            onClick={handleClose}
            aria-label="Close contact form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#091126] shadow-2xl shadow-cyan-500/10 backdrop-blur-3xl overflow-hidden"
            initial={{ y: 24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#22D3EE]/60 to-transparent" aria-hidden="true" />

            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
                    Contact form
                  </p>
                  <h2
                    id="contact-modal-title"
                    className="mt-3 text-2xl font-bold text-[#F8FAFC] sm:text-3xl"
                  >
                    Send a message
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#8FA2B8]">
                    Reach out with details and I&apos;ll get back to you within one business day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-[#8FA2B8] transition hover:border-[#22D3EE]/40 hover:text-[#F8FAFC]"
                  aria-label="Close contact form"
                >
                  <X size={16} aria-hidden="true" />
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
                    className="flex flex-col items-center gap-4 py-8 text-center"
                    role="status"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#34D399]/30 bg-[#34D399]/10">
                      <CheckCircle size={30} className="text-[#34D399]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#F8FAFC]">Gmail Compose Ready!</p>
                      <p className="mt-1.5 text-xs text-[#8FA2B8] max-w-sm mx-auto leading-relaxed">
                        Your message draft has been generated with all fields filled in. Click <strong className="text-white">Send</strong> in Gmail to deliver it directly to Afnan.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 w-full max-w-xs">
                      <a
                        href={mailLinks.gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-[#050817] transition hover:opacity-90"
                      >
                        <Mail size={14} />
                        <span>Re-open Gmail</span>
                      </a>
                      <a
                        href={mailLinks.mailtoUrl}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] transition hover:bg-white/10"
                      >
                        <span>Default Mail App</span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-2 text-xs text-[#8FA2B8] hover:text-white transition underline"
                    >
                      Close window
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
                      <label className="flex flex-col gap-1.5 text-sm text-[#C7D2E2]">
                        <span className="font-medium">Full Name</span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(event) => handleChange("name", event.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder="Your name"
                          autoComplete="name"
                          className={`w-full rounded-xl border bg-[#050817]/80 px-4 py-3 text-base sm:text-sm text-[#F8FAFC] placeholder-[#4A5568] outline-none transition focus:ring-2 focus:ring-[#22D3EE]/20 ${
                            touched.name && validation.name
                              ? "border-red-500/50 focus:border-red-500/70"
                              : "border-white/10 focus:border-[#22D3EE]/50"
                          }`}
                        />
                        {touched.name && validation.name ? (
                          <p className="text-xs text-red-400">{validation.name}</p>
                        ) : null}
                      </label>
                      <label className="flex flex-col gap-1.5 text-sm text-[#C7D2E2]">
                        <span className="font-medium">Email Address</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) => handleChange("email", event.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="hello@example.com"
                          autoComplete="email"
                          className={`w-full rounded-xl border bg-[#050817]/80 px-4 py-3 text-base sm:text-sm text-[#F8FAFC] placeholder-[#4A5568] outline-none transition focus:ring-2 focus:ring-[#22D3EE]/20 ${
                            touched.email && validation.email
                              ? "border-red-500/50 focus:border-red-500/70"
                              : "border-white/10 focus:border-[#22D3EE]/50"
                          }`}
                        />
                        {touched.email && validation.email ? (
                          <p className="text-xs text-red-400">{validation.email}</p>
                        ) : null}
                      </label>
                    </div>

                    <label className="flex flex-col gap-1.5 text-sm text-[#C7D2E2]">
                      <span className="font-medium">Subject</span>
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
                        className={`w-full rounded-xl border bg-[#050817]/80 px-4 py-3 text-base sm:text-sm text-[#F8FAFC] placeholder-[#4A5568] outline-none transition focus:ring-2 focus:ring-[#22D3EE]/20 ${
                          touched.subject && validation.subject
                            ? "border-red-500/50 focus:border-red-500/70"
                            : "border-white/10 focus:border-[#22D3EE]/50"
                        }`}
                      />
                      {touched.subject && validation.subject ? (
                        <p className="text-xs text-red-400">{validation.subject}</p>
                      ) : null}
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm text-[#C7D2E2]">
                      <span className="font-medium">Message</span>
                      <textarea
                        value={form.message}
                        onChange={(event) => handleChange("message", event.target.value)}
                        onBlur={() => handleBlur("message")}
                        rows={5}
                        placeholder="Tell me about your idea, timeline, or available budget."
                        className={`w-full resize-none rounded-xl border bg-[#050817]/80 px-4 py-3 text-base sm:text-sm text-[#F8FAFC] placeholder-[#4A5568] outline-none transition focus:ring-2 focus:ring-[#22D3EE]/20 ${
                          touched.message && validation.message
                            ? "border-red-500/50 focus:border-red-500/70"
                            : "border-white/10 focus:border-[#22D3EE]/50"
                        }`}
                      />
                      {touched.message && validation.message ? (
                        <p className="text-xs text-red-400">{validation.message}</p>
                      ) : null}
                    </label>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <button
                          type="submit"
                          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] px-7 py-3.5 text-sm font-bold text-[#050817] shadow-lg transition-all duration-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.4)] hover:opacity-90"
                        >
                          <Send size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                          Send via Gmail
                        </button>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#0C1530]/60 px-7 py-3.5 text-sm font-semibold text-[#C7D2E2] transition hover:border-[#22D3EE]/30 hover:text-[#F8FAFC]"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8FA2B8]">
                        Opens directly in Gmail compose with your message pre-filled to send to Afnan
                      </p>
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
