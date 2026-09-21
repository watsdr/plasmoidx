"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import ProtiumPath, { protiumSteps } from "@/components/diagrams/ProtiumPath";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const captions = [
  "Start with water — the working fluid in the inventor narrative.",
  "Bubbles collapse (cavitation). That birth seeds plasmoid energetic vacuum objects (EVOs).",
  "Plasmoid EVOs organize as self-contained donut fields in the swarm.",
  "Contra-rotating (CTR) charge builds — hot outside, cold stream inside.",
  "The swarm harvests protium (¹H), the common form of hydrogen.",
  "Chamber discharge returns work; leftovers trend back toward water.",
] as const;

/** Click steps to walk the path; highlight current. Auto-advance off. */
export default function ProtiumPathLab() {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(() => new Set<number>([0]));
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.protium);
  const finished = visited.size >= protiumSteps.length;
  const current = protiumSteps[step];

  useEffect(() => {
    if (finished) markProgress(PROGRESS.protium);
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
      id="protium-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: walk the protium path
        </p>
        <GotItCheck show={finished || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap a step (or Prev / Next). You drive the path — no auto-advance.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="tablist"
        aria-label="Protium path steps"
      >
        {protiumSteps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={step === i}
            onClick={() => go(i)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-3 py-2.5 text-xs font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none sm:px-3.5 sm:text-sm ${
              step === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ProtiumPath
        activeStep={step}
        captionId={captionId}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-3xl"
      />

      <div className="mt-2" aria-live="polite">
        <p className="font-mono text-xs text-aurora">
          {String(step + 1).padStart(2, "0")} · {current.label}
        </p>
        <p
          id={captionId}
          className="mt-2 max-w-xl text-sm leading-relaxed text-mist-200"
        >
          {captions[step]}
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
          disabled={step === protiumSteps.length - 1}
          onClick={() => go(Math.min(protiumSteps.length - 1, step + 1))}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-aurora px-4 text-sm font-medium text-ink-950 transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
