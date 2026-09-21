"use client";

import { useId, useState, type ReactNode } from "react";

type Props = {
  title: string;
  beats: readonly string[];
  children: ReactNode;
};

/** Progressive disclosure under a diagram — 3–5 plain beats. */
export default function ExplainFigure({ title, beats, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      {children}
      <button
        type="button"
        className="mt-1 inline-flex min-h-11 items-center text-xs tracking-tight text-mist-400 hover:text-aurora focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Hide explanation" : "Explain"}
        <span className="sr-only"> {title}</span>
      </button>
      {open ? (
        <ol id={panelId} className="mt-3 max-w-xl space-y-2.5">
          {beats.map((beat, i) => (
            <li key={beat} className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-[11px] text-aurora">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-mist-300">{beat}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
