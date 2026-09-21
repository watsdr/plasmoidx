"use client";

import { useTheme } from "@/components/ThemeProvider";
import type { ThemePreference } from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

const CYCLE: ThemePreference[] = ["dark", "light", "system"];

function ThemeIcon({ preference }: { preference: ThemePreference }) {
  if (preference === "light") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1" />
      </svg>
    );
  }
  if (preference === "system") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z" />
    </svg>
  );
}

type Props = {
  /** Single icon button that cycles Dark → Light → System (for narrow headers). */
  compact?: boolean;
};

/** Compact Dark / Light / System control for the header. */
export default function ThemeToggle({ compact = false }: Props) {
  const { preference, setPreference } = useTheme();

  if (compact) {
    const next =
      CYCLE[(CYCLE.indexOf(preference) + 1) % CYCLE.length] ?? "dark";
    const label =
      OPTIONS.find((o) => o.value === preference)?.label ?? preference;

    return (
      <button
        type="button"
        aria-label={`Color theme: ${label}. Activate to switch.`}
        title={`Theme: ${label}`}
        onClick={() => setPreference(next)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-mist-300 transition-colors hover:text-mist-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
      >
        <ThemeIcon preference={preference} />
      </button>
    );
  }

  return (
    <div
      className="flex items-center rounded-full border border-ink-600/50 p-0.5"
      role="group"
      aria-label="Color theme"
    >
      {OPTIONS.map((opt) => {
        const active = preference === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => setPreference(opt.value)}
            className={`min-h-11 rounded-full px-2.5 text-xs font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora sm:px-3 ${
              active
                ? "bg-ink-800 text-mist-50"
                : "text-mist-400 hover:text-mist-100"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
