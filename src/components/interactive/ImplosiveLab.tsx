"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import ImplosiveVsExplosive, {
  type ImplosiveSide,
} from "@/components/diagrams/ImplosiveVsExplosive";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const copy: Record<
  ImplosiveSide,
  { label: string; caption: string; tip: string }
> = {
  implosive: {
    label: "Implosive · store",
    caption:
      "Inward / clockwise: energy tightens, structure builds, charge stores (negative).",
    tip: "Same idea as Clockwise · store in the torus lab below — different picture, same pair.",
  },
  explosive: {
    label: "Explosive · spend",
    caption:
      "Outward / anticlockwise: energy opens, discharge releases, charge spends (positive).",
    tip: "Same idea as Anticlockwise · spend in the torus lab — inventor framing for the spend side.",
  },
};

/** Tap Store/Implosive vs Spend/Explosive; diagram highlights the side. */
export default function ImplosiveLab() {
  const [side, setSide] = useState<ImplosiveSide>("implosive");
  const [used, setUsed] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.implosive);
  const c = copy[side];

  useEffect(() => {
    if (used) markProgress(PROGRESS.implosive);
  }, [used]);

  function pick(next: ImplosiveSide) {
    setSide(next);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="implosive-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: implosive or explosive
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap a side. The diagram highlights; the caption names store vs spend.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Implosive or explosive"
      >
        <button
          type="button"
          aria-pressed={side === "implosive"}
          onClick={() => pick("implosive")}
          className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:min-w-[9.5rem] sm:flex-none ${
            side === "implosive"
              ? "bg-aurora text-ink-950"
              : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
          }`}
        >
          Store · implosive
        </button>
        <button
          type="button"
          aria-pressed={side === "explosive"}
          onClick={() => pick("explosive")}
          className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:min-w-[9.5rem] sm:flex-none ${
            side === "explosive"
              ? "bg-aurora text-ink-950"
              : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
          }`}
        >
          Spend · explosive
        </button>
      </div>

      <ImplosiveVsExplosive
        highlight={side}
        captionId={captionId}
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-xl"
      />
      <p
        id={captionId}
        className="mt-2 text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        <span className="font-medium text-mist-100">{c.label}.</span> {c.caption}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-mist-400">{c.tip}</p>
    </div>
  );
}
