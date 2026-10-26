import type React from "react";
/** Lightweight SVG system flow mirroring ionizer → bubbler → resonator anatomy. */

type Props = {
  idPrefix?: string;
  className?: string;
  hideCaption?: boolean;
  /** Highlight 0=ionizer, 1=bubbler, 2=resonator; null = all equal. */
  highlight?: number | null;
  showFlow?: boolean;
};

export default function DeviceSystemFlow({
  idPrefix = "system-flow",
  className,
  hideCaption = false,
  highlight = null,
  showFlow = true,
}: Props) {
  const captionId = `${idPrefix}-caption`;
  const arrowId = `${idPrefix}-arr`;

  const stages = [
    { n: "1", title: "Ionizer", sub: "Air pretreatment", x: 40 },
    { n: "2", title: "Bubbler", sub: "Cavitation", x: 200 },
    { n: "3", title: "Resonator", sub: "Contra-rotating", x: 360 },
  ] as const;

  return (
    <figure
      className={className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-3xl"}
      aria-labelledby={hideCaption ? undefined : captionId}
    >
      <p className="fig-chip">Inventor claim · teaching model</p>
      <div className="fig-scroll" style={{ ["--fig-minw" as string]: "520px" } as React.CSSProperties}>
      <svg
        viewBox="0 0 520 250"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="System flow: air into the ionizer, then the bubbler (plasmoid generator), then the nested-sphere resonator. Hot exhaust from the engine enters one end of the resonator. The cool plasmoid stream leaves the inner sphere by pipe to the engine’s intake, just after the carburetor."
      >
        <defs>
          <marker
            id={arrowId}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-300" />
          </marker>
        </defs>

        {/* Air inlet label */}
        <text x="12" y="78" className="fill-mist-400" style={{ fontSize: 12 }}>
          air
        </text>
        {showFlow ? (
          <circle
            cx="18"
            cy="88"
            r="2.2"
            fill="rgb(var(--fig-air) / 0.8)"
            className="teach-flow-dot"
          />
        ) : null}

        {stages.map((s, i) => {
          const dim = highlight !== null && highlight !== i;
          const active = highlight === null || highlight === i;
          const cx = s.x + 50;
          return (
            <g
              key={s.n}
              opacity={dim ? 0.35 : 1}
              className="motion-safe:transition-opacity motion-safe:duration-500"
            >
              <rect
                x={s.x}
                y={36}
                width={100}
                height={100}
                rx={8}
                fill={
                  active && highlight !== null
                    ? "rgb(var(--aurora) / 0.06)"
                    : "rgb(var(--ink-800) / 0.25)"
                }
                stroke="currentColor"
                strokeWidth={active && highlight !== null ? 1.75 : 1.25}
                className={
                  active && highlight !== null ? "text-aurora/70" : "text-ink-600"
                }
              />

              {i === 0 && (
                <g aria-hidden="true">
                  <rect
                    x={cx - 12}
                    y={48}
                    width={24}
                    height={36}
                    rx={6}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-mist-300"
                  />
                  <circle cx={cx} cy={58} r={3.5} fill="rgb(var(--fig-violet) / 0.85)" className={showFlow ? "teach-soft-pulse" : undefined} />
                  <circle cx={cx - 4} cy={68} r={2.5} fill="rgb(var(--fig-violet) / 0.5)" />
                </g>
              )}
              {i === 1 && (
                <g aria-hidden="true">
                  <rect
                    x={cx - 14}
                    y={50}
                    width={28}
                    height={34}
                    rx={4}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-mist-300"
                  />
                  <path
                    d={`M ${cx - 11} 74 Q ${cx} 64 ${cx + 11} 74`}
                    fill="rgb(var(--fig-air) / 0.18)"
                    stroke="rgb(var(--fig-air) / 0.5)"
                    strokeWidth={1}
                  />
                  <circle cx={cx - 3} cy={60} r={2} fill="rgb(var(--fig-air) / 0.9)" className={showFlow ? "teach-soft-pulse" : undefined} />
                  <circle cx={cx + 4} cy={56} r={2.2} fill="rgb(var(--fig-air) / 0.7)" />
                </g>
              )}
              {i === 2 && (
                <g aria-hidden="true">
                  <circle
                    cx={cx}
                    cy={64}
                    r={16}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-mist-300"
                  />
                  <g
                    className={showFlow ? "teach-spin-cw" : undefined}
                    style={{ transformOrigin: `${cx}px 64px` }}
                  >
                    <circle
                      cx={cx}
                      cy={64}
                      r={10}
                      fill="none"
                      stroke="rgb(var(--fig-copper) / 0.85)"
                      strokeWidth={1.5}
                    />
                  </g>
                  <g
                    className={showFlow ? "teach-spin-ccw" : undefined}
                    style={{ transformOrigin: `${cx}px 64px` }}
                  >
                    <circle cx={cx} cy={64} r={4} fill="rgb(var(--fig-copper) / 0.9)" />
                  </g>
                </g>
              )}

              <text
                x={cx}
                y={102}
                textAnchor="middle"
                className="fill-aurora"
                style={{ fontSize: 12, fontFamily: "ui-monospace, monospace" }}
              >
                {s.n}
              </text>
              <text
                x={cx}
                y={118}
                textAnchor="middle"
                className="fill-mist-50"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {s.title}
              </text>
              <text
                x={cx}
                y={132}
                textAnchor="middle"
                className="fill-mist-400"
                style={{ fontSize: 12 }}
              >
                {s.sub}
              </text>

              {i < stages.length - 1 && (
                <g aria-hidden="true">
                  <path
                    d={`M ${s.x + 104} 86 L ${s.x + 156} 86`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-mist-400"
                    markerEnd={`url(#${arrowId})`}
                  />
                  {showFlow ? (
                    <circle
                      cx={s.x + 108}
                      cy={86}
                      r="2.2"
                      fill="rgb(var(--aurora) / 0.85)"
                      className="teach-flow-dot"
                      style={{ animationDelay: `${0.35 + i * 0.5}s` }}
                    />
                  ) : null}
                </g>
              )}
            </g>
          );
        })}

        {/* Engine: exhaust out to one end of the resonator; cool plasmoid stream back to the intake just after the carburetor */}
        <g aria-hidden="true">
          <rect
            x={200}
            y={164}
            width={100}
            height={40}
            rx={8}
            fill="rgb(var(--ink-800) / 0.25)"
            stroke="currentColor"
            strokeWidth={1}
            className="text-ink-600"
          />
          <text x={250} y={182} textAnchor="middle" className="fill-mist-50" style={{ fontSize: 12, fontWeight: 600 }}>
            Engine
          </text>
          <text x={250} y={196} textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
            after carburetor
          </text>

          {/* Hot exhaust: engine → resonator (outer cavity) */}
          <path
            d="M 302 194 Q 432 214 436 142"
            fill="none"
            stroke="rgb(var(--fig-exhaust) / 0.7)"
            strokeWidth={1.5}
            markerEnd={`url(#${arrowId})`}
          />
          <text x={474} y={200} textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
            hot exhaust in
          </text>

          {/* Cool plasmoid stream: resonator inner sphere → engine intake */}
          <path
            d="M 384 140 Q 372 174 304 174"
            fill="none"
            stroke="rgb(var(--aurora) / 0.85)"
            strokeWidth={1.5}
            markerEnd={`url(#${arrowId})`}
          />
          <text x={342} y={160} textAnchor="middle" className="fill-mist-400" style={{ fontSize: 12 }}>
            to intake
          </text>
        </g>
        {showFlow ? (
          <circle
            cx="306"
            cy="195"
            r="2"
            fill="rgb(var(--fig-exhaust) / 0.75)"
            className="teach-flow-dot"
            style={{ animationDelay: "1.1s", animationDuration: "3.2s" }}
          />
        ) : null}

        <text
          x="260"
          y="238"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 12 }}
        >
          Thunderstorm Generator — inventor-model flow
        </text>
      </svg>
      </div>
      {!hideCaption ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          System flow matching the accurate teaching sketch: air → ionizer →
          bubbler (plasmoid generator) → nested contra-rotating (CTR) resonator. Hot exhaust
          enters one end of the resonator; the cool plasmoid stream leaves the
          inner sphere by pipe to the engine’s intake, just after the carburetor.
        </figcaption>
      ) : null}
    </figure>
  );
}
