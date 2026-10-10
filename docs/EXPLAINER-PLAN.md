# Explainer plan — next pages (plan only, not built)

Status: proposal (2026-10-10). Build into `src/lib/explainers.ts` using the existing pattern
(each block labeled **Measured** / **Inventor claim** / **Plain definition**, acronyms defined on first use,
Article JSON-LD, added to `SITEMAP_ROUTES`). Re-rank once Google Search Console shows real queries.

| # | Slug / title | Target search query | Backed by existing site sources |
|---|---|---|---|
| 1 | `/explainers/embry-riddle-thunderstorm-generator-test/` — "What the Embry-Riddle test actually measured" | embry riddle thunderstorm generator results | Honest numbers lesson (`curriculum.ts` "numbers"), FAQ `meter`, `claims.ts` (fuel, emissions), Sources page |
| 2 | `/explainers/does-the-thunderstorm-generator-work/` — "Does the Thunderstorm Generator work? Claims vs meter" | does the thunderstorm generator work | `claims.ts` (fuel/emissions/water/hardware), FAQ (90% claims answer), Honest numbers |
| 3 | `/explainers/what-is-an-evo/` — "What is an EVO (exotic vacuum object)?" | what is an EVO plasmoid | Study "Plasmoid / EVO" lesson + lab, existing what-is-a-plasmoid explainer, Glossary |
| 4 | `/explainers/plasmoid-water-bubbler/` — "How the bubbler (plasmoid generator) works" | plasmoid generator water bubbler cavitation | Device page three beats (`content.ts` Bubbler), Study "Three device beats", device visuals |
| 5 | `/explainers/air-ionizer-pre-ionization/` — "Air ionizer and pre-ionization, simply" | air ionizer engine pre-ionization | `content.ts` Ionizer, Device page, Glossary |
| 6 | `/explainers/catalytic-tornado-resonator/` — "Resonator and nested CTR spheres explained" | catalytic tornado resonator CTR | `content.ts` Resonator, Device page nested-spheres visual, Vortex laws lab |
| 7 | `/explainers/protium-hydrogen-path/` — "What is protium? The hydrogen path in plain English" | what is protium hydrogen | Study "Protium path" lab, Glossary |
| 8 | `/explainers/518400-number-lock/` — "Why 518,400? The number locks explained" | 518400 meaning bendall | Study "Time's mould" lesson, Number locks lab (Build518400), MOE lattice page |

Notes
- Pages 1–2 are the highest-intent searches and should lead with measured numbers
  (Embry-Riddle ~+9–10% fuel efficiency, ~−34% average emissions); inventor ≥90% figures stay labeled claims.
- Pages 7–8 are model/teaching content: label as the inventor's model, not established physics.
- No affiliation claims with Strike Foundation / Strike Energy; no local filler.
- Each new page needs an OG image: rerun `npm run og` (they share `/og/explainers.png` today).
