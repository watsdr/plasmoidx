"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { STUDY_PALETTE_OPEN_EVENT } from "@/lib/studyPalette";

const OfflineReady = dynamic(() => import("@/components/OfflineReady"), {
  ssr: false,
});
const StudyCommandPalette = dynamic(
  () => import("@/components/StudyCommandPalette"),
  { ssr: false }
);

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return Boolean(el.closest("[contenteditable='true']"));
}

/**
 * Idle-defer OfflineReady + StudyCommandPalette after first paint.
 * On first intent (⌘K / Ctrl+K, `/`, Search click / open event, or FAB),
 * mounts the palette immediately and re-dispatches open so a11y is preserved.
 */
export default function DeferredSiteChrome() {
  const [mountOffline, setMountOffline] = useState(false);
  const [mountPalette, setMountPalette] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  const requestPalette = useCallback((open: boolean) => {
    if (open) setPendingOpen(true);
    setMountPalette(true);
  }, []);

  /* OfflineReady — idle only (no first-intent path). */
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const mount = () => setMountOffline(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(mount, { timeout: 4500 });
    } else {
      timeoutId = setTimeout(mount, 1800);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  /* Palette — idle, or immediately on intent while still deferred. */
  useEffect(() => {
    if (mountPalette) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const mountIdle = () => {
      if (!cancelled) setMountPalette(true);
    };

    function onKey(e: KeyboardEvent) {
      const metaK =
        (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (metaK) {
        e.preventDefault();
        setPendingOpen(true);
        setMountPalette(true);
        return;
      }
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isTypingTarget(e.target)
      ) {
        e.preventDefault();
        setPendingOpen(true);
        setMountPalette(true);
      }
    }

    function onOpenEvent() {
      setPendingOpen(true);
      setMountPalette(true);
    }

    document.addEventListener("keydown", onKey);
    window.addEventListener(STUDY_PALETTE_OPEN_EVENT, onOpenEvent);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(mountIdle, { timeout: 3200 });
    } else {
      timeoutId = setTimeout(mountIdle, 1400);
    }

    return () => {
      cancelled = true;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(STUDY_PALETTE_OPEN_EVENT, onOpenEvent);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [mountPalette]);

  /* After deferred mount with pending open, re-fire once palette listeners exist. */
  useEffect(() => {
    if (!mountPalette || !pendingOpen) return;
    const t = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent(STUDY_PALETTE_OPEN_EVENT));
      setPendingOpen(false);
    }, 0);
    return () => window.clearTimeout(t);
  }, [mountPalette, pendingOpen]);

  return (
    <>
      {mountOffline ? <OfflineReady /> : null}
      {mountPalette ? (
        <StudyCommandPalette />
      ) : (
        <button
          type="button"
          className="cmd-palette-fab"
          aria-label="Search Study"
          title="Search Study (/ or ⌘K)"
          onClick={() => requestPalette(true)}
        >
          <kbd className="cmd-palette-fab-keys" aria-hidden>
            /
          </kbd>
        </button>
      )}
    </>
  );
}
