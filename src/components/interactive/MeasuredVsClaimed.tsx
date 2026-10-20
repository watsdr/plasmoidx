"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { metrics, SRC, type EvidenceRow } from "@/lib/evidence";

const kindText = { measured: "Measured", seller: "Seller claim" } as const;

function Row({ r }: { r: EvidenceRow }) {
  const measured = r.kind === "measured";
  return (
    <li className="py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-sm font-medium tracking-tight text-mist-50">{r.test}</p>
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
            measured ? "text-aurora" : "text-mist-400"
          }`}
        >
          {kindText[r.kind]}
        </span>
      </div>

      {r.levels ? (
        <div className="mt-2 space-y-1.5" aria-hidden>
          {(["Before", "After"] as const).map((lab, i) => (
            <div key={lab} className="flex items-center gap-2">
              <span className="w-12 shrink-0 text-xs text-mist-400">{lab}</span>
              <div className="ev-track h-2.5 flex-1 overflow-hidden rounded-full">
                <div
                  className="ev-bar ev-bar-seller h-full rounded-full"
                  style={{ width: `${(r.levels![i] / 25) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : r.magnitude !== null ? (
        <div className="ev-track mt-2 h-2.5 overflow-hidden rounded-full" aria-hidden>
          <div
            className={`ev-bar h-full rounded-full ${measured ? "ev-bar-measured" : "ev-bar-seller"}`}
            style={{ width: `${Math.max(r.magnitude, 0)}%` }}
          />
        </div>
      ) : null}

      <p className="mt-1.5 text-sm text-mist-200">
        <span className="sr-only">{kindText[r.kind]}: </span>
        {r.value}
      </p>
      <details className="group mt-1">
        <summary className="inline-flex min-h-11 cursor-pointer items-center text-xs text-mist-400 underline-offset-2 hover:text-aurora hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora">
          Test conditions and source
        </summary>
        <p className="max-w-2xl text-sm leading-relaxed text-mist-300">{r.conditions}</p>
        <p className="mt-1 text-sm">
          <a
            href={SRC[r.source].href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            {SRC[r.source].label}
          </a>
        </p>
      </details>
    </li>
  );
}

/** Measured results next to seller-reported numbers, one gas or fuel result at a time. */
export default function MeasuredVsClaimed() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const m = metrics[active];

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % metrics.length;
    if (e.key === "ArrowLeft") next = (i - 1 + metrics.length) % metrics.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = metrics.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      className="ix-panel my-6 min-w-0 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      role="region"
      aria-labelledby={`${baseId}-h`}
    >
      <p id={`${baseId}-h`} className="text-sm font-medium tracking-tight text-mist-50">
        Measured vs claimed
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-mist-400">
        Solid bars are measured in the university thesis. Hatched bars are
        numbers the seller reports on Thunderstorm.tech; we have not seen the
        full reports. Pick a result:
      </p>

      <div role="tablist" aria-label="Result to compare" className="mt-4 flex flex-wrap gap-2">
        {metrics.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium tracking-tight transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora ${
              active === i
                ? "bg-aurora text-ink-950"
                : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
            }`}
          >
            {t.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${m.id}`}
        className="mt-4"
      >
        <p className="text-base font-medium tracking-tight text-mist-50">{m.title}</p>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-mist-400">{m.note}</p>
        <ul className="mt-2 divide-y divide-ink-600/40">
          {m.rows.map((r) => (
            <Row key={r.id} r={r} />
          ))}
        </ul>
      </div>
    </div>
  );
}
