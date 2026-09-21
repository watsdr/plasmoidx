"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import AtvTriangle, { type AtvSide } from "@/components/diagrams/AtvTriangle";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const sides: {
  id: AtvSide;
  num: string;
  name: string;
  caption: string;
}[] = [
  {
    id: "area",
    num: "3",
    name: "Area",
    caption:
      "Side 3 (vertical) maps to Area in the teaching calculator — one leg of the 3-4-5 bookkeeping triangle.",
  },
  {
    id: "time",
    num: "4",
    name: "Time",
    caption:
      "Side 4 (base) maps to Time. Squared with 3 and 5 it keeps the clean 9–16–25 pattern.",
  },
  {
    id: "volume",
    num: "5",
    name: "Volume",
    caption:
      "Side 5 (hypotenuse) maps to Volume — the linked measure that closes Area–Time–Volume (ATV).",
  },
];

/** Tap 3/4/5 or Area/Time/Volume; highlight edge + caption. */
export default function AtvLab() {
  const [side, setSide] = useState<AtvSide>("area");
  const [used, setUsed] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.atv);
  const current = sides.find((s) => s.id === side)!;

  useEffect(() => {
    if (used) markProgress(PROGRESS.atv);
  }, [used]);

  function pick(next: AtvSide) {
    setSide(next);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="atv-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: 3-4-5 → ATV
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap a side. The edge highlights; the caption names Area, Time, or
        Volume.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Triangle sides"
      >
        {sides.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={side === s.id}
            onClick={() => pick(s.id)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              side === s.id
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            <span className="font-mono text-xs opacity-80">{s.num}</span>
            {s.name}
          </button>
        ))}
      </div>

      <AtvTriangle
        highlight={side}
        captionId={captionId}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-md"
      />
      <p
        id={captionId}
        className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        {current.caption}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-mist-400">
        Area–Time–Volume (ATV) is a model calculator idea — not a mainstream
        physics claim.
      </p>
    </div>
  );
}
