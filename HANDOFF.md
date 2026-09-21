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

- Last pushed commit may lag the **live** site and the **local** tree.
- As of handoff creation, local `main` had **many uncommitted** polish files vs `origin/main`. Next agent should:
  1. `git status` / `git diff --stat`
  2. Commit a clean “sync live polish + handoff docs” PR/commit (Derek’s OK to push)
  3. Keep `HANDOFF.md` in that same change when possible

---

## Open gaps / risks

1. **Git sync** — commit + push uncommitted work so grok.com and PlasmoidX share one tree.
2. **Facebook/X OG rescrape** — meta is correct live; Facebook debugger needs Derek’s login to force rescrape.
3. **Namecheap Sign in** — still unreliable for agents; stick to SFTP + email credentials.
4. **README drift** — older README still mentions Cloudflare Pages as primary; treat **Namecheap SFTP** as live path (see Deploy section above).
5. Optional next polish: image weight (large home PNG), sitemap/robots, privacy analytics, SW/offline shell hardening.

---

## Suggested next (Derek picks)

1. Commit & push all live polish + this handoff pack to `main`.
2. Force OG rescrape in Facebook + X validators (Derek login).
3. Image weight pass (WebP/AVIF) for large Home PNG.
4. Sitemap + robots polish.
5. Privacy-friendly analytics recommendation + optional install.

---

## Session log (append, newest first)

### 2026-09-21 — Handoff process created
- Added `HANDOFF.md`, `AGENTS.md`, `briefs/PASTE_TO_GROK.md`, shared skill `plasmoidx-grok-handoff`.
- Live site already at Lighthouse 100s after A–E polish deploy.

### 2026-09-21 — Motion splash + a11y/perf batches
- Scrollytelling, palette, Search, OG, `.htaccess`, idle-defer, Soft Lift, contrast, nav cues; SFTP redeploys throughout.
