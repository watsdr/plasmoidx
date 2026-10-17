/** Site-wide glossary. Strike Foundation is an external independent org. */

export type GlossaryTerm = {
  abbr: string;
  title: string;
  body: string;
  /** Optional Study / Device deep-link */
  href?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    abbr: "PUM",
    title: "Plasmoid Unification Model",
    body: "A picture of how plasmoids, atoms, and the number locks fit together. Drawn from Bendall’s notes; this site is an independent reading, not an official Strike channel.",
    href: "/study/#moe",
  },
  {
    abbr: "MSAART",
    title: "Molten Sea Ark Atomic Reconstruction Technology",
    body: "Bendall’s research framework behind the plasmoid-and-atom picture. Ark (not Arc) matches the PUM and Draft 518,400 titles. Published materials via Strike Foundation (strikefoundation.earth — external independent org).",
    href: "/study/#plasmoid",
  },
  {
    abbr: "LEAT",
    title: "Low Energy Atomic Transmutation",
    body: "Inventor language for elemental change via resonance and plasmoid conditions at comparatively low energy. Taught as a model claim — not settled mainstream science. Pair with Claims Compare.",
    href: "/study/#honest-numbers",
  },
  {
    abbr: "LEAR",
    title: "Low Energy Atomic Reconstruction",
    body: "Companion phrase to LEAT (Low Energy Atomic Transmutation): rebuilding or rearranging matter under plasmoid and resonance conditions in the inventor picture. Model language, not a verified lab result here.",
    href: "/study/#honest-numbers",
  },
  {
    abbr: "PMOE",
    title: "Plasmoid Model of the Elements",
    body: "Inventor framing of the element map through plasmoid and toroidal partners (related to the Model of the Elements lattice on Study). Teaching sketch only — full charts stay outbound.",
    href: "/study/#moe",
  },
  {
    abbr: "PUMC",
    title: "Plasmoid Unification Model Calculator",
    body: "Tables and calculator ideas that sit with the Plasmoid Unification Model (PUM). Treat as inventor bookkeeping inside the locks — not a mainstream physics tool.",
    href: "/study/#locks",
  },
  {
    abbr: "Alpha–Omega",
    title: "MeV ladder (inventor’s model)",
    body: "Two-column climb: odd atomic number (Z) = Omega (+), even Z = Alpha (−). Draft 518,400 graphic totals, in MeV (million electron volts): Omega 157.18 MeV, Alpha 117.17 MeV, total 274.35 MeV; base 26.7 MeV at hydrogen and helium (H and He). Inventor-model numbers — not site-verified.",
    href: "/study/#moe",
  },
  {
    abbr: "EVO",
    title: "Exotic Vacuum Occurrence",
    body: "A self-built donut-shaped plasmoid held in a magnetic bottle. It is Strike Foundation’s term for a plasmoid. Born in cavitation; grows while charging; discharges on a positive pulse.",
    href: "/study/#plasmoid",
  },
  {
    abbr: "MOE",
    title: "Model of the Elements",
    body: "A 16 × 8 lattice map. Design ratios in the metal (spheres, pipes, 51.84° cones) sit on this map so they are not arbitrary. Octave planes come from swirl-math keys.",
    href: "/study/#moe",
  },
  {
    abbr: "CTR",
    title: "Contra-rotating",
    body: "Nested spheres spinning opposite ways: hot exhaust one way outside, a cold plasmoid stream the other way inside. A calm zero-plane sits between them. Forces both store and spend.",
    href: "/device/",
  },
  {
    abbr: "ATV",
    title: "Area–Time–Volume",
    body: "Model calculator seeded by the 3-4-5 triangle. Treat as bookkeeping inside the locks — not a mainstream physics claim.",
    href: "/study/#moe",
  },
  {
    abbr: "RFEU",
    title: "Resonant Frequency Energy Unit",
    body: "A building-block energy unit (129,600) tied to protium — the common form of hydrogen. One path in the locks: −259.2 × 500. Related: 518,400 ÷ 129,600 = 4 in the model.",
    href: "/study/#locks",
  },
  {
    abbr: "518400",
    title: "Time’s mould",
    body: "Product 1×2×3×4×5×6×8×9×10 (7 is left out as the “DC” (direct current), or zero-point, slot). Digit-mirror products return 518,400. Great Year 25,920 × 20 = 518,400. Core lock on Study.",
    href: "/study/#locks",
  },
  {
    abbr: "51.84°",
    title: "Mould mouth angle",
    body: "518,400 ÷ 10,000. Treated as the mouth angle of the cones and pyramids in the hardware ratios. Pair with Time’s mould on Device and Study.",
    href: "/study/#locks",
  },
  {
    abbr: "UV",
    title: "Ultraviolet",
    body: "Light just beyond violet. In the device, the ionizer uses it to pretreat incoming air before the bubbler.",
    href: "/device/",
  },
  {
    abbr: "CO",
    title: "Carbon monoxide",
    body: "A combustion exhaust gas. In the Embry-Riddle idle test, carbon monoxide fell by about 34%. It was the one exhaust gas that changed significantly.",
    href: "/study/#honest-numbers",
  },
  {
    abbr: "HC",
    title: "Hydrocarbons",
    body: "Fuel molecules made of hydrogen and carbon. Treated here as kindling; the plasmoid–protium cycle is the claimed work.",
    href: "/study/#protium",
  },
  {
    abbr: "TG",
    title: "Thunderstorm Generator",
    body: "Bendall’s engine-retrofit name for the three-part hardware (ionizer for air pretreatment → bubbler, the plasmoid generator → resonator with nested CTR spheres). Hear the inventor describe it on HowTube Section 5 — outbound, labeled claims.",
    href: "/device/",
  },
  {
    abbr: "Protium",
    title: "¹H — common hydrogen",
    body: "The common form of hydrogen (one proton). In the study path: water → cavitation → plasmoids → CTR → harvest ¹H → work. Melting point −259.2 °C ties into the 518,400 family in the model.",
    href: "/study/#protium",
  },
  {
    abbr: "Cavitation",
    title: "Bubble collapse",
    body: "Bubbles in the bubbler collapse and form plasmoids (EVOs) at a quiet zero-point on the equatorial plane — the birth step in the plasmoid picture.",
    href: "/study/#plasmoid",
  },
  {
    abbr: "Implosive",
    title: "Inward (store) side",
    body: "Tightening, clockwise, negative — the store side of direction = charge. Paired with the explosive (spend) side. Model teaching, not a hype slogan.",
    href: "/study/#charge",
  },
  {
    abbr: "ERA",
    title: "Embry-Riddle test",
    body: "Embry-Riddle Aeronautical University master’s (M.S.) thesis (2026) — the test this site leads with (the manufacturer supplied the road-test hardware): a 9.67% lower fuel-use rate on a small generator and about 34% less carbon monoxide in an idle test. Not a Plasmoid X credential.",
    href: "/study/#honest-numbers",
  },
];
