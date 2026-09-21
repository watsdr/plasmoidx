/** Simple 518,400 / 51.84° lock card. */
type Props = { captionId?: string };

export default function Lock518400Card({
  captionId = "lock-card-caption",
}: Props) {
  return (
    <figure
      className="overflow-x-safe my-6 w-full max-w-md"
      aria-labelledby={captionId}
    >
      <svg
        viewBox="0 0 360 210"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Card showing 518400 Time mould and 51.84 degree cone angle"
      >
        <rect
          x="12"
          y="12"
          width="336"
          height="186"
          rx="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          className="text-ink-600"
        />
        <text
          x="180"
          y="44"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10, letterSpacing: "0.16em", fontWeight: 600 }}
        >
          {"TIME'S MOULD"}
        </text>
        <text
          x="180"
          y="82"
          textAnchor="middle"
          className="fill-mist-50"
          style={{
            fontSize: 30,
            fontWeight: 600,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          518,400
        </text>
        <text
          x="180"
          y="106"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          1×2×3×4×5×6×8×9×10 (7 left out)
        </text>
        <line
          x1="52"
          y1="122"
          x2="308"
          y2="122"
          stroke="currentColor"
          strokeWidth="1"
          className="text-ink-600"
        />
        <text
          x="180"
          y="154"
          textAnchor="middle"
          className="fill-aurora"
          style={{
            fontSize: 24,
            fontWeight: 600,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          51.84°
        </text>
        <text
          x="180"
          y="178"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          518,400 ÷ 10,000 — cone / pyramid mouth
        </text>
      </svg>
      <figcaption
        id={captionId}
        className="mt-2 text-xs leading-relaxed text-mist-400"
      >
        Core lock: Time&apos;s mould number and the hardware angle derived from
        it. Check until automatic.
      </figcaption>
    </figure>
  );
}
