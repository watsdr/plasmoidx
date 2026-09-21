"use client";

import Link from "next/link";
import { PROGRESS } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const steps = [
  { href: "#curriculum", label: "Lessons 1–6", key: null },
  { href: "#locks", label: "Locks", key: PROGRESS.build518400 },
  { href: "#charge", label: "Charge", key: PROGRESS.storespend },
  { href: "#vortex", label: "Flashcards", key: PROGRESS.flashcards },
  { href: "#lectures", label: "Lectures", key: null },
] as const;

function focusTarget(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.tabIndex = -1;
  el.focus({ preventScroll: true });
}

/** Quiet study strip. First-visit friendly; never blocks content. */
export default function GuidedPath() {
  const locksDone = useProgress(PROGRESS.build518400);
  const chargeDone = useProgress(PROGRESS.storespend);
  const cardsDone = useProgress(PROGRESS.flashcards);
  const done: Record<string, boolean> = {
    [PROGRESS.build518400]: locksDone,
    [PROGRESS.storespend]: chargeDone,
    [PROGRESS.flashcards]: cardsDone,
  };

  return (
    <nav
      className="mt-8 max-w-xl border-t border-ink-600/40 pt-6"
      aria-label="Guided study path"
    >
      <p className="text-xs leading-relaxed text-mist-400">
        Short stops — skip anytime. Curriculum rail checks off as labs clear.
        Lectures are inventor source (outbound).
      </p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
        {steps.map((step, i) => {
          const id = step.href.slice(1);
          const got = step.key ? done[step.key] : false;
          return (
            <li key={step.href} className="flex items-center gap-2">
              {i > 0 ? (
                <span className="text-mist-400" aria-hidden>
                  →
                </span>
              ) : null}
              <a
                href={step.href}
                onClick={() => {
                  requestAnimationFrame(() => focusTarget(id));
                }}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 text-mist-100 underline underline-offset-[0.2em] hover:text-aurora focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
              >
                <span className="font-mono text-[11px] text-aurora">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.label}
                {got ? (
                  <span className="text-[11px] text-aurora" aria-label="got it">
                    ✓
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-mist-400">
        Printable one-pager:{" "}
        <Link href="/study-pack/" className="link-aurora">
          Study pack
        </Link>
        . Method:{" "}
        <Link href="/sources/" className="link-aurora">
          Sources
        </Link>
        .
      </p>
    </nav>
  );
}
