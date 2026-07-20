import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "BizPilot AI — Case Study",
  description:
    "How a five-agent pipeline turns unstructured WhatsApp-style messages into verified business quotations, invoices and multilingual replies.",
};

const PIPELINE = [
  { id: "intake",      name: "Intake Agent",      desc: "Parses unstructured customer message, extracts intent and quantities." },
  { id: "context",     name: "Context Agent",      desc: "Looks up customer history to determine if loyalty discount applies." },
  { id: "generation",  name: "Generation Agent",   desc: "Calculates pricing, GST and generates quotation and invoice content." },
  { id: "approval",    name: "Approval Agent",     desc: "Routes orders above ₹12,000 to owner for manual confirmation." },
  { id: "review",      name: "Review Agent",       desc: "Cross-checks calculated prices against pricing rules before output." },
];

const FEATURES = [
  "Quote and invoice generation",
  "Pricing rule verification",
  "Approval routing for high-value orders",
  "Professional PDF export via jsPDF",
  "WhatsApp-ready sharing via wa.me prefilled links",
  "Multilingual replies (English, Kannada, Hindi)",
  "Returning-customer loyalty discount (5 % off)",
  "Rule-based fallback when Gemini API is unavailable",
  "Responsive mobile-first interface",
];

export default function BizPilotCaseStudy() {
  return (
    <CaseStudyShell projectId="bizpilot">

      {/* 1. Overview */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Project overview
        </h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          BizPilot AI is a multi-agent business copilot designed for small service businesses
          that receive customer enquiries informally—through WhatsApp, phone notes or chat.
          The system converts those unstructured messages into professional quotations, invoices
          and multilingual replies through a five-agent transparent pipeline.
        </p>
      </section>

      {/* 2. Problem */}
      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">The problem</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Small service businesses—caterers, tailors, repair shops—frequently receive requests
          like <em className="text-[#94A3B8]">"mujhe 3 saree blouse chahiye, price kya hai?"</em> and
          manually calculate pricing, GST, prepare a quotation PDF, and write a reply—every time.
          This creates delays, inconsistencies and errors under volume.
        </p>
      </section>

      {/* 3. Intended users */}
      <section aria-labelledby="users-heading">
        <h2 id="users-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Intended users</h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#22D3EE]/60" aria-hidden="true" />
            Small service business owners handling quote requests manually
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#22D3EE]/60" aria-hidden="true" />
            Solo operators who need to respond in the customer&apos;s language
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#22D3EE]/60" aria-hidden="true" />
            Businesses with returning customers who should receive loyalty discounts automatically
          </li>
        </ul>
      </section>

      {/* 4. Agent pipeline */}
      <section aria-labelledby="pipeline-heading">
        <h2 id="pipeline-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          System pipeline
        </h2>
        <div className="space-y-3">
          {PIPELINE.map((agent, i) => (
            <div
              key={agent.id}
              className="flex items-start gap-4 rounded-xl border border-[#1E293B] bg-[#0B1018] p-4"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#22D3EE]/20 font-mono text-xs text-[#22D3EE]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">{agent.name}</p>
                <p className="mt-0.5 text-sm leading-6 text-[#94A3B8]">{agent.desc}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-[#34D399]/20 bg-[#34D399]/5 p-4">
            <p className="text-sm font-semibold text-[#34D399]">✓ Verified output</p>
            <p className="mt-0.5 text-sm text-[#94A3B8]">
              PDF quotation or invoice + WhatsApp-ready prefilled message + multilingual reply
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#475569]">
          Note: WhatsApp sharing uses <code className="font-mono text-xs">wa.me</code> prefilled
          links. The product does not currently integrate directly with the WhatsApp Business API.
        </p>
      </section>

      {/* 5. Key features */}
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Key features</h2>
        <ul className="grid gap-2 sm:grid-cols-2" role="list">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-[#94A3B8]">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#22D3EE]/60" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Technical architecture */}
      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Technical architecture
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#22D3EE]">Frontend</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>React 19 + Vite</li>
              <li>Tailwind CSS v4</li>
              <li>Lucide React icons</li>
              <li>jsPDF for document export</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#22D3EE]">Backend</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>Node.js + Express</li>
              <li>Google Generative AI (Gemini 2.5 Flash)</li>
              <li>Anthropic SDK (Claude) — secondary</li>
              <li>Rule-based fallback engine</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Challenges */}
      <section aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Challenges &amp; trade-offs
        </h2>
        <div className="space-y-3 text-base leading-8 text-[#94A3B8]">
          <p>
            <strong className="text-[#F8FAFC]">Keeping the pipeline visible.</strong>{" "}
            Hiding all AI reasoning behind a single button makes it harder for
            business owners to trust the output. The design exposes each agent&apos;s step
            so the owner can audit what happened.
          </p>
          <p>
            <strong className="text-[#F8FAFC]">Fallback reliability.</strong>{" "}
            If the Gemini API is down, the business should still be able to generate a
            quotation. A rule-based engine handles price calculation deterministically
            when the LLM is unavailable.
          </p>
          <p>
            <strong className="text-[#F8FAFC]">WhatsApp integration.</strong>{" "}
            Full WhatsApp Business API integration requires business verification.
            The current implementation uses wa.me prefilled links, which work
            immediately without registration.
          </p>
        </div>
      </section>

      {/* 8. Future improvements */}
      <section aria-labelledby="future-heading">
        <h2 id="future-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">
          Honest future improvements
        </h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]/60" aria-hidden="true" />
            Integrate real WhatsApp Business API with proper business verification
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]/60" aria-hidden="true" />
            Add persistent customer database (currently session-scoped)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]/60" aria-hidden="true" />
            Support voice-note transcription for businesses using audio messages
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]/60" aria-hidden="true" />
            Add more regional language support beyond Kannada, Hindi and English
          </li>
        </ul>
      </section>

    </CaseStudyShell>
  );
}
