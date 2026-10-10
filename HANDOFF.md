# Plasmoid X — HANDOFF (living)

> **Source of truth for any agent or Grok session.** Update this file at the end of every meaningful session before handing off. Do not rely on chat history — the next Grok will not see it.

**Live site:** https://plasmoidx.com  
**Repo:** https://github.com/watsdr/plasmoidx (`main`)  
**Local checkout (Grok Bot box):** `/workspace/plasmoidx`  
**Owner:** Derek Watson  
**Independent education site** — not Strike Foundation, Strike Energy, or a licensee.

---

## How to hand off (read this first)

| Direction | Do this |
|-----------|---------|
| **Out** (this chat → other Grok) | 1) Refresh this file + `AGENTS.md`. 2) Commit/push if status drifted. 3) Give Derek the paste block from `briefs/PASTE_TO_GROK.md` with **Current task** filled. |
| **In** (other Grok → this chat) | 1) Read `HANDOFF.md` + `AGENTS.md` + latest `git log` / `gh` on `main`. 2) Diff working tree vs last deploy. 3) Continue from **Suggested next** or Derek’s pick. |
| **Derek** | Paste `briefs/PASTE_TO_GROK.md` into grok.com (or any session). Or say “read HANDOFF and continue” in PlasmoidX chat. |

Shared skill (Grok Bot): [Plasmoid X Grok handoff](sand-workflow:plasmoidx-grok-handoff)

## Session hygiene (required)

**After every ship or session end — before switching agents — do all of these:**

1. **Update `HANDOFF.md`** in the same change when possible:
   - Append a short **Session log** entry (date, what shipped, what’s still open)
   - Refresh **What’s live** / Lighthouse notes if scores or routes changed
   - Rewrite **Suggested next** (3–5 concrete options)
   - Note anything **not in git** (credentials live only in Stellar welcome email, pending Derek login steps)
2. **`npm run build`** exit 0; if you deployed, confirm `out/` (incl. `.htaccess`) is what SFTP’d
3. **Commit + push `main`** so grok.com and PlasmoidX share one tree (no “live but uncommitted” gaps)
4. If handing **out** to grok.com: fill `briefs/PASTE_TO_GROK.md` **Current task** and give Derek the paste
5. If handing **in**: read `HANDOFF.md` + `git log -5` first — do not invent status from chat memory
6. Present Derek **5 clickable** next actions after a completed step

### Extra hygiene for Derek
- Prefer tasking via **Current task** in the paste brief (one outcome per session)
- After you do something outside the agents (DNS click, Facebook OG rescrape, password rotate), tell whichever agent is active so it lands in `HANDOFF.md`
- Don’t keep the “real” plan only in iMessage/chat — if it matters, it goes in `HANDOFF.md`
- SFTP/cPanel secrets stay in the Stellar welcome email / password manager — never paste into GitHub or the brief

---

## Stack & deploy (do not invent a new path)

| Item | Truth |
|------|--------|
| Framework | Next.js 14 App Router · TypeScript · Tailwind |
| Export | `output: 'export'` → static **`out/`** (trailingSlash) |
| Hosting | **Namecheap Stellar only** (Derek: no Cloudflare Pages for live) |
| DNS | Namecheap Advanced DNS · A `@` and `www` → `162.213.253.56` |
| Upload | **SFTP** → `public_html` (welcome email user/host/port; password from Stellar welcome mail — never commit) |
| TLS | Let’s Encrypt / AutoSSL on cPanel (HTTPS verified) |
| Cache | `public/.htaccess` → copied into `out/`: HTML revalidate; `/_next/static/*` 1y immutable; `og.png` ~1d |
| Namecheap browser Sign in | Often **blocked** on agent browsers — prefer SFTP, not panel login |

### Deploy checklist

```bash
cd /workspace/plasmoidx   # or your clone
npm ci                    # if needed
npm run build             # must exit 0; refreshes out/
# SFTP contents of out/ (including .htaccess) → public_html
# Verify: curl -sSI https://plasmoidx.com/ | head
# Optional: lighthouse mobile + desktop on /
```

