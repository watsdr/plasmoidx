"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { STUDY_ROUTES } from "@/lib/studyRoutes";
import {
  openStudyPalette,
  STUDY_PALETTE_OPEN_EVENT,
} from "@/lib/studyPalette";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return Boolean(el.closest("[contenteditable='true']"));
}

function filterRoutes(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return STUDY_ROUTES;
  return STUDY_ROUTES.filter((r) => {
    const hay = `${r.title} ${r.hint} ${r.keywords ?? ""} ${r.href}`.toLowerCase();
    return hay.includes(q);
  });
}

export { openStudyPalette };

/**
 * Site-wide Study command palette — Linear-like, calm.
 * Open: `/` (when not typing), ⌘K / Ctrl+K, FAB, or header Search.
 * Escape closes; Tab cycles within the dialog; prefers-reduced-motion honored in CSS.
 */
export default function StudyCommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const listId = useId();

  const results = useMemo(() => filterRoutes(query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const openPalette = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  useEffect(() => {
    function onOpenEvent() {
      openPalette();
    }
    window.addEventListener(STUDY_PALETTE_OPEN_EVENT, onOpenEvent);
    return () =>
      window.removeEventListener(STUDY_PALETTE_OPEN_EVENT, onOpenEvent);
  }, [openPalette]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const metaK =
        (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (metaK) {
        e.preventDefault();
        if (open) close();
        else openPalette();
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
        openPalette();
        return;
      }

      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, openPalette]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);

    const panel = panelRef.current;

    function getFocusable(): HTMLElement[] {
      if (!panel) return [];
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
      );
    }

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const nodes = getFocusable();
      if (nodes.length === 0) {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onFocusIn(e: FocusEvent) {
      if (!panel) return;
      if (e.target instanceof Node && !panel.contains(e.target)) {
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);

    const fabEl = fabRef.current;
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
      const restore = lastFocus.current;
      if (restore && document.contains(restore)) {
        restore.focus();
      } else {
        fabEl?.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-palette-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open, results]);

  function onInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) go(item.href);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  if (!open) {
    return (
      <button
        ref={fabRef}
        type="button"
        className="cmd-palette-fab"
        aria-label="Search Study"
        title="Search Study (/ or ⌘K)"
        onClick={openPalette}
      >
        <kbd className="cmd-palette-fab-keys" aria-hidden>
          /
        </kbd>
      </button>
    );
  }

  return (
    <div className="cmd-palette-root" role="presentation">
      <button
        type="button"
        className="cmd-palette-overlay"
        aria-label="Close Study search"
        tabIndex={-1}
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="cmd-palette-panel"
      >
        <h2 id={titleId} className="sr-only">
          Search Study topics
        </h2>
        <div className="cmd-palette-input-wrap">
          <input
            ref={inputRef}
            type="search"
            className="cmd-palette-input"
            placeholder="Search Study topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            aria-autocomplete="list"
            aria-controls={listId}
            aria-activedescendant={
              results[active] ? `${listId}-opt-${active}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="cmd-palette-hint cmd-palette-esc"
            onClick={close}
            aria-label="Close Study search"
          >
            esc
          </button>
        </div>
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Study topics"
          className="cmd-palette-list"
        >
          {results.length === 0 ? (
            <p className="cmd-palette-empty">
              No matches. Try “plasmoid” or “locks”.
            </p>
          ) : (
            results.map((item, i) => (
              <Link
                key={item.href}
                id={`${listId}-opt-${i}`}
                href={item.href}
                role="option"
                aria-selected={i === active}
                data-palette-index={i}
                className={`cmd-palette-item ${i === active ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
              >
                <span className="cmd-palette-item-title">{item.title}</span>
                <span className="cmd-palette-item-hint">{item.hint}</span>
              </Link>
            ))
          )}
        </div>
        <p className="cmd-palette-footer">
          <kbd>↑</kbd>
          <kbd>↓</kbd> move · <kbd>↵</kbd> open · <kbd>/</kbd> or{" "}
          <kbd>⌘K</kbd> toggle
        </p>
      </div>
    </div>
  );
}
