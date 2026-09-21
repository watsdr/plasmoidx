/** Simplified 16×8 MOE grid with protium seed callout. */

export type MoeFocus = "seed" | "octave" | "mid" | "heavy";

type Props = {
  focus?: MoeFocus | null;
  className?: string;
  captionId?: string;
};

export default function MoeLattice({
  focus = null,
  className,
  captionId = "moe-lattice-caption",
}: Props) {
  const cols = 16;
  const rows = 8;
  const cell = 14;
  const gap = 2;
  const originX = 36;
  const originY = 44;
  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;

  function cellKind(r: number, c: number): MoeFocus | "plain" {
    if (r === rows - 1 && c === 0) return "seed";
    if (c === 0 || c === 7 || c === 15) return "octave";
    if (r >= 3 && r <= 5 && c >= 4 && c <= 11) return "mid";
    if (r <= 2 && c >= 12) return "heavy";
    return "plain";
  }

  function lit(r: number, c: number): boolean {
    if (focus === null) return r === rows - 1 && c === 0;
    return cellKind(r, c) === focus;
  }

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-xl"
      }
      aria-labelledby={captionId}
    >
      <svg
        viewBox="0 0 420 220"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Simplified 16 by 8 Model of the Elements lattice with protium seed highlighted"
      >
        <text
          x="210"
          y="22"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10, letterSpacing: "0.12em" }}
        >
          MODEL OF THE ELEMENTS · 16 × 8
        </text>

        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const x = originX + c * (cell + gap);
            const y = originY + r * (cell + gap);
            const on = lit(r, c);
            const muted = focus !== null && !on;
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width={cell}
                height={cell}
                rx={2}
                fill={on ? "rgb(var(--aurora) / 0.18)" : "none"}
                stroke="currentColor"
                strokeWidth={on ? 1.5 : 0.75}
                opacity={muted ? 0.35 : 1}
                className={
                  on
                    ? "text-aurora motion-safe:transition-opacity motion-safe:duration-200"
                    : "text-ink-600 motion-safe:transition-opacity motion-safe:duration-200"
                }
              />
            );
          })
        )}

        <text
          x={originX + gridW / 2}
          y={originY + gridH + 22}
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10 }}
        >
          16 octave columns
        </text>
        <text
          x={originX - 14}
          y={originY + gridH / 2}
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10 }}
          transform={`rotate(-90 ${originX - 14} ${originY + gridH / 2})`}
        >
          8 rows
        </text>

        {(focus === null || focus === "seed") && (
          <>
            <path
              d={`M ${originX + cell + 4} ${originY + (rows - 1) * (cell + gap) + cell / 2} L ${originX + gridW + 12} ${originY + gridH - 8}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-aurora/50"
            />
            <rect
              x={originX + gridW + 16}
              y={originY + gridH - 36}
              width="88"
              height="40"
              rx="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              className="text-aurora/70"
            />
            <text
              x={originX + gridW + 60}
              y={originY + gridH - 18}
              textAnchor="middle"
              className="fill-mist-100"
              style={{ fontSize: 11, fontWeight: 500 }}
            >
              ¹H protium
            </text>
            <text
              x={originX + gridW + 60}
              y={originY + gridH - 4}
              textAnchor="middle"
              className="fill-mist-400"
              style={{ fontSize: 10 }}
            >
              seed
            </text>
          </>
        )}
      </svg>
      {focus === null ? (
        <figcaption
          id={captionId}
          className="mt-2 text-xs leading-relaxed text-mist-400"
        >
          Teaching sketch of the 16 × 8 Model of the Elements (MOE) lattice.
          Protium (¹H) is the seed. Full charts: strikefoundation.earth.
        </figcaption>
      ) : null}
    </figure>
  );
}
