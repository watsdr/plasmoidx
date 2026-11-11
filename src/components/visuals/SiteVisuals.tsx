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

/** Evidence chip. Measured = solid aurora outline; claim = dashed fig-gold outline (shape, not color alone). */
function Chip({ x = 16, y = 14, text, kind = "claim" }: { x?: number; y?: number; text: string; kind?: "measured" | "claim" }) {
  const w = text.length * 8 + 24;
  const measured = kind === "measured";
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={26} rx={13}
        fill={measured ? "rgb(var(--aurora) / 0.12)" : "none"}
        stroke={measured ? C.aurora : C.gold}
        strokeWidth={measured ? SW.hair : SW.main}
        strokeDasharray={measured ? undefined : "4 3"}
      />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fill={measured ? C.aurora : "var(--claimed-label)"} style={{ fontSize: T.label, fontWeight: 600 }}>
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
      <Chip text="Measured" kind="measured" />
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
      <Chip text="Inventor claim · teaching model" />
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

/* 3. Nested spheres cutaway (replaces device-nested-spheres.webp).
 * Layout per Hall (2026) thesis pp.13-14, 19, 21 and WO2025158126A1: sizes 4:3:2,
 * exhaust in the outer cavity (anticlockwise), bubbler stream in the inner cavity
 * (clockwise), inner pipe to the intake at the exhaust end. One of two sphere sets. */
export function NestedSpheresVisual({ caption }: { caption?: ReactNode }) {
  const cx = 180, cy = 200;
  const ro = 96, rm = 72, ri = 48; // 4 : 3 : 2
  const sp = "vis-ns-s", ex = "vis-ns-e", out = "vis-ns-o";
  return (
    <Frame
      id="vis-ns"
      viewH={420}
      title="Nested contra-rotating spheres, inventor claim, teaching model"
      desc="Teaching model of one of the resonator’s two nested-sphere sets, drawn to the inventor’s 4:3:2 size ratio. Hot exhaust enters the outer cavity, between the outer and middle spheres, and spins anticlockwise. The cool stream from the bubbler arrives through the nested pipe from the other sphere set and spins clockwise in the inner cavity, between the middle sphere and the core, which acts as a flow guide. The middle sphere keeps the streams apart. At the exhaust end, the inner pipe carries the cool stream to the engine intake."
      caption={caption}
    >
      <defs>
        <Arrow id={sp} color={C.air} />
        <Arrow id={ex} color={C.exhaust} />
        <Arrow id={out} color={C.aurora} />
      </defs>
      <Chip text="Inventor claim · teaching model" />
      <circle cx={cx} cy={cy} r={ro} fill={C.panel} stroke={C.sub} strokeWidth={SW.main} />
      <circle cx={cx} cy={cy} r={rm} fill="none" stroke={C.copper} strokeWidth={SW.main} />
      <circle cx={cx} cy={cy} r={ri} fill="none" stroke={C.copper} strokeWidth={SW.main} strokeDasharray="2 3" />
      {/* outer cavity: exhaust, anticlockwise (top arc, right to left) */}
      <path d={`M${cx + 84},${cy - 12} A84,84 0 0 0 ${cx - 84},${cy - 12}`} fill="none" stroke={C.exhaust} strokeWidth={SW.main} markerEnd={`url(#${ex})`} />
      {/* inner cavity: cool stream, clockwise (bottom arc, right to left) */}
      <path d={`M${cx + 58},${cy + 14} A60,60 0 0 1 ${cx - 58},${cy + 14}`} fill="none" stroke={C.air} strokeWidth={SW.main} markerEnd={`url(#${sp})`} />
      {/* exhaust inlet, angled, at the right-hand (exhaust) end */}
      <line x1={340} y1={92} x2={cx + 70} y2={cy - 58} stroke={C.exhaust} strokeWidth={SW.main} markerEnd={`url(#${ex})`} />
      <text x={344} y={82} textAnchor="end" fill={C.exhaust} style={{ fontSize: T.label }}>Hot exhaust in</text>
      {/* inner pipe out at the same end, to the intake */}
      <line x1={cx + ri - 4} y1={cy} x2={340} y2={cy} stroke={C.aurora} strokeWidth={SW.main} markerEnd={`url(#${out})`} />
      <text x={344} y={cy + 22} textAnchor="end" fill={C.aurora} style={{ fontSize: T.label }}>To intake</text>
      {/* nested pipe from the other sphere set: bubbler stream in */}
      <line x1={16} y1={cy} x2={cx - rm + 6} y2={cy} stroke={C.air} strokeWidth={SW.main} markerEnd={`url(#${sp})`} />
      <text x={16} y={cy - 30} fill={C.air} style={{ fontSize: T.label }}>From</text>
      <text x={16} y={cy - 12} fill={C.air} style={{ fontSize: T.label }}>bubbler</text>
      {/* labels */}
      <text x={16} y={60} fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Outer cavity: hot exhaust, anticlockwise</text>
      <text x={16} y={344} fill={C.text} style={{ fontSize: T.label, fontWeight: 600 }}>Inner cavity: cool stream, clockwise</text>
      <text x={cx} y={cy + 5} textAnchor="middle" fill={C.sub} style={{ fontSize: T.label }}>Core (2)</text>
      <text x={16} y={372} fill={C.muted} style={{ fontSize: T.label }}>Outer, middle, core sizes 4∶3∶2. One of two sets.</text>
      <text x={16} y={398} fill={C.muted} style={{ fontSize: T.label }}>Streams are kept apart by metal.</text>
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
      <Chip text="Inventor claim · teaching model" />
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