---

## Brand & UX locks (non-negotiable)

- Slogan: **“New energy, explained simply.”** (keep plain-English variants consistent with live copy)
- Logo: simple **circle + X** only
- Themes: **Daylight Paper** (light default) · **Soft Lift** (dark)
- Playbook: `docs/UI-UX-PLAYBOOK.md` — polished-not-ornamental; **no** glow spam, grain, badge piles
- Plain English; define acronyms on first use
- Honor `prefers-reduced-motion`
- No Columbus/Ohio filler unless Derek asks
- Device art: stay accurate to Bendall / Strike source schematics when showing the Thunderstorm Generator

---

## What’s live (as of 2026-09-21 ~16:00 ET)

Shipped on https://plasmoidx.com (static SFTP):

- Motion splash mark + Soft Lift polish; playbook-safe motion
- Home scrollytelling; Device / Services / Study / Sources / Learn / Study Pack / Glossary / FAQ chapters
- Study command palette (`/` · ⌘K/Ctrl+K) + header Search + FAB; idle-deferred chrome for TBT
- Quiet dismissible keyboard tip on Home
- CTA/nav micro-interactions; active nav has non-color cue + `aria-current`
- OG/Twitter: `https://plasmoidx.com/og.png` (1200×630)
- Contrast / link-underline a11y passes
- `.htaccess` cache rules active (HTML `max-age=0, must-revalidate`; hashed assets immutable)

### Lighthouse (post last deploy, lab)

| Form factor | Perf | A11y | BP | SEO |
|-------------|------|------|----|-----|
| Mobile | 100 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

Note: one earlier mobile run showed a flaky TBT spike; re-run confirmed 100. Prefer two runs if Perf looks wrong.

---

## Repo hygiene (important)

- `main` was synced with live polish + handoff pack (commits through handoff hygiene). Always `git pull` before starting.
- Still keep HANDOFF updates in the same change as the work when possible.

---

## Open gaps / risks

