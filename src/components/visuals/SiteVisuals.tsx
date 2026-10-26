/**
 * Inline SVG replacements for the former raster visuals in public/visuals.
 * Shared rules: viewBox 360 wide, text >= 14 units (>= 12px at a 324px-wide
 * phone column), strokes 1 (hairline) / 1.5 (primary), radii 8 (node) / 12 (panel),
 * colors only from theme variables so they switch with light/dark.
 */
import type { ReactNode } from "react";
import { metrics } from "@/lib/evidence";

const C = {
  ink: "rgb(var(--ink-600))",
  panel: "rgb(var(--ink-800) / 0.35)",
  text: "rgb(var(--mist-50))",
  sub: "rgb(var(--mist-300))",
  muted: "rgb(var(--mist-400))",
  aurora: "rgb(var(--aurora))",
  copper: "rgb(var(--fig-copper))",
  exhaust: "rgb(var(--fig-exhaust))",
  air: "rgb(var(--fig-air))",
  gold: "rgb(var(--fig-gold))",
};
const T = { label: 14, title: 16 } as const;
const SW = { hair: 1, main: 1.5 } as const;
const R = { node: 8, panel: 12 } as const;

function row(metric: string, id: string) {
  const r = metrics.find((m) => m.id === metric)?.rows.find((x) => x.id === id);
  if (!r) throw new Error(`evidence row missing: ${metric}/${id}`);
  return r;
}

function Chip({ x = 16, y = 14, text }: { x?: number; y?: number; text: string }) {
  const w = text.length * 8 + 24;
  return (
    <g>
      <rect x={x} y={y} width={w} height={26} rx={13} fill="rgb(var(--aurora) / 0.12)" stroke={C.aurora} strokeWidth={SW.hair} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fill={C.aurora} style={{ fontSize: T.label, fontWeight: 600 }}>
        {text}
      </text>
    </g>
  );
}

function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill={color} />
    </marker>
  );
}

function Frame({
  id, viewH, title, desc, caption, children, compact = false,
}: { id: string; viewH: number; title: string; desc: string; caption?: ReactNode; children: ReactNode; compact?: boolean }) {
  return (
    <figure className={`min-w-0 w-full ${compact ? "max-w-md" : "max-w-xl"}`}>
      <div className="overflow-hidden rounded-xl border border-ink-600/45 bg-ink-900/30">
        <svg viewBox={`0 0 360 ${viewH}`} className="h-auto w-full" role="img" aria-labelledby={`${id}-t ${id}-d`}>
          <title id={`${id}-t`}>{title}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          {children}
        </svg>
      </div>
      {caption ? <figcaption className="measure mt-3 text-sm leading-relaxed text-mist-300">{caption}</figcaption> : null}
    </figure>
  );
}

/* 1. Home: measured exhaust result (replaces home-problem-solution.webp) */
export function MeasuredExhaustVisual({ caption }: { caption?: ReactNode }) {
  const co = row("co", "co-thesis");
  const co2 = row("co2", "co2-thesis");
  const full = 248;
  const after = full * (1 - co.magnitude! / 100); // drawn to scale
  const bar = (y: number, w: number, label: string, fill: string) => (
    <g>
      <text x={16} y={y + 13} fill={C.sub} style={{ fontSize: T.label }}>{label}</text>
      <rect x={96} y={y} width={full} height={16} rx={4} fill="none" stroke={C.ink} strokeWidth={SW.hair} />
      <rect x={96} y={y} width={w} height={16} rx={4} fill={fill} />
    </g>
  );
  return (
    <Frame
      id="vis-home"
      viewH={318}
      title="Measured exhaust result at idle"
      desc={`Measured in the Embry-Riddle thesis idle test: carbon monoxide ${co.value}; carbon dioxide ${co2.value}. Bars show the after level as a share of the before level, drawn to scale. Exhaust is reduced in CO, not eliminated.`}
      caption={caption}
    >
      <Chip text="Measured" />
      <text x={16} y={66} fill={C.text} style={{ fontSize: T.title, fontWeight: 600 }}>Exhaust at idle: before vs after</text>
      <text x={16} y={96} fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Carbon monoxide (CO)</text>
      {bar(106, full, "Before", "rgb(var(--mist-400) / 0.55)")}
      {bar(130, after, "After", C.aurora)}
      <text x={96} y={166} fill={C.aurora} style={{ fontSize: T.label }}>About {co.magnitude}% lower (average)</text>
      <text x={16} y={202} fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Carbon dioxide (CO₂)</text>
      {bar(212, full, "Before", "rgb(var(--mist-400) / 0.55)")}
      {bar(236, full, "After", "rgb(var(--mist-400) / 0.55)")}
      <text x={96} y={272} fill={C.sub} style={{ fontSize: T.label }}>No significant change</text>
      <line x1={16} y1={286} x2={344} y2={286} stroke={C.ink} strokeWidth={SW.hair} />
      <text x={16} y={306} fill={C.muted} style={{ fontSize: T.label }}>Embry-Riddle thesis, idle test (2026)</text>
    </Frame>
  );
}

