import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "NammaFix AI — Case Study",
  description:
    "A civic reporting hackathon MVP that uses Gemini to categorise and prioritise citizen-reported local issues with deterministic fallback.",
};

const FLOW = [
  { step: "Submit", desc: "Citizen submits text description and optional photo of a local issue." },
  { step: "Geolocate", desc: "Browser Geolocation API captures the report coordinates automatically." },
  { step: "AI Classify", desc: "Gemini analyses the submission and assigns a category (road, water, waste, etc.)." },
  { step: "Severity", desc: "Gemini assigns a severity level based on issue type and description keywords." },
  { step: "Deduplicate", desc: "System checks for similar existing reports in the area before creating a new one." },
  { step: "Verify", desc: "Community members can upvote or flag reports to confirm their validity." },
  { step: "Dashboard", desc: "Prototype authority dashboard shows aggregated issues by severity and location." },
];

export default function NammaFixCaseStudy() {
  return (
    <CaseStudyShell projectId="nammafix-ai">

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Project overview</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          NammaFix AI is a hackathon MVP and civic tech prototype that turns informal
          citizen-submitted reports about local infrastructure problems into structured,
          AI-categorised and prioritised reports. It was built to demonstrate how AI can
          make civic reporting more actionable without requiring government API integration.
        </p>
        <div className="mt-4 rounded-xl border border-[#EC4899]/20 bg-[#EC4899]/5 p-4">
          <p className="text-sm font-semibold text-[#EC4899]">Important context</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            This is a hackathon MVP and prototype. It is not officially connected to BBMP,
            BWSSB, or any government or municipal authority.
          </p>
        </div>
      </section>

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">The problem</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Citizens often have no structured way to report local infrastructure issues—potholes,
          water leaks, broken streetlights. Reports that do exist arrive through different
          channels, are unorganised, lack priority rankings and are hard to act on at scale.
        </p>
      </section>

      <section aria-labelledby="flow-heading">
        <h2 id="flow-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">
          Reporting flow
        </h2>
        <div className="space-y-2">
          {FLOW.map((f, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#EC4899]/20 font-mono text-xs text-[#EC4899]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">{f.step}</p>
                <p className="mt-0.5 text-sm leading-6 text-[#94A3B8]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Technical architecture</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#EC4899]">Frontend &amp; AI</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>React (JavaScript)</li>
              <li>Google Generative AI (Gemini)</li>
              <li>Browser Geolocation API</li>
              <li>Browser File API (photo upload)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#EC4899]">Reliability</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>Deterministic fallback classification</li>
              <li>Keyword-based severity assignment</li>
              <li>Graceful degradation on API failure</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Challenges &amp; trade-offs</h2>
        <div className="space-y-3 text-base leading-8 text-[#94A3B8]">
          <p>
            <strong className="text-[#F8FAFC]">No official API access.</strong>{" "}
            Without government API integration, the prototype cannot submit reports to
            actual civic systems. The authority dashboard is simulated to demonstrate
            what the output would look like.
          </p>
          <p>
            <strong className="text-[#F8FAFC]">Fallback transparency.</strong>{" "}
            When Gemini is unavailable, the system uses a keyword-based classifier
            and clearly labels the classification source so users know how their
            report was categorised.
          </p>
        </div>
      </section>

      <section aria-labelledby="future-heading">
        <h2 id="future-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Honest future improvements</h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          {[
            "Explore integration with BBMP's open data APIs if/when available",
            "Add SMS-based reporting for users without smartphones",
            "Implement persistent storage with a real database",
            "Build a real authority-facing dashboard with authentication",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#EC4899]/60" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

    </CaseStudyShell>
  );
}
