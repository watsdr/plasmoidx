/** 3-4-5 → Area–Time–Volume teaching graphic. */

export type AtvSide = "area" | "time" | "volume";

type Props = {
  highlight?: AtvSide | null;
  className?: string;
  captionId?: string;
};

export default function AtvTriangle({
  highlight = null,
  className,
  captionId = "atv-triangle-caption",
}: Props) {
  const on = (s: AtvSide) => highlight === null || highlight === s;
  const edge = (s: AtvSide) => highlight === s;

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-md"
      }
      aria-labelledby={captionId}
    >
      <svg
        viewBox="0 0 360 240"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Right triangle with sides 3, 4, and 5 mapped to Area, Time, and Volume"
      >
        {/* Base fill outline (quiet) */}
        <path
          d="M 80 180 L 80 60 L 240 180 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-ink-700"
        />

        {/* Side 3 — vertical — Area */}
        <path
          d="M 80 180 L 80 60"
          fill="none"
          stroke="currentColor"
          strokeWidth={edge("area") ? 2.5 : 1.75}
          opacity={on("area") ? 1 : 0.3}
          className={
            edge("area")
              ? "text-aurora motion-safe:transition-opacity motion-safe:duration-200"
              : "text-ink-600 motion-safe:transition-opacity motion-safe:duration-200"
          }
        />
        {/* Side 4 — horizontal — Time */}
        <path
          d="M 80 180 L 240 180"
          fill="none"
          stroke="currentColor"
          strokeWidth={edge("time") ? 2.5 : 1.75}
          opacity={on("time") ? 1 : 0.3}
          className={
            edge("time")
              ? "text-aurora motion-safe:transition-opacity motion-safe:duration-200"
              : "text-ink-600 motion-safe:transition-opacity motion-safe:duration-200"
          }
        />
        {/* Side 5 — hypotenuse — Volume */}
        <path
          d="M 80 60 L 240 180"
          fill="none"
          stroke="currentColor"
          strokeWidth={edge("volume") ? 2.5 : 1.75}
          opacity={on("volume") ? 1 : 0.3}
          className={
            edge("volume")
              ? "text-aurora motion-safe:transition-opacity motion-safe:duration-200"
              : "text-ink-600 motion-safe:transition-opacity motion-safe:duration-200"
          }
        />

        <path
          d="M 80 160 L 100 160 L 100 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-mist-400"
        />

        <text
          x="58"
          y="124"
          textAnchor="middle"
          opacity={on("area") ? 1 : 0.35}
          className={edge("area") ? "fill-aurora" : "fill-aurora"}
          style={{ fontSize: 16, fontWeight: 600, fontFamily: "ui-monospace, monospace" }}
        >
          3
        </text>
        <text
          x="160"
          y="202"
          textAnchor="middle"
          opacity={on("time") ? 1 : 0.35}
          className="fill-aurora"
          style={{ fontSize: 16, fontWeight: 600, fontFamily: "ui-monospace, monospace" }}
        >
          4
        </text>
        <text
          x="180"
          y="108"
          textAnchor="middle"
          opacity={on("volume") ? 1 : 0.35}
          className="fill-aurora"
          style={{ fontSize: 16, fontWeight: 600, fontFamily: "ui-monospace, monospace" }}
        >
          5
        </text>

        {(
          [
            ["area", "Area", 48],
            ["time", "Time", 88],
            ["volume", "Volume", 128],
          ] as const
        ).map(([key, label, y]) => (
          <g key={key} opacity={on(key) ? 1 : 0.35}>
            <rect
              x="248"
              y={y}
              width="92"
              height="28"
              rx="6"
              fill={edge(key) ? "rgb(var(--aurora) / 0.08)" : "none"}
              stroke="currentColor"
              strokeWidth={edge(key) ? 1.5 : 1.25}
              className={edge(key) ? "text-aurora/70" : "text-ink-600"}
            />
            <text
              x="294"
              y={y + 18}
              textAnchor="middle"
              className="fill-mist-100"
              style={{ fontSize: 12, fontWeight: 500 }}
            >
              {label}
            </text>
          </g>
        ))}

        <text
          x="180"
          y="28"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10, letterSpacing: "0.12em" }}
        >
          3-4-5 → ATV
        </text>
        <text
          x="180"
          y="228"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Area · Time · Volume calculator
        </text>
      </svg>
      {highlight === null ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          The 3-4-5 triangle seeds Area–Time–Volume (ATV) bookkeeping in the
          model — a teaching calculator, not a mainstream physics claim.
        </figcaption>
      ) : null}
    </figure>
  );
}
