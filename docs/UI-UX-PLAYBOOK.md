# Plasmoid X — Best-of-Worlds UI/UX Playbook

Synthesized from official guidance across five leaders:

| Source | Official home | What we take |
|--------|---------------|--------------|
| **Google Material Design 3** | [m3.material.io](https://m3.material.io/foundations) | Tokens, layout hierarchy, adaptive breakpoints, accessibility by default, purposeful motion |
| **Apple Human Interface Guidelines** | [developer.apple.com/.../design-principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) | Clarity, deference, depth; purpose; simplicity (remove friction); craft; stay out of the way |
| **Microsoft Fluent 2** | [fluent2.microsoft.design/design-principles](https://fluent2.microsoft.design/design-principles) | Built for focus (less clutter); natural/familiar patterns; inclusive; motion with purpose |
| **IBM Carbon** | [carbondesignsystem.com](https://carbondesignsystem.com/all-about-carbon/what-is-carbon/) | Modular consistency; user-first; inclusive; 2× grid / spacing discipline |
| **Shopify Polaris** | [shopify.dev / Polaris foundations](https://shopify.dev/docs/apps/design) | Empower without overwhelm; progressive disclosure; **polished but not ornamental**; plain language |

This playbook is the single standard for plasmoidx.com. When in doubt, prefer fewer elements and clearer hierarchy over decoration.

---

## 1. North-star principles (merged)

1. **Purpose first (Apple + Polaris)** — Every screen answers: what should someone understand or do here? Cut anything that doesn’t serve that.
2. **Clarity over cleverness (Apple + Material)** — One primary idea per section. Plain language. Strong hierarchy (one H1).
3. **Focus / less noise (Fluent)** — Reduce visual clutter. Quiet backgrounds. Accent color is rare and meaningful.
4. **Progressive disclosure (Polaris + Apple)** — Show the short path first; detail on demand (tabs, secondary sections)—not everything at once.
5. **Polished, not ornamental (Polaris)** — Craft typography, spacing, contrast. No decoration for decoration’s sake (no grain stacks, neon blooms, fake “premium” chrome).
6. **Consistency & modularity (Carbon + Material)** — Same spacing scale, type ramp, component patterns everywhere.
7. **Inclusive by default (all five)** — Contrast ≥ WCAG AA; visible focus; touch targets ≥ 44–48px; `prefers-reduced-motion` respected; semantic HTML.
8. **Familiar patterns (Fluent + Apple)** — Standard nav, links, forms. Don’t invent interaction metaphors.
9. **Stay out of the way (Apple + Fluent)** — UI frames content; content is the star.
10. **Earn every motion (Material + Fluent)** — Motion only to orient or confirm—never to impress.

---

## 2. Visual system

### Color
- **Neutrals do the work** (Carbon/Fluent): background, text, borders in a calm ink/mist scale.
- **One brand accent** (Material tokens): teal/aurora for links, focus, primary CTA only.
- Never use accent for large fills behind long text.
- Don’t stack multiple competing glows/gradients.

### Typography
- Clear type ramp: display (hero) → title → body → caption.
- Comfortable measure (~45–75 characters for body).
- Avoid ALL-CAPS overuse; section labels sparingly.
- Prefer content weight over decorative italics stacks.

### Spacing & layout
- **4px base grid** (Fluent/Carbon); spacing steps: 4, 8, 12, 16, 24, 32, 48, 64.
- Generous whitespace > decorative dividers.
- Max content width ~640–720px for reading; ~1024–1120px for multi-column.
- One clear vertical rhythm; avoid packed card grids that compete.

### Surfaces
- Prefer flat or barely elevated surfaces.
- Borders subtle (low-contrast). Skip heavy glassmorphism, multi-layer shadows, film grain overlays.
- Cards only when grouping actions or distinct choices—not wrapping every paragraph.

### Imagery & motif
- Logo: simple circle+X only.
- Torus/science motif: optional, very low opacity, static or barely breathing—never competing with text.
- No mouse-follow plasma theater on content pages (or keep at ≤5% opacity, disabled under reduced motion).

---

## 3. Information architecture & content

- Primary nav: **Why · Study · Device · Connect** (already aligned with progressive disclosure).
- Home (Why): slogan + short who/why + 2–3 CTAs. No quote walls + badge piles + path strips all at once.
- Study: short intro + scannable sections; chips OK if quiet.
- Device: three steps, linear and calm.
- Connect: email + short form; outbound links as a simple list.
- Claims: one clear distinction (measured vs inventor)—not three badges saying the same thing.
- No location filler unless Derek asks.
- Slogan locked: **New energy, explained simply.**

---

## 4. Components & interaction

| Element | Standard |
|---------|----------|
| Primary button | Solid accent, high contrast text, 44px min height |
| Secondary | Outline/ghost, same height |
| Links | Underline on hover/focus; accent color |
| Nav | Clear current page; no loud pills unless needed on mobile |
| Forms | Visible labels (not only placeholders); clear focus ring |
| Tables | Simple zebra or row hover—not both heavy |
| Motion | ≤200–300ms; ease-out; none if `prefers-reduced-motion` |

---

## 5. Anti-patterns (ban list for this site)

- Film grain / noise overlays
- Multi-layer mouse-tracking aurora/plasma/vignette stacks
- Breath/parallax/glow competing with hero text
- Badge spam (meter/claim/section-label all at once)
- Decorative hairline + dual gradient footers
- Overlapping sticky header + sticky chips eating content
- Marketing “path strip” repeating the same three links already in nav
- Jargon-first headlines when a plain line exists
- Ornamental micro-interactions that don’t aid understanding

---

## 6. Page checklist (ship gate)

- [ ] Can someone get the point in 5 seconds?
- [ ] Is there one primary action?
- [ ] Would this look calm on an Apple marketing page *and* clear in a Carbon product?
- [ ] Did we remove something decorative this pass?
- [ ] Contrast and keyboard focus verified?
- [ ] Reduced motion doesn’t break layout?

---

## 7. Application pass (this redesign)

1. Strip tacky ambient stack → optional single soft static wash or none.
2. Simplify Why: slogan, short body, honest-numbers block, CTAs—cut redundant chrome.
3. Calm Study/Device/Connect: fewer badges, quieter chips, cleaner spine.
4. Typography & spacing discipline; keep brand logo + slogan.
5. Rebuild and refresh live preview.

