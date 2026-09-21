"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import NestedSpheres from "@/components/diagrams/NestedSpheres";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useReducedMotion } from "@/lib/useReducedMotion";

const layers = [
  {
    title: "Outer",
    body: "Large outer sphere (cutaway shell) — the resonator cavity wall.",
  },
  {
    title: "Inner",
    body: "Smaller inner sphere — one tornado spin (clockwise cue in the teaching model).",
  },
  {
    title: "Core",
    body: "Tiny central core — opposing spin (counter-clockwise) with a calm zero-plane between.",
  },
  {
    title: "Exhaust in",
    body: "Angled inlet feeds the cavity (exhaust feedback / carburetor-in stub).",
  },
] as const;

/** Interactive nested CTR spheres with contra-rotation when motion is allowed. */
export default function NestedSpheresLab() {
  const [layer, setLayer] = useState(0);
  const [used, setUsed] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.nestedspheres);
  const reduced = useReducedMotion();
  const current = layers[layer];

  useEffect(() => {
    if (used) markProgress(PROGRESS.nestedspheres);
  }, [used]);

  function pick(i: number) {
    setLayer(i);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="nested-spheres-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: nested CTR spheres
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap a layer. When motion is allowed, outer and inner rings turn opposite
        ways; exhaust-in soft-cues. Reduced motion freezes to the final frame —
        steps still work.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Nested sphere layers"
      >
        {layers.map((l, i) => (
          <button
            key={l.title}
            type="button"
            aria-pressed={layer === i}
            onClick={() => pick(i)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              layer === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {l.title}
          </button>
        ))}
      </div>

      <NestedSpheres
        idPrefix="nested-lab"
        hideCaption
        animate={!reduced}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-xl"
      />
      <p
        id={captionId}
        className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        <span className="font-medium text-mist-100">{current.title}.</span>{" "}
        {current.body}
      </p>
    </div>
  );
}
