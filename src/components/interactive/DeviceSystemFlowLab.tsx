"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import DeviceSystemFlow from "@/components/diagrams/DeviceSystemFlow";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useReducedMotion } from "@/lib/useReducedMotion";

const stages = [
  {
    title: "Ionizer",
    body: "The air ionizer (pre-ionization chamber) pretreats incoming air. The teaching art shows this with an ultraviolet (UV) cue.",
    model: "Ultraviolet (UV) light ionizes the incoming air before it reaches the water.",
    verified: "Not tested on its own. Skeptoid (outside commentary) argues an ordinary UV bulb is too weak to ionize air.",
  },
  {
    title: "Bubbler",
    body: "Bubbler (plasmoid generator): a water column and cavitation form Exotic Vacuum Occurrences (EVOs).",
    model: "Bubble collapse (cavitation) in the water forms plasmoids, also called EVOs.",
    verified: "No test we cite observed plasmoids. The thesis measured fuel use and exhaust only.",
  },
  {
    title: "Resonator",
    body: "Catalytic tornado resonator with nested contra-rotating (CTR) spheres. Hot exhaust enters one end. The cool plasmoid stream leaves the inner sphere by pipe to the engine’s intake, just after the carburetor.",
    model: "Opposite-spinning flows in the nested spheres organize the plasmoid stream that feeds the engine.",
    verified: "Only the whole retrofit was measured (about a 9.67% lower fuel-use rate on a small generator; carbon monoxide (CO) about 34% lower at idle). This part was not tested on its own.",
  },
] as const;

const STEP_MS = 3000;

/** System overview flow with optional auto-play and moving markers. */
export default function DeviceSystemFlowLab() {
  const [stage, setStage] = useState(0);
  const [used, setUsed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.systemflow);
  const reduced = useReducedMotion();
  const current = stages[stage];

  useEffect(() => {
    if (used) markProgress(PROGRESS.systemflow);
  }, [used]);

  useEffect(() => {
    if (reduced && playing) setPlaying(false);
  }, [reduced, playing]);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setStage((s) => (s + 1) % stages.length);
      setUsed(true);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, reduced]);

  function pick(i: number) {
    setStage(i);
    setUsed(true);
    setPlaying(false);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="system-flow-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: system flow
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Same anatomy as the accurate overview sketch — moving markers only when
        they teach the path. Tap a stage or play calmly.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="System stages"
      >
        {stages.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-pressed={stage === i}
            onClick={() => pick(i)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              stage === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {s.title}
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

      <DeviceSystemFlow
        highlight={stage}
        idPrefix="system-flow-lab"
        hideCaption
        showFlow={!reduced}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-3xl"
      />
      <p
        id={captionId}
        className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        <span className="font-medium text-mist-100">{current.title}.</span>{" "}
        {current.body}
      </p>
      <dl className="mt-3 grid max-w-2xl gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg border border-ink-600/40 px-3 py-2.5">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
            Inventor model
          </dt>
          <dd className="mt-1 leading-relaxed text-mist-200">{current.model}</dd>
        </div>
        <div className="rounded-lg border border-ink-600/40 px-3 py-2.5">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aurora">
            What’s verified
          </dt>
          <dd className="mt-1 leading-relaxed text-mist-200">{current.verified}</dd>
        </div>
      </dl>
    </div>
  );
}
