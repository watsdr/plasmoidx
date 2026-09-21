"use client";

import { useEffect, useState } from "react";
import { openStudyPalette } from "@/lib/studyPalette";

const DISMISS_KEY = "plasmoidx-shortcuts-tip-dismissed";

/**
 * Quiet Home tip for Study Search shortcuts (⌘K / Ctrl+K and /).
 * Dismissible, playbook-safe, reduced-motion friendly; sits near hero CTAs
 * so it does not fight the command-palette FAB (bottom-right).
 */
export default function KeyboardShortcutsTip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* private mode — still show */
    }
    setShow(true);
  }, []);

  if (!show) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode */
    }
    setShow(false);
  }

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);

  return (
    <div
      role="status"
      className="shortcuts-tip mt-8 flex max-w-md items-start gap-3 rounded-lg border border-ink-600/40 bg-ink-900/30 px-3.5 py-3 text-sm text-mist-300"
    >
      <p className="min-w-0 flex-1 leading-relaxed">
        <span className="font-medium text-mist-100">Study Search:</span> press{" "}
        <kbd className="rounded border border-ink-600/70 bg-ink-900/50 px-1.5 py-0.5 text-[11px] text-mist-200">
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>{" "}
        or{" "}
        <kbd className="rounded border border-ink-600/70 bg-ink-900/50 px-1.5 py-0.5 text-[11px] text-mist-200">
          /
        </kbd>{" "}
        anytime — or{" "}
        <button
          type="button"
          className="link-aurora font-medium underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
          onClick={() => openStudyPalette()}
        >
          open Search
        </button>
        .
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="inline-flex min-h-11 shrink-0 items-center rounded-md px-2.5 text-xs text-mist-400 hover:text-mist-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
        aria-label="Dismiss Study Search tip"
      >
        Dismiss
      </button>
    </div>
  );
}
