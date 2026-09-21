"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import MoeLattice, { type MoeFocus } from "@/components/diagrams/MoeLattice";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const spots: {
  id: MoeFocus;
  label: string;
  caption: string;
}[] = [
  {
    id: "seed",
    label: "Protium seed",
    caption:
      "Bottom-left callout: protium (¹H) — the common form of hydrogen — is the seed of the map, not a fake table cell with invented data.",
  },
  {
    id: "octave",
    label: "Octave columns",
    caption:
      "Highlighted columns mark octave lines on the 16-wide grid. Think “where the map divides,” not element names.",
  },
  {
    id: "mid",
    label: "Mid band",
    caption:
      "A middle band of cells stands for mid-table rungs on the lattice idea — a teaching zone, not a claim of specific atomic numbers here.",
  },
  {
    id: "heavy",
    label: "Heavy / end",
    caption:
      "Upper-right cells hint at the heavy / omega side of the same ladder. Full charts stay on Strike Foundation.",
  },
];

/** Tap seeded map spots; plain-English what that region means. */
export default function MoeLatticeLab() {
  const [focus, setFocus] = useState<MoeFocus>("seed");
  const [used, setUsed] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.moe);
  const current = spots.find((s) => s.id === focus)!;

  useEffect(() => {
    if (used) markProgress(PROGRESS.moe);
  }, [used]);

  function pick(next: MoeFocus) {
    setFocus(next);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="moe-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: read the map
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap a region. Learn the map idea — we do not invent element data for
        each cell.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Lattice regions"
      >
        {spots.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={focus === s.id}
            onClick={() => pick(s.id)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              focus === s.id
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <MoeLattice
        focus={focus}
        captionId={captionId}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-xl"
      />
      <p
        id={captionId}
        className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        {current.caption}
      </p>
    </div>
  );
}
