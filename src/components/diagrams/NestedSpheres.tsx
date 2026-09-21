/** Nested CTR spheres: outer / inner / core with gentle contra-rotation teaching cues. */

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
      <svg
        viewBox="0 0 360 300"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Nested contra-rotating spheres: large outer, smaller inner, tiny core, with opposing flow and exhaust inlet"
      >
        {/* Outer sphere shell */}
        <circle
          cx="170"
          cy="150"
          r="118"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-mist-300/70"
        />
        <circle
          cx="170"
          cy="150"
          r="112"
          fill="rgb(var(--ink-800) / 0.35)"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-ink-600"
        />

        {/* Inner sphere — CW marker ring */}
        <g className={spinCw} style={{ transformOrigin: "170px 150px" }}>
          <circle
            cx="170"
            cy="150"
            r="78"
            fill="none"
            stroke="rgb(196 140 92 / 0.9)"
            strokeWidth="2"
          />
          <circle
            cx="170"
            cy="150"
            r="72"
            fill="rgb(196 140 92 / 0.08)"
            stroke="rgb(196 140 92 / 0.45)"
            strokeWidth="1"
          />
          {/* Direction tick — clockwise cue */}
          <path
            d="M 170 78 A 72 72 0 0 1 238 130"
            fill="none"
            stroke="rgb(56 189 248 / 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd={`url(#${idPrefix}-cw)`}
          />
        </g>

        {/* Core + opposing (CCW) ring */}
        <g className={spinCcw} style={{ transformOrigin: "170px 150px" }}>
          <circle
            cx="170"
            cy="150"
            r="28"
            fill="rgb(196 140 92 / 0.85)"
            stroke="rgb(232 180 120 / 0.9)"
            strokeWidth="1.25"
          />
          <path
            d="M 170 118 A 32 32 0 0 0 138 150"
            fill="none"
            stroke="rgb(45 212 191 / 0.75)"
            strokeWidth="2"
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
          strokeWidth="1"
          strokeDasharray="4 5"
          className="text-mist-400/50"
        />

        {/* Exhaust / carburetor-in stub */}
        <g aria-hidden="true">
          <path
            d="M 288 118 L 248 138 L 252 148 L 292 128 Z"
            fill="rgb(196 140 92 / 0.55)"
            stroke="rgb(196 140 92 / 0.9)"
            strokeWidth="1.1"
          />
          <circle
            cx="262"
            cy="140"
            r="2.5"
            fill="rgb(94 234 212 / 0.85)"
            className={exhaust}
          />
          <text
            x="300"
            y="122"
            className="fill-mist-300"
            style={{ fontSize: 10 }}
          >
            Exhaust in
          </text>
        </g>

        {/* Labels */}
        <text x="170" y="42" textAnchor="middle" className="fill-mist-300" style={{ fontSize: 11 }}>
          Outer
        </text>
        <text x="170" y="98" textAnchor="middle" className="fill-aurora" style={{ fontSize: 10 }}>
          Inner · CW
        </text>
        <text x="170" y="156" textAnchor="middle" className="fill-ink-950" style={{ fontSize: 9, fontWeight: 600 }}>
          Core
        </text>
        <text x="170" y="188" textAnchor="middle" className="fill-mist-400" style={{ fontSize: 10 }}>
          CCW opposing
        </text>
        <text x="170" y="278" textAnchor="middle" className="fill-mist-400" style={{ fontSize: 11 }}>
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
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(56 189 248 / 0.85)" />
          </marker>
          <marker
            id={`${idPrefix}-ccw`}
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(45 212 191 / 0.85)" />
          </marker>
        </defs>
      </svg>
      {!hideCaption ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Catalytic tornado resonator cutaway: outer shell, inner sphere, and
          tiny core with opposing spins and an exhaust / carburetor-in stub.
          Inventor teaching model — not a product shot.
        </figcaption>
      ) : null}
    </figure>
  );
}
