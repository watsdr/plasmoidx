# Paste this into grok.com (or any fresh Grok)

You are working on **Plasmoid X** — independent education site https://plasmoidx.com  
Repo: https://github.com/watsdr/plasmoidx (private/public as configured; branch `main`)

## Mandatory first reads
1. `HANDOFF.md` — living status, deploy truth, gaps, suggested next
2. `AGENTS.md` — operating rules
3. `docs/UI-UX-PLAYBOOK.md` — calm UI standard

## Hard constraints
- Namecheap Stellar hosting only for live; deploy static `out/` via SFTP to `public_html` (DNS A @/www → 162.213.253.56). Do not move live to Cloudflare Pages unless Derek says so.
- Next.js 14 static export (`output: 'export'`). `npm run build` must pass.
- Brand: circle+X; Daylight Paper / Soft Lift; polished-not-ornamental; no glow spam; plain English; `prefers-reduced-motion`.
- Never commit secrets. SFTP password comes from Namecheap Stellar welcome email.

## Current task
<DEREK_OR_AGENT_FILLS_THIS — one concrete outcome>

## When finished
- **Required:** update `HANDOFF.md` (session log + suggested next) before stopping or handing back.
- Update `HANDOFF.md` (session log + suggested next).
- List files changed, how to verify, whether `out/` was deployed.
- Offer 3–5 clear next options for Derek.
