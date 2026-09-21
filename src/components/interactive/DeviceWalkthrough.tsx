"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useReducedMotion } from "@/lib/useReducedMotion";
import DeviceBeats from "@/components/diagrams/DeviceBeats";

const steps = [
  {
    title: "Ionizer",
    body: "Air ionizer / pre-ionization chamber: ultraviolet (UV) light pretreats the incoming air so it is ready for the bubbler. UV means light just beyond violet — energetic enough to prepare the gas; the violet interior cue in teaching art is a model hint, not a marketing glow.",
  },
  {
    title: "Bubbler",
    body: "Plasmoid generator / bubbler: air rises through a water column and collapses (cavitation). That birth forms energetic vacuum objects (EVOs) — Exotic Vacuum Occurrence in Strike decks; in plain words, self-built donut-shaped plasmoids.",
  },
  {
    title: "Resonator",
    body: "Catalytic tornado resonator: nested contra-rotating (CTR) spheres — outer, inner, and a tiny central core. Hot exhaust feedback and a carburetor-in stub feed opposing spins; a calm zero-plane sits between them so charge can separate and feed the swarm. Not a vague gyroscope.",
  },
] as const;

const STEP_MS = 3200;

/** Stepper walkthrough of ionizer → bubbler → resonator / CTR. */
export default function DeviceWalkthrough() {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(() => new Set<number>([0]));
  const [playing, setPlaying] = useState(false);
  const titleId = useId();
  const bodyId = useId();
  const persisted = useProgress(PROGRESS.walkthrough);
  const reduced = useReducedMotion();
  const last = steps.length - 1;
  const current = steps[step];
  const finished = visited.size >= steps.length;

  useEffect(() => {
    if (finished) markProgress(PROGRESS.walkthrough);
  }, [finished]);

  useEffect(() => {
    if (reduced && playing) setPlaying(false);
  }, [reduced, playing]);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        const next = s >= last ? 0 : s + 1;
        setVisited((prev) => {
          const n = new Set(prev);
          n.add(next);
          return n;
        });
        return next;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, reduced, last]);

  function go(next: number) {
    setStep(next);
    setPlaying(false);
    setVisited((prev) => {
      const n = new Set(prev);
      n.add(next);
      return n;
    });
  }

  function togglePlay() {
    if (reduced) return;
    setPlaying((p) => !p);
  }

  return (
    <div
      className="ix-panel my-6 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="walkthrough"
      role="region"
      aria-labelledby={titleId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={titleId} className="text-sm font-medium tracking-tight text-mist-50">
          Walk the three beats
        </p>
        <GotItCheck show={finished || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Step through the inventor-model path. One plain sentence per beat; the
        diagram highlights where you are. Optional play advances calmly.
      </p>

      <DeviceBeats
        highlight={step}
        idPrefix="walkthrough-beats"
        hideCaption
        showFlow
        className="overflow-x-safe mt-4 w-full min-w-0 max-w-2xl"
      />

      <div className="mt-2" aria-live="polite">
        <p className="font-mono text-xs text-aurora">
          {String(step + 1).padStart(2, "0")} · {current.title}
        </p>
        <p id={bodyId} className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-200">
          {current.body}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Walkthrough progress"
        >
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-label={`Step ${i + 1}: ${s.title}`}
              onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora ${
                i === step
                  ? "bg-aurora"
                  : "bg-ink-600 hover:bg-mist-400/50"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {!reduced ? (
            <button
              type="button"
              onClick={togglePlay}
              aria-pressed={playing}
              className="btn-ghost text-xs"
            >
              {playing ? "Pause" : "Play"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => go(Math.max(0, step - 1))}
            disabled={step === 0}
            className="btn-ghost text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => go(Math.min(last, step + 1))}
            disabled={step === last}
            className="btn-primary text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
