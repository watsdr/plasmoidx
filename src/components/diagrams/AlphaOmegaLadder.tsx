/** Alpha–Omega MeV ladder (sample rungs) — inventor-model teaching sketch. */

export type LadderFocus =
  | "omega"
  | "alpha"
  | "base"
  | "tip"
  | "mid"
  | "band"
  | "totals"
  | null;

export type LadderRung = {
  z: number;
  sym: string;
  name: string;
  /** Inventor-model MeV from Draft 518,400 graphic; null = not shown on sample. */
  mev: number | null;
  side: "omega" | "alpha";
  tier: "tip" | "mid" | "base";
};

/** Sample only — not every element. Odd Z = Omega (+); even Z = Alpha (−). */
export const LADDER_RUNGS: LadderRung[] = [
  { z: 31, sym: "Ga", name: "Gallium", mev: 3.73, side: "omega", tier: "tip" },
  { z: 32, sym: "Ge", name: "Germanium", mev: null, side: "alpha", tier: "tip" },
  { z: 27, sym: "Co", name: "Cobalt", mev: 5.78, side: "omega", tier: "mid" },
  { z: 28, sym: "Ni", name: "Nickel", mev: 2.7, side: "alpha", tier: "mid" },
  { z: 11, sym: "Na", name: "Sodium", mev: 10.47, side: "omega", tier: "mid" },
  { z: 12, sym: "Mg", name: "Magnesium", mev: 9.98, side: "alpha", tier: "mid" },
  { z: 7, sym: "N", name: "Nitrogen", mev: 1.2, side: "omega", tier: "mid" },
  { z: 8, sym: "O", name: "Oxygen", mev: 4.73, side: "alpha", tier: "mid" },
  { z: 1, sym: "H", name: "Hydrogen", mev: 26.7, side: "omega", tier: "base" },
  { z: 2, sym: "He", name: "Helium", mev: 26.7, side: "alpha", tier: "base" },
];

export const LADDER_TOTALS = {
  omega: 157.18,
  alpha: 117.17,
  total: 274.35,
  base: 26.7,
} as const;

type Props = {
  focus?: LadderFocus;
  /** Highlight a single rung by symbol (e.g. "Na"). */
  focusSym?: string | null;
  className?: string;
  captionId?: string;
  /** When true, omit figcaption (lab supplies its own live region). */
  hideCaption?: boolean;
};

const ROWS: { omega: string; alpha: string }[] = [
  { omega: "Ga", alpha: "Ge" },
  { omega: "Co", alpha: "Ni" },
  { omega: "Na", alpha: "Mg" },
  { omega: "N", alpha: "O" },
  { omega: "H", alpha: "He" },
];

function bySym(sym: string): LadderRung {
  return LADDER_RUNGS.find((r) => r.sym === sym)!;
}

function lit(
  focus: LadderFocus,
  focusSym: string | null | undefined,
  rung: LadderRung
): boolean {
  if (focusSym) return rung.sym === focusSym;
  if (!focus) return rung.tier === "base";
  if (focus === "omega") return rung.side === "omega";
  if (focus === "alpha") return rung.side === "alpha";
  if (focus === "base") return rung.tier === "base";
  if (focus === "tip") return rung.tier === "tip";
  if (focus === "mid") return rung.tier === "mid";
  if (focus === "band" || focus === "totals") return false;
  return false;
}

