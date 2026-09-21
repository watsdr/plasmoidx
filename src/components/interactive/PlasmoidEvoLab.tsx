"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import PlasmoidEvo from "@/components/diagrams/PlasmoidEvo";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const steps = [
  {
    title: "Water bubble",
    body: "A cavity forms in the fluid — the starting bubble for cavitation.",
  },
  {
    title: "Collapse",
    body: "The bubble collapses inward to a quiet zero-point (cavitation birth).",
  },
  {
    title: "Donut EVO",
    body: "A self-contained toroid field organizes — a plasmoid energetic vacuum object (EVO).",
  },
  {
    title: "Charged field",
    body: "While charging, the donut holds a magnetic bottle; a positive pulse can discharge it.",
  },
] as const;

/** Step-through birth: bubble → collapse → EVO → charged field. */
export default function PlasmoidEvoLab() {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(() => new Set<number>([0]));
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.evo);
  const last = steps.length - 1;
  const current = steps[step];
  const finished = visited.size >= steps.length;

  useEffect(() => {
    if (finished) markProgress(PROGRESS.evo);
  }, [finished]);

  function go(next: number) {
    setStep(next);
    setVisited((prev) => {
      const n = new Set(prev);
      n.add(next);
      return n;
    });
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="evo-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: walk EVO birth
        </p>
        <GotItCheck show={finished || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Step through bubble → collapse → donut → charged field. The diagram
        follows.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="tablist"
        aria-label="EVO birth steps"
      >
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={step === i}
            onClick={() => go(i)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out ${
              step === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      <PlasmoidEvo
        activeStep={step}
        captionId={captionId}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-lg"
      />

      <div className="mt-2" aria-live="polite">
        <p className="font-mono text-xs text-aurora">
          {String(step + 1).padStart(2, "0")} · {current.title}
        </p>
        <p id={captionId} className="mt-2 max-w-xl text-sm leading-relaxed text-mist-200">
          {current.body}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => go(Math.max(0, step - 1))}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-mist-300/25 px-4 text-sm text-mist-100 transition-colors duration-200 ease-out hover:border-aurora/45 hover:text-aurora disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={step === last}
          onClick={() => go(Math.min(last, step + 1))}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-aurora px-4 text-sm font-medium text-ink-950 transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
