// Shareable visuals for top explainers: 1080×1080 square, 1080×1920 vertical,
// and a ~13 s vertical MP4 (calm fades, no audio) per explainer, plus a contact sheet.
// Output goes OUTSIDE the repo: $SOCIAL_OUT (default /workspace/plasmoidx-social).
// Run: node scripts/social-cards.mjs   (needs google-chrome + ffmpeg on PATH)
// Facts are limited to what the site already says (see src/lib/explainers.ts).
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const OUT = process.env.SOCIAL_OUT || "/workspace/plasmoidx-social";
const chrome = process.env.CHROME || "google-chrome";
const tmp = join(tmpdir(), "px-social");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
mkdirSync(OUT, { recursive: true });

const meterFuel = "About 9–10% lower fuel use on a small generator in an Embry-Riddle university thesis (2026).";
const meterEmis = "Carbon monoxide down about 34% in an idle test. Carbon dioxide, oxygen and hydrocarbons: no significant change.";

const cards = [
  {
    slug: "embry-riddle-thunderstorm-generator-test",
    hook: "What did an independent meter actually find?",
    facts: [
      ["Measured", meterFuel],
      ["Measured", meterEmis],
    ],
  },
  {
    slug: "does-the-thunderstorm-generator-work",
    hook: "Does the Thunderstorm Generator work?",
    facts: [
      ["Claim", "Inventor material: fuel gains of 90% or more and near-zero exhaust."],
      ["Measured", "Thesis meter: about 9–10% lower fuel use and about 34% less carbon monoxide at idle."],
    ],
  },
  {
    slug: "what-is-a-plasmoid",
    hook: "What is a plasmoid?",
    facts: [
      ["Claim", "In Bendall’s model, small donut-shaped plasmas form when bubbles collapse in water."],
      ["Measured", "The meter measured fuel and exhaust — it did not observe plasmoids directly."],
    ],
  },
  {
    slug: "plasmoid-water-bubbler",
    hook: "Why bubble air through water?",
    facts: [
      ["Claim", "Collapsing bubbles (cavitation) form plasmoids — the inventor’s model."],
      ["Measured", "The whole retrofit: about 9–10% lower fuel use (small generator). The bubbler alone was not isolated."],
    ],
  },
  {
    slug: "518400-number-lock",
    hook: "Why does 518,400 keep showing up?",
    facts: [
      ["Plain fact", "1 × 2 × 3 × 4 × 5 × 6 × 8 × 9 × 10 = 518,400 (7 is skipped)."],
      ["Claim", "In the inventor’s model, the hardware ratios sit on this number family. No test shows that is needed."],
    ],
  },
];

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const logo = (size) => `<svg width="${size}" height="${size}" viewBox="-40 -40 80 80" aria-hidden="true"><circle r="34" stroke="#0f766e" stroke-width="3.5" fill="none"/><path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="#14b8a6" stroke-width="6" stroke-linecap="round"/></svg>`;
const css = `*{box-sizing:border-box;margin:0}body{width:var(--w);height:var(--h);background:#f7f4ef;color:#1c1917;font-family:"DejaVu Sans","Liberation Sans",Arial,sans-serif;overflow:hidden;position:relative}
.glow{position:absolute;right:-220px;top:-220px;width:640px;height:640px;border-radius:50%;background:rgba(94,234,212,.09)}
.wrap{position:relative;height:100%;display:flex;flex-direction:column;padding:var(--pad)}
.brand{display:flex;align-items:center;gap:18px;font-weight:600;font-size:34px}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;gap:var(--gap)}
.hook{font-size:var(--hook);font-weight:700;line-height:1.15;letter-spacing:-.01em}
.fact{border-left:6px solid #14b8a6;padding:6px 0 6px 26px}.fact.claim{border-color:#a8a29e}
.label{font-size:22px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#0f766e}.claim .label{color:#78716c}
.text{margin-top:10px;font-size:var(--fact);line-height:1.35;color:#292524}
.foot{font-size:30px;color:#0f766e;font-weight:600}.sub{font-size:22px;color:#78716c;margin-top:6px}`;

