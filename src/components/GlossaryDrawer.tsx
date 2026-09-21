"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { glossaryTerms } from "@/lib/glossary";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

type Props = {
  /** Called just before the drawer opens (e.g. close a mobile menu). */
  onOpen?: () => void;
  /** Extra classes for the trigger button. */
  triggerClassName?: string;
};

/** Site-wide glossary sheet. ESC / overlay closes; basic focus trap. */
export default function GlossaryDrawer({
  onOpen,
  triggerClassName,
}: Props = {}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    lastFocus.current = document.activeElement as HTMLElement | null;
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    header?.setAttribute("inert", "");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    closeRef.current?.focus();

    function getFocusable(): HTMLElement[] {
      if (!panel) return [];
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
      );
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = getFocusable();
      if (nodes.length === 0) {
        e.preventDefault();
        panel?.focus();
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

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      header?.removeAttribute("inert");
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={
          triggerClassName ??
          "relative min-h-11 rounded-md px-2 py-2 text-sm tracking-tight text-mist-300 transition-colors duration-200 hover:text-mist-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora sm:px-3"
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
      >
        Glossary
      </button>

      {open
        ? createPortal(
            <div className="glossary-root">
              <button
                type="button"
                className="glossary-overlay"
                aria-label="Close glossary"
                onClick={() => setOpen(false)}
              />
              <div
                ref={panelRef}
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className="glossary-panel"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">Terms</p>
                    <h2
                      id={titleId}
                      className="mt-2 text-lg font-medium tracking-tight text-mist-50"
                    >
                      Glossary
                    </h2>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    className="btn-ghost min-h-11 px-3 text-xs"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-mist-400">
                  Plain definitions with Study / Device links. Full index on{" "}
                  <Link
                    href="/glossary/"
                    className="link-aurora"
                    onClick={() => setOpen(false)}
                  >
                    /glossary/
                  </Link>
                  .
                </p>
                <dl className="mt-6 space-y-5">
                  {glossaryTerms.map((term) => (
                    <div key={term.abbr} id={`g-${term.abbr}`}>
                      <dt className="text-sm font-medium tracking-tight text-mist-50">
                        <span className="text-aurora">{term.abbr}</span>
                        <span className="mt-0.5 block text-[13px] font-normal text-mist-200">
                          {term.title}
                        </span>
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-mist-300">
                        {term.body}
                        {term.href ? (
                          <>
                            {" "}
                            <Link
                              href={term.href}
                              className="link-aurora text-xs"
                              onClick={() => setOpen(false)}
                            >
                              Open section
                            </Link>
                          </>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
