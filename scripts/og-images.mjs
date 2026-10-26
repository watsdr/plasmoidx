// Generate per-section OG images (1200×630 PNG) into public/og/.
// Run: npm run og   (needs google-chrome / chromium on PATH). Output is committed.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const sections = {
  home: "Plasmoid X",
  study: "Study",
  device: "Thunderstorm Generator",
  explainers: "Explainers",
  sources: "Sources & method",
  services: "Install services",
  connect: "Connect",
  faq: "FAQ",
  glossary: "Glossary",
};
const chrome = process.env.CHROME || "google-chrome";
const outDir = join(process.cwd(), "public", "og");
mkdirSync(outDir, { recursive: true });
const tmp = join(tmpdir(), "px-og");
mkdirSync(tmp, { recursive: true });

for (const [key, label] of Object.entries(sections)) {
  const kicker = key === "home" ? "INDEPENDENT EDUCATION" : label.toUpperCase().replace("&", "&amp;");
  const head = `<text x="600" y="360" text-anchor="middle" font-size="22" font-weight="500" fill="#78716c" letter-spacing="0.18em">${kicker}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif">
  <rect width="1200" height="630" fill="#f7f4ef"/>
  <circle cx="980" cy="120" r="280" fill="#5eead4" fill-opacity="0.07"/>
  <g transform="translate(600 220)">
    <circle r="72" stroke="#0f766e" stroke-width="3.5" fill="none"/>
    <path d="M-38 -38 L38 38 M38 -38 L-38 38" stroke="#14b8a6" stroke-width="9" stroke-linecap="round"/>
  </g>
  ${head}
  <text x="600" y="420" text-anchor="middle" font-size="44" font-weight="600" fill="#1c1917">Plasmoid X</text>
  <text x="600" y="470" text-anchor="middle" font-size="26" font-weight="500" fill="#0f766e">New energy, explained simply.</text>
  <text x="600" y="530" text-anchor="middle" font-size="22" font-weight="500" fill="#57534e">Measured results first. Inventor claims labeled.</text>
  <text x="600" y="580" text-anchor="middle" font-size="16" fill="#78716c">plasmoidx.com</text>
</svg>`;
  const html = join(tmp, `${key}.html`);
  writeFileSync(html, `<!doctype html><html><body style="margin:0">${svg}</body></html>`);
  execFileSync(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630", `--screenshot=${join(outDir, key + ".png")}`, `file://${html}`], { stdio: "ignore" });
  console.log("og:", key);
}
// Per-explainer cards: public/og/explainers/<slug>.png with the page title.
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/’/g, "’");
const src = readFileSync(join(process.cwd(), "src/lib/explainers.ts"), "utf8");
const items = [...src.matchAll(/slug: "([^"]+)",[\s\S]*?\n    title: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
mkdirSync(join(outDir, "explainers"), { recursive: true });
function wrap(text, max) {
  const lines = [];
  let cur = "";
  for (const w of text.split(" ")) {
    if ((cur + " " + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}
for (const [slug, title] of items) {
  const lines = wrap(title, 30).slice(0, 3);
  const start = 290;
  const tspans = lines
    .map((l, i) => `<text x="96" y="${start + i * 68}" font-size="56" font-weight="600" fill="#1c1917">${esc(l)}</text>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif">
  <rect width="1200" height="630" fill="#f7f4ef"/>
  <circle cx="1040" cy="110" r="260" fill="#5eead4" fill-opacity="0.07"/>
  <g transform="translate(130 100)">
    <circle r="30" stroke="#0f766e" stroke-width="3" fill="none"/>
    <path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#14b8a6" stroke-width="5" stroke-linecap="round"/>
  </g>
  <text x="180" y="109" font-size="26" font-weight="600" fill="#1c1917">Plasmoid X</text>
  <text x="96" y="210" font-size="20" font-weight="500" fill="#78716c" letter-spacing="0.18em">EXPLAINER</text>
  ${tspans}
  <text x="96" y="545" font-size="24" font-weight="500" fill="#0f766e">Measured results first. Inventor claims labeled.</text>
  <text x="96" y="585" font-size="18" fill="#78716c">plasmoidx.com/explainers</text>
</svg>`;
  const html = join(tmp, `ex-${slug}.html`);
  writeFileSync(html, `<!doctype html><html><body style="margin:0">${svg}</body></html>`);
  execFileSync(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630", `--screenshot=${join(outDir, "explainers", slug + ".png")}`, `file://${html}`], { stdio: "ignore" });
  console.log("og: explainers/" + slug);
}
rmSync(tmp, { recursive: true, force: true });