1. **Facebook/X OG rescrape** — meta is correct live; Facebook debugger needs Derek’s login to force rescrape.
3. **Namecheap Sign in** — still unreliable for agents; stick to SFTP + email credentials.
4. **README drift** — older README still mentions Cloudflare Pages as primary; treat **Namecheap SFTP** as live path (see Deploy section above).
5. Optional next polish: image weight (large home PNG), SW/offline shell hardening.
6. **GoatCounter account (Derek):** create account at goatcounter.com with site code **`plasmoidx`** (counts post to `https://plasmoidx.goatcounter.com/count`). Until then the script loads but counts are dropped. Override via `NEXT_PUBLIC_GOATCOUNTER_CODE` at build time.
7. **Search Console (Derek):** add property, verify via meta tag — set `NEXT_PUBLIC_GSC_VERIFICATION=<token>` and rebuild (or upload Google's HTML file into `public/`). Then submit `https://plasmoidx.com/sitemap.xml`.
8. **Deploy pending:** 2026-10-10 SEO/analytics/explainers batch is on `main` but NOT yet SFTP'd (Derek handles deploy).

---

## Suggested next (Derek picks)

1. Deploy the 2026-10-10 batch (SFTP `out/` incl. `.htaccess`, `sitemap.xml`, `robots.txt`, `og/`).
2. Create GoatCounter `plasmoidx` + verify Search Console (meta tag env) and submit sitemap.
3. Force OG rescrape in Facebook + X validators (per-section images now at `/og/<section>.png`).
4. Image weight pass (WebP/AVIF) for large Home PNG — see `briefs/PASTE_TO_GROK.md`.
5. More explainers once Search Console shows real queries.

---

## Session log (append, newest first)

### 2026-10-10 (evening) — GoatCounter counts client-side navigations
- Bug: only the first page load was counted; Next.js link clicks don't reload the page, so count.js never saw them.
- Fix (`src/components/Analytics.tsx`): count.js still injected after load + idle, now with `data-goatcounter-settings={"no_onload":true}`; a `usePathname` effect calls `goatcounter.count({ path })` on first load and every route change. Deduped (same path never double-counted), paths normalized without trailing slash (`/study/` → `/study`), queued until the script loads. Still prod-hostname only.
- Verified live in headless Chrome (counter requests intercepted, nothing sent): Home → Study → Explainers produced `/`, `/study`, `/explainers`. Live layout chunk contains `no_onload`; GSC tag present. Commit 7b8e35d deployed.
- Note: older GoatCounter rows use trailing-slash paths (e.g. `/services/`); new rows won't have the slash.

### 2026-10-10 (afternoon) — Explainer share cards, related links, host tuning, social drafts
- **OG:** `npm run og` now also renders `public/og/explainers/<slug>.png` (title card per explainer, read from `src/lib/explainers.ts`). `pageMeta({ ogImage })` wires it; Article JSON-LD image matches. All 12 return 200 live.
- **Related explainers:** `ExplainerArticle` adds a plain "Related explainers" list (3 others not already in Keep learning).
- **.htaccess:** LiteSpeed `CacheLookup` + short HTML cache env, `FileETag MTime Size`, mod_deflate fallback, txt/json/xml revalidate. Brotli + ETag + 304 confirmed live. TTFB (curl, 6-run avg): before / 391 ms, /study/ 402, evo 381 (server wait ~166–190 ms after TLS) → after 362 / 352 / 355 (server wait ~141–156 ms). No `x-litespeed-cache` header: LSCache doesn't engage for plain static files, so the remaining time is host/TLS latency (~210 ms TLS handshake). Bigger wins need a CDN (Cloudflare proxy in front of Namecheap) — Derek's call.
- **Social:** `docs/SOCIAL-POSTS.md` — 5 drafts, not posted.
- Commit 26a9151 deployed; GSC tag still live. Next: Facebook Scrape Again for explainer URLs (new cards).

### 2026-10-10 — Live Lighthouse, OG check, explainer plan
- **Live Lighthouse (before → after fix):** Home mobile Perf 81 → 92, desktop 94 → 95; Study mobile 86 (re-runs vary 78–86), desktop 100; What-is-a-plasmoid mobile 97, desktop 100. Accessibility / Best Practices / SEO 100 everywhere.
- **Fixes (2bf2be6, deployed):** Home problem/solution visual is now WebP 960×540 (491 KB → 11 KB; sw cache v14); the "7" skipped button's accessible name now starts with "7"; Home og:image:alt no longer says "Plasmoid X" twice.
- **Still under 100:** Home mobile LCP (Largest Contentful Paint) ~3.2 s is the hero paragraph's render delay (reveal/hydration) plus ~9 KB render-blocking CSS; Study mobile is a heavy page. Not easy wins — needs a hero-reveal rethink.
- **OG:** og/twitter tags present on /, /study/, /explainers/what-is-a-plasmoid/; `/og/home.png`, `/og/study.png`, `/og/explainers.png` return 200. Facebook scrape API needs an access token → Derek clicks **Scrape Again** at https://developers.facebook.com/tools/debug/.
- **Plan:** `docs/EXPLAINER-PLAN.md` (8 proposed explainers, not built).
- **GoatCounter:** JSON API at `https://plasmoidx.goatcounter.com/api/v0` (Bearer token, 4 req/s). Weekly summary needs Derek to create an API key (user menu → API) with stats read permission, stored as a secret.

### 2026-10-10 — SEO, analytics, explainers, OG cards, /stats/
- **Analytics:** `src/components/Analytics.tsx` injects GoatCounter `count.js` after `load` + idle; only on plasmoidx.com hostnames (local/Lighthouse runs don't count). Code from `NEXT_PUBLIC_GOATCOUNTER_CODE` (default `plasmoidx`). Privacy note added on `/sources/#privacy`.
- **SEO:** `src/app/sitemap.ts` + `src/app/robots.ts` (replaced static `public/sitemap.xml` / `robots.txt`); routes listed in `src/lib/seo.ts` `SITEMAP_ROUTES`. `/stats/` excluded + disallowed; `/learn/` `/contact/` aliases stay noindex and out of sitemap. `pageMeta()` helper gives every page a canonical, unique title/description, OG + Twitter card. Optional `NEXT_PUBLIC_GSC_VERIFICATION` → `<meta name="google-site-verification">`.
- **JSON-LD:** Organization + WebSite on Home; LearningResource on Study; FAQPage on FAQ; Article on each explainer (removed old site-wide block from layout).
- **Explainers (new):** `/explainers/`, `/explainers/what-is-a-plasmoid/`, `/explainers/plasmoid-vs-plasma/`, `/explainers/thunderstorm-generator/`, `/explainers/msaart/` — content in `src/lib/explainers.ts`, each block labeled Measured / Inventor claim / Plain definition. Linked from Study header, footer, and the command palette.
- **OG images:** `npm run og` (`scripts/og-images.mjs`, headless Chrome) → `public/og/<section>.png` 1200×630, committed. Re-run after copy changes; not part of `npm run build`.
- **/stats/:** private noindex page linking GoatCounter + Search Console with plain-English meanings of each number (links, not iframes — GoatCounter embeds need a public dashboard).
- Lab Lighthouse (local `serve`, no prod headers): desktop 100/100/100/100; mobile Home 98–99, Study 95–96 Perf with A11y/BP/SEO 100 — same as pre-change baseline measured the same way, so it's a local-env gap, not a regression. Re-check on live after deploy.
- Not deployed (Derek deploys).

### 2026-09-21 — Ready Grok paste (image weight)
- Filled `briefs/PASTE_TO_GROK.md` **Current task** with Home image weight pass (WebP/AVIF + build + SFTP + HANDOFF update).
- Git sync already on `main` (handoff hygiene commits); next code priority is image weight.


### 2026-09-21 — Standing handoff hygiene confirmed
- Derek confirmed: **HANDOFF.md updates are required** after every Plasmoid X ship or session end.
- Added explicit Session hygiene checklist (agent + Derek). Skill `plasmoidx-grok-handoff` updated to match.


### 2026-09-21 — Handoff process created
- Added `HANDOFF.md`, `AGENTS.md`, `briefs/PASTE_TO_GROK.md`, shared skill `plasmoidx-grok-handoff`.
- Live site already at Lighthouse 100s after A–E polish deploy.

### 2026-09-21 — Motion splash + a11y/perf batches
- Scrollytelling, palette, Search, OG, `.htaccess`, idle-defer, Soft Lift, contrast, nav cues; SFTP redeploys throughout.

### 2026-10-10 — Deploy via GitHub Actions
- Box can't reach SFTP port 21098 (outbound block). Added manual-only workflow `.github/workflows/deploy.yml` + `scripts/sftp-deploy.py`; SFTP password lives only in repo secret `SFTP_PASSWORD`.
- Deploy: `gh workflow run deploy.yml -R watsdr/plasmoidx` (or Actions tab → Run workflow). First run uploaded 138 files; SEO/analytics/explainers/stats commit ddcd5fb is live.
- Open: verify Google Search Console (meta tag via NEXT_PUBLIC_GSC_VERIFICATION or HTML file) and submit sitemap; re-run live Lighthouse; refresh share cards in Facebook/X debuggers.

### 2026-10-10 — 8 explainers + perf/a11y
- Shipped 8 explainers (see docs/EXPLAINER-PLAN.md) under /explainers/; inline CSS via scripts/inline-css.mjs; Study labs lazy-load near viewport; WOFF2 font; ARIA chip-list fix. Commits 6451f74, 9b68392 (deployed via Actions).
- Live Lighthouse: Study mobile TBT ~230→~40 ms; scores vary 88–100 with host response time. A11y/BP/SEO 100.
- Search Console verified (token in repo variable NEXT_PUBLIC_GSC_VERIFICATION); sitemap submitted. GoatCounter live; weekly summary routine Mondays 8:04 AM ET via box env GOATCOUNTER_API_KEY.
- Open: per-explainer OG images (`npm run og`); Facebook Scrape Again for new pages.
