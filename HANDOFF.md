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
2. **`npm run build`** exit 0; if you deployed, use GitHub Actions (`deploy.yml`) and confirm the workflow succeeded
3. **Commit + push `main`** so grok.com and PlasmoidX share one tree (no “live but uncommitted” gaps)
4. If handing **out** to grok.com: fill `briefs/PASTE_TO_GROK.md` **Current task** and give Derek the paste
5. If handing **in**: read `HANDOFF.md` + `git log -5` first — do not invent status from chat memory
6. Present Derek **5 clickable** next actions after a completed step

### Extra hygiene for Derek
- Prefer tasking via **Current task** in the paste brief (one outcome per session)
- After you do something outside the agents (DNS click, Facebook OG rescrape, password rotate), tell whichever agent is active so it lands in `HANDOFF.md`
- Don’t keep the “real” plan only in iMessage/chat — if it matters, it goes in `HANDOFF.md`
- SFTP password lives only in repo secret `SFTP_PASSWORD` (and password manager); never paste into git or the brief

---

## Stack & deploy (do not invent a new path)

| Item | Truth |
|------|--------|
| Framework | Next.js 14 App Router · TypeScript · Tailwind |
| Export | `output: 'export'` → static **`out/`** (trailingSlash) |
| Hosting | **Namecheap Stellar only** (Derek: no Cloudflare Pages for live) |
| DNS | Namecheap Advanced DNS · A `@` and `www` → `162.213.253.56` |
| Live deploy | **GitHub Actions only** — `.github/workflows/deploy.yml` (manual `workflow_dispatch`). Builds on Actions, uploads with `scripts/sftp-deploy.py` using repo secret **`SFTP_PASSWORD`**. Build gets Search Console token from repo variable **`NEXT_PUBLIC_GSC_VERIFICATION`**. |
| Fallback upload | Local SFTP from another machine still works (contents of `out/` → `public_html`). The **Grok Bot box cannot reach SFTP port 21098** — do not try deploy from the box. |
| TLS | Let’s Encrypt / AutoSSL on cPanel (HTTPS verified) |
| Cache | `public/.htaccess` → copied into `out/`: HTML revalidate; `/_next/static/*` 1y immutable; brotli + ETag; `og.png` ~1d |
| Namecheap browser Sign in | Often **blocked** on agent browsers — prefer Actions deploy, not panel login |
| Secrets | **Never put secrets in git.** SFTP password = repo secret only; GSC token = repo variable. |

### Deploy checklist

