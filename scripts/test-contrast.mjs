/**
 * Regression: visual-spec contrast floors for --border-strong and --claimed-label.
 * Parses src/app/globals.css (no extra packages). Backgrounds come from theme tokens
 * (--background, --field-bg, --glossary-bg) whenever those values are solid colors.
 *
 * Usage: node scripts/test-contrast.mjs
 *        npm test   /   npm run test:contrast
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CSS_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app", "globals.css");

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Top-level CSS rules only (ignores @media / @supports bodies as separate scans). */
function topLevelRules(css) {
  const rules = [];
  let i = 0;
  const n = css.length;
  while (i < n) {
    const open = css.indexOf("{", i);
    if (open === -1) break;
    let selector = css.slice(i, open).trim();
    // Drop earlier at-rules / declarations in the prelude (e.g. @tailwind before :root).
    const cut = Math.max(selector.lastIndexOf(";"), selector.lastIndexOf("}"));
    if (cut !== -1) selector = selector.slice(cut + 1).trim();
    let depth = 1;
    let j = open + 1;
    while (j < n && depth > 0) {
      const ch = css[j];
      if (ch === "{") depth += 1;
      else if (ch === "}") depth -= 1;
      j += 1;
    }
    const body = css.slice(open + 1, j - 1);
    // Only keep top-level style rules, not at-rules (their body is scanned later if needed)
    if (!selector.startsWith("@")) {
      rules.push({ selector, body });
    } else {
      // Recurse into at-rule bodies so a later wrapped theme block is still seen
      rules.push(...topLevelRules(body));
    }
    i = j;
  }
  return rules;
}

function declarations(body) {
  const vars = {};
  // Only this rule's direct declarations (drop nested rules first)
  const flat = body.replace(/{[^{}]*}/g, "");
  for (const part of flat.split(";")) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (name.startsWith("--") && value) vars[name] = value;
  }
  return vars;
}

function isDarkSelector(selector) {
  return /data-theme\s*=\s*["']dark["']/.test(selector);
}

function isLightSelector(selector) {
  return /(^|,)\s*:root\b/.test(selector) || /data-theme\s*=\s*["']light["']/.test(selector);
}

function collectThemes(css) {
  const light = {};
  const dark = {};
  for (const { selector, body } of topLevelRules(stripComments(css))) {
    const decls = declarations(body);
    if (!Object.keys(decls).length) continue;
    if (isDarkSelector(selector)) Object.assign(dark, decls);
    else if (isLightSelector(selector)) Object.assign(light, decls);
  }
  return { light, dark };
}

function parseColor(value) {
  if (!value) return null;
  const v = value.trim();
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  const rgb = v.match(/^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i);
  if (rgb) {
    const alpha = rgb[4] == null ? 1 : rgb[4].endsWith("%") ? parseFloat(rgb[4]) / 100 : parseFloat(rgb[4]);
    if (alpha < 1) return null; // not a solid color; caller should skip or fail
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
  }
  return null;
}

function srgbChannel(c) {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}

function contrastRatio(a, b) {
  const L1 = relativeLuminance(a);
  const L2 = relativeLuminance(b);
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

function hexOf({ r, g, b }) {
  const h = (n) => Math.round(n).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function requireToken(theme, themeName, name) {
  const raw = theme[name];
  if (!raw) throw new Error(`Missing ${name} in ${themeName} theme block of ${CSS_PATH}`);
  const color = parseColor(raw);
  if (!color) {
    throw new Error(
      `${name} in ${themeName} is not a solid parseable color (got "${raw}"). Use a hex or opaque rgb().`,
    );
  }
  return { raw, color, hex: hexOf(color) };
}

const checks = [];
function check(label, fg, bg, min) {
  const ratio = contrastRatio(fg.color, bg.color);
  const ok = ratio + 1e-9 >= min;
  checks.push({
    label,
    fg: fg.hex,
    bg: bg.hex,
    min,
    ratio,
    ok,
  });
}

function main() {
  const css = readFileSync(CSS_PATH, "utf8");
  const { light, dark } = collectThemes(css);
  if (!Object.keys(light).length) throw new Error("No light / :root theme tokens found.");
  if (!Object.keys(dark).length) throw new Error("No html[data-theme=dark] tokens found.");

  const lightBorder = requireToken(light, "light", "--border-strong");
  const lightClaimed = requireToken(light, "light", "--claimed-label");
  const lightBg = requireToken(light, "light", "--background");
  const lightField = requireToken(light, "light", "--field-bg");
  const lightGlossary = requireToken(light, "light", "--glossary-bg");

  const darkBorder = requireToken(dark, "dark", "--border-strong");
  const darkClaimed = requireToken(dark, "dark", "--claimed-label");
  const darkBg = requireToken(dark, "dark", "--background");
  const darkGlossary = requireToken(dark, "dark", "--glossary-bg");

  check("light --border-strong vs --field-bg", lightBorder, lightField, 3);
  check("light --border-strong vs --background", lightBorder, lightBg, 3);
  check("dark --border-strong vs --background", darkBorder, darkBg, 3);
  check("light --claimed-label vs --background", lightClaimed, lightBg, 4.5);
  check("light --claimed-label vs --field-bg", lightClaimed, lightField, 4.5);
  check("light --claimed-label vs --glossary-bg", lightClaimed, lightGlossary, 4.5);
  check("dark --claimed-label vs --background", darkClaimed, darkBg, 4.5);
  check("dark --claimed-label vs --glossary-bg", darkClaimed, darkGlossary, 4.5);

  let failed = 0;
  for (const c of checks) {
    const status = c.ok ? "PASS" : "FAIL";
    if (!c.ok) failed += 1;
    console.log(
      `${status}  ${c.label}: ${c.ratio.toFixed(2)}:1  (${c.fg} on ${c.bg}, need ≥${c.min}:1)`,
    );
  }
  if (failed) {
    console.error(`\n${failed} contrast check(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll ${checks.length} contrast checks passed.`);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
