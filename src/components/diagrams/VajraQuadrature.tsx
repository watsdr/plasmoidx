import type React from "react";
/** Plasmoid gun / vajra quadrature — opposing cone tiers, calm pulse teaching. */

type Props = {
  idPrefix?: string;
  className?: string;
  hideCaption?: boolean;
  /** 0 = base tier, 1 = upper tier, null = both with soft pulse. */
  highlight?: number | null;
  animate?: boolean;
};

export default function VajraQuadrature({
  idPrefix = "vajra",
  className,
  hideCaption = false,
  highlight = null,
  animate = true,
}: Props) {
  const captionId = `${idPrefix}-caption`;
  const showBase = highlight === null || highlight === 0;
  const showUpper = highlight === null || highlight === 1;
  const pulseBoth = animate && highlight === null;
  const pulseBase = animate && highlight === 0;
  const pulseUpper = animate && highlight === 1;

  const cx = 200;
  const cy = 140;

  function arm(
    angleDeg: number,
    len: number,
    color: string,
    pulseClass: string | undefined,
    opacity: number,
    key: string
  ) {
    const rad = (angleDeg * Math.PI) / 180;
    const x2 = cx + Math.cos(rad) * len;
    const y2 = cy + Math.sin(rad) * len;
    return (
      <g opacity={opacity} className={pulseClass} key={key}>
        <line
          x1={cx}
          y1={cy}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
        />
        <circle cx={x2} cy={y2} r="7" fill={color} opacity={0.95} />
      </g>
    );
  }

  const baseAngles = [0, 90, 180, 270];
  const upperAngles = [0, 90, 180, 270];

  return (
    <figure
      className={className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-md"}
      aria-labelledby={hideCaption ? undefined : captionId}
    >
      <p className="fig-chip">Inventor claim · teaching model</p>
      <div className="fig-scroll" style={{ ["--fig-minw" as string]: "400px" } as React.CSSProperties}>
      <svg
        viewBox="0 0 400 280"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Vajra quadrature: four base-tier cones and four upper-tier cones in cross-plus geometry"
      >
        <rect
          x="110"
          y="70"
          width="180"
          height="140"
          rx={8}
          fill="rgb(var(--ink-800) / 0.45)"
          stroke="currentColor"
          strokeWidth={1}
          className="text-ink-600"
        />
        <rect
          x="124"
          y="84"
          width="152"
          height="112"
          rx={6}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4 4"
          className="text-mist-400/40"
        />

        <g aria-hidden="true">
          {baseAngles.map((a) =>
            arm(
              a,
              62,
              "rgb(var(--fig-orange) / 0.9)",
              pulseBoth || pulseBase ? "teach-arm-pulse" : undefined,
              showBase ? 1 : 0.28,
              `base-${a}`
            )
          )}
        </g>

        <g aria-hidden="true">
          {upperAngles.map((a) =>
            arm(
              a,
              48,
              "rgb(var(--fig-gold) / 0.92)",
              pulseBoth
                ? "teach-arm-pulse-delay"
                : pulseUpper
                  ? "teach-arm-pulse"
                  : undefined,
              showUpper ? 1 : 0.28,
              `upper-${a}`
            )
          )}
        </g>

        <rect
          x={cx - 14}
          y={cy - 14}
          width={28}
          height={28}
          rx={4}
          fill="rgb(var(--ink-700) / 0.9)"
          stroke="currentColor"
          strokeWidth={1}
          className="text-mist-300"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - 38}
          stroke="rgb(var(--fig-gold) / 0.85)"
          strokeWidth={6}
          strokeLinecap="round"
          opacity={showUpper ? 1 : 0.28}
          className={pulseUpper || pulseBoth ? "teach-soft-pulse" : undefined}
        />

        <text
          x="200"
          y="36"
          textAnchor="middle"
          className="fill-mist-50"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          Vajra (plasmoid gun)
        </text>
        <text
          x="200"
          y="54"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 12 }}
        >
          Quadrature cross-plus geometry
        </text>
        {/* Legend with swatches matching the arm colors */}
        <g aria-hidden="true">
          <rect x={112} y={240} width={12} height={12} rx={2} fill="rgb(var(--fig-orange) / 0.9)" />
          <text x={130} y={250} className="fill-mist-300" style={{ fontSize: 12 }}>
            Base tier
          </text>
          <rect x={210} y={240} width={12} height={12} rx={2} fill="rgb(var(--fig-gold) / 0.92)" />
          <text x={228} y={250} className="fill-mist-300" style={{ fontSize: 12 }}>
            Upper tier
          </text>
        </g>
        <text
          x="200"
          y="270"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 12 }}
        >
          Opposing, interlocking cone arms
        </text>
      </svg>
      </div>
      {!hideCaption ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Simplified teaching model: four base-tier cones and four upper-tier
          cones interlock in cross-plus (quadrature) geometry — not a product
          photo.
        </figcaption>
      ) : null}
    </figure>
  );
}
