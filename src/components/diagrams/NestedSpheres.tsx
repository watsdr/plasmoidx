import type React from "react";
/** Nested CTR spheres (outer, inner, core) with exhaust inlet, intake outlet pipe, and gentle contra-rotation cues. */

type Props = {
  idPrefix?: string;
  className?: string;
  hideCaption?: boolean;
  /** When false, skip spin/exhaust CSS classes (manual step still works). */
  animate?: boolean;
};

export default function NestedSpheres({
  idPrefix = "nested-spheres",
  className,
  hideCaption = false,
  animate = true,
}: Props) {
  const captionId = `${idPrefix}-caption`;
  const spinCw = animate ? "teach-spin-cw" : "";
  const spinCcw = animate ? "teach-spin-ccw" : "";
  const exhaust = animate ? "teach-exhaust-in" : "";

  return (
    <figure
      className={className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-xl"}
      aria-labelledby={hideCaption ? undefined : captionId}
    >
      <p className="fig-chip">Inventor claim · teaching model</p>
      <div className="fig-scroll" style={{ ["--fig-minw" as string]: "360px" } as React.CSSProperties}>
      <svg
        viewBox="0 0 360 300"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Nested contra-rotating spheres: large outer, smaller inner, and tiny core with opposing spins. Hot exhaust comes in at one end. At the opposite end, a pipe carries the cool plasmoid stream from the inner sphere to the engine’s intake, just after the carburetor."
      >
        {/* Outer sphere shell */}
        <circle
          cx="170"
          cy="150"
          r="118"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="text-mist-300/70"
        />
        <circle
          cx="170"
          cy="150"
          r="112"
          fill="rgb(var(--ink-800) / 0.35)"
          stroke="currentColor"
          strokeWidth={1}
          className="text-ink-600"
        />

        {/* Inner sphere — CW marker ring */}
        <g className={spinCw} style={{ transformOrigin: "170px 150px" }}>
          <circle
            cx="170"
            cy="150"
            r="78"
            fill="none"
            stroke="rgb(var(--fig-copper) / 0.9)"
            strokeWidth={2}
          />
          <circle
            cx="170"
            cy="150"
            r="72"
            fill="rgb(var(--fig-copper) / 0.08)"
            stroke="rgb(var(--fig-copper) / 0.45)"
            strokeWidth={1}
          />
          {/* Direction tick — clockwise cue */}
          <path
            d="M 170 78 A 72 72 0 0 1 238 130"
            fill="none"
            stroke="rgb(var(--fig-air) / 0.7)"
            strokeWidth={2}
            strokeLinecap="round"
            markerEnd={`url(#${idPrefix}-cw)`}
          />
        </g>

        {/* Core + opposing (CCW) ring */}
        <g className={spinCcw} style={{ transformOrigin: "170px 150px" }}>
          <circle
            cx="170"
            cy="150"
            r="12"
            fill="rgb(var(--fig-copper) / 0.85)"
            stroke="rgb(var(--fig-copper) / 0.9)"
            strokeWidth={1}
          />
          <path
            d="M 170 130 A 20 20 0 0 0 150 150"
            fill="none"
            stroke="rgb(var(--aurora) / 0.75)"
            strokeWidth={2}
            strokeLinecap="round"
            markerEnd={`url(#${idPrefix}-ccw)`}
          />
        </g>

        {/* Soft zero-plane hint */}
        <line
          x1="98"
          y1="150"
          x2="242"
          y2="150"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4 5"
          className="text-mist-400/50"
        />

        {/* Exhaust inlet (one end of the resonator) */}
        <g aria-hidden="true">
          <path
            d="M 288 118 L 248 138 L 252 148 L 292 128 Z"
            fill="rgb(var(--fig-copper) / 0.55)"
            stroke="rgb(var(--fig-copper) / 0.9)"
            strokeWidth={1}
          />
          <circle
            cx="262"
            cy="140"
            r="2.5"
            fill="rgb(var(--aurora) / 0.85)"
            className={exhaust}
          />
          <text
            x="300"
            y="122"
            className="fill-mist-300"
            style={{ fontSize: 12 }}
          >
            Exhaust in
          </text>
        </g>

        {/* Outlet pipe: cool plasmoid stream leaves the inner sphere at the end opposite the exhaust inlet, to the engine intake just after the carburetor */}
        <g aria-hidden="true">
          <line
            x1="112"
            y1="197"
            x2="24"
            y2="240"
            stroke="rgb(var(--fig-copper) / 0.75)"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <line
            x1="108"
            y1="199"
            x2="30"
            y2="237"
            stroke="rgb(var(--aurora) / 0.85)"
            strokeWidth={2}
            strokeLinecap="round"
            markerEnd={`url(#${idPrefix}-out)`}
          />
          <text x="4" y="256" className="fill-mist-300" style={{ fontSize: 12 }}>
            To intake
          </text>
          <text x="4" y="267" className="fill-mist-400" style={{ fontSize: 12 }}>
            (after carburetor)
          </text>
        </g>

        {/* Labels */}
        <text x="170" y="42" textAnchor="middle" className="fill-mist-300" style={{ fontSize: 12 }}>
          Outer
        </text>
        <text x="170" y="98" textAnchor="middle" className="fill-aurora" style={{ fontSize: 12 }}>
          Inner · CW
        </text>
        <text x="170" y="178" textAnchor="middle" className="fill-mist-200" style={{ fontSize: 12, fontWeight: 600 }}>
          Core
        </text>
        <text x="170" y="194" textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
          CCW opposing
        </text>
        <text x="170" y="278" textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
          Nested CTR — contra-rotating spheres
        </text>

        <defs>
          <marker
            id={`${idPrefix}-cw`}
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--fig-air) / 0.85)" />
          </marker>
          <marker
            id={`${idPrefix}-ccw`}
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--aurora) / 0.85)" />
          </marker>
          <marker
            id={`${idPrefix}-out`}
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--aurora) / 0.9)" />
          </marker>
        </defs>
      </svg>
      </div>
      {!hideCaption ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Catalytic tornado resonator cutaway: outer shell, inner sphere, and
          tiny core with opposing spins. Hot exhaust comes in at one end; the cool plasmoid stream leaves the inner sphere by pipe to the engine’s intake, just after the carburetor.
          Inventor teaching model — not a product shot.
        </figcaption>
      ) : null}
    </figure>
  );
}
