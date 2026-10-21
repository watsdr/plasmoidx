"use client";

import { useEffect, useState } from "react";

const KEY = "plasmoidx-modern";

/** Read on the client; root attribute is set before paint by the boot script in layout. */
function isOn() {
  return typeof document !== "undefined" && document.documentElement.dataset.modern === "on";
}

function apply(on: boolean) {
  const root = document.documentElement;
  if (on) root.dataset.modern = "on";
  else delete root.dataset.modern;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  // Cross-document page fade is opt-in via a style tag (cannot be scoped by selector).
  let vt = document.getElementById("modern-vt");
  if (on && !vt) {
    vt = document.createElement("style");
    vt.id = "modern-vt";
    vt.textContent = "@media (prefers-reduced-motion: no-preference){@view-transition{navigation:auto}}";
    document.head.appendChild(vt);
  } else if (!on && vt) vt.remove();
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
    </svg>
  );
}

/** "Modern" reader option: gentle motion effects. Off by default; reduced-motion always wins. */
export default function ModernToggle({ compact = false }: { compact?: boolean }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(isOn()), []);

  const toggle = () => {
    const next = !on;
    apply(next);
    setOn(next);
  };

  const title = on ? "Modern motion effects: on" : "Modern motion effects: off";

  if (compact) {
    return (
      <button
        type="button"
        aria-pressed={on}
        aria-label="Modern motion effects"
        title={title}
        onClick={toggle}
        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora ${
          on ? "text-aurora" : "text-mist-300 hover:text-mist-50"
        }`}
      >
        <SparkIcon />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      title={`${title}. Gentle fades, scroll reveals and a reading progress line.`}
      onClick={toggle}
      className={`min-h-11 rounded-full border border-ink-600/50 px-3 text-xs font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora ${
        on ? "bg-ink-800 text-mist-50" : "text-mist-400 hover:text-mist-100"
      }`}
    >
      Modern
    </button>
  );
}