/* 2. Device system flow (replaces device-system-accurate.webp) */
export function DeviceSystemVisual({ caption }: { caption?: ReactNode }) {
  const a = "vis-sys-a", e = "vis-sys-e", f = "vis-sys-f";
  const box = (y: number, n: string, title: string, sub: string, stroke: string) => (
    <g>
      <rect x={16} y={y} width={160} height={60} rx={R.node} fill={C.panel} stroke={stroke} strokeWidth={SW.main} />
      <text x={30} y={y + 25} fill={C.text} style={{ fontSize: T.title, fontWeight: 600 }}>{n} {title}</text>
      <text x={30} y={y + 46} fill={C.sub} style={{ fontSize: T.label }}>{sub}</text>
    </g>
  );
  return (
    <Frame
      id="vis-sys"
      viewH={430}
      title="Device system flow, inventor model"
      desc="Inventor model: air goes into the ionizer, then the bubbler, then the nested-sphere resonator. Hot exhaust from the engine enters the resonator. The resonator output is piped to the engine intake, just after the carburetor."
      caption={caption}
    >
      <defs>
        <Arrow id={a} color={C.sub} />
        <Arrow id={e} color={C.exhaust} />
        <Arrow id={f} color={C.aurora} />
      </defs>
      <Chip text="Inventor model" />
      <text x={16} y={70} fill={C.air} style={{ fontSize: T.label }}>Air in</text>
      <line x1={96} y1={66} x2={96} y2={80} stroke={C.air} strokeWidth={SW.main} markerEnd={`url(#${a})`} />
      {box(86, "1", "Ionizer", "air pretreatment", C.ink)}
      <line x1={96} y1={146} x2={96} y2={168} stroke={C.sub} strokeWidth={SW.main} markerEnd={`url(#${a})`} />
      {box(174, "2", "Bubbler", "water column", C.ink)}
      <line x1={96} y1={234} x2={96} y2={256} stroke={C.sub} strokeWidth={SW.main} markerEnd={`url(#${a})`} />
      {box(262, "3", "Resonator", "nested spheres", C.copper)}
      {/* Engine */}
      <rect x={220} y={150} width={124} height={96} rx={R.node} fill={C.panel} stroke={C.text} strokeWidth={SW.main} />
      <text x={282} y={203} textAnchor="middle" fill={C.text} style={{ fontSize: T.title, fontWeight: 600 }}>Engine</text>
      {/* Resonator output to intake */}
      <path d="M176,284 H198 V198 H214" fill="none" stroke={C.aurora} strokeWidth={SW.main} markerEnd={`url(#${f})`} />
      <text x={196} y={312} fill={C.aurora} style={{ fontSize: T.label }}>to intake</text>
      {/* Engine exhaust into resonator */}
      <path d="M282,246 V350 H96 V328" fill="none" stroke={C.exhaust} strokeWidth={SW.main} markerEnd={`url(#${e})`} />
      <text x={110} y={372} fill={C.exhaust} style={{ fontSize: T.label }}>hot exhaust into the resonator</text>
      <line x1={16} y1={390} x2={344} y2={390} stroke={C.ink} strokeWidth={SW.hair} />
      <text x={16} y={414} fill={C.muted} style={{ fontSize: T.label }}>Parts were not tested one by one.</text>
    </Frame>
  );
}