function page(w, h, inner, vars) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>:root{--w:${w}px;--h:${h}px;${vars}}${css}</style></head><body><div class="glow"></div><div class="wrap">${inner}</div></body></html>`;
}
function shot(html, w, h, out) {
  const f = join(tmp, `${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(f, html);
  execFileSync(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=${w},${h}`, `--screenshot=${out}`, `file://${f}`], { stdio: "ignore" });
}
const factHtml = ([label, text]) => `<div class="fact ${label === "Measured" ? "" : "claim"}"><div class="label">${label}</div><div class="text">${esc(text)}</div></div>`;
const brand = `<div class="brand">${logo(64)}Plasmoid X</div>`;
const foot = (slug) => `<div><div class="foot">plasmoidx.com</div><div class="sub">/explainers/${slug}/</div></div>`;

const squares = [];
for (const c of cards) {
  const dir = join(OUT, c.slug);
  mkdirSync(dir, { recursive: true });
  const body = `${brand}<div class="main"><div class="hook">${esc(c.hook)}</div>${c.facts.map(factHtml).join("")}</div>${foot(c.slug)}`;
  const sq = join(dir, "square-1080x1080.png");
  shot(page(1080, 1080, body, "--pad:80px;--gap:34px;--hook:62px;--fact:32px"), 1080, 1080, sq);
  squares.push(sq);
  shot(page(1080, 1920, body, "--pad:110px 90px;--gap:56px;--hook:84px;--fact:40px"), 1080, 1920, join(dir, "vertical-1080x1920.png"));

  // Video frames: hook → fact 1 → fact 2 → read more
  const V = "--pad:110px 90px;--gap:56px;--hook:88px;--fact:46px";
  const frames = [
    `${brand}<div class="main"><div class="hook">${esc(c.hook)}</div></div>${foot(c.slug)}`,
    `${brand}<div class="main">${factHtml(c.facts[0])}</div>${foot(c.slug)}`,
    `${brand}<div class="main">${factHtml(c.facts[1])}</div>${foot(c.slug)}`,
    `${brand}<div class="main"><div class="hook">Measured first.<br>Claims labeled.</div><div class="text">Read the explainer at plasmoidx.com</div></div>${foot(c.slug)}`,
  ].map((inner, i) => {
    const p = join(tmp, `${c.slug}-f${i}.png`);
    shot(page(1080, 1920, inner, V), 1080, 1920, p);
    return p;
  });
  const D = 3.5, F = 0.6; // seconds per frame, fade length → ~12.2 s total
  const inputs = frames.flatMap((p) => ["-loop", "1", "-t", String(D), "-i", p]);
  let chain = "", prev = "[0:v]";
  for (let i = 1; i < frames.length; i++) {
    const out = i === frames.length - 1 ? "[v]" : `[x${i}]`;
    chain += `${prev}[${i}:v]xfade=transition=fade:duration=${F}:offset=${(i * (D - F)).toFixed(2)}${out};`;
    prev = out;
  }
  const total = frames.length * D - (frames.length - 1) * F;
  chain += `[v]fade=t=in:st=0:d=0.5,fade=t=out:st=${(total - 0.6).toFixed(2)}:d=0.6,format=yuv420p[o]`;
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", chain, "-map", "[o]", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-movflags", "+faststart", "-an", join(dir, "vertical-1080x1920.mp4")]);
  console.log("social:", c.slug);
}

// Contact sheet of square cards (3 across, 360px tiles)
const sheetIn = squares.flatMap((p) => ["-i", p]);
const tiles = squares.map((_, i) => `[${i}:v]scale=360:360[t${i}]`).join(";");
const layout = squares.map((_, i) => `${(i % 3) * 360}_${Math.floor(i / 3) * 360}`).join("|");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...sheetIn, "-filter_complex", `${tiles};${squares.map((_, i) => `[t${i}]`).join("")}xstack=inputs=${squares.length}:layout=${layout}:fill=0xf7f4ef[o]`, "-map", "[o]", "-frames:v", "1", join(OUT, "contact-sheet.png")]);
console.log("contact sheet:", join(OUT, "contact-sheet.png"));
rmSync(tmp, { recursive: true, force: true });
