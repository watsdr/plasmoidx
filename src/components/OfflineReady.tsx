"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "plasmoidx-offline-note-dismissed";

/** Registers the static-export service worker and shows a dismissible note. */
export default function OfflineReady() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    let cancelled = false;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        const ready = await navigator.serviceWorker.ready;
        if (cancelled) return;

        let dismissed = false;
        try {
          dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
        } catch {
          /* private mode */
        }

        if (
          !dismissed &&
          (reg.active || ready.active || navigator.serviceWorker.controller)
        ) {
          setShow(true);
        }

        reg.addEventListener("updatefound", () => {
          const worker = reg.installing;
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "activated" && !dismissed && !cancelled) {
              setShow(true);
            }
          });
        });
      } catch {
        /* SW may fail on file:// or unsupported hosts — silent */
      }
    };

    void register();
    return () => {
      cancelled = true;
    };
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

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto flex max-w-md items-start gap-3 rounded-xl border border-ink-600/60 bg-ink-900/95 px-4 py-3 text-sm text-mist-100 shadow-lg backdrop-blur-sm sm:left-6 sm:right-auto"
    >
      <p className="flex-1 leading-relaxed text-mist-200">
        <span className="font-medium text-mist-50">Offline ready.</span> Shell
        pages and locks data can load without a network after the first visit.
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 rounded-md px-2 py-1 text-xs text-mist-400 hover:text-mist-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
        aria-label="Dismiss offline ready note"
      >
        Dismiss
      </button>
    </div>
  );
}