/* 3. Nested spheres cutaway (replaces device-nested-spheres.webp) */
export function NestedSpheresVisual({ caption }: { caption?: ReactNode }) {
  const cx = 180, cy = 205;
  const sp = "vis-ns-s", sc = "vis-ns-c", ex = "vis-ns-e", out = "vis-ns-o";
  return (
    <Frame
      id="vis-ns"
      viewH={400}
      title="Nested contra-rotating spheres, teaching model"
      desc="Teaching model of the resonator: a large outer sphere, a smaller inner sphere spinning clockwise, and a small core spinning counter-clockwise. Hot exhaust enters at one side; a pipe from the inner sphere carries the stream to the engine intake."
      caption={caption}
    >
      <defs>
        <Arrow id={sp} color={C.air} />
        <Arrow id={sc} color={C.aurora} />
        <Arrow id={ex} color={C.exhaust} />
        <Arrow id={out} color={C.aurora} />
      </defs>
      <Chip text="Teaching model" />
      <circle cx={cx} cy={cy} r={100} fill={C.panel} stroke={C.sub} strokeWidth={SW.main} />
      <circle cx={cx} cy={cy} r={62} fill="none" stroke={C.copper} strokeWidth={SW.main} />
      <circle cx={cx} cy={cy} r={12} fill={C.copper} />
      {/* spins */}
      <path d={`M${cx - 44},${cy - 26} A51,51 0 0 1 ${cx + 44},${cy - 26}`} fill="none" stroke={C.air} strokeWidth={SW.main} markerEnd={`url(#${sp})`} />
      <path d={`M${cx + 22},${cy + 8} A24,24 0 0 0 ${cx - 22},${cy + 8}`} fill="none" stroke={C.aurora} strokeWidth={SW.main} markerEnd={`url(#${sc})`} />
      {/* exhaust inlet from left */}
      <line x1={16} y1={cy} x2={74} y2={cy} stroke={C.exhaust} strokeWidth={SW.main} markerEnd={`url(#${ex})`} />
      <text x={16} y={cy - 10} fill={C.exhaust} style={{ fontSize: T.label }}>Hot exhaust in</text>
      {/* outlet from inner sphere */}
      <line x1={cx + 44} y1={cy + 44} x2={326} y2={350} stroke={C.aurora} strokeWidth={SW.main} markerEnd={`url(#${out})`} />
      <text x={344} y={372} textAnchor="end" fill={C.aurora} style={{ fontSize: T.label }}>To intake</text>
      {/* labels with leaders to the right parts */}
      <text x={16} y={74} fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Outer sphere</text>
      <line x1={60} y1={80} x2={cx - 70} y2={cy - 71} stroke={C.muted} strokeWidth={SW.hair} />
      <text x={344} y={74} textAnchor="end" fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Inner sphere</text>
      <line x1={300} y1={80} x2={cx + 44} y2={cy - 44} stroke={C.muted} strokeWidth={SW.hair} />
      <text x={16} y={350} fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Small core</text>
      <line x1={50} y1={338} x2={cx - 9} y2={cy + 9} stroke={C.muted} strokeWidth={SW.hair} />
      <text x={16} y={390} fill={C.muted} style={{ fontSize: T.label }}>Inner: clockwise · Core: counter-clockwise</text>
    </Frame>
  );
}

