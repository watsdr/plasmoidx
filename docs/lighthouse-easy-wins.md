# Lighthouse easy wins (code-side) — 2026-09-21

Parent should re-run a live Lighthouse audit after deploy. Changes made in-repo:

## SEO / discoverability
- Root `layout.tsx`: `lang="en"` on `<html>` (already present; kept).
- Default `title` + `description` via Next Metadata API; page templates use `%s · Plasmoid X`.
- Open Graph + Twitter cards with absolute `https://plasmoidx.com/og.png` (1200×630).
- Device / Services page metadata overrides include absolute OG/Twitter image URLs.

## Performance / CLS
- `localFont` Geist Sans: `display: "swap"` (root layout); Study mono layout already had swap.
- Homepage `SplashMark`: reserved square aspect (`aspect-square`) so splash does not shift layout.
- `VisualPanel`: explicit `aspect-ratio` from width/height on the image frame to reduce CLS.
- Images touched via VisualPanel keep meaningful `alt` text.

## A11y (related to scores)
- Header Search control with `aria-label="Search Study"`.
- Command palette: focus trap (Tab cycle), Escape, restore focus, visible focus rings; FAB/`esc` keyboard reachable.
- Reveal / splash / palette animations gated or disabled under `prefers-reduced-motion`.

## Not done here
- Live Lighthouse CLI audit, CDN caching headers, SFTP deploy.


## Mobile easy wins (code-side) — 2026-09-21

Parent should re-run **mobile** Lighthouse after deploy. Code changes (no CLI here):

- **Tap targets ≥44px**: `.chip` (`min-h-11`), `.nav-link`, header brand, ThemeToggle options, OfflineReady Dismiss, Study command-palette FAB (`2.75rem`), ShareLockCard / CurriculumRail ghost buttons, existing Search / menu / glossary already `min-h-11`.
- **Overflow**: `body { overflow-x: clip }`; header / main already `max-w-full` / `min-w-0`; `.overflow-x-safe` for wide diagrams.
- **Images**: `VisualPanel` keeps `aspect-ratio` from width/height + `sizes`; SplashMark `aspect-square`.
- **Readable type**: body `clamp(0.9375rem … 1rem)` (~15px floor); mobile sheet nav `text-base`.
- **Touch Search**: header Search remains ≥44×44 with `aria-label="Search Study"` on mobile and desktop.

## Mobile performance polish (98 → closer to 100) — 2026-09-21

Code-side only (no live Lighthouse CLI here). Parent re-runs mobile audit after deploy.

### CLS
- Header bar: `.site-header` / `.site-header-inner` locked to `--header-h` (3.5rem).
- Splash: `.splash-stage` `aspect-ratio: 1`, `contain: layout paint`, `overflow: hidden` (mesh blur cannot grow layout).
- `LearningProgress` / `CurriculumRail` skeletons reserve bordered min-height matching hydrated UI (was empty → expand).
- Splash settle animation starts near-final opacity/scale so LCP mark paints earlier.

### Speed Index
- Root layout: `dynamic(..., { ssr: false })` for `OfflineReady` + `StudyCommandPalette` (defer non-critical client JS).
- Header logo `fetchPriority="low"` so it does not compete with hero/LCP.
- No new animation libraries; no glow spam.

### Still for parent
- CDN cache headers, image CDN, live mobile Lighthouse after SFTP redeploy.

## Performance chase (mobile 98→100) + nav a11y + desktop readiness — 2026-09-21

Code-side only (no Lighthouse CLI / no SFTP). Parent: redeploy, then re-audit.

### A — Mobile Performance (CLS + Speed Index)
- **Theme FOUC/CLS**: `:root` now defaults to Daylight Paper (light); Soft Lift only under `data-theme="dark"` (matches theme-boot first visit).
- **Splash**: removed settle animation; mesh `inset:0` with **no** `filter:blur`; core pulse is **opacity-only**; slower orbits; stage `contain: layout paint style` + `isolation`.
- **SplashMark SVG**: explicit `width`/`height` 320; mesh no longer negative-inset.
- **Above-fold calm**: homepage TorusMotif no longer `breathe`; below-fold `home-problem-solution` VisualPanel **no longer `priority`** (was competing with LCP ~480KB).
- **Font**: `preload` + `adjustFontFallback: "Arial"` on Geist; still `display: swap`.
- **JS**: GlossaryDrawer `dynamic(..., { ssr: false })` with size-matched loading placeholder (header CLS-safe).

