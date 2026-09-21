"use client";

import { useEffect, useId, useMemo, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const FACTORS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const SKIP = 7;
const TARGET = 518_400;

function formatProduct(n: number): string {
  return n.toLocaleString("en-US");
}

/** Interactive builder: multiply 1–10 (skip 7) to reach 518,400 → 51.84°. */
export default function Build518400() {
  const [on, setOn] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(FACTORS.map((f) => [f, false]))
  );
  const titleId = useId();
  const productId = useId();
  const persisted = useProgress(PROGRESS.build518400);

  const product = useMemo(() => {
    let p = 1;
    let any = false;
    for (const f of FACTORS) {
      if (f === SKIP) continue;
      if (on[f]) {
        p *= f;
        any = true;
      }
    }
    return any ? p : 0;
  }, [on]);

  const allOn = FACTORS.filter((f) => f !== SKIP).every((f) => on[f]);
  const complete = allOn && product === TARGET;

  useEffect(() => {
    if (complete) markProgress(PROGRESS.build518400);
  }, [complete]);

  function toggle(f: number) {
    if (f === SKIP) return;
    setOn((prev) => ({ ...prev, [f]: !prev[f] }));
  }

  function reset() {
    setOn(Object.fromEntries(FACTORS.map((f) => [f, false])));
  }

  return (
    <div
      className="ix-panel my-6 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="build-518400"
      role="region"
      aria-labelledby={titleId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p id={titleId} className="text-sm font-medium tracking-tight text-mist-50">
          Build Time&apos;s mould
        </p>
        <GotItCheck show={complete || persisted} />
      </div>
      <p className="mt-1 max-w-xl text-xs leading-relaxed text-mist-400">
        Tap the factors to multiply them. Seven is skipped on purpose — in this
        picture it stands for the quiet “DC” (direct current) / zero-point slot,
        not a number you multiply in.
      </p>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Factors one through ten"
      >
        {FACTORS.map((f) => {
          const skipped = f === SKIP;
          const selected = on[f];
          return (
            <button
              key={f}
              type="button"
              disabled={skipped}
              aria-pressed={skipped ? undefined : selected}
              aria-label={
                skipped
                  ? "Seven skipped — DC or zero-point slot"
                  : `Factor ${f}${selected ? ", selected" : ""}`
              }
              title={
                skipped
                  ? "Skipped: DC / zero-point slot (not multiplied)"
                  : undefined
              }
              onClick={() => toggle(f)}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium tracking-tight transition-colors duration-200 ease-out ${
                skipped
                  ? "cursor-not-allowed border border-dashed border-ink-600/80 text-mist-400/50 line-through"
                  : selected
                    ? "bg-aurora text-ink-950"
                    : "border border-mist-300/25 text-mist-100 hover:border-aurora/45 hover:text-aurora"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-[11px] text-mist-400">
        <span className="line-through opacity-60">7</span> disabled — DC /
        zero-point (quiet slot between charges).
      </p>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-mist-400">
            Running product
          </p>
          <p
            id={productId}
            className="mt-1 font-mono text-2xl font-semibold tracking-tight text-mist-50"
            aria-live="polite"
          >
            {product === 0 ? "—" : formatProduct(product)}
          </p>
        </div>
        <button type="button" onClick={reset} className="btn-ghost text-xs">
          Reset
        </button>
      </div>

      {complete ? (
        <div
          className="mt-4 rounded-lg border border-aurora/30 bg-aurora/[0.06] px-4 py-3"
          role="status"
        >
          <p className="text-sm font-medium tracking-tight text-mist-50">
            Locked: 518,400
          </p>
          <p className="mt-1 font-mono text-lg text-aurora">
            ÷ 10,000 = 51.84°
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-mist-400">
            That angle is the cone / pyramid “mouth” used in the hardware.
          </p>
        </div>
      ) : (
        <p className="mt-3 text-xs text-mist-400" aria-live="polite">
          {product > 0 && product !== TARGET
            ? "Keep selecting factors until you hit 518,400."
            : "Select every factor except 7."}
        </p>
      )}
    </div>
  );
}
