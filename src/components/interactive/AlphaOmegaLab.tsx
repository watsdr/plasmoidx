"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import AlphaOmegaLadder, {
  type LadderFocus,
  LADDER_TOTALS,
} from "@/components/diagrams/AlphaOmegaLadder";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

type Spot = {
  id: string;
  label: string;
  focus: LadderFocus;
  focusSym?: string | null;
  caption: string;
};

const spots: Spot[] = [
  {
    id: "omega",
    label: "Omega column",
    focus: "omega",
    caption:
      "Odd atomic number (Z) side — warm / plus in the inventor graphic. Sample rungs climb from hydrogen toward gallium. Column total shown: 157.18 MeV (inventor model).",
  },
  {
    id: "alpha",
    label: "Alpha column",
    focus: "alpha",
    caption:
      "Even Z side — cool / minus. Sample rungs from helium toward germanium. Column total shown: 117.17 MeV (inventor model).",
  },
  {
    id: "base",
    label: "H / He base",
    focus: "base",
    caption: `Shared base rung: hydrogen (H, Z=1) and helium (He, Z=2) at ${LADDER_TOTALS.base} MeV in the Draft 518,400 graphic — the seed step of the ladder.`,
  },
  {
    id: "mid",
    label: "Mid rungs",
    focus: "mid",
    caption:
      "Mid-table samples only (N/O, Na/Mg, Co/Ni). The full graphic also lists neighbors such as carbon and iron — we keep a short teaching set here.",
  },
  {
    id: "tip",
    label: "Tip Ga / Ge",
    focus: "tip",
    caption:
      "Toward the tip: gallium (odd) and germanium (even). MeV on the sample may be partial — treat every figure as inventor-model, not site-verified.",
  },
  {
    id: "band",
    label: "He or +HH",
    focus: "band",
    caption:
      "Outer band hint from the graphic: “He or +HH” — helium, or paired hydrogen, as building blocks in this model picture.",
  },
  {
    id: "totals",
    label: "MeV totals",
    focus: "totals",
    caption: `Header totals in the Draft 518,400 graphic: Omega ${LADDER_TOTALS.omega} MeV, Alpha ${LADDER_TOTALS.alpha} MeV, total ${LADDER_TOTALS.total} MeV. Not independently verified on this site.`,
  },
];

/** Tap column / rung regions for short plain-English notes. */
export default function AlphaOmegaLab() {
  const [spotId, setSpotId] = useState("base");
  const [used, setUsed] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.alphaomega);
  const current = spots.find((s) => s.id === spotId)!;

  useEffect(() => {
    if (used) markProgress(PROGRESS.alphaomega);
  }, [used]);

  function pick(id: string) {
    setSpotId(id);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 overflow-x-safe rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="alpha-omega-lab"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: Alpha–Omega ladder
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Tap a column or rung group. Short notes only — MeV figures are
        inventor-model.
      </p>

      <div
        className="mt-4 flex min-w-0 flex-wrap gap-2"
        role="group"
        aria-label="Ladder regions"
      >
        {spots.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={spotId === s.id}
            onClick={() => pick(s.id)}
            className={`inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
              spotId === s.id
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <AlphaOmegaLadder
        focus={current.focus}
        focusSym={current.focusSym ?? null}
        captionId={captionId}
        hideCaption
        className="overflow-x-safe mt-5 w-full min-w-0 max-w-md"
      />
      <p
        id={captionId}
        className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300"
        aria-live="polite"
      >
        {current.caption}
      </p>
      <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-mist-400">
        MeV figures are inventor-model numbers from Draft 518,400 graphics —
        not independently verified here.
      </p>
    </div>
  );
}