### D — Desktop readiness (verify after deploy)
Parent should run **desktop** Lighthouse on `/` after deploy and spot-check:
1. Sticky header height stable at wide widths; nav does not wrap/overflow; no horizontal page scroll.
2. Active nav bottom bar visible and aligned; hover/focus rings not clipped oddly.
3. Theme toggle (Dark/Light/System) does not shift header height.
4. Hero splash mark does not cause layout jump on load; LCP still ~text or mark ~1.1s class.
5. No mobile-only overflow clipping breaking desktop nav (overflow-x clip is ≤767.98px only).

### E — Nav active-state a11y
- Desktop: `aria-current="page"` + `.nav-link-active` (stronger weight) + 2px aurora `::after` bottom bar (works Daylight Paper + Soft Lift).
- Mobile sheet: `.nav-sheet-active` inset left bar + weight + existing bg/color.

### Still for parent
- Redeploy static `out/` via SFTP (not done here).
- Live **mobile** Lighthouse (target Performance 100) and **desktop** Lighthouse.
- CDN cache headers / image CDN remain out of scope.

## Desktop Performance toward 100 + mobile TBT harden — 2026-09-21

Code-side only (no live Lighthouse CLI / no SFTP). Parent: redeploy `out/`, then re-audit.

### A — Desktop Performance (~93 → toward 100)
- Splash: single slow orbit only; mid rings static; removed fast bead orbit + core pulse (less main-thread / paint).
- Home: `CurriculumRail` + `LearningProgress` `dynamic(..., { ssr: false })` with size-matched placeholders (below-fold).
- Site chrome: DeferredSiteChrome idle-mounts palette/offline (see D) — less above-fold JS.

### B — OG readiness (code-side)
- Root Metadata: absolute `https://plasmoidx.com/og.png`, 1200×630, `type: image/png`, Twitter `summary_large_image`.
- `public/og.png` verified 1200×630 PNG (~40KB).
- After deploy, scrape with:
  - Facebook Sharing Debugger: `https://developers.facebook.com/tools/debug/` → scrape `https://plasmoidx.com/` (and `/device/`, `/study/` if needed)
  - Twitter/X Card Validator: `https://cards-dev.twitter.com/validator` → `https://plasmoidx.com/`
  - Expected image URL: `https://plasmoidx.com/og.png`

### C — Keyboard shortcuts tip (Home)
- Dismissible `KeyboardShortcutsTip` under hero CTAs (⌘K / Ctrl+K and `/`). localStorage `plasmoidx-shortcuts-tip-dismissed`. Does not compete with FAB (bottom-right).

### D — Harden mobile TBT
- `DeferredSiteChrome`: `requestIdleCallback` / `setTimeout` mounts `StudyCommandPalette` + `OfflineReady` after first paint.
- First intent (⌘K / Ctrl+K, `/`, header Search / `openStudyPalette`, or FAB placeholder) mounts palette immediately and re-dispatches open. Placeholder FAB keeps a11y while deferred.

### E — Static cache headers (`.htaccess` in `public/` → copied to `out/`)
| Asset | Cache-Control |
| --- | --- |
| `*.html` | `max-age=0, must-revalidate, public` |
| `sw.js` | `max-age=0, must-revalidate, public` |
| `/_next/static/*` | `public, max-age=31536000, immutable` |
| fonts (woff2 etc.) | `public, max-age=31536000, immutable` |
| `og.png` | `public, max-age=86400` (1 day) |
| other images | `public, max-age=604800` (7 days) |
| DirectoryIndex | `index.html` (trailing-slash static export routing preserved) |

### Still for parent
- SFTP deploy of `out/` (including `.htaccess`) to Namecheap `public_html`.
- Facebook / Twitter debugger scrapes (URLs above).
- Desktop + mobile Lighthouse re-score on `/`.
