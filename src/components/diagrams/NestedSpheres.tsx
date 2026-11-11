import type React from "react";
/** Nested CTR spheres drawn 4:3:2 (Hall 2026 thesis p.19; WO2025158126A1): exhaust in the outer cavity (CCW), bubbler stream in the inner cavity (CW), intake outlet at the exhaust end (Hall p.21). */

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
        aria-label="Cutaway of one of the resonator’s two nested-sphere sets, drawn to the inventor’s 4∶3∶2 size ratio: outer sphere, middle sphere and inner core. Hot exhaust enters the outer cavity at an angle and spins anticlockwise. The cool stream from the bubbler, arriving through the nested pipe from the other sphere set, spins clockwise in the inner cavity. The metal of the middle sphere keeps the two streams apart. At the exhaust end, the inner pipe carries the cool stream to the engine’s intake, just after the carburetor."
      >
        {/* Outer sphere shell (diameter 4) */}
        <circle cx="170" cy="150" r="118" fill="none" stroke="currentColor" strokeWidth={2} className="text-mist-300/70" />
        <circle cx="170" cy="150" r="112" fill="rgb(var(--ink-800) / 0.35)" stroke="currentColor" strokeWidth={1} className="text-ink-600" />

        {/* Outer cavity: hot exhaust, anticlockwise */}
        <g className={spinCcw} style={{ transformOrigin: "170px 150px" }}>
          <path
            d="M 264.7 124.6 A 98 98 0 0 0 170 52"
            fill="none"
            stroke="rgb(var(--fig-exhaust) / 0.8)"
            strokeWidth={2}
            strokeLinecap="round"
            markerEnd={`url(#${idPrefix}-ccw)`}
          />
        </g>

        {/* Middle sphere (diameter 3) with the inner cavity's clockwise cue */}
        <g className={spinCw} style={{ transformOrigin: "170px 150px" }}>
          <circle cx="170" cy="150" r="84" fill="none" stroke="rgb(var(--fig-copper) / 0.9)" strokeWidth={2} />
          <path
            d="M 170 220 A 70 70 0 0 1 120.5 199.5"
            fill="none"
            stroke="rgb(var(--fig-air) / 0.75)"
            strokeWidth={2}
            strokeLinecap="round"
            markerEnd={`url(#${idPrefix}-cw)`}
          />
        </g>

        {/* Inner core / flow guide (diameter 2) */}
        <circle cx="170" cy="150" r="56" fill="rgb(var(--fig-copper) / 0.12)" stroke="rgb(var(--fig-copper) / 0.85)" strokeWidth={1.5} />

        {/* Exhaust inlet: angled, into the outer cavity at this end */}
        <g aria-hidden="true">
          <path d="M 300 52 L 252 86 L 260 96 L 308 62 Z" fill="rgb(var(--fig-copper) / 0.55)" stroke="rgb(var(--fig-copper) / 0.9)" strokeWidth={1} />
          <circle cx="268" cy="80" r="2.5" fill="rgb(var(--fig-exhaust) / 0.85)" className={exhaust} />
          <text x="356" y="22" textAnchor="end" className="fill-mist-300" style={{ fontSize: 12 }}>
            Hot exhaust in
          </text>
        </g>

        {/* Inner pipe out at the same (exhaust) end: cool stream to the engine intake */}
        <g aria-hidden="true">
          <line x1="226" y1="150" x2="350" y2="150" stroke="rgb(var(--fig-copper) / 0.75)" strokeWidth={7} strokeLinecap="round" />
          <line x1="230" y1="150" x2="344" y2="150" stroke="rgb(var(--aurora) / 0.9)" strokeWidth={2} strokeLinecap="round" markerEnd={`url(#${idPrefix}-out)`} />
          <text x="356" y="176" textAnchor="end" className="fill-mist-300" style={{ fontSize: 12 }}>
            To intake
          </text>
          <text x="356" y="191" textAnchor="end" className="fill-mist-400" style={{ fontSize: 12 }}>
            (after carburetor)
          </text>
        </g>

        {/* Nested pipe to the other sphere set: the bubbler stream arrives here */}
        <g aria-hidden="true">
          <line x1="4" y1="150" x2="58" y2="150" stroke="rgb(var(--fig-copper) / 0.75)" strokeWidth={7} strokeLinecap="round" />
          <line x1="8" y1="150" x2="84" y2="150" stroke="rgb(var(--fig-air) / 0.85)" strokeWidth={2} strokeLinecap="round" markerEnd={`url(#${idPrefix}-cw)`} />
          <text x="4" y="262" className="fill-mist-300" style={{ fontSize: 12 }}>
            From bubbler,
          </text>
          <text x="4" y="277" className="fill-mist-400" style={{ fontSize: 12 }}>
            via other sphere set
          </text>
          <line x1="30" y1="248" x2="30" y2="158" stroke="currentColor" strokeWidth={1} className="text-mist-400/70" />
        </g>

        {/* Labels */}
        <text x="4" y="22" className="fill-mist-300" style={{ fontSize: 12 }}>
          Outer cavity · exhaust · anticlockwise
        </text>
        <text x="170" y="88" textAnchor="middle" className="fill-aurora" style={{ fontSize: 12 }}>
          Inner cavity · clockwise
        </text>
        <text x="170" y="154" textAnchor="middle" className="fill-mist-200" style={{ fontSize: 12, fontWeight: 600 }}>
          Core
        </text>
        <text x="170" y="169" textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
          (flow guide)
        </text>
        <text x="170" y="290" textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
          Nested CTR spheres · sizes 4∶3∶2 · one of two sets
        </text>

        <defs>
          <marker id={`${idPrefix}-cw`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--fig-air) / 0.85)" />
          </marker>
          <marker id={`${idPrefix}-ccw`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--fig-exhaust) / 0.85)" />
          </marker>
          <marker id={`${idPrefix}-out`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
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
          Catalytic tornado resonator cutaway, one of its two nested-sphere sets,
          drawn to the inventor’s 4∶3∶2 size ratio. Hot exhaust spins
          anticlockwise in the outer cavity; the cool stream from the bubbler
          spins clockwise in the inner cavity, kept apart by the middle sphere’s
          metal. At the exhaust end, the inner pipe carries the cool stream to
          the engine’s intake, just after the carburetor. Inventor teaching
          model — not a product shot.
        </figcaption>
      ) : null}
    </figure>
  );
}
