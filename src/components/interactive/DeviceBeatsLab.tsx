"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import DeviceBeats from "@/components/diagrams/DeviceBeats";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useReducedMotion } from "@/lib/useReducedMotion";

const beats = [
  {
    title: "Ionizer",
    caption:
      "Air ionizer / pre-ionization chamber: ultraviolet (UV) light pretreats incoming air before the water column.",
  },
  {
    title: "Bubbler",
    caption:
      "Plasmoid generator / bubbler: air rises through a water column; bubble collapse (cavitation) forms energetic vacuum objects (EVOs).",
  },
  {
    title: "Resonator",
    caption:
      "Catalytic tornado resonator: nested CTR spheres (outer / inner / tiny core) with exhaust feedback — not a vague gyroscope.",
  },
] as const;

const STEP_MS = 2800;

/** Tap a beat card to highlight + short caption; optional calm auto-play. */
export default function DeviceBeatsLab() {
  const [beat, setBeat] = useState(0);
  const [used, setUsed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.devicebeats);
  const reduced = useReducedMotion();
  const current = beats[beat];

  useEffect(() => {
    if (used) markProgress(PROGRESS.devicebeats);
  }, [used]);

  useEffect(() => {
    if (reduced && playing) setPlaying(false);
  }, [reduced, playing]);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setBeat((b) => (b + 1) % beats.length);
      setUsed(true);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, reduced]);

  function pick(i: number) {
    setBeat(i);
    setUsed(true);
    setPlaying(false);
  }

  function togglePlay() {
    if (reduced) return;
    setPlaying((p) => !p);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="device-beats-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: tap a beat
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap Ionizer, Bubbler, or Resonator — or play a calm sequence. Flow dots
        show air → ionizer → bubbler → resonator.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Device beats"
      >
        {beats.map((b, i) => (
          <button
            key={b.title}
            type="button"
            aria-pressed={beat === i}
            onClick={() => pick(i)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              beat === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {b.title}
          </button>
        ))}
        {!reduced ? (
          <button
            type="button"
            onClick={togglePlay}
            aria-pressed={playing}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-mist-300/25 px-4 text-sm text-mist-100 transition-colors duration-200 ease-out hover:border-aurora/45 hover:text-aurora"
          >
            {playing ? "Pause" : "Play steps"}
          </button>
        ) : null}
      </div>

      <DeviceBeats
        highlight={beat}
        idPrefix="device-page-beats"
        hideCaption
        showFlow
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-2xl"
      />
      <p
        id={captionId}
        className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        <span className="font-medium text-mist-100">{current.title}.</span>{" "}
        {current.caption}
      </p>
    </div>
  );
}
