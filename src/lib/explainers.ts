/** Plain-English explainer pages. Only restate claims already on the site; label each block. */

export type ExplainerBlock = {
  heading: string;
  /** "measured" = independent meter; "claim" = inventor / model; "plain" = definition or site note */
  kind: "measured" | "claim" | "plain";
  body: string[];
};

export type Explainer = {
  slug: string;
  title: string;
  /** Search-style question the page answers */
  question: string;
  description: string;
  /** ISO date for Article JSON-LD */
  published?: string;
  lede: string;
  blocks: ExplainerBlock[];
  related: { href: string; label: string }[];
};

const meterLine =
  "The Embry-Riddle test — an Embry-Riddle Aeronautical University master’s (M.S.) thesis (2026) using an independent meter — found about +9–10% fuel efficiency and about −34% average emissions under the conditions tested, with carbon monoxide (CO) the clearest drop.";

export const explainers: Explainer[] = [
  {
    slug: "what-is-a-plasmoid",
    title: "What is a plasmoid?",
    question: "What is a plasmoid, in plain English?",
    description:
      "A plasmoid explained simply: a self-built, donut-shaped bit of plasma. How it forms in Bendall’s model, what EVO (Exotic Vacuum Occurrence) means, and what is measured vs claimed.",
    lede: "A plasmoid is a small, self-built, donut-shaped plasma that holds its own shape. In Malcolm Bendall’s study material it is also called an EVO (Exotic Vacuum Occurrence). It matters because the whole Thunderstorm Generator story is built around it.",
    blocks: [
      {
        heading: "The short answer",
        kind: "plain",
        body: [
          "Think of a smoke ring that holds itself together. A plasmoid is a donut-shaped (toroidal) plasma held in its own magnetic bottle.",
          "Strike Foundation material calls it an Exotic Vacuum Occurrence (EVO). On this site, plasmoid and EVO mean the same thing."
        ],
      },
      {
        heading: "How it forms, in the inventor’s model",
        kind: "claim",
        body: [
          "In the bubbler, air rises through a water column. Bubbles collapse (cavitation) and form EVOs at a quiet zero-point on the equatorial plane — the birth step.",
          "An EVO grows while charging and discharges on a positive pulse. This is the Bendall / Strike model, taught as study material, not consensus physics.",
        ],
      },
      {
        heading: "What has actually been measured",
        kind: "measured",
        body: [
          meterLine,
          "That meter speaks to fuel use and exhaust. It does not directly observe plasmoids or prove the model behind them.",
        ],
      },
    ],
    related: [
      { href: "/explainers/what-is-an-evo/", label: "What is an EVO?" },
      { href: "/study/#plasmoid", label: "Study: Plasmoid (EVO) lab" },
      { href: "/explainers/plasmoid-vs-plasma/", label: "Plasmoid vs plasma" },
      { href: "/glossary/", label: "Glossary" },
    ],
  },
  {
    slug: "plasmoid-vs-plasma",
    title: "Plasmoid vs plasma: what’s the difference?",
    question: "Plasmoid vs plasma — what’s the difference?",
    description:
      "Plasma vs plasmoid in plain English: plasma is the state; a plasmoid is a self-contained, donut-shaped piece of it. Plus how this site uses the word.",
    lede: "Plasma is the material. A plasmoid is a shape that material can take — a self-contained, donut-shaped piece that holds itself together. Knowing the difference makes the rest of the inventor’s material easier to follow.",
    blocks: [
      {
        heading: "Plasma",
        kind: "plain",
        body: [
          "Plasma is gas that carries electric charge (ionized gas) — the stuff of lightning and sparks. On its own it spreads out and does not keep a shape.",
        ],
      },
      {
        heading: "Plasmoid",
        kind: "plain",
        body: [
          "A plasmoid is a bounded piece of plasma that holds its own donut (toroidal) shape inside its own magnetic bottle. That self-containment is the whole difference.",
        ],
      },
      {
        heading: "How Bendall’s material uses the word",
        kind: "claim",
        body: [
          "In the Plasmoid Unification Model (PUM), plasmoids — also called EVOs — are born when bubbles collapse in water and are treated as the building blocks behind atoms and the device’s claimed energy path.",
          "That larger role is the inventor model. This site teaches it as a coherent study picture, not as settled mainstream science.",
        ],
      },
    ],
    related: [
      { href: "/explainers/plasmoid-water-bubbler/", label: "How the bubbler makes plasmoids" },
      { href: "/explainers/what-is-a-plasmoid/", label: "What is a plasmoid?" },
      { href: "/study/#plasmoid", label: "Study: Plasmoid (EVO)" },
      { href: "/faq/", label: "FAQ" },
    ],
  },
  {
    slug: "thunderstorm-generator",
    title: "Thunderstorm Generator explained",
    question: "What is the Thunderstorm Generator and does it work?",
    description:
      "Malcolm Bendall’s Thunderstorm Generator explained simply: three parts (ionizer, bubbler, resonator), what the inventor claims, and what the Embry-Riddle test measured.",
    lede: "The Thunderstorm Generator is Malcolm Bendall’s name for an engine retrofit with three parts. Here is what each does, what is claimed, and what was measured.",
    blocks: [
      {
        heading: "Three beats",
        kind: "plain",
        body: [
          "1. Ionizer — ultraviolet (UV) light pretreats incoming air.",
          "2. Bubbler (plasmoid generator) — air rises through a water column; collapsing bubbles form plasmoids.",
          "3. Resonator — a chamber with nested contra-rotating (CTR) spheres; hot exhaust and the cold plasmoid stream spin opposite ways around a calm zero-plane.",
        ],
      },
      {
        heading: "What inventors claim",
        kind: "claim",
        body: [
          "Large fuel-efficiency gains, often framed as 90% or more, and near-zero carbon monoxide (CO) and hydrocarbons (HC). Water (protium) is framed as the real fuel, with petrol as kindling.",
          "These stay labeled inventor claims on this site. They are not guaranteed.",
        ],
      },
      {
        heading: "What was measured",
        kind: "measured",
        body: [
          meterLine,
          "That is enough to take the effect seriously as measured. It does not prove 90% figures, near-zero exhaust, or water-as-fuel at scale.",
        ],
      },
    ],
    related: [
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does it work? Claims vs meter" },
      { href: "/device/", label: "Device walkthrough" },
      { href: "/study/#honest-numbers", label: "Study: Honest numbers" },
      { href: "/services/", label: "Install by inquiry" },
    ],
  },
  {
    slug: "msaart",
    title: "Bendall MSAART explained simply",
    question: "What is Bendall’s MSAART?",
    description:
      "MSAART (Molten Sea Ark Atomic Reconstruction Technology) explained in plain English: what the name means, how it links to plasmoids, and what is model vs measured.",
    lede: "MSAART stands for Molten Sea Ark Atomic Reconstruction Technology — Malcolm Bendall’s research framework behind the plasmoid and atom picture. You will see the name often, so it helps to know what it covers and what it does not prove.",
    blocks: [
      {
        heading: "The name",
        kind: "plain",
        body: [
          "Molten Sea Ark Atomic Reconstruction Technology. We spell it Ark, not Arc, to match the Plasmoid Unification Model (PUM) and Draft 518,400 titles.",
          "Published materials come via Strike Foundation (strikefoundation.earth), an independent organization. Plasmoid X is not Strike and does not speak for Bendall.",
        ],
      },
      {
        heading: "What it says, in plain words",
        kind: "claim",
        body: [
          "Plasmoids, atoms, and a family of number locks (like 518,400) fit together in one picture. Direction of spin is treated as charge: one way stores, the other spends.",
          "Related phrases like Low Energy Atomic Transmutation (LEAT) describe elemental change under plasmoid conditions. All of this is model language, not a verified lab result here.",
        ],
      },
      {
        heading: "Where the evidence stands",
        kind: "measured",
        body: [
          meterLine,
          "The meter tested retrofit hardware, not the theory. It does not prove every ratio or MSAART lock is needed for the result.",
        ],
      },
    ],
    related: [
      { href: "/explainers/518400-number-lock/", label: "Why 518,400?" },
      { href: "/study/#curriculum", label: "Study: Lessons 1–6" },
      { href: "/study/#locks", label: "Study: Number locks" },
      { href: "/sources/", label: "Sources & method" },
    ],
  },
  {
    slug: "embry-riddle-thunderstorm-generator-test",
    title: "What the Embry-Riddle test actually measured",
    question: "What did the Embry-Riddle Thunderstorm Generator test find?",
    description:
      "The Embry-Riddle thesis on the Thunderstorm Generator in plain English: about +9–10% fuel efficiency and −34% average emissions, and what that does not prove.",
    published: "2026-10-10",
    lede: "An Embry-Riddle Aeronautical University master’s (M.S.) thesis put an independent meter on Thunderstorm Generator retrofit hardware. Here is what it found, in plain numbers, and where its reach stops.",
    blocks: [
      {
        heading: "The headline numbers",
        kind: "measured",
        body: [
          meterLine,
          "This site leads with these numbers because they come from an independent meter, not from the inventor or a seller.",
        ],
      },
      {
        heading: "How to read them",
        kind: "plain",
        body: [
          "“Under the conditions tested” matters. A thesis tests a specific setup; your vehicle, fuel, and driving may not match it.",
          "A 9–10% fuel gain and a one-third cut in average emissions are meaningful results. They are also far smaller than the marketing figures you may have seen.",
        ],
      },
      {
        heading: "What the inventor material says instead",
        kind: "claim",
        body: [
          "Inventor and marketing material often frames fuel gains at 90% or more, with near-zero carbon monoxide (CO) and hydrocarbons (HC). Those stay labeled claims here.",
        ],
      },
      {
        heading: "What the test does not prove",
        kind: "plain",
        body: [
          "It does not prove inventor-scale fuel cuts, fleet results, water-as-fuel, or that every part of the Bendall model is needed for the effect. It measured fuel use and exhaust — not plasmoids themselves.",
        ],
      },
    ],
    related: [
      { href: "/study/#honest-numbers", label: "Study: Honest numbers" },
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does the Thunderstorm Generator work?" },
      { href: "/sources/", label: "Sources & method" },
    ],
  },
  {
    slug: "does-the-thunderstorm-generator-work",
    title: "Does the Thunderstorm Generator work? Claims vs meter",
    question: "Does the Thunderstorm Generator actually work?",
    description:
      "Does Malcolm Bendall’s Thunderstorm Generator work? Each inventor claim side by side with what the Embry-Riddle test measured, in plain English.",
    published: "2026-10-10",
    lede: "Short answer: an independent meter saw a real but modest effect. The big claims are a different matter. Here is each claim next to what was measured.",
    blocks: [
      {
        heading: "Fuel use",
        kind: "claim",
        body: [
          "Claim: large fuel-efficiency gains, often framed as 90% or more.",
          "Measured: roughly +9–10% fuel efficiency in the Embry-Riddle Aeronautical University master’s (M.S.) thesis (2026), under the conditions tested.",
        ],
      },
      {
        heading: "Exhaust",
        kind: "measured",
        body: [
          "Claim: near-zero carbon monoxide (CO) and hydrocarbons (HC).",
          "Measured: about −34% average emissions, with CO the clearest drop. That is a real cut, not near-zero.",
        ],
      },
      {
        heading: "Water as fuel",
        kind: "claim",
        body: [
          "Claim: water — specifically protium, ordinary hydrogen — is the real fuel and petrol is kindling.",
          "Measured: nothing yet. The meter looked at fuel use and exhaust, not a closed water or isotope cycle.",
        ],
      },
      {
        heading: "So, does it work?",
        kind: "plain",
        body: [
          "The measured effect is enough to take seriously. It does not back the 90% figures, near-zero exhaust, or water-as-fuel at scale. Results on your own engine are not guaranteed.",
        ],
      },
    ],
    related: [
      { href: "/explainers/embry-riddle-thunderstorm-generator-test/", label: "What the Embry-Riddle test measured" },
      { href: "/explainers/thunderstorm-generator/", label: "Thunderstorm Generator explained" },
      { href: "/faq/", label: "FAQ" },
    ],
  },
  {
    slug: "what-is-an-evo",
    title: "What is an EVO? Plasmoids by another name",
    question: "What is an EVO in plasmoid research?",
    description:
      "EVO explained simply: the term Strike Foundation uses for a self-built, donut-shaped plasmoid. Where the name comes from, how it is said to form, and what is measured.",
    published: "2026-10-10",
    lede: "EVO, short for Exotic Vacuum Occurrence, is another name for a plasmoid in Malcolm Bendall’s study material: a small, self-built, donut-shaped plasma that holds its own shape. The term shows up often in Strike Foundation material, so it helps to know it.",
    blocks: [
      {
        heading: "What the letters mean",
        kind: "plain",
        body: [
          "EVO stands for Exotic Vacuum Occurrence, the term used in Strike Foundation material.",
          "On this site, an EVO and a plasmoid are the same thing: a self-contained, donut-shaped (toroidal) plasma held in its own magnetic bottle.",
        ],
      },
      {
        heading: "Life of an EVO, in the inventor’s model",
        kind: "claim",
        body: [
          "Birth: bubbles collapse in water (cavitation) and form EVOs at a quiet zero-point on the equatorial plane.",
          "Growth and release: an EVO grows while charging and discharges on a positive pulse. This is study material, not consensus physics.",
        ],
      },
      {
        heading: "What is measured",
        kind: "measured",
        body: [
          meterLine,
          "That meter measured fuel and exhaust. It did not observe EVOs directly.",
        ],
      },
    ],
    related: [
      { href: "/study/#plasmoid", label: "Study: EVO birth lab" },
      { href: "/explainers/what-is-a-plasmoid/", label: "What is a plasmoid?" },
      { href: "/explainers/plasmoid-water-bubbler/", label: "How the bubbler works" },
    ],
  },
  {
    slug: "plasmoid-water-bubbler",
    title: "How the bubbler (plasmoid generator) works",
    question: "How does the Thunderstorm Generator bubbler work?",
    description:
      "The water bubbler, or plasmoid generator, explained in plain English: air through a water column, collapsing bubbles (cavitation), and what is claimed vs measured.",
    published: "2026-10-10",
    lede: "The bubbler is the middle of the Thunderstorm Generator’s three parts. Air rises through water, bubbles collapse, and — in the inventor’s model — plasmoids are born.",
    blocks: [
      {
        heading: "What it is",
        kind: "plain",
        body: [
          "A water column with a diffuser at the bottom. Incoming air, already pretreated by the ionizer, is pushed through it as bubbles.",
          "Cavitation means bubbles collapsing quickly. That collapse is the step the whole design is built around.",
        ],
      },
      {
        heading: "What the inventor says happens",
        kind: "claim",
        body: [
          "Collapsing bubbles form plasmoids — self-built, donut-shaped plasmas, also called Exotic Vacuum Occurrences (EVOs) — which then flow on to the resonator.",
          "This is the Bendall / Strike model, taught here as a study picture.",
        ],
      },
      {
        heading: "What is measured",
        kind: "measured",
        body: [
          meterLine,
          "That result is for the whole retrofit. It does not isolate the bubbler or prove plasmoids form inside it.",
        ],
      },
    ],
    related: [
      { href: "/device/", label: "Device walkthrough" },
      { href: "/explainers/air-ionizer-pre-ionization/", label: "Before it: the air ionizer" },
      { href: "/explainers/catalytic-tornado-resonator/", label: "After it: the resonator" },
    ],
  },
  {
    slug: "air-ionizer-pre-ionization",
    title: "Air ionizer and pre-ionization, simply",
    question: "What does the air ionizer do in the Thunderstorm Generator?",
    description:
      "The Thunderstorm Generator air ionizer explained: ultraviolet (UV) light pretreats incoming air before the water bubbler. What it does, what is claimed, what is measured.",
    published: "2026-10-10",
    lede: "The ionizer is the first of the Thunderstorm Generator’s three parts. It pretreats incoming air with ultraviolet light before that air reaches the water. It matters because, in the inventor’s model, it sets up the next step.",
    blocks: [
      {
        heading: "What it is",
        kind: "plain",
        body: [
          "A pre-ionization chamber: ultraviolet (UV) light — light just beyond violet — shines on the incoming air.",
          "To ionize means to give some of the air an electric charge. Pre-ionization just means doing that before the next step.",
        ],
      },
      {
        heading: "Why the inventor includes it",
        kind: "claim",
        body: [
          "In Bendall’s model, charged air sets up the bubbler so collapsing bubbles form plasmoids more readily. That is part of the inventor model, not something measured on its own.",
        ],
      },
      {
        heading: "What is measured",
        kind: "measured",
        body: [
          meterLine,
          "That covers the full retrofit. No separate measurement of the ionizer’s share is cited on this site.",
        ],
      },
    ],
    related: [
      { href: "/device/", label: "Device walkthrough" },
      { href: "/explainers/plasmoid-water-bubbler/", label: "Next: the bubbler" },
      { href: "/glossary/", label: "Glossary" },
    ],
  },
  {
    slug: "catalytic-tornado-resonator",
    title: "Resonator and nested CTR spheres explained",
    question: "What is the catalytic tornado resonator with CTR spheres?",
    description:
      "The catalytic tornado resonator explained: nested contra-rotating (CTR) spheres, opposing spins, and the calm zero-plane between them — model vs measured.",
    published: "2026-10-10",
    lede: "The resonator is the last of the Thunderstorm Generator’s three parts: a chamber of nested spheres where two flows spin opposite ways. In the inventor’s model, this is where the energy is harvested.",
    blocks: [
      {
        heading: "What it is",
        kind: "plain",
        body: [
          "A copper-toned chamber with nested spheres — outer, inner, and a tiny central core. CTR means contra-rotating: turning in opposite directions.",
          "Hot exhaust feedback and a stub from the carburetor feed the two opposing spins. A calm “zero-plane” sits between them.",
        ],
      },
      {
        heading: "What the inventor says it does",
        kind: "claim",
        body: [
          "Sphere sizes follow 4∶3∶2 and 8∶6∶4 ratios. The opposing spins are said to organize the plasmoid stream and harvest energy from it.",
          "These ratios and roles belong to the inventor model.",
        ],
      },
      {
        heading: "What is measured",
        kind: "measured",
        body: [
          meterLine,
          "That does not prove the exact sphere ratios are required for the result.",
        ],
      },
    ],
    related: [
      { href: "/study/#vortex", label: "Study: Vortex laws" },
      { href: "/device/", label: "Device walkthrough" },
      { href: "/explainers/thunderstorm-generator/", label: "Thunderstorm Generator explained" },
    ],
  },
  {
    slug: "protium-hydrogen-path",
    title: "What is protium? The hydrogen path in plain English",
    question: "What is protium and why does it matter here?",
    description:
      "Protium is the common form of hydrogen (one proton). How Bendall’s study path runs from water to protium, and why water-as-fuel stays a labeled claim.",
    published: "2026-10-10",
    lede: "Protium is ordinary hydrogen: one proton, no neutrons. It is the most common hydrogen there is, and it sits at the center of Bendall’s claimed energy path.",
    blocks: [
      {
        heading: "The plain definition",
        kind: "plain",
        body: [
          "Hydrogen comes in a few forms (isotopes). Protium, written ¹H, is the one with a single proton — nearly all the hydrogen in water.",
        ],
      },
      {
        heading: "The study path",
        kind: "claim",
        body: [
          "Water → cavitation → plasmoids → CTR (contra-rotating) spheres → harvest ¹H → work. In this picture, water (protium) is the real fuel and petrol is kindling.",
          "The model also ties protium’s melting point, −259.2 °C, into the 518,400 number family. That link is inventor-model, not site-verified.",
        ],
      },
      {
        heading: "What is measured",
        kind: "measured",
        body: [
          meterLine,
          "The meter did not verify a closed water or protium cycle. Water-as-fuel stays study material until fuller dyno and isotope work lands.",
        ],
      },
    ],
    related: [
      { href: "/study/#protium", label: "Study: Protium path lab" },
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Claims vs meter" },
      { href: "/glossary/", label: "Glossary" },
    ],
  },
  {
    slug: "518400-number-lock",
    title: "Why 518,400? The number locks explained",
    question: "What does 518,400 mean in Bendall’s work?",
    description:
      "Why 518,400 shows up in Malcolm Bendall’s material: how it is built, the 51.84° angle, and why this site treats the number locks as model, not proof.",
    published: "2026-10-10",
    lede: "518,400 is the core “number lock” in Bendall’s study material; this site calls it Time’s mould. Here is how it is built and how much weight it can bear.",
    blocks: [
      {
        heading: "How the number is built",
        kind: "plain",
        body: [
          "Multiply 1 × 2 × 3 × 4 × 5 × 6 × 8 × 9 × 10, leaving out 7 (treated as a zero-point or “DC” slot). The answer is 518,400.",
          "It also equals 25,920 (the “Great Year”) × 20. Divide by 10,000 and you get 51.84 — used as the cone and pyramid angle in the hardware.",
        ],
      },
      {
        heading: "Why the inventor cares",
        kind: "claim",
        body: [
          "In the model, design ratios in the metal — sphere sizes, pipe octaves, 51.84° cones — sit on this number family so they are not arbitrary. Related locks link 518,400 to protium (÷ 129,600 = 4).",
          "Neat arithmetic is not evidence of physics. These locks are taught as the inventor’s design language.",
        ],
      },
      {
        heading: "What is measured",
        kind: "measured",
        body: [
          meterLine,
          "The meter does not show that any number lock is needed for that result.",
        ],
      },
    ],
    related: [
      { href: "/study/#locks", label: "Study: Build 518,400 lab" },
      { href: "/study/#moe", label: "Study: MOE lattice" },
      { href: "/explainers/msaart/", label: "Bendall MSAART explained" },
    ],
  },
];

export function getExplainer(slug: string): Explainer {
  const e = explainers.find((x) => x.slug === slug);
  if (!e) throw new Error(`Unknown explainer ${slug}`);
  return e;
}
