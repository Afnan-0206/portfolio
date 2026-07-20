import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "AutoFix AI — Case Study",
  description:
    "A six-agent DevOps incident-response system using Anthropic API that researches errors, validates fixes and generates technical incident reports.",
};

const AGENTS = [
  { name: "Manager Agent",    desc: "Creates a structured investigation plan when an incident is reported." },
  { name: "Researcher Agent", desc: "Searches documentation, Stack Overflow and GitHub issues for relevant solutions." },
  { name: "Analyst Agent",    desc: "Evaluates the found solutions and selects the most applicable one." },
  { name: "Tester Agent",     desc: "Validates the proposed solution against the error context. Returns pass or fail with reasoning." },
  { name: "Writer Agent",     desc: "Produces a structured incident report including root cause, solution and action steps." },
  { name: "Action Agent",     desc: "Drafts external communication (status update) and pull-request description content." },
];

export default function AutoFixCaseStudy() {
  return (
    <CaseStudyShell projectId="autofix-ai">

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Project overview</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          AutoFix AI is an autonomous DevOps incident-response system built with six
          specialised AI agents orchestrated over a Node.js + Express backend. When an
          error or incident is reported, the agents collaborate to investigate, select and
          validate a fix, then produce a complete incident report and communication draft.
        </p>
      </section>

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">The problem</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Debugging a production incident requires searching documentation and forums,
          evaluating multiple candidate fixes, validating the chosen fix, writing an incident
          report and drafting stakeholder communication—each step consuming engineering time
          that could be redirected to prevention.
        </p>
      </section>

      <section aria-labelledby="agents-heading">
        <h2 id="agents-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">Six-agent pipeline</h2>
        <div className="space-y-3">
          {AGENTS.map((a, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#34D399]/20 font-mono text-xs text-[#34D399]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">{a.name}</p>
                <p className="mt-0.5 text-sm leading-6 text-[#94A3B8]">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Self-correction loop */}
        <div className="mt-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-4">
          <p className="text-sm font-semibold text-[#F59E0B]">Self-correction loop</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            When the Tester Agent rejects a solution, its failure reasoning is fed back to
            the Researcher Agent, which searches for an alternative. The cycle continues
            until a valid solution is found or the attempt limit is reached.
          </p>
        </div>
      </section>

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Technical architecture</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#34D399]">Frontend</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>React (Vite)</li>
              <li>Real-time agent status updates</li>
              <li>Incident report viewer</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#34D399]">Backend</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>Node.js + Express</li>
              <li>Anthropic API (Claude)</li>
              <li>Agent orchestration logic</li>
              <li>Structured output parsing</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Challenges &amp; trade-offs</h2>
        <div className="space-y-3 text-base leading-8 text-[#94A3B8]">
          <p>
            <strong className="text-[#F8FAFC]">Termination condition.</strong>{" "}
            Without a bounded retry limit, a self-correcting agent loop can run indefinitely.
            The system limits correction iterations and falls back to a best-effort report
            if no valid fix is found within the budget.
          </p>
          <p>
            <strong className="text-[#F8FAFC]">No live deployment.</strong>{" "}
            AutoFix AI requires API keys for the Anthropic service and is intended to run
            locally or on a private server. There is no publicly accessible deployment.
          </p>
        </div>
      </section>

      <section aria-labelledby="future-heading">
        <h2 id="future-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Honest future improvements</h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          {[
            "Add tool-use so the Researcher Agent can execute safe read-only terminal commands",
            "Connect to real monitoring alerts (e.g., PagerDuty, Prometheus) as input sources",
            "Store incident history for pattern analysis across repeated failures",
            "Add configurable retry budget and escalation thresholds",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#34D399]/60" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

    </CaseStudyShell>
  );
}
