// Generate per-section OG images (1200×630 PNG) into public/og/.
// Run: npm run og   (needs google-chrome / chromium on PATH). Output is committed.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
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
  const head = key === "home" ? "" : `<text x="600" y="360" text-anchor="middle" font-size="22" font-weight="500" fill="#78716c" letter-spacing="0.18em">${label.toUpperCase().replace("&", "&amp;")}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif">
  <rect width="1200" height="630" fill="#f7f4ef"/>
  <circle cx="980" cy="120" r="280" fill="#5eead4" fill-opacity="0.07"/>
  <g transform="translate(600 220)">
    <circle r="72" stroke="#0f766e" stroke-width="3.5" fill="none"/>
    <path d="M-38 -38 L38 38 M38 -38 L-38 38" stroke="#14b8a6" stroke-width="9" stroke-linecap="round"/>
  </g>
  ${head}
  <text x="600" y="${key === "home" ? 380 : 420}" text-anchor="middle" font-size="44" font-weight="600" fill="#1c1917">Plasmoid X</text>
  <text x="600" y="${key === "home" ? 430 : 470}" text-anchor="middle" font-size="26" font-weight="500" fill="#0f766e">New energy, explained simply.</text>
  <text x="600" y="570" text-anchor="middle" font-size="16" fill="#78716c">plasmoidx.com</text>
</svg>`;
  const html = join(tmp, `${key}.html`);
  writeFileSync(html, `<!doctype html><html><body style="margin:0">${svg}</body></html>`);
  execFileSync(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630", `--screenshot=${join(outDir, key + ".png")}`, `file://${html}`], { stdio: "ignore" });
  console.log("og:", key);
}
rmSync(tmp, { recursive: true, force: true });
