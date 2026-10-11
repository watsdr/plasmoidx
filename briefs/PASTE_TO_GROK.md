# Paste this into grok.com (or any fresh Grok)

You are working on **Plasmoid X** — independent education site https://plasmoidx.com  
Repo: https://github.com/watsdr/plasmoidx (branch `main`)

## Mandatory first reads
1. `HANDOFF.md` — living status, deploy truth, gaps, suggested next
2. `AGENTS.md` — operating rules
3. `docs/UI-UX-PLAYBOOK.md` — calm UI standard

## Hard constraints
- Namecheap Stellar hosting only for live. **Deploy via GitHub Actions** (`.github/workflows/deploy.yml`): `gh workflow run deploy.yml -R watsdr/plasmoidx` or Actions tab → Run workflow. The workflow builds and uploads with `scripts/sftp-deploy.py` using repo secret `SFTP_PASSWORD`; build uses repo variable `NEXT_PUBLIC_GSC_VERIFICATION`. The Grok Bot box cannot reach SFTP port 21098 — do not SFTP from the box. Local SFTP from another machine is a fallback only. DNS A @/www → 162.213.253.56. Do not move live to Cloudflare Pages unless Derek says so.
- Next.js 14 static export (`output: 'export'`). `npm run build` must pass.
- Brand: circle+X; Daylight Paper / Soft Lift; polished-not-ornamental; no glow spam; plain English; `prefers-reduced-motion`.
- Never commit secrets. SFTP password = repo secret `SFTP_PASSWORD` only.
- After every ship/session end: update `HANDOFF.md` before handing back (Derek-required hygiene).

## Current task
No active build task. Read HANDOFF.md and confirm you're synced. Don't ship anything until Derek gives you a Current task.

## When finished
- **Required:** update `HANDOFF.md` (session log + what’s live + suggested next) before stopping or handing back.
- List files changed, how to verify, whether `out/` was deployed.
- Offer 3–5 clear next options for Derek.
