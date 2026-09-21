/**
 * Captivating motion mark for the homepage splash.
 * Taste from Stripe (soft mesh), Linear (smooth), Vercel (clean),
 * Figma (crisp vectors), Duolingo (gentle settle) — playbook-safe,
 * no glow spam. Honors prefers-reduced-motion.
 */
export default function SplashMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`splash-stage relative aspect-square w-full max-w-[22rem] sm:max-w-[26rem] ${className}`}
      data-splash="mark"
      aria-hidden
    >
      {/* Soft mesh field (Stripe-like, very quiet) */}
      <div className="splash-mesh pointer-events-none absolute inset-0 rounded-full" />

      <svg
        className="splash-svg relative z-[1] h-full w-full"
        viewBox="0 0 320 320"
        width={320}
        height={320}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="splash-ring" x1="40" y1="40" x2="280" y2="280">
            <stop stopColor="rgb(var(--aurora))" stopOpacity="0.55" />
            <stop offset="1" stopColor="rgb(var(--aurora-soft))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="splash-core" x1="120" y1="100" x2="200" y2="220">
            <stop stopColor="rgb(var(--aurora-glow))" stopOpacity="0.95" />
            <stop offset="1" stopColor="rgb(var(--aurora))" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Outer orbital ring */}
        <g className="splash-orbit-slow">
          <ellipse
            cx="160"
            cy="160"
            rx="118"
            ry="118"
            stroke="url(#splash-ring)"
            strokeWidth="1.25"
            strokeDasharray="4 10"
            opacity="0.55"
          />
          <circle className="splash-bead" cx="278" cy="160" r="4.5" fill="rgb(var(--aurora))" />
        </g>

        {/* Mid torus suggestion */}
        <g className="splash-orbit-mid">
          <ellipse
            cx="160"
            cy="160"
            rx="86"
            ry="42"
            stroke="rgb(var(--aurora))"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            transform="rotate(-18 160 160)"
          />
          <ellipse
            cx="160"
            cy="160"
            rx="86"
            ry="42"
            stroke="rgb(var(--aurora-soft))"
            strokeOpacity="0.28"
            strokeWidth="1.25"
            transform="rotate(28 160 160)"
          />
        </g>

        {/* Circle + X mark (brand) */}
        <g className="splash-mark">
          <circle
            cx="160"
            cy="160"
            r="54"
            stroke="rgb(var(--mist-200))"
            strokeOpacity="0.85"
            strokeWidth="2.5"
          />
          <circle
            cx="160"
            cy="160"
            r="54"
            stroke="url(#splash-ring)"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            d="M132 132 L188 188 M188 132 L132 188"
            stroke="url(#splash-core)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Quiet plasmoid core */}
          <circle cx="160" cy="160" r="7" fill="url(#splash-core)" opacity="0.9" />
        </g>

      </svg>
    </div>
  );
}
