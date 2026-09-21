/** Donut / toroid cross-section: cavitation birth → self-contained EVO field. */

type Props = {
  /** 0 bubble · 1 collapse · 2 donut EVO · 3 charged field. null = equal weight. */
  activeStep?: number | null;
  className?: string;
  captionId?: string;
};

export default function PlasmoidEvo({
  activeStep = null,
  className,
  captionId = "plasmoid-evo-caption",
}: Props) {
  const focus = (i: number) =>
    activeStep === null || activeStep === i || (activeStep === 3 && i === 2);
  const dim = (i: number) => activeStep !== null && !focus(i);
  const chargeOn = activeStep === 3;

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-lg"
      }
      aria-labelledby={captionId}
    >
      <svg
        viewBox="0 0 440 210"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Bubble collapse leading to a toroidal plasmoid energetic vacuum object"
      >
        <defs>
          <marker
            id="evo-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-400" />
          </marker>
        </defs>

        <g
          opacity={dim(0) ? 0.3 : 1}
          className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
        >
          <text
            x="70"
            y="28"
            textAnchor="middle"
            className={activeStep === 0 ? "fill-aurora" : "fill-mist-400"}
            style={{ fontSize: 10, letterSpacing: "0.1em" }}
          >
            01 · BUBBLE
          </text>
          <circle
            cx="70"
            cy="100"
            r="32"
            fill={activeStep === 0 ? "rgb(var(--aurora) / 0.05)" : "none"}
            stroke="currentColor"
            strokeWidth={activeStep === 0 ? 1.75 : 1.5}
            className={activeStep === 0 ? "text-aurora/80" : "text-ink-600"}
          />
          <circle
            cx="70"
            cy="100"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 2"
            className="text-mist-400"
          />
          <text
            x="70"
            y="160"
            textAnchor="middle"
            className="fill-mist-300"
            style={{ fontSize: 11 }}
          >
            Cavitation
          </text>
        </g>

        <path
          d="M 118 100 L 152 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-mist-400"
          markerEnd="url(#evo-arrow)"
          opacity={activeStep !== null && activeStep < 1 ? 0.25 : 1}
        />

        <g
          opacity={dim(1) ? 0.3 : 1}
          className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
        >
          <text
            x="200"
            y="28"
            textAnchor="middle"
            className={activeStep === 1 ? "fill-aurora" : "fill-mist-400"}
            style={{ fontSize: 10, letterSpacing: "0.1em" }}
          >
            02 · COLLAPSE
          </text>
          <circle
            cx="200"
            cy="100"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth={activeStep === 1 ? 1.75 : 1.5}
            className="text-aurora/60"
          />
          <circle cx="200" cy="100" r="4" className="fill-aurora" />
          <path
            d="M 200 72 L 200 82"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-aurora"
          />
          <path
            d="M 200 118 L 200 128"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-aurora"
          />
          <path
            d="M 172 100 L 182 100"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-aurora"
          />
          <path
            d="M 218 100 L 228 100"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-aurora"
          />
          <text
            x="200"
            y="160"
            textAnchor="middle"
            className="fill-mist-300"
            style={{ fontSize: 11 }}
          >
            Zero-point
          </text>
        </g>

        <path
          d="M 248 100 L 282 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-mist-400"
          markerEnd="url(#evo-arrow)"
          opacity={activeStep !== null && activeStep < 2 ? 0.25 : 1}
        />

        <g
          opacity={dim(2) ? 0.3 : 1}
          className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
        >
          <text
            x="350"
            y="28"
            textAnchor="middle"
            className={
              activeStep === 2 || chargeOn ? "fill-aurora" : "fill-mist-400"
            }
            style={{ fontSize: 10, letterSpacing: "0.1em" }}
          >
            {chargeOn ? "04 · FIELD" : "03 · EVO"}
          </text>
          <ellipse
            cx="350"
            cy="100"
            rx="52"
            ry="34"
            fill={
              chargeOn || activeStep === 2
                ? "rgb(var(--aurora) / 0.05)"
                : "none"
            }
            stroke="currentColor"
            strokeWidth={chargeOn || activeStep === 2 ? 1.75 : 1.5}
            className="text-aurora/80"
          />
          <ellipse
            cx="350"
            cy="100"
            rx="18"
            ry="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-aurora"
          />
          <path
            d="M 310 100 Q 330 78 350 100 Q 370 122 390 100"
            fill="none"
            stroke="currentColor"
            strokeWidth={chargeOn ? 1.5 : 1}
            className={chargeOn ? "text-aurora/80" : "text-mist-400/70"}
          />
          <path
            d="M 310 100 Q 330 122 350 100 Q 370 78 390 100"
            fill="none"
            stroke="currentColor"
            strokeWidth={chargeOn ? 1.5 : 1}
            className={chargeOn ? "text-aurora/80" : "text-mist-400/70"}
          />
          <text
            x="350"
            y="160"
            textAnchor="middle"
            className="fill-mist-100"
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            {chargeOn ? "Charged field" : "Toroid field"}
          </text>
          <text
            x="350"
            y="176"
            textAnchor="middle"
            className="fill-mist-400"
            style={{ fontSize: 11 }}
          >
            Self-contained
          </text>
        </g>
      </svg>
      {activeStep === null ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Plasmoid energetic vacuum object (EVO): born from bubble collapse
          (cavitation), held as a self-contained donut field.
        </figcaption>
      ) : null}
    </figure>
  );
}