export default function AlphaOmegaLadder({
  focus = null,
  focusSym = null,
  className,
  captionId = "ladder-caption",
  hideCaption = false,
}: Props) {
  const rowH = 44;
  const topY = 78;
  const colL = 118;
  const colR = 262;
  const bandL = 28;
  const bandR = 352;

  return (
    <figure
      className={
        className ?? "overflow-x-safe my-6 w-full min-w-0 max-w-md"
      }
      aria-labelledby={hideCaption ? undefined : captionId}
    >
      <svg
        viewBox="0 0 380 360"
        className="h-auto w-full max-w-full motion-safe:transition-[opacity] motion-safe:duration-200 motion-safe:ease-out"
        role="img"
        aria-label="Alpha Omega MeV ladder with odd Omega and even Alpha sample rungs, inventor-model totals"
      >
        {/* Header totals */}
        <g opacity={focus === "totals" || !focus || focus === "omega" ? 1 : 0.45}>
          <text
            x="100"
            y="22"
            textAnchor="middle"
            className="fill-mist-300"
            style={{ fontSize: 10, letterSpacing: "0.12em", fontWeight: 600 }}
          >
            OMEGA (+)
          </text>
          <text
            x="100"
            y="40"
            textAnchor="middle"
            style={{ fontSize: 13, fontWeight: 600, fill: "rgb(251 146 60)" }}
          >
            {LADDER_TOTALS.omega} MeV
          </text>
        </g>
        <g opacity={focus === "totals" || !focus ? 1 : 0.45}>
          <text
            x="190"
            y="22"
            textAnchor="middle"
            className="fill-mist-400"
            style={{ fontSize: 9, letterSpacing: "0.1em", fontWeight: 600 }}
          >
            TOTAL
          </text>
          <text
            x="190"
            y="40"
            textAnchor="middle"
            className="fill-mist-100"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {LADDER_TOTALS.total} MeV
          </text>
        </g>
        <g opacity={focus === "totals" || !focus || focus === "alpha" ? 1 : 0.45}>
          <text
            x="280"
            y="22"
            textAnchor="middle"
            className="fill-mist-300"
            style={{ fontSize: 10, letterSpacing: "0.12em", fontWeight: 600 }}
          >
            ALPHA (−)
          </text>
          <text
            x="280"
            y="40"
            textAnchor="middle"
            style={{ fontSize: 13, fontWeight: 600, fill: "rgb(125 211 252)" }}
          >
            {LADDER_TOTALS.alpha} MeV
          </text>
        </g>

        {/* Outer He / +HH bands */}
        <g opacity={focus === "band" || !focus ? 1 : 0.4}>
          <rect
            x={bandL}
            y={topY - 8}
            width="18"
            height={ROWS.length * rowH + 16}
            rx="4"
            fill="rgb(251 146 60 / 0.12)"
            stroke="rgb(251 146 60 / 0.35)"
            strokeWidth="1"
          />
          <text
            x={bandL + 9}
            y={topY + ROWS.length * rowH * 0.55}
            textAnchor="middle"
            transform={`rotate(-90 ${bandL + 9} ${topY + ROWS.length * rowH * 0.55})`}
            style={{ fontSize: 8, fill: "rgb(251 146 60 / 0.9)", letterSpacing: "0.06em" }}
          >
            He or +HH
          </text>
          <rect
            x={bandR}
            y={topY - 8}
            width="18"
            height={ROWS.length * rowH + 16}
            rx="4"
            fill="rgb(125 211 252 / 0.1)"
            stroke="rgb(125 211 252 / 0.35)"
            strokeWidth="1"
          />
          <text
            x={bandR + 9}
            y={topY + ROWS.length * rowH * 0.55}
            textAnchor="middle"
            transform={`rotate(90 ${bandR + 9} ${topY + ROWS.length * rowH * 0.55})`}
            style={{ fontSize: 8, fill: "rgb(125 211 252 / 0.9)", letterSpacing: "0.06em" }}
          >
            He or +HH
          </text>
        </g>

        {/* Calm central energy motif */}
        <g opacity={0.55} aria-hidden="true">
          <line
            x1="190"
            y1={topY}
            x2="190"
            y2={topY + ROWS.length * rowH - 8}
            stroke="rgb(var(--aurora) / 0.35)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <ellipse
            cx="190"
            cy={topY + ROWS.length * rowH * 0.45}
            rx="7"
            ry="28"
            fill="rgb(var(--aurora) / 0.08)"
            stroke="rgb(var(--aurora) / 0.22)"
            strokeWidth="1"
          />
        </g>

        {/* Rails */}
        <line
          x1={colL}
          y1={topY - 4}
          x2={colL}
          y2={topY + ROWS.length * rowH}
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-ink-600"
        />
        <line
          x1={colR}
          y1={topY - 4}
          x2={colR}
          y2={topY + ROWS.length * rowH}
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-ink-600"
        />

        {ROWS.map((row, i) => {
          const y = topY + i * rowH;
          const left = bySym(row.omega);
          const right = bySym(row.alpha);
          const leftOn = lit(focus, focusSym, left);
          const rightOn = lit(focus, focusSym, right);
          const anyFocus = Boolean(focus || focusSym);
          const leftMuted = anyFocus && !leftOn;
          const rightMuted = anyFocus && !rightOn;
          const isBase = left.tier === "base";

          return (
            <g key={`${row.omega}-${row.alpha}`}>
              <line
                x1={colL}
                y1={y + 14}
                x2={colR}
                y2={y + 14}
                stroke="currentColor"
                strokeWidth={isBase ? 1.75 : 1}
                className={isBase ? "text-mist-300" : "text-ink-600"}
                opacity={0.7}
              />

              {/* Omega cell */}
              <g opacity={leftMuted ? 0.32 : 1}>
                <rect
                  x={colL - 52}
                  y={y}
                  width="100"
                  height="28"
                  rx="6"
                  fill={
                    leftOn
                      ? "rgb(251 146 60 / 0.14)"
                      : "rgb(var(--ink-800) / 0.35)"
                  }
                  stroke={
                    leftOn
                      ? "rgb(251 146 60 / 0.55)"
                      : "rgb(var(--mist-400) / 0.2)"
                  }
                  strokeWidth={leftOn ? 1.5 : 1}
                />
                <circle
                  cx={colL - 36}
                  cy={y + 14}
                  r="9"
                  fill="rgb(251 146 60 / 0.15)"
                  stroke="rgb(251 146 60 / 0.55)"
                  strokeWidth="1"
                />
                <text
                  x={colL - 36}
                  y={y + 17}
                  textAnchor="middle"
                  className="fill-mist-100"
                  style={{ fontSize: 9, fontWeight: 600 }}
                >
                  {left.z}
                </text>
                <text
                  x={colL - 18}
                  y={y + 12}
                  className="fill-mist-50"
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {left.sym}
                </text>
                <text
                  x={colL - 18}
                  y={y + 23}
                  className="fill-mist-400"
                  style={{ fontSize: 8 }}
                >
                  {left.mev != null
                    ? isBase
                      ? `${left.mev} base`
                      : `${left.mev} MeV`
                    : "—"}
                </text>
              </g>

              {/* Alpha cell */}
              <g opacity={rightMuted ? 0.32 : 1}>
                <rect
                  x={colR - 48}
                  y={y}
                  width="100"
                  height="28"
                  rx="6"
                  fill={
                    rightOn
                      ? "rgb(125 211 252 / 0.12)"
                      : "rgb(var(--ink-800) / 0.35)"
                  }
                  stroke={
                    rightOn
                      ? "rgb(125 211 252 / 0.55)"
                      : "rgb(var(--mist-400) / 0.2)"
                  }
                  strokeWidth={rightOn ? 1.5 : 1}
                />
                <circle
                  cx={colR + 36}
                  cy={y + 14}
                  r="9"
                  fill="rgb(125 211 252 / 0.12)"
                  stroke="rgb(125 211 252 / 0.55)"
                  strokeWidth="1"
                />
                <text
                  x={colR + 36}
                  y={y + 17}
                  textAnchor="middle"
                  className="fill-mist-100"
                  style={{ fontSize: 9, fontWeight: 600 }}
                >
                  {right.z}
                </text>
                <text
                  x={colR - 32}
                  y={y + 12}
                  className="fill-mist-50"
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {right.sym}
                </text>
                <text
                  x={colR - 32}
                  y={y + 23}
                  className="fill-mist-400"
                  style={{ fontSize: 8 }}
                >
                  {right.mev != null
                    ? isBase
                      ? `${right.mev} base`
                      : `${right.mev} MeV`
                    : "—"}
                </text>
              </g>
            </g>
          );
        })}

        <text
          x="190"
          y="348"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 10 }}
        >
          Sample rungs · odd = Omega · even = Alpha
        </text>
      </svg>
      {!hideCaption && (
        <figcaption
          id={captionId}
          className="mt-2 max-w-md text-xs leading-relaxed text-mist-400"
        >
          MeV figures are inventor-model numbers from Draft 518,400 graphics —
          not independently verified here. This page uses an original SVG
          summary only; full inventor Alpha–Omega ladder graphics stay outbound
          (we do not republish copyrighted ladder art). Outer band hint: helium
          or paired hydrogen (&quot;He or +HH&quot;). Full charts stay on{" "}
          <a
            href="https://www.strikefoundation.earth"
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            strikefoundation.earth
          </a>
          .
        </figcaption>
      )}
    </figure>
  );
}
