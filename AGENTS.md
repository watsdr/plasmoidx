# Plasmoid X — AGENTS.md

**Repo:** https://github.com/watsdr/plasmoidx · **Live:** https://plasmoidx.com

Operating rules for **any** coding agent (PlasmoidX Grok Bot, grok.com, Cursor, etc.).

## Scope

- Work **only** on plasmoidx.com / this repo unless Derek explicitly widens scope.
- Independent education: never claim Strike Foundation / Strike Energy affiliation or licensee status.

## Before you change code

1. Read `HANDOFF.md` (status) and this file (rules).
2. Skim `docs/UI-UX-PLAYBOOK.md` for UI decisions.
3. Confirm hosting path: **Namecheap Stellar + SFTP `out/` → `public_html`** (not Cloudflare Pages for production).

## While you work

- Keep copy plain English; define acronyms on first use.
- Daylight Paper default · Soft Lift dark · circle+X · calm motion only.
- Respect `prefers-reduced-motion`.
- Static export must stay green: `npm run build` → `out/`.
- Never commit secrets (SFTP passwords, cPanel). Pull Stellar welcome email when needed; shred local cred files.
- Prefer small, reviewable commits. Update `HANDOFF.md` in the same change when status moves.

## After you finish a chunk

1. `npm run build` (exit 0).
2. Deploy `out/` via SFTP if Derek wants it live (include `.htaccess`).
3. Spot-check https://plasmoidx.com/ (and touched routes).
4. Optional: mobile + desktop Lighthouse on `/`.
5. Refresh **HANDOFF.md** session log + suggested next.
6. If handing to another Grok: fill `briefs/PASTE_TO_GROK.md` **Current task** and give Derek the paste.

## PlasmoidX Grok Bot extras

- After completing a step, suggest **5** next actions in a **clickable** widget.
- Do not narrate internal subagents/tools to Derek.

## Forbidden shortcuts

- Do not “fix” production by switching to Cloudflare Pages unless Derek reverses the Namecheap-only decision.
- Do not invent DNS or hosting credentials.
- Do not paste passwords into chat or into git.
