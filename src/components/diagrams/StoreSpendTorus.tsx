/** Clockwise store vs anticlockwise spend — calm torus + arrows. */
export default function StoreSpendTorus() {
  return (
    <figure
      className="overflow-x-safe my-6 w-full max-w-lg"
      aria-labelledby="store-spend-caption"
    >
      <svg
        viewBox="0 0 440 220"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Two toruses: clockwise store on the left, anticlockwise spend on the right"
      >
        <defs>
          <marker
            id="arrowHead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-aurora" />
          </marker>
          <marker
            id="arrowHeadMist"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" className="fill-mist-200" />
          </marker>
        </defs>

        {/* Panel frames for hierarchy */}
        <rect
          x="18"
          y="12"
          width="184"
          height="156"
          rx="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-ink-600/80"
        />
        <rect
          x="238"
          y="12"
          width="184"
          height="156"
          rx="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-ink-600/80"
        />

        {/* Left: store (clockwise) */}
        <ellipse
          cx="110"
          cy="78"
          rx="58"
          ry="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink-600"
        />
        <ellipse
          cx="110"
          cy="78"
          rx="24"
          ry="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-aurora/80"
        />
        <path
          d="M 110 40 A 42 26 0 0 1 150 74"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-aurora"
          markerEnd="url(#arrowHead)"
        />
        <text
          x="110"
          y="130"
          textAnchor="middle"
          className="fill-mist-50"
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          Clockwise · store
        </text>
        <text
          x="110"
          y="148"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Tighten · negative
        </text>

        {/* Right: spend (anticlockwise) */}
        <ellipse
          cx="330"
          cy="78"
          rx="58"
          ry="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink-600"
        />
        <ellipse
          cx="330"
          cy="78"
          rx="24"
          ry="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-mist-300/70"
        />
        <path
          d="M 330 40 A 42 26 0 0 0 290 74"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-mist-200"
          markerEnd="url(#arrowHeadMist)"
        />
        <text
          x="330"
          y="130"
          textAnchor="middle"
          className="fill-mist-50"
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          Anticlockwise · spend
        </text>
        <text
          x="330"
          y="148"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Open · positive
        </text>

        <text
          x="220"
          y="198"
          textAnchor="middle"
          className="fill-mist-400"
          style={{ fontSize: 11 }}
        >
          Shared shape: torus (donut)
        </text>
      </svg>
      <figcaption
        id="store-spend-caption"
        className="mt-2 text-xs leading-relaxed text-mist-400"
      >
        Spin direction as charge: clockwise stores; anticlockwise spends. The
        donut (torus) is the shared shape.
      </figcaption>
    </figure>
  );
}
