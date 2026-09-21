/** Three device beats: ionizer chamber → bubbler / plasmoid generator → CTR resonator. */

type Props = {
  /** 0-based step to highlight; omit or null for equal weight. */
  highlight?: number | null;
  /** Prefix for SVG marker / caption ids when multiple instances share a page. */
  idPrefix?: string;
  className?: string;
  /** Hide default figcaption when a parent lab supplies live copy. */
  hideCaption?: boolean;
  /** Subtle air→ionizer→bubbler→resonator flow dots (CSS; frozen under reduced-motion). */
  showFlow?: boolean;
};

export default function DeviceBeats({
  highlight = null,
  idPrefix = "device-beats",
  className,
  hideCaption = false,
  showFlow = false,
}: Props) {
  const beats = [
    { n: "01", title: "Ionizer", sub: "Air pretreatment" },
    { n: "02", title: "Bubbler", sub: "Cavitation → EVOs" },
    { n: "03", title: "Resonator", sub: "Nested CTR spheres" },
  ];
  const captionId = `${idPrefix}-caption`;
  const arrowId = `${idPrefix}-arrow`;

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-2xl"
      }
      aria-labelledby={hideCaption ? undefined : captionId}
    >
      <svg
        viewBox="0 0 520 168"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Three steps: air ionizer chamber, bubbler plasmoid generator, then catalytic tornado resonator with nested CTR spheres"
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
            <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-400" />
          </marker>
        </defs>

        {/* Inlet cue: air → ionizer */}
        {showFlow ? (
          <g aria-hidden="true">
            <text
              x="14"
              y="76"
              className="fill-mist-400"
              style={{ fontSize: 9 }}
            >
              air
            </text>
            <circle
              cx="8"
              cy="68"
              r="2.25"
              fill="rgb(56 189 248 / 0.75)"
              className="teach-flow-dot"
              style={{ animationDelay: "0s" }}
            />
          </g>
        ) : null}

        {beats.map((b, i) => {
          const x = 28 + i * 168;
          const active = highlight === null || highlight === i;
          const dim = highlight !== null && highlight !== i;
          const cx = x + 64;
          return (
            <g
              key={b.n}
              opacity={dim ? 0.35 : 1}
              className="motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out"
            >
              <rect
                x={x}
                y={16}
                width={128}
                height={112}
                rx={12}
                fill={
                  active && highlight !== null
                    ? "rgb(var(--aurora) / 0.06)"
                    : "none"
                }
                stroke="currentColor"
                strokeWidth={active && highlight !== null ? 1.75 : 1.35}
                className={
                  active && highlight !== null
                    ? "text-aurora/70 motion-safe:transition-[stroke-width,fill] motion-safe:duration-500"
                    : "text-ink-600 motion-safe:transition-[stroke-width,fill] motion-safe:duration-500"
                }
              />

              {/* Compact icon cue per beat */}
              {i === 0 && (
                <g aria-hidden="true">
                  <rect
                    x={cx - 10}
                    y={28}
                    width={20}
                    height={28}
                    rx={4}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-mist-300"
                  />
                  <circle cx={cx} cy={36} r={3.5} fill="rgb(167 139 250 / 0.85)" />
                  <circle cx={cx - 4} cy={44} r={2.5} fill="rgb(167 139 250 / 0.55)" />
                  <circle cx={cx + 3} cy={48} r={2} fill="rgb(167 139 250 / 0.7)" />
                </g>
              )}
              {i === 1 && (
                <g aria-hidden="true">
                  <rect
                    x={cx - 11}
                    y={30}
                    width={22}
                    height={26}
                    rx={3}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-mist-300"
                  />
                  <path
                    d={`M ${cx - 9} 48 Q ${cx} 40 ${cx + 9} 48`}
                    fill="rgb(56 189 248 / 0.2)"
                    stroke="rgb(56 189 248 / 0.55)"
                    strokeWidth="1"
                  />
                  <circle cx={cx - 4} cy={40} r={2} fill="rgb(186 230 253 / 0.9)" />
                  <circle cx={cx + 3} cy={36} r={2.5} fill="rgb(186 230 253 / 0.75)" />
                  <circle cx={cx} cy={44} r={1.75} fill="rgb(186 230 253 / 0.85)" />
                </g>
              )}
              {i === 2 && (
                <g aria-hidden="true">
                  <circle
                    cx={cx}
                    cy={42}
                    r={12}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-mist-300"
                  />
                  <circle
                    cx={cx}
                    cy={42}
                    r={7.5}
                    fill="none"
                    stroke="rgb(196 140 92 / 0.85)"
                    strokeWidth="1.35"
                  />
                  <circle cx={cx} cy={42} r={3} fill="rgb(196 140 92 / 0.9)" />
                </g>
              )}

              <text
                x={cx}
                y={70}
                textAnchor="middle"
                className="fill-aurora"
                style={{
                  fontSize: 10,
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.06em",
                }}
              >
                {b.n}
              </text>
              <text
                x={cx}
                y={90}
                textAnchor="middle"
                className="fill-mist-50"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                {b.title}
              </text>
              <text
                x={cx}
                y={108}
                textAnchor="middle"
                className="fill-mist-400"
                style={{ fontSize: 10 }}
              >
                {b.sub}
              </text>
              {i < beats.length - 1 && (
                <g aria-hidden="true">
                  <path
                    d={`M ${x + 136} 72 L ${x + 160} 72`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-mist-400"
                    markerEnd={`url(#${arrowId})`}
                  />
                  {showFlow ? (
                    <circle
                      cx={x + 138}
                      cy={72}
                      r="2.25"
                      fill="rgb(94 234 212 / 0.85)"
                      className="teach-flow-dot"
                      style={{ animationDelay: `${0.4 + i * 0.55}s` }}
                    />
                  ) : null}
                </g>
              )}
            </g>
          );
        })}

        <text
          x="260"
          y="156"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Inventor-model path in the metal
        </text>
      </svg>
      {!hideCaption ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Linear flow through the Bendall Thunderstorm Generator retrofit
          (inventor teaching model): air ionizer / pre-ionization chamber →
          bubbler / plasmoid generator (cavitation) → catalytic tornado
          resonator with nested contra-rotating spheres.
        </figcaption>
      ) : null}
    </figure>
  );
}
