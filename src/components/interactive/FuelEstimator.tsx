"use client";

import { useId, useState } from "react";
import { MEASURED_FUEL_RATE } from "@/lib/evidence";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function num(v: string) {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** What the one measured fuel figure would mean for a user's own numbers — not a promise. */
export default function FuelEstimator() {
  const id = useId();
  const [gallons, setGallons] = useState("");
  const [price, setPrice] = useState("");
  const [range, setRange] = useState(false);

  const g = num(gallons);
  const p = num(price);
  const ready = g !== null && p !== null && g > 0 && p > 0;
  const weekly = ready ? g * p : 0;
  const save = weekly * (MEASURED_FUEL_RATE / 100);

  const field =
    "mt-1 block min-h-11 w-full rounded-lg border border-ink-600/60 bg-transparent px-3 text-base text-mist-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora";

  return (
    <div
      className="ix-panel my-6 min-w-0 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      role="region"
      aria-labelledby={`${id}-h`}
    >
      <p id={`${id}-h`} className="text-sm font-medium tracking-tight text-mist-50">
        What would the measured result mean for you?
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-mist-400">
        Uses the one measured fuel figure: a {MEASURED_FUEL_RATE}% lower
        fuel-use rate on a small generator in the Embry-Riddle master’s thesis.
        Nothing you type leaves this page.
      </p>

      <div className="mt-4 grid max-w-md gap-4 sm:grid-cols-2">
        <label className="block text-sm text-mist-300" htmlFor={`${id}-g`}>
          Gallons per week
          <input
            id={`${id}-g`}
            className={field}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={gallons}
            onChange={(e) => setGallons(e.target.value)}
          />
        </label>
        <label className="block text-sm text-mist-300" htmlFor={`${id}-p`}>
          Price per gallon ($)
          <input
            id={`${id}-p`}
            className={field}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </div>

      <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-mist-200">
        <input
          type="checkbox"
          checked={range}
          onChange={(e) => setRange(e.target.checked)}
          className="h-4 w-4 accent-[rgb(var(--aurora))]"
        />
        Show as a range from 0% (no effect) to {MEASURED_FUEL_RATE}%
      </label>

      <div
        className="mt-3 min-h-[4.5rem] rounded-lg border border-ink-600/40 px-4 py-3"
        aria-live="polite"
      >
        {ready ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              If your engine matched the test
            </p>
            <p className="mt-1 text-xs text-aurora">
              Measured basis: {MEASURED_FUEL_RATE}%, small generator only
            </p>
            <p className="mt-1 text-base text-mist-50">
              {range ? (
                <>
                  Between <strong className="font-medium">{usd.format(0)}</strong> and{" "}
                  <strong className="font-medium">{usd.format(save)}</strong> a week (
                  {usd.format(0)} to {usd.format(save * 52)} a year)
                </>
              ) : (
                <>
                  About <strong className="font-medium">{usd.format(save)}</strong> a week (
                  {usd.format(save * 52)} a year) on {usd.format(weekly)} of weekly fuel
                </>
              )}
            </p>
          </>
        ) : (
          <p className="text-sm text-mist-400">Enter gallons and price to see the math.</p>
        )}
      </div>

      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-mist-400">
        This is arithmetic, not a forecast. The figure comes from one small
        generator under one load in one study. It is not a guarantee for cars,
        trucks or any other engine, and real results could be zero. The
        thesis road test on one vehicle used hardware the manufacturer
        supplied and had caveats (only 4 of 8 cylinders covered, high winds).
      </p>
    </div>
  );
}
