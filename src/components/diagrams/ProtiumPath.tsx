/** Visual flow: Water → Cavitation → Plasmoids → CTR → Harvest ¹H → Work. */

export const protiumSteps = [
  { label: "Water", short: "H₂O" },
  { label: "Cavitation", short: "collapse" },
  { label: "Plasmoids", short: "EVOs" },
  { label: "CTR", short: "charge" },
  { label: "Harvest ¹H", short: "protium" },
  { label: "Work", short: "output" },
] as const;

type Props = {
  activeStep?: number | null;
  className?: string;
  captionId?: string;
};

export default function ProtiumPath({
  activeStep = null,
  className,
  captionId = "protium-path-caption",
}: Props) {
  const boxW = 64;
  const boxH = 52;
  const gap = 18;
  const startX = 12;
  const y = 36;
  const totalW =
    startX * 2 + protiumSteps.length * boxW + (protiumSteps.length - 1) * gap;

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-3xl"
      }
      aria-labelledby={captionId}
    >
      <svg
        viewBox={`0 0 ${totalW} 130`}
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Six-step protium path from water through cavitation and plasmoids to work"
      >
        <defs>
          <marker
            id="path-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-400" />
          </marker>
        </defs>

        {protiumSteps.map((s, i) => {
          const x = startX + i * (boxW + gap);
          const isLast = i === protiumSteps.length - 1;
          const on = activeStep === null || activeStep === i;
          const active = activeStep === i;
          return (
            <g
              key={s.label}
              opacity={on ? 1 : 0.3}
              className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
            >
              <rect
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx={8}
                fill={active ? "rgb(var(--aurora) / 0.08)" : "none"}
                stroke="currentColor"
                strokeWidth={active ? 1.75 : 1.25}
                className={
                  active || (activeStep === null && (i === 0 || isLast))
                    ? "text-aurora/70"
                    : "text-ink-600"
                }
              />
              <text
                x={x + boxW / 2}
                y={y + 22}
                textAnchor="middle"
                className="fill-mist-50"
                style={{ fontSize: 11, fontWeight: 500 }}
              >
                {s.label}
              </text>
              <text
                x={x + boxW / 2}
                y={y + 38}
                textAnchor="middle"
                className="fill-mist-400"
                style={{ fontSize: 10 }}
              >
                {s.short}
              </text>
              {!isLast && (
                <path
                  d={`M ${x + boxW + 2} ${y + boxH / 2} L ${x + boxW + gap - 4} ${y + boxH / 2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-mist-400"
                  markerEnd="url(#path-arrow)"
                />
              )}
            </g>
          );
        })}

        <text
          x={totalW / 2}
          y={118}
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Inventor narrative path · leftovers trend toward water
        </text>
      </svg>
      {activeStep === null ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Protium path at a glance: water → cavitation → plasmoid EVOs →
          contra-rotating (CTR) charge → harvest ¹H → work.
        </figcaption>
      ) : null}
    </figure>
  );
}
