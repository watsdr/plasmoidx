/** Quiet local “got it” cue — no glow, no accounts. */

export default function GotItCheck({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] tracking-tight text-aurora"
      role="status"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M2.4 6.2 L5 8.7 L9.6 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      got it
    </span>
  );
}
