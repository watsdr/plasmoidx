# PlasmoidX — plasmoidx.com

Independent education & outreach site on the Bendall Thunderstorm Generator and Plasmoid Unification Model (PUM) / Molten Sea Ark Atomic Reconstruction Technology (MSAART).

**Owner:** Derek Watson  
**Not** Strike Foundation, Strike Energy, or a licensee.

Stack: **Next.js App Router** · TypeScript · Tailwind CSS · **static export** (`output: 'export'`) for Cloudflare Pages.


## Production hosting (current)

**Live:** https://plasmoidx.com on **Namecheap Stellar** (static `out/` via **SFTP** → `public_html`).  
DNS at Namecheap: A `@` / `www` → `162.213.253.56`. HTTPS via Let’s Encrypt / AutoSSL.

> Derek’s rule: use Namecheap services already purchased for production — **not** Cloudflare Pages for the live site. Older Cloudflare notes below are historical/optional only.

**Agent handoff:** see [`HANDOFF.md`](./HANDOFF.md), [`AGENTS.md`](./AGENTS.md), and [`briefs/PASTE_TO_GROK.md`](./briefs/PASTE_TO_GROK.md).


## Local development

```bash
cd plasmoidx
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

Success produces a static site in **`out/`**. There is no Node server in production — serve `out/` as plain static files.

Preview locally (optional):

```bash
npx serve out
```

## Offline (service worker)

`public/sw.js` precaches the site shell (`/`, `/study/`, `/device/`, `/connect/`), `/data/locks.json`, and key logo/favicon assets. A small client component registers the worker after load and shows a dismissible “Offline ready” note.

Works with **static export** — register happens in the browser against the same origin that serves `out/`. First visit still needs network; later revisits can load the shell offline. Clear site data / unregister the worker if you need a hard refresh during development.

## Routes

| Path         | Purpose                                                        |
|--------------|----------------------------------------------------------------|
| `/`          | **Why** — Derek’s framing, Embry-Riddle meter, purpose hub     |
| `/study/`    | **Study** — locks, vortex laws, charge, plasmoid, protium, MOE |
| `/device/`   | **Device** — ionizer → bubbler → Vajra/CTR + design ratios     |
| `/connect/`  | **Connect** — contact + US education/pilot + independent links |
| `/learn/`    | Thin alias → Study (old path; not indexed)                     |
| `/contact/`  | Thin alias → Connect (old path; not indexed)                   |

Trailing slashes are enabled (`trailingSlash: true`) so static hosting maps cleanly to `index.html` folders.

## Deploy to Cloudflare Pages

1. Push this repo (or upload the folder) to your Git provider, **or** use direct upload of `out/`.
2. In Cloudflare Pages:
   - **Framework preset:** Next.js (Static HTML Export) — or None
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 18+ (set `NODE_VERSION=20` in environment variables if needed)
3. After the first deploy, note your `*.pages.dev` URL.

### Direct upload (no Git)

```bash
npm run build
# then upload the contents of out/ via Cloudflare Pages “Direct Upload”
# or: npx wrangler pages deploy out --project-name=plasmoidx
```

## Namecheap DNS → Cloudflare Pages

**Goal:** `www.plasmoidx.com` and apex `plasmoidx.com` both serve the Pages site.

### Recommended: move DNS to Cloudflare

1. Add `plasmoidx.com` as a site in Cloudflare (free plan is fine).
2. At Namecheap → Domain List → Manage → Nameservers → **Custom DNS**, set the two Cloudflare nameservers Cloudflare gives you.
3. In Cloudflare DNS for the zone:
   - **www** — `CNAME` → `<your-project>.pages.dev` (Proxied / orange cloud)
   - **apex (@)** — `CNAME` → `<your-project>.pages.dev` (Cloudflare supports CNAME flattening on the apex) **or** use Cloudflare Pages “Custom domains” UI which adds the records for you
4. In Cloudflare Pages → Custom domains, add both `plasmoidx.com` and `www.plasmoidx.com` and complete SSL.

### Keep Namecheap DNS (www only is simplest)

1. Namecheap → Advanced DNS:
   - **www** — `CNAME` Record → Value: `<your-project>.pages.dev` (TTL Automatic)
2. Apex: Namecheap cannot CNAME the naked domain to Pages cleanly on all plans. Options:
   - Redirect apex → `https://www.plasmoidx.com` (Namecheap URL Redirect / Domain Redirect), **or**
   - Move DNS to Cloudflare (above) for proper apex support
3. Still add `www.plasmoidx.com` (and apex if used) under Cloudflare Pages → Custom domains so TLS certificates issue.

Replace `<your-project>.pages.dev` with your actual Pages hostname (e.g. `plasmoidx.pages.dev`).

## Meta

- **Title:** PlasmoidX — Bendall · Thunderstorm · PUM Education
- **Description:** Independent education & outreach on the Bendall Thunderstorm Generator and Plasmoid Unification Model (PUM) / Molten Sea Ark Atomic Reconstruction Technology (MSAART). Clear study of vortex math, plasmoids, and measured results.

## Honest numbers (editorial)

Lead with Embry-Riddle Aeronautical University M.S. thesis (2026): ~+9–10% fuel efficiency, ~−34% avg emissions (CO clearest). Inventor/marketing claims are labeled as such; do not oversell 90% fuel claims.

## License / voice

Site content is for education and outreach. External links (Strike Foundation, Thunderstorm.tech, Alpha Prospects) are labeled independent — no partner or official claims.
