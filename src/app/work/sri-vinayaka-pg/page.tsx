import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "Sri Vinayaka PG — Case Study",
  description:
    "A unified PG accommodation platform with a public website and full operational management dashboard, backed by Supabase with row-level security.",
};

const MODULES = [
  { name: "Rooms Management", desc: "Track room status: available, occupied or under maintenance. Assign rooms to residents." },
  { name: "Residents Management", desc: "Check-ins, check-outs, status tracking (active, notice period, left), ID documents and emergency contacts." },
  { name: "Rent Tracking Ledger", desc: "Log UPI and cash transactions, flag overdue payments and view payment history." },
  { name: "Enquiry Pipeline", desc: "Track new enquiries through contacted to converted stages." },
  { name: "Visit Scheduling", desc: "Log and manage property visit requests from prospective residents." },
  { name: "Analytics Dashboard", desc: "Occupancy rates, revenue trends and activity summaries at a glance." },
  { name: "Audit Logs", desc: "Automated database triggers record every INSERT, UPDATE and DELETE with timestamp and user." },
  { name: "Public Website Editor", desc: "Edit rooms, facilities and gallery content that appears on the live public site in real time." },
];

export default function SriVinayakaCaseStudy() {
  return (
    <CaseStudyShell projectId="sri-vinayaka-pg">

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Project overview</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Sri Vinayaka PG is a complete accommodation management platform built as a real
          client product. It combines a public-facing website showing room availability,
          facilities and gallery with a private admin dashboard for day-to-day PG operations.
          The system eliminates disconnected notebooks, spreadsheets and chat threads.
        </p>
      </section>

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">The problem</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          PG owners typically track residents in notebooks, rent in spreadsheets, enquiries
          through WhatsApp, and publish room availability manually or not at all. There is
          no consolidated view, no audit trail and no reliable way to know which rooms are
          available or which rent payments are overdue.
        </p>
      </section>

      <section aria-labelledby="users-heading">
        <h2 id="users-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Intended users</h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          {["PG owner needing a single operational dashboard", "Admin staff managing day-to-day check-ins and payments", "Prospective residents browsing available rooms on the public site"].map((u) => (
            <li key={u} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]/60" aria-hidden="true" />
              {u}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">Product modules</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((m, i) => (
            <div key={i} className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
              <p className="mb-1 text-sm font-semibold text-[#F8FAFC]">{m.name}</p>
              <p className="text-sm leading-6 text-[#94A3B8]">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Technical architecture</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#8B5CF6]">Frontend</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>React 19 + TypeScript</li>
              <li>Vite 8</li>
              <li>Tailwind CSS v4</li>
              <li>React Router DOM v7</li>
              <li>Recharts for analytics</li>
              <li>Framer Motion</li>
              <li>Zod for validation</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
            <p className="mb-2 font-mono text-xs text-[#8B5CF6]">Backend / Database</p>
            <ul className="space-y-1 text-sm text-[#94A3B8]">
              <li>Supabase (PostgreSQL)</li>
              <li>Row-Level Security policies</li>
              <li>Database triggers for audit logs</li>
              <li>Supabase Auth for admin access</li>
              <li>Real-time subscriptions</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Challenges &amp; trade-offs</h2>
        <div className="space-y-3 text-base leading-8 text-[#94A3B8]">
          <p>
            <strong className="text-[#F8FAFC]">Two audiences, one codebase.</strong>{" "}
            The public site and admin dashboard share the same Supabase project.
            Row-level security ensures public visitors can only read non-sensitive data,
            while admin operations require authenticated sessions.
          </p>
          <p>
            <strong className="text-[#F8FAFC]">Audit integrity without an audit service.</strong>{" "}
            Rather than a separate logging microservice, all audit entries are written by
            database triggers—ensuring no application-level code can bypass them.
          </p>
        </div>
      </section>

      <section aria-labelledby="future-heading">
        <h2 id="future-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Honest future improvements</h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          {[
            "Add UPI payment integration for automated rent confirmation",
            "Send automated rent-due reminders via email or WhatsApp",
            "Add a resident-facing portal for submitting maintenance requests",
            "Build mobile app for owner with push notifications on new enquiries",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8B5CF6]/60" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

    </CaseStudyShell>
  );
}