```bash
# Preferred (live path): GitHub Actions
gh workflow run deploy.yml -R watsdr/plasmoidx
# Or: GitHub → Actions → "Deploy to plasmoidx.com" → Run workflow

# Fallback from a machine that can reach SFTP :21098 (not the Grok Bot box):
cd /workspace/plasmoidx   # or your clone
npm ci                    # if needed
NEXT_PUBLIC_GSC_VERIFICATION=<token> npm run build   # must exit 0; refreshes out/
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

## What’s live (as of 2026-10-11)

Shipped on https://plasmoidx.com (deploy via GitHub Actions → SFTP):

- Everything from the 2026-09-21 baseline: motion splash + Soft Lift; Home scrollytelling; Device / Services / Study / Sources / Learn / Study Pack / Glossary / FAQ; Study command palette (`/` · ⌘K/Ctrl+K) + header Search + FAB; idle-deferred chrome; CTA/nav micro-interactions; OG/Twitter cards; contrast / link-underline a11y
- **GoatCounter** cookieless analytics (site code `plasmoidx`); counts client-side navigation (`no_onload` + `usePathname`, deduped, trailing slash stripped)
- **SEO:** sitemap + robots (generated), per-page canonicals, Organization/WebSite/LearningResource/FAQPage/Article **JSON-LD**
- **Search Console** verified (token via `NEXT_PUBLIC_GSC_VERIFICATION`); sitemap submitted
- **12 explainers** under `/explainers/` with per-page OG images and Related explainers blocks
- Private **`/stats/`** page (noindex) linking GoatCounter + Search Console
- **`.htaccess` tuning:** brotli, ETag, LiteSpeed cache lookup, deflate fallback; HTML revalidate; hashed assets immutable
- **Inline CSS** (`scripts/inline-css.mjs`); lazy Study labs; **WOFF2** font; **Home WebP** image (image weight pass **DONE**)
- Section OG cards at `/og/<section>.png` + explainer cards at `/og/explainers/<slug>.png`

### Lighthouse (live, recent runs)

| Form factor | Perf | A11y | BP | SEO |
|-------------|------|------|----|-----|
| Home mobile | 88–96 | 100 | 100 | 100 |
| Home desktop | 94–100 | 100 | 100 | 100 |
| Study mobile | ~78–100 (varies with host TTFB) | 100 | 100 | 100 |
| Study desktop | ~100 | 100 | 100 | 100 |
| Explainer (e.g. what-is-a-plasmoid) | mobile ~97 / desktop 100 | 100 | 100 | 100 |

Note: Perf swings with Namecheap TTFB/TLS (~200 ms handshake). Prefer two runs if Perf looks wrong. Remaining Home mobile LCP is mostly hero reveal/hydration, not image weight.

---

## Repo hygiene (important)

- `main` was synced with live polish + handoff pack (commits through handoff hygiene). Always `git pull` before starting.
- Still keep HANDOFF updates in the same change as the work when possible.

---

## Open gaps / risks

1. **Facebook Scrape Again for explainers** — per-explainer OG cards are live; Derek needs to force rescrape in the Facebook Sharing Debugger (and optionally X card validator).
2. **Optional Cloudflare CDN** in front of Namecheap for TLS/TTFB — Derek’s decision (not Pages; proxy/CDN only if chosen).
3. **Namecheap Sign in** — still unreliable for agents; prefer GitHub Actions deploy, not panel login.
4. **README drift** — older README may still mention Cloudflare Pages as primary; treat **Actions → SFTP to Namecheap** as the live path (see Deploy section above).
5. Optional: SW/offline shell hardening (image weight pass is done).

---

## Suggested next (Derek picks)

1. **Facebook Scrape Again** for explainer URLs (Derek) — new per-page OG cards at `/og/explainers/<slug>.png`.
2. **Optional Cloudflare CDN** in front for TLS/TTFB (Derek’s decision).
3. **`docs/SOCIAL-POSTS.md`** — 5 drafts ready; not posted yet.
4. Weekly **GoatCounter** summary routine runs Mondays **8:04 AM ET** in PlasmoidX (Grok Bot); no action unless it fails.
5. Home mobile Performance is **88–96** (host TTFB-bound); further wins need a hero-reveal rethink, not more image compression.

---

## Session log (append, newest first)

### 2026-10-13 — Resonator outlet pipe + last “exhaust feedback” wording + PNG cleanup (deployed)
- cc0b614: all remaining “exhaust feedback” copy is rewritten (`DeviceSystemFlow` aria-label, label, and caption; `DeviceSystemFlowLab`; `DeviceBeatsLab`; `explain.ts`; Device hero alt text). The system-flow arc label now reads “hot exhaust in”.
- `NestedSpheres.tsx`: added an outlet pipe leaving the inner sphere at the lower left (opposite “Exhaust in”), labeled “To intake (after carburetor)”. It is static, so it is reduced-motion safe, and uses theme-aware text classes. The aria-label is updated, and `NestedSpheresLab` has a new “To intake” step. Checked in light and dark themes (`/workspace/nested-spheres.png`).
- Deleted the unused `public/visuals/*.png` (device-nested-spheres, device-system-accurate, device-three-beats, device-vajra-gun, home-problem-solution, services-install). `public/sw.js` still precached 4 of them, so it now precaches the WebP files instead and the cache is bumped to v15. `og/` and social assets are untouched.
- The deploy (run 38373420484) does not delete remote files, so the old PNGs still answer 200 on the server until someone removes them over SFTP. Harmless.
- Live: pages 200, new alt text in the Device HTML, diagram strings in the lazy lab chunk, sw v15. Device mobile Lighthouse 95 / 100 / 100 / 100 (LCP 2.7 s).

### 2026-10-12 (night) — Resonator wording fix + Device/Services/Connect image perf (deployed)
- Wording (6fb618a): fixed the exhaust/carburetor misreading on the Device caption, `NestedSpheres.tsx`, `NestedSpheresLab.tsx`, `content.ts`, `DeviceWalkthrough.tsx` and the resonator explainer. Now: hot exhaust enters one end of the resonator; the cool plasmoid stream leaves the inner sphere by pipe to the engine’s intake, just after the carburetor. Sources: thunderstorm.tech Assembly Instructions (2026-02-18), TSG press release (10/24), Bendall DIY build guide video (2025). The nested-spheres art labels only “Exhaust in” and does not show the outlet pipe; no contradiction, not redrawn.
- Perf (4d4c7e1): Device/Services/Connect visuals swapped from 1280×720 PNGs (up to 1.4 MB) to 960×540 WebP (20–56 KB), matching Home; `priority` on the above-fold Services and Connect image. The PNGs are still in `public/visuals/` but unused.
- Deploy run 38335256628 green. Live Lighthouse medians (3 runs), before → after: mobile Device 71→87, Services 74→87, Connect 77→93; desktop Device 87→91, Services 96→91 (likely run-to-run noise), Connect 96→100. A11y/BP/SEO 100 throughout.

### 2026-10-12 — Shipped: copy cohesion (passes 1–3 + Home)
- Fast-forward merged `copy-cohesion` → `main` at 63deb0a; deployed via `deploy.yml` (run 38317489385, success).
- Home: nav keeps “Home”; hero now says Malcolm Bendall’s Thunderstorm Generator “is designed to use water to form and guide plasmoids … so engines can run cleaner”; Home slash pairs rewritten (the “Press /” keyboard hint is kept). Meta and Open Graph (OG) descriptions already said “aims to”, so unchanged.
- Footer: removed the “Metamorphosis” label (text only, no link).
- Live verified: hero text present, no Metamorphosis; /, /study/, /device/, /faq/, /services/, /glossary/, /connect/, /explainers/, /explainers/what-is-a-plasmoid/ all 200; bad URL returns 404 with the new “We couldn’t find that page” page.

### 2026-10-12 — Copy cohesion pass (branch `copy-cohesion`, not merged, not deployed)
- New `docs/STYLE-GUIDE.md`: voice, canonical names, labels, acronyms, number/dash/quote rules, CTA wording, nav = title rule.
- Applied site-wide: page intros follow "what this page is → why it matters"; H1s and meta titles now match nav labels (e.g. "Sources: method and privacy", "Updates and corrections"); nav "Why" → "Home", footer "Errata" → "Updates", footer headings "Pages" / "Outside sources".
- Terminology: EVO = Exotic Vacuum Occurrence everywhere (dropped "energetic vacuum object"); "Embry-Riddle test" (not "meter"); "Malcolm Bendall’s Thunderstorm Generator" (not "Bendall Thunderstorm Generator" / "Thunderstorm-style"); "about +9–10% fuel efficiency / about −34% average emissions"; "90% or more" (not ≥90%); explainer label "Inventor claim".
- Acronyms defined on first use per page (checked with a script over `out/`): M.S., MeV, EVO, CTR, PUM, MOE, ATV, MSAART.
- CTAs unified: Start Lesson 1, See how it works, Read the explainers, Email Derek, Ask about installs.
- Added a plain 404 page (`src/app/not-found.tsx`) + `ErrorDocument 404 /404.html` in `.htaccess`.
- Social cards: 518,400 card now "Plain fact" (arithmetic) + "Claim" (hardware ratios); regenerated `/workspace/plasmoidx-social/`.
- Local Lighthouse A11y/SEO 100 on Home, Study, Device, Services, Glossary, an explainer. Build green.
- Second pass (Study + labs/diagrams): rewrote slash pairs into plain English (e.g. “store / inward” → “stores energy and pulls inward”) in Study page, interactive labs, diagram captions/labels, and their data (`curriculum`, `explain`, `labs`, `content`, `claims`, `companions`, `studyRoutes`). Acronyms (EVO, CTR, UV, Z, IP) expanded on first use where missing. Home hero/nav untouched. Build green; Study has no prose slash pairs left (ad-hoc check over `out/study/index.html`); Study Lighthouse A11y 100.
- Third pass (Device, FAQ, Services, Glossary, Connect): slash pairs rewritten into plain English (e.g. “licensee / authorized dealer / partner” → “licensee, authorized dealer, or partner”); CARB, EPA, Z, H and He, and DC spelled out on first use. Home and nav untouched; “Search /” hint kept. Build green; no slash pairs left in body text on those five built pages; Lighthouse A11y 100 on Device and FAQ.

### 2026-10-11 — Email signup (off by default) + social visuals (not deployed)
- **Signup:** `src/components/NewsletterSignup.tsx` — plain HTML form POST (email field + Subscribe, privacy line), no JS, no cookies, no popup. Renders only when `NEXT_PUBLIC_NEWSLETTER_ACTION` is set at build. Placed after "Keep learning" on every explainer and on Home after Continue learning. Sources → Privacy now has a paragraph on email signup (Buttondown, unsubscribe anytime, no cookies). A11y/BP/SEO 100 locally with the env set.
- **Provider:** Buttondown (free tier, accepts plain form POST to `https://buttondown.com/api/emails/embed-subscribe/<username>`, double opt-in). To go live: Derek creates a Buttondown account, then add repo variable/secret `NEXT_PUBLIC_NEWSLETTER_ACTION` and pass it in `deploy.yml` build env (same way as the GSC var), then deploy.
- **Social visuals:** `node scripts/social-cards.mjs` → `/workspace/plasmoidx-social/<slug>/{square-1080x1080.png, vertical-1080x1920.png, vertical-1080x1920.mp4}` for the top 5 explainers + `contact-sheet.png`. MP4s ~12 s, 4 text frames with fades, no audio. Output is outside the repo.
- Not deployed (awaiting Derek review).

### 2026-10-11 — Synced handoff docs with current state; Grok brief refreshed.
- Rewrote Stack & deploy / Deploy checklist for GitHub Actions-only live deploys (`deploy.yml` + `sftp-deploy.py`, secrets/vars).
- Refreshed What’s live (2026-10-11), Open gaps, Suggested next; moved misplaced 2026-10-10 session entries into newest-first order.
- `briefs/PASTE_TO_GROK.md` + `AGENTS.md` deploy instructions aligned. No site code changes.

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

### 2026-10-10 — 8 explainers + perf/a11y
- Shipped 8 explainers (see docs/EXPLAINER-PLAN.md) under /explainers/; inline CSS via scripts/inline-css.mjs; Study labs lazy-load near viewport; WOFF2 font; ARIA chip-list fix. Commits 6451f74, 9b68392 (deployed via Actions).
- Live Lighthouse: Study mobile TBT ~230→~40 ms; scores vary 88–100 with host response time. A11y/BP/SEO 100.
- Search Console verified (token in repo variable NEXT_PUBLIC_GSC_VERIFICATION); sitemap submitted. GoatCounter live; weekly summary routine Mondays 8:04 AM ET via box env GOATCOUNTER_API_KEY.
- Open: per-explainer OG images (`npm run og`); Facebook Scrape Again for new pages.

### 2026-10-10 — Deploy via GitHub Actions
- Box can't reach SFTP port 21098 (outbound block). Added manual-only workflow `.github/workflows/deploy.yml` + `scripts/sftp-deploy.py`; SFTP password lives only in repo secret `SFTP_PASSWORD`.
- Deploy: `gh workflow run deploy.yml -R watsdr/plasmoidx` (or Actions tab → Run workflow). First run uploaded 138 files; SEO/analytics/explainers/stats commit ddcd5fb is live.
- Open: verify Google Search Console (meta tag via NEXT_PUBLIC_GSC_VERIFICATION or HTML file) and submit sitemap; re-run live Lighthouse; refresh share cards in Facebook/X debuggers.

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

### 2026-10-11 (evening) — Newsletter signup live
- Buttondown username `plasmoidx`; repo variable NEXT_PUBLIC_NEWSLETTER_ACTION passed to build in deploy.yml. Signup block live on explainers + Home. Social cards/videos in /workspace/plasmoidx-social (not in repo; regenerate with scripts/social-cards.mjs). Cloudflare setup steps sent to Derek; awaiting "Active".
