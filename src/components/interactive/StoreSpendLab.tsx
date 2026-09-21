"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

type Mode = "store" | "spend";

const copy: Record<
  Mode,
  { label: string; caption: string; why: string; charge: string }
> = {
  store: {
    label: "Clockwise · store",
    charge: "Negative — energy tightens inward",
    caption:
      "Clockwise spin stores charge: the donut tightens, structure builds.",
    why: "In the device, the cold inner stream stores this way before the swarm is ready to work.",
  },
  spend: {
    label: "Anticlockwise · spend",
    charge: "Positive — energy opens outward",
    caption:
      "Anticlockwise spin spends charge: the donut opens, energy releases.",
    why: "A positive pulse or outer hot spin spends charge — the discharge that returns work.",
  },
};

/** Toggle lab: clockwise store vs anticlockwise spend. */
export default function StoreSpendLab() {
  const [mode, setMode] = useState<Mode>("store");
  const [used, setUsed] = useState(false);
  const labelId = useId();
  const captionId = useId();
  const persisted = useProgress(PROGRESS.storespend);
  const c = copy[mode];
  const isStore = mode === "store";

  useEffect(() => {
    if (used) markProgress(PROGRESS.storespend);
  }, [used]);

  function pick(next: Mode) {
    setMode(next);
    setUsed(true);
  }

  return (
    <div
      className="ix-panel my-6 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="store-spend"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium tracking-tight text-mist-50">
          Try it: store or spend
        </p>
        <GotItCheck show={used || persisted} />
      </div>
      <p className="mt-1 text-xs text-mist-400">
        Pick a spin direction. Watch the donut and the short caption change.
      </p>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Spin direction"
      >
        <button
          type="button"
          aria-pressed={isStore}
          onClick={() => pick("store")}
          className={`inline-flex min-h-11 min-w-0 sm:min-w-[9.5rem] flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
            isStore
              ? "bg-aurora text-ink-950"
              : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
          }`}
        >
          Clockwise · store
        </button>
        <button
          type="button"
          aria-pressed={!isStore}
          onClick={() => pick("spend")}
          className={`inline-flex min-h-11 min-w-0 sm:min-w-[9.5rem] flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 ease-out sm:flex-none ${
            !isStore
              ? "bg-aurora text-ink-950"
              : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
          }`}
        >
          Anticlockwise · spend
        </button>
      </div>

      <figure className="mt-5 max-w-sm" aria-labelledby={captionId}>
        <svg
          viewBox="0 0 240 160"
          className="h-auto w-full motion-safe:transition-[opacity] motion-safe:duration-200"
          role="img"
          aria-label={
            isStore
              ? "Torus with clockwise arrow — store"
              : "Torus with anticlockwise arrow — spend"
          }
        >
          <ellipse
            cx="120"
            cy="72"
            rx="78"
            ry="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink-600"
          />
          <ellipse
            cx="120"
            cy="72"
            rx="32"
            ry="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className={isStore ? "text-aurora/70" : "text-mist-300/60"}
          />
          {isStore ? (
            <path
              d="M 120 24 A 54 34 0 0 1 172 68"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-aurora"
              markerEnd="url(#sslArrow)"
            />
          ) : (
            <path
              d="M 120 24 A 54 34 0 0 0 68 68"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-mist-200"
              markerEnd="url(#sslArrowMist)"
            />
          )}
          <text
            x="120"
            y="138"
            textAnchor="middle"
            className="fill-mist-100"
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {c.label}
          </text>
          <text
            x="120"
            y="154"
            textAnchor="middle"
            className="fill-mist-400"
            style={{ fontSize: 11 }}
          >
            {c.charge}
          </text>
          <defs>
            <marker
              id="sslArrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" className="fill-aurora" />
            </marker>
            <marker
              id="sslArrowMist"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-200" />
            </marker>
          </defs>
        </svg>
        <figcaption
          id={captionId}
          className="mt-2 text-sm leading-relaxed text-mist-300"
        >
          {c.caption}
        </figcaption>
        <p className="mt-1.5 text-xs leading-relaxed text-mist-400">{c.why}</p>
      </figure>
    </div>
  );
}
