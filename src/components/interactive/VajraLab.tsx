"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import VajraQuadrature from "@/components/diagrams/VajraQuadrature";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useReducedMotion } from "@/lib/useReducedMotion";

const tiers = [
  {
    title: "Both tiers",
    body: "Base and upper cone tiers interlock in cross-plus (X+) quadrature — opposing geometry, not busy ornament.",
    highlight: null as number | null,
  },
  {
    title: "Base tier",
    body: "Four cones on the lower tier point outward in a cross-plus arrangement.",
    highlight: 0,
  },
  {
    title: "Upper tier",
    body: "Four cones align above, matching the base tier; a soft upward cue marks the gun axis.",
    highlight: 1,
  },
] as const;

const STEP_MS = 2600;

/** Light step-through / pulse on vajra quadrature arms. */
export default function VajraLab() {
  const [tier, setTier] = useState(0);
  const [used, setUsed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.vajra);
  const reduced = useReducedMotion();
  const current = tiers[tier];

  useEffect(() => {
    if (used) markProgress(PROGRESS.vajra);
  }, [used]);

  useEffect(() => {
    if (reduced && playing) setPlaying(false);
  }, [reduced, playing]);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setTier((t) => (t + 1) % tiers.length);
      setUsed(true);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, reduced]);

  function pick(i: number) {
    setTier(i);
    setUsed(true);
    setPlaying(false);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="vajra-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: vajra quadrature
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Step through base vs upper tiers. Soft pulse shows opposing arms —
        enough to teach geometry, not busy.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Vajra tiers"
      >
        {tiers.map((t, i) => (
          <button
            key={t.title}
            type="button"
            aria-pressed={tier === i}
            onClick={() => pick(i)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              tier === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {t.title}
          </button>
        ))}
        {!reduced ? (
          <button
            type="button"
            onClick={() => {
              setPlaying((p) => !p);
              setUsed(true);
            }}
            aria-pressed={playing}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-mist-300/25 px-4 text-sm text-mist-100 transition-colors duration-200 ease-out hover:border-aurora/45 hover:text-aurora"
          >
            {playing ? "Pause" : "Play steps"}
          </button>
        ) : null}
      </div>

      <VajraQuadrature
        idPrefix="vajra-lab"
        hideCaption
        highlight={current.highlight}
        animate={!reduced}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-md"
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
