import type { Metadata } from "next";
import CaseStudyShell from "@/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "F1 Race Strategy AI — Case Study",
  description:
    "A machine-learning system predicting Formula 1 race finishing positions using LightGBM, historical data and time-based cross-validation.",
};

const FEATURES_ENGINEERED = [
  "Driver form (recent race results)",
  "Grid position and qualifying performance",
  "Championship standing context",
  "Track characteristics",
  "Constructor performance",
  "Historical finishing positions",
];

export default function F1CaseStudy() {
  return (
    <CaseStudyShell projectId="f1-race-strategy">

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Project overview</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          F1 Race Strategy AI is a machine-learning system that predicts Formula 1 race
          finishing positions using historical race data. It combines feature engineering,
          time-based cross-validation to prevent data leakage, a LightGBM regression model,
          and a Streamlit interface for exploring race scenarios interactively.
        </p>
      </section>

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">The problem</h2>
        <p className="text-base leading-8 text-[#94A3B8]">
          Predicting race outcomes requires combining driver form, qualifying positions,
          championship context and track characteristics in a way that generalises across
          seasons without leaking future information into the training data—a common mistake
          in time-series sports modelling.
        </p>
      </section>

      <section aria-labelledby="approach-heading">
        <h2 id="approach-heading" className="mb-6 text-xl font-semibold text-[#F8FAFC]">Product approach</h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-5">
            <p className="mb-2 font-mono text-xs text-[#F59E0B]">FEATURE ENGINEERING</p>
            <p className="mb-3 text-sm leading-6 text-[#94A3B8]">
              Raw historical data was enriched with engineered features to capture
              context that a simple finishing-position average would miss:
            </p>
            <ul className="grid gap-1.5 sm:grid-cols-2" role="list">
              {FEATURES_ENGINEERED.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#F59E0B]/60" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-5">
            <p className="mb-2 font-mono text-xs text-[#F59E0B]">TIME-BASED VALIDATION</p>
            <p className="text-sm leading-6 text-[#94A3B8]">
              A time-based train/test split ensures the model is always evaluated on
              races that occurred after its training data—preventing information from
              future seasons from leaking into predictions.
            </p>
          </div>

          <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-5">
            <p className="mb-2 font-mono text-xs text-[#F59E0B]">STREAMLIT INTERFACE</p>
            <p className="text-sm leading-6 text-[#94A3B8]">
              A Streamlit app lets users modify scenario inputs (driver, starting grid,
              track) and see updated predictions, making the model explorable rather
              than a black box.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Technical architecture</h2>
        <div className="rounded-xl border border-[#1E293B] bg-[#0B1018] p-4">
          <ul className="space-y-1.5 text-sm text-[#94A3B8]">
            <li><span className="text-[#F8FAFC] font-medium">Model:</span> LightGBM regression</li>
            <li><span className="text-[#F8FAFC] font-medium">Data processing:</span> Python, Pandas, NumPy</li>
            <li><span className="text-[#F8FAFC] font-medium">Evaluation:</span> Time-based cross-validation, MAE metric</li>
            <li><span className="text-[#F8FAFC] font-medium">Interface:</span> Streamlit scenario explorer</li>
            <li><span className="text-[#F8FAFC] font-medium">Data source:</span> Historical Formula 1 race data</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Challenges &amp; trade-offs</h2>
        <div className="space-y-3 text-base leading-8 text-[#94A3B8]">
          <p>
            <strong className="text-[#F8FAFC]">Data leakage in sports ML.</strong>{" "}
            A naive random split would expose future race outcomes during training.
            Time-based splitting is essential but reduces the effective training size
            for early-season predictions.
          </p>
          <p>
            <strong className="text-[#F8FAFC]">High variance events.</strong>{" "}
            Safety cars, weather changes and mechanical failures cannot be predicted
            from historical data. The model is honest about predicting finishing
            positions under typical conditions.
          </p>
        </div>
      </section>

      <section aria-labelledby="future-heading">
        <h2 id="future-heading" className="mb-4 text-xl font-semibold text-[#F8FAFC]">Honest future improvements</h2>
        <ul className="space-y-2 text-base text-[#94A3B8]" role="list">
          {[
            "Incorporate live qualifying data via Ergast or FastF1 API",
            "Add uncertainty estimation (prediction intervals) so users understand confidence",
            "Experiment with sequence models (LSTM) to capture momentum across race weekends",
            "Deploy as a web application with season-long tracking",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#F59E0B]/60" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

    </CaseStudyShell>
  );
}
