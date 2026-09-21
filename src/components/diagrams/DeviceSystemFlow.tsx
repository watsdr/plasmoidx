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
    { n: "2", title: "Bubbler", sub: "Cavitation → EVOs", x: 200 },
    { n: "3", title: "Resonator", sub: "Nested CTR", x: 360 },
  ] as const;

  return (
    <figure
      className={className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-3xl"}
      aria-labelledby={hideCaption ? undefined : captionId}
    >
      <svg
        viewBox="0 0 520 200"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="System flow: air into ionizer, then bubbler plasmoid generator, then nested-sphere resonator with exhaust feedback"
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
        <text x="12" y="78" className="fill-mist-400" style={{ fontSize: 10 }}>
          air
        </text>
        {showFlow ? (
          <circle
            cx="18"
            cy="88"
            r="2.2"
            fill="rgb(56 189 248 / 0.8)"
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
                rx={10}
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
                    rx={5}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-mist-300"
                  />
                  <circle cx={cx} cy={58} r={3.5} fill="rgb(167 139 250 / 0.85)" className={showFlow ? "teach-soft-pulse" : undefined} />
                  <circle cx={cx - 4} cy={68} r={2.5} fill="rgb(167 139 250 / 0.5)" />
                </g>
              )}
              {i === 1 && (
                <g aria-hidden="true">
                  <rect
                    x={cx - 14}
                    y={50}
                    width={28}
                    height={34}
                    rx={3}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-mist-300"
                  />
                  <path
                    d={`M ${cx - 11} 74 Q ${cx} 64 ${cx + 11} 74`}
                    fill="rgb(56 189 248 / 0.18)"
                    stroke="rgb(56 189 248 / 0.5)"
                    strokeWidth="1"
                  />
                  <circle cx={cx - 3} cy={60} r={2} fill="rgb(186 230 253 / 0.9)" className={showFlow ? "teach-soft-pulse" : undefined} />
                  <circle cx={cx + 4} cy={56} r={2.2} fill="rgb(186 230 253 / 0.7)" />
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
                    strokeWidth="1.2"
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
                      stroke="rgb(196 140 92 / 0.85)"
                      strokeWidth="1.4"
                    />
                  </g>
                  <g
                    className={showFlow ? "teach-spin-ccw" : undefined}
                    style={{ transformOrigin: `${cx}px 64px` }}
                  >
                    <circle cx={cx} cy={64} r={4} fill="rgb(196 140 92 / 0.9)" />
                  </g>
                </g>
              )}

              <text
                x={cx}
                y={102}
                textAnchor="middle"
                className="fill-aurora"
                style={{ fontSize: 10, fontFamily: "ui-monospace, monospace" }}
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
                style={{ fontSize: 9 }}
              >
                {s.sub}
              </text>

              {i < stages.length - 1 && (
                <g aria-hidden="true">
                  <path
                    d={`M ${s.x + 104} 86 L ${s.x + 156} 86`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="text-mist-400"
                    markerEnd={`url(#${arrowId})`}
                  />
                  {showFlow ? (
                    <circle
                      cx={s.x + 108}
                      cy={86}
                      r="2.2"
                      fill="rgb(94 234 212 / 0.85)"
                      className="teach-flow-dot"
                      style={{ animationDelay: `${0.35 + i * 0.5}s` }}
                    />
                  ) : null}
                </g>
              )}
            </g>
          );
        })}

        {/* Exhaust feedback arc under bubbler → resonator */}
        <path
          d="M 250 148 Q 300 178 360 148"
          fill="none"
          stroke="rgb(248 113 113 / 0.55)"
          strokeWidth="1.35"
          markerEnd={`url(#${arrowId})`}
        />
        <text
          x="300"
          y="176"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10 }}
        >
          exhaust feedback
        </text>
        {showFlow ? (
          <circle
            cx="260"
            cy="152"
            r="2"
            fill="rgb(248 113 113 / 0.7)"
            className="teach-flow-dot"
            style={{ animationDelay: "1.1s", animationDuration: "3.2s" }}
          />
        ) : null}

        <text
          x="260"
          y="194"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Thunderstorm Generator — inventor-model flow
        </text>
      </svg>
      {!hideCaption ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          System flow matching the accurate teaching sketch: air → ionizer →
          bubbler / plasmoid generator → nested CTR resonator, with exhaust
          feedback into the resonator base.
        </figcaption>
      ) : null}
    </figure>
  );
}
