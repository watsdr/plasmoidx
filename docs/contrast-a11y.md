# Color contrast a11y (WCAG AA) — 2026-09-21

Desktop Lighthouse reported Accessibility ~92 with `color-contrast` failures.
Fixes prefer **theme token** tweaks so Daylight Paper (light) and Soft Lift (dark) stay calm.

## Token changes (`src/app/globals.css`)

| Token | Theme | Before | After | Why |
| --- | --- | --- | --- | --- |
| `--mist-400` | dark (Soft Lift) | `107 132 168` (~4.46:1 on `--background`) | `130 154 190` (~5.9:1 bg, ~5.3:1 ink-900, ~4.7:1 ink-800) | Muted captions/labels (`text-mist-400`) failed AA for normal text |
| `--mist-400` | light (Daylight Paper) | `90 111 143` (~4.77:1) | `76 96 126` (~6.0:1) | Extra margin on paper surfaces and ink-900 cards |
| `--aurora-soft` | light | `13 148 136` (~3.49:1) | `14 120 112` (~5.0:1) | Soft accent safe if used as text; splash SVG still calm |

## Class / component tweaks

- `.field-input` placeholder: `placeholder:text-mist-400` (was `/70`, which dropped below AA)
- `.locks-table thead`: `text-mist-300` (11px headers on ink-800)
- Footer fine print: dropped `text-mist-400/80` opacity hack → solid `text-mist-400`

## Unchanged (already AA)

- Body/foreground, `text-mist-50`–`300`, dark/light `--aurora` / `--aurora-glow`
- `.link-aurora` / hover (`aurora` → `aurora-glow`)
- Primary button fg on aurora fill

## Targets

- Normal text ≥ **4.5:1**
- Large text / UI graphics ≥ **3:1**

## Link distinguishability (mobile a11y 96 → chase 100) — 2026-09-21

Lighthouse `link-in-text-block`: inline links must not rely on color alone.

### Fix
- `.link-aurora` always shows underline + `underline-offset-[0.2em]` (not hover-only).
- CurriculumRail / GuidedPath inline text links likewise always underline.

### Remaining risks (parent re-audit)
- Nav links (`.nav-link`) and chip/index anchors intentionally use layout/position, not paragraph underlines — usually exempt from `link-in-text-block`.
- Active nav uses accent color + bottom hairline; if audits flag it, add a non-color cue beyond the hairline.
- Button vs link roles: Search / menu / theme controls have `aria-label`s; re-check after deploy if names regress.
- Focus rings depend on `:focus-visible` + aurora outline — keep theme tokens AA.
