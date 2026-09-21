/** Side-by-side: implosive (inward/store) vs explosive (outward/spend). */

export type ImplosiveSide = "implosive" | "explosive";

type Props = {
  /** Dim the other side when set. */
  highlight?: ImplosiveSide | null;
  className?: string;
  captionId?: string;
};

export default function ImplosiveVsExplosive({
  highlight = null,
  className,
  captionId = "implosive-explosive-caption",
}: Props) {
  const leftDim = highlight === "explosive";
  const rightDim = highlight === "implosive";
  const leftOn = highlight === "implosive";
  const rightOn = highlight === "explosive";

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-xl"
      }
      aria-labelledby={captionId}
    >
      <svg
        viewBox="0 0 480 220"
        className="h-auto w-full max-w-full motion-safe:transition-[opacity] motion-safe:duration-200 motion-safe:ease-out"
        role="img"
        aria-label="Implosive inward store on the left versus explosive outward spend on the right"
      >
        <defs>
          <marker
            id="imp-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-aurora" />
          </marker>
          <marker
            id="exp-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-300" />
          </marker>
        </defs>

        <g
          opacity={leftDim ? 0.35 : 1}
          className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
        >
          <rect
            x="16"
            y="16"
            width="200"
            height="168"
            rx="12"
            fill={leftOn ? "rgb(var(--aurora) / 0.06)" : "none"}
            stroke="currentColor"
            strokeWidth={leftOn ? 1.75 : 1.25}
            className={leftOn ? "text-aurora/70" : "text-ink-600"}
          />
          <text
            x="116"
            y="40"
            textAnchor="middle"
            className="fill-aurora"
            style={{ fontSize: 11, letterSpacing: "0.12em", fontWeight: 600 }}
          >
            IMPLOSIVE
          </text>
          <circle
            cx="116"
            cy="100"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-aurora/80"
          />
          <circle
            cx="116"
            cy="100"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-aurora"
          />
          <path
            d="M 116 58 A 42 42 0 0 1 158 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-aurora"
            markerEnd="url(#imp-arrow)"
          />
          <path
            d="M 148 128 L 130 112"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-aurora"
            markerEnd="url(#imp-arrow)"
          />
          <path
            d="M 84 128 L 102 112"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-aurora"
            markerEnd="url(#imp-arrow)"
          />
          <text
            x="116"
            y="158"
            textAnchor="middle"
            className="fill-mist-100"
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            Inward · clockwise
          </text>
          <text
            x="116"
            y="174"
            textAnchor="middle"
            className="fill-mist-400"
            style={{ fontSize: 11 }}
          >
            Store · negative
          </text>
        </g>

        <g
          opacity={rightDim ? 0.35 : 1}
          className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
        >
          <rect
            x="264"
            y="16"
            width="200"
            height="168"
            rx="12"
            fill={rightOn ? "rgb(var(--aurora) / 0.06)" : "none"}
            stroke="currentColor"
            strokeWidth={rightOn ? 1.75 : 1.25}
            className={rightOn ? "text-mist-200" : "text-ink-600"}
          />
          <text
            x="364"
            y="40"
            textAnchor="middle"
            className="fill-mist-300"
            style={{ fontSize: 11, letterSpacing: "0.12em", fontWeight: 600 }}
          >
            EXPLOSIVE
          </text>
          <circle
            cx="364"
            cy="100"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-mist-300/70"
          />
          <circle
            cx="364"
            cy="100"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-mist-300"
          />
          <path
            d="M 364 58 A 42 42 0 0 0 322 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-mist-300"
            markerEnd="url(#exp-arrow)"
          />
          <path
            d="M 390 112 L 408 128"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-mist-300"
            markerEnd="url(#exp-arrow)"
          />
          <path
            d="M 338 112 L 320 128"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-mist-300"
            markerEnd="url(#exp-arrow)"
          />
          <text
            x="364"
            y="158"
            textAnchor="middle"
            className="fill-mist-100"
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            Outward · anticlockwise
          </text>
          <text
            x="364"
            y="174"
            textAnchor="middle"
            className="fill-mist-400"
            style={{ fontSize: 11 }}
          >
            Spend · positive
          </text>
        </g>
      </svg>
      {!highlight ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Model teaching from inventor lectures: implosive tech stores inward;
          explosive tech spends outward. Pair with direction = charge. Claims
          labeled.
        </figcaption>
      ) : null}
    </figure>
  );
}