/* 4. Vajra quadrature (replaces device-vajra-gun.webp) */
export function VajraVisual({ caption }: { caption?: ReactNode }) {
  const tier = (ox: number, color: string, label: string) => {
    const c = { x: ox + 78, y: 150 };
    const cone = (rot: number) => (
      <polygon key={rot} points={`${c.x - 11},${c.y - 16} ${c.x + 11},${c.y - 16} ${c.x},${c.y - 62}`} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={SW.main} strokeLinejoin="round" transform={`rotate(${rot} ${c.x} ${c.y})`} />
    );
    return (
      <g>
        <rect x={ox} y={64} width={156} height={172} rx={R.panel} fill={C.panel} stroke={C.ink} strokeWidth={SW.hair} />
        {[0, 90, 180, 270].map(cone)}
        <rect x={c.x - 14} y={c.y - 14} width={28} height={28} rx={4} fill="none" stroke={C.sub} strokeWidth={SW.main} />
        <text x={ox + 78} y={262} textAnchor="middle" fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>{label}</text>
      </g>
    );
  };
  return (
    <Frame
      id="vis-vajra"
      viewH={340}
      title="Vajra quadrature (plasmoid gun), teaching model"
      desc="Simplified teaching model from inventor notes: four cones on a base tier point outward in a plus shape. Four more cones on an upper tier sit above them in the same plus layout. Connectors hold the tiers in line on a square base."
      caption={caption}
    >
      <Chip text="Teaching model" />
      {tier(16, C.copper, "Base tier (lower)")}
      {tier(188, C.gold, "Upper tier (above)")}
      <text x={16} y={296} fill={C.sub} style={{ fontSize: T.label }}>Four cones per tier, in a plus (+) shape.</text>
      <text x={16} y={318} fill={C.sub} style={{ fontSize: T.label }}>Connectors keep the two tiers lined up.</text>
    </Frame>
  );
}

/* 5. Services: install-labor flow (replaces services-install.webp) */
export function InstallFlowVisual({ caption, compact = false }: { caption?: ReactNode; compact?: boolean }) {
  const a = compact ? "vis-svc-a2" : "vis-svc-a";
  const node = (x: number, l1: string, l2: string, icon: ReactNode) => (
    <g>
      <rect x={x} y={24} width={96} height={124} rx={R.node} fill={C.panel} stroke={C.ink} strokeWidth={SW.main} />
      <g fill="none" stroke={C.aurora} strokeWidth={SW.main} strokeLinejoin="round" strokeLinecap="round">{icon}</g>
      <text x={x + 48} y={114} textAnchor="middle" fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>{l1}</text>
      <text x={x + 48} y={134} textAnchor="middle" fill={C.sub} style={{ fontSize: T.label }}>{l2}</text>
    </g>
  );
  return (
    <Frame
      id={compact ? "vis-svc2" : "vis-svc"}
      viewH={196}
      compact={compact}
      title="How install help works"
      desc="Three steps: you own the kit, we send a written estimate, then install labor. Kits are not sold on this site."
      caption={caption}
    >
      <defs><Arrow id={a} color={C.sub} /></defs>
      {node(16, "Your kit", "you own it", <><rect x={46} y={52} width={36} height={30} rx={4} /><path d="M46,62 H82 M64,52 V62" /></>)}
      {node(132, "Written", "estimate", <><rect x={166} y={46} width={28} height={38} rx={4} /><path d="M172,58 H188 M172,66 H188 M172,74 H182" /></>)}
      {node(248, "Install", "labor", <path d="M282,86 L299,69 M297,56 A9,9 0 1 0 312,71" />)}
      <line x1={113} y1={86} x2={128} y2={86} stroke={C.sub} strokeWidth={SW.main} markerEnd={`url(#${a})`} />
      <line x1={229} y1={86} x2={244} y2={86} stroke={C.sub} strokeWidth={SW.main} markerEnd={`url(#${a})`} />
      <text x={16} y={180} fill={C.muted} style={{ fontSize: T.label }}>Kits are not sold on this site.</text>
    </Frame>
  );
}
