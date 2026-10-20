/** Plain-English explainer pages. Only restate claims already on the site; label each block. */

export type ExplainerBlock = {
  heading: string;
  /** "measured" = a measurement; "claim" = inventor / seller / model; "commentary" = outside commentary; "plain" = definition or site note */
  kind: "measured" | "claim" | "seller" | "commentary" | "plain";
  body: string[];
  /** Optional data table shown after the paragraphs */
  table?: { caption: string; head: string[]; rows: string[][] };
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
  /** Optional cited sources, shown as a Sources block */
  sources?: { label: string; href: string }[];
  /** Optional interactive graphics, placed after the block at index `after`. */
  /** Optional FAQ: shown as "Quick answers" and emitted as FAQPage JSON-LD (text must match). */
  faq?: { q: string; a: string }[];
  interactives?: { after: number; kind: "measured-vs-claimed" | "fuel-estimator" | "evidence-timeline" }[];
  related: { href: string; label: string }[];
};

const meterLine =
  "The Embry-Riddle test — an Embry-Riddle Aeronautical University master’s (M.S.) thesis (2026), with the road-test hardware supplied by the manufacturer, Plasmoid Power — found, under the conditions tested, a 9.67% lower fuel-use rate on a small generator and about 8.7% better fuel economy on a one-vehicle road test. In an idle test, carbon monoxide (CO) fell by about 34%, while carbon dioxide (CO₂), oxygen and hydrocarbons did not change significantly.";

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
      { href: "/explainers/who-is-malcolm-bendall/", label: "Who is Malcolm Bendall?" },
      { href: "/explainers/strike-foundation-and-thunderstorm-tech/", label: "Strike Foundation, Thunderstorm.tech and this site" },
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
      { href: "/explainers/who-is-malcolm-bendall/", label: "Who is Malcolm Bendall?" },
    ],
  },
  {
    slug: "embry-riddle-thunderstorm-generator-test",
    interactives: [{ after: 0, kind: "measured-vs-claimed" }],
    title: "What the Embry-Riddle test actually measured",
    question: "What did the Embry-Riddle Thunderstorm Generator test find?",
    description:
      "The Embry-Riddle thesis on the Thunderstorm Generator in plain English: a 9.67% lower fuel-use rate on a small generator, about 34% less carbon monoxide at idle, and what that does not prove.",
    published: "2026-10-10",
    lede: "An Embry-Riddle Aeronautical University master’s (M.S.) thesis tested Thunderstorm Generator retrofit hardware. The manufacturer, Plasmoid Power, supplied the hardware for the road test. Here is what it found, in plain numbers, and where its reach stops.",
    blocks: [
      {
        heading: "The headline numbers",
        kind: "measured",
        body: [
          meterLine,
          "This site leads with these numbers because they come from a university thesis test, not from the inventor or a seller. The manufacturer did supply the road-test hardware, so read the road-test result with that in mind.",
        ],
      },
      {
        heading: "How to read them",
        kind: "plain",
        body: [
          "“Under the conditions tested” matters. A thesis tests a specific setup; your vehicle, fuel, and driving may not match it.",
          "A fuel gain of about 9–10% on a small generator and a one-third cut in carbon monoxide at idle are meaningful results. They are also far smaller than the marketing figures you may have seen. The one-third figure is for carbon monoxide only, not for all emissions.",
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
      { href: "/explainers/other-thunderstorm-generator-tests/", label: "Other Thunderstorm Generator tests" },
    ],
  },
  {
    slug: "does-the-thunderstorm-generator-work",
    interactives: [
      { after: 0, kind: "fuel-estimator" },
      { after: 1, kind: "measured-vs-claimed" },
    ],
    title: "Does the Thunderstorm Generator work? Claims vs meter",
    question: "Does the Thunderstorm Generator actually work?",
    description:
      "Does Malcolm Bendall’s Thunderstorm Generator work? Each inventor claim side by side with what the Embry-Riddle test measured, in plain English.",
    published: "2026-10-10",
    lede: "Short answer: the Embry-Riddle thesis test saw a real but modest effect. The big claims are a different matter. Here is each claim next to what was measured.",
    blocks: [
      {
        heading: "Fuel use",
        kind: "claim",
        body: [
          "Claim: large fuel-efficiency gains, often framed as 90% or more.",
          "Measured: a 9.67% lower fuel-use rate on a small generator and about 8.7% better economy on a one-vehicle road test, in the Embry-Riddle Aeronautical University master’s (M.S.) thesis (2026), under the conditions tested.",
        ],
      },
      {
        heading: "Exhaust",
        kind: "measured",
        body: [
          "Claim: near-zero carbon monoxide (CO) and hydrocarbons (HC).",
          "Measured: in an idle test, CO fell by about 34%, while carbon dioxide (CO₂), oxygen and hydrocarbons did not change significantly. That is a real cut in CO, not near-zero, and not a cut in everything.",
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
      { href: "/explainers/is-the-thunderstorm-generator-a-scam/", label: "Is the Thunderstorm Generator a scam?" },
      { href: "/explainers/embry-riddle-thunderstorm-generator-test/", label: "What the Embry-Riddle test measured" },
      { href: "/explainers/thunderstorm-generator/", label: "Thunderstorm Generator explained" },
      { href: "/faq/", label: "FAQ" },
      { href: "/explainers/thunderstorm-generator-critics/", label: "Critics and supporters, side by side" },
      { href: "/explainers/other-thunderstorm-generator-tests/", label: "Other Thunderstorm Generator tests" },
      { href: "/explainers/can-water-be-a-fuel/", label: "Can water be a fuel?" },
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
      { href: "/explainers/can-water-be-a-fuel/", label: "Can water be a fuel?" },
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
          "Hot exhaust enters one end of the resonator. The cool plasmoid stream leaves the inner sphere by pipe to the engine’s intake, just after the carburetor. The two streams spin opposite ways, and a calm “zero-plane” sits between them.",
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
      { href: "/explainers/can-water-be-a-fuel/", label: "Can water be a fuel?" },
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
  {
    slug: "who-is-malcolm-bendall",
    title: "Who is Malcolm Bendall?",
    question: "Who is Malcolm Bendall, and why does his name come up?",
    description:
      "Who Malcolm Bendall is, using only his foundation’s own words and published records: Australian inventor, geochemist, and the name behind the Thunderstorm Generator. Claims labeled.",
    published: "2026-10-15",
    lede: "Malcolm Bendall is an Australian inventor and geochemist. His name is attached to the Thunderstorm Generator and to a body of study material called MSAART. This page sticks to what his own foundation says and what published records show, and it keeps every claim labeled.",
    blocks: [
      {
        heading: "The short version",
        kind: "plain",
        body: [
          "Strike Foundation, the group that publishes his notes, describes him as an “Australian inventor, geochemist and ‘prophet of nature’.” This site uses “Malcolm Bendall” or “the inventor” for him.",
          "He is the person behind the Thunderstorm Generator, a three-part add-on for small engines, and behind a larger theory about plasmoids and atoms called the Plasmoid Unification Model. Both are covered in the explainers linked below.",
        ],
      },
      {
        heading: "How his foundation describes him and his work",
        kind: "claim",
        body: [
          "Strike Foundation Guarantee Limited says it is a not-for-profit entity formed to hold, manage and commercialize the intellectual property (IP) rights of Bendall. It adds that he has instructed it to publish his IP openly, so his notes and diagrams are posted on its site.",
          "The foundation says Bendall released years of research after his work was introduced to a wide audience on the Joe Rogan Experience by Randall Carlson on November 11, 2022. It says the release includes 20 parts of draft notes: diagrams of his inventions, possible uses, initial test results and analysis of the Thunderstorm Generator, his Planetary Octave Sequences, his model of the elements, and more.",
          "These are the foundation’s statements about its own founder’s work. They are not independent findings.",
        ],
      },
      {
        heading: "His published oil-and-gas geology paper",
        kind: "plain",
        body: [
          "Strike Foundation points to a 2015 paper in The APPEA Journal, “Seeing through the dolerite — seismic imaging of petroleum systems, Tasmania, Australia.” It says Bendall led the paper and wrote it with four other geologists (Paul Heath, Clive Burrett, Andrew Stacey and Enzo Zappaterra).",
          "APPEA is Australia’s national oil and gas industry body. The paper is about underground rock layers and oil prospects. It is a different field from engine heat, water vapor or plasmoids, so it says nothing either way about the Thunderstorm Generator.",
        ],
      },
      {
        heading: "What has been measured",
        kind: "measured",
        body: [
          "No measurement tests the person. Measurements test devices. The main university test is an Embry-Riddle Aeronautical University master’s (M.S.) thesis from 2026 that built and tested a Thunderstorm Generator retrofit.",
          "It found a lower fuel-use rate in a small-generator test and a smaller carbon monoxide (CO) reading in an idle test. Its author wrote that the work “did not conclusively validate” the inventor’s own numbers. It did not test the plasmoid theory itself.",
        ],
      },
      {
        heading: "What outside writers say",
        kind: "commentary",
        body: [
          "Brian Dunning, writing for the Skeptoid podcast on December 16, 2025, argues that the Thunderstorm Generator is an exhaust-heat riser plus water injection, and that its explanations are not physics. Our page on the critics sets out his technical points beside the supporters’ view.",
        ],
      },
      {
        heading: "How to read anything written about him",
        kind: "plain",
        body: [
          "Sort each source into one of four groups. Strike Foundation and the sellers’ sites are the inventor’s side. Skeptoid and similar pieces are outside commentary. A thesis or lab report with its method shown is a measurement. And this site’s own pages are explanation.",
          "Judge each group for what it can show. A foundation can tell you what the inventor claims. A critic can tell you where the explanation looks weak. Only a measurement can tell you what an engine did.",
        ],
      },
    ],
    sources: [
      { label: "Strike Foundation — home page (inventor’s side)", href: "https://strikefoundation.earth/" },
      { label: "Strike Foundation — Introduction, including the 2015 APPEA paper summary (inventor’s side)", href: "https://www.strikefoundation.earth/introduction" },
      { label: "Hall, W. (2026), Embry-Riddle Aeronautical University master’s thesis (measured)", href: "https://commons.erau.edu/edt/964/" },
      { label: "Skeptoid #1019, “Testing the Thunderstorm Generator,” Brian Dunning, Dec 16, 2025 (outside commentary)", href: "https://skeptoid.com/episodes/1019" },
    ],
    related: [
      { href: "/explainers/is-the-thunderstorm-generator-a-scam/", label: "Is the Thunderstorm Generator a scam?" },
      { href: "/explainers/thunderstorm-generator-critics/", label: "Critics and supporters, side by side" },
      { href: "/explainers/strike-foundation-and-thunderstorm-tech/", label: "Strike Foundation, Thunderstorm.tech and this site" },
      { href: "/explainers/msaart/", label: "Bendall MSAART explained" },
      { href: "/sources/", label: "Sources" },
    ],
  },
  {
    slug: "is-the-thunderstorm-generator-a-scam",
    interactives: [
      { after: 2, kind: "measured-vs-claimed" },
      { after: 4, kind: "evidence-timeline" },
    ],
    title: "Is the Thunderstorm Generator a scam?",
    question: "Is the Thunderstorm Generator a scam?",
    description:
      "A plain-English answer: the Thunderstorm Generator is real hardware sold as a $735 kit with no guarantee of results. One university thesis measured modest effects; the seller’s much bigger numbers are unverified.",
    published: "2026-10-20",
    lede: "Short answer: the Thunderstorm Generator is real hardware that is sold today, as a do-it-yourself kit for small gasoline generators listed at $735 plus delivery, with no guarantee of results. One university master’s thesis measured modest effects (a 9.67% lower fuel-use rate on a small generator and about 34% less carbon monoxide (CO) at idle), while the much bigger numbers on the seller’s site have not been confirmed by anyone else we could find.",
    blocks: [
      {
        heading: "What “scam” would mean, and what can be checked",
        kind: "plain",
        body: [
          "A scam means taking people’s money by deceiving them. That is a question about intent, and this site has no evidence about anyone’s intent. It does not call anyone a scammer.",
          "What can be checked is more useful: whether the product exists and what you get for the money, what a measurement showed, whether the seller’s numbers have been confirmed by anyone else, and what public records say about the companies involved. This page goes through each one.",
        ],
      },
      {
        heading: "What you get for the money",
        kind: "seller",
        body: [
          "Thunderstorm.tech, the seller’s site, lists the kit at $735 in U.S. dollars plus delivery. It is made in Thailand and is meant for small gasoline generators up to about 12 kilowatts (kW), or 16 horsepower (hp). The kit includes the main retrofit unit, the ionizer and bubbler, fittings, and written instructions. The generator and the labor to fit it are not included.",
          "The seller’s own assembly instructions (February 2026) say that no warranties or guarantees are given on emission cuts or fuel savings. They say installing the kit means significant changes to the generator, so the generator maker’s warranty “will almost certainly be voided,” and that it should not be attempted without some engineering skill.",
          "The instructions also warn never to run the generator in an enclosed space, because carbon monoxide (CO) is “odorless and colorless and is deadly to humans and animals,” and to keep a fire extinguisher at hand because the fuel system is modified.",
        ],
      },
      {
        heading: "What was measured",
        kind: "measured",
        body: [
          "A 2026 master’s (M.S.) thesis at Embry-Riddle Aeronautical University built and tested a Thunderstorm Generator retrofit. On a small generator under load, fuel use fell from 35.27 to 31.86 milliliters per minute, a 9.67% lower fuel-use rate. In an idle test, carbon monoxide (CO) fell by an average of 34%; carbon dioxide (CO₂) and oxygen showed no significant change.",
          "On a one-vehicle road test, fuel economy was about 8.7% better, but only 4 of 8 cylinders were covered, retrofit runs had high winds, and the manufacturer, Plasmoid Power, supplied the road-test hardware.",
          "The thesis says it “did not conclusively validate” the inventor’s fuel and emissions claims and that its results fit “a modest positive effect.”",
        ],
      },
      {
        heading: "What the seller and inventor claim",
        kind: "seller",
        body: [
          "Thunderstorm.tech reports far larger results from tests in the UK, Florida and the United Arab Emirates (UAE): for example, carbon monoxide down 97.1% in a UK test and carbon dioxide down 99.56% in a Florida test. Its kit page says the technology showed up to 98% CO and hydrocarbon reduction in UK testing. We have not seen the full reports or who paid for them, so these stay labeled as the seller’s numbers.",
          "The university thesis did not reproduce them: it found no significant change in CO₂ or oxygen. Our page on other tests lists who ran each one.",
          "Inventor claim: Malcolm Bendall describes the device as “a proprietary plasmoid-induced and controlled atomic energy release process which allows water to be used as an atomic fuel,” as quoted by Skeptoid. No test this site cites has shown water acting as a fuel.",
        ],
      },
      {
        heading: "What critics say",
        kind: "commentary",
        body: [
          "Brian Dunning of the Skeptoid podcast (December 16, 2025) argues that the device is an exhaust heat riser plus water injection, ideas engineers have known about for over 100 years. He says an ordinary ultraviolet (UV) bulb cannot ionize air and that CO₂ is not reduced.",
          "He also writes that small gains in fuel efficiency or exhaust cleanliness are “probably true,” as long as they are small. Our critics page sets out his points beside the supporters’ view.",
        ],
      },
      {
        heading: "The business-history question",
        kind: "plain",
        body: [
          "Some people online raise Malcolm Bendall’s earlier role at Empire Energy Corporation International, a U.S.-listed company that explored for oil in Tasmania, Australia. Here is what public filings with the U.S. Securities and Exchange Commission (SEC) show.",
          "A 2008 company filing says Mr. Bendall was a founding director of Great South Land Minerals Limited, was appointed chief executive officer (CEO) and board chairman of Empire Energy on June 4, 2004, and served in that role until August 2007. The same filing says the board appointed him CEO again in March 2008.",
          "A company press release filed with the SEC in 2010 says David Villarreal Jr. replaced Mr. Bendall as chairman in September 2010, and that Mr. Bendall kept his role as CEO.",
          "In September 2019 the SEC revoked the registration of the company’s stock, finding that it had not filed any periodic reports since the period ended September 30, 2010. The company consented to the order without admitting or denying the findings. The order concerns the company and does not name any person.",
          "These records are about a past oil-exploration company. They do not show whether the Thunderstorm Generator works; only testing can do that.",
        ],
      },
      {
        heading: "Questions to ask before buying",
        kind: "plain",
        body: [
          "Can I see the full test reports, including who ran each test and who paid for it?",
          "What, if anything, is guaranteed? The seller’s instructions say emission cuts and fuel savings are not.",
          "Am I willing to lose my generator’s warranty and modify its fuel system?",
          "Can I measure the result myself, for example by weighing fuel before and after, and reading carbon monoxide (CO) with an exhaust analyzer?",
          "Can I run it safely outdoors, away from people, with a fire extinguisher at hand?",
          "Disclosure: this site sells no kits. Its owner offers install labor by inquiry for kits people already own (see Services).",
        ],
      },
      {
        heading: "Bottom line",
        kind: "plain",
        body: [
          "The Thunderstorm Generator is a real product, sold with clear disclaimers. One university test found a real but modest effect. The big numbers come from the seller and have not been confirmed by anyone else we could find.",
          "If you buy one, treat it as an experiment, not a guaranteed saving, and measure it yourself.",
        ],
      },
    ],
    faq: [
      {
        q: "Is the Thunderstorm Generator a scam?",
        a: "This site has no evidence about anyone’s intent and does not call it a scam. The hardware is real and sold as a $735 kit plus delivery, with no guarantee of results. One university master’s thesis measured modest effects; the seller’s much bigger numbers are unverified.",
      },
      {
        q: "How much does the Thunderstorm Generator kit cost?",
        a: "Thunderstorm.tech lists the kit at $735 in U.S. dollars plus delivery, for small gasoline generators up to about 12 kilowatts (kW). The generator and fitting labor are not included.",
      },
      {
        q: "What did the university test measure?",
        a: "An Embry-Riddle Aeronautical University master’s thesis (2026) measured a 9.67% lower fuel-use rate on a small generator and about 34% less carbon monoxide (CO) at idle, with no significant change in carbon dioxide (CO₂) or oxygen.",
      },
      {
        q: "Does the kit come with a warranty?",
        a: "The seller’s assembly instructions (February 2026) say no warranties or guarantees are given on emission cuts or fuel savings, and that fitting the kit will almost certainly void the generator maker’s warranty.",
      },
    ],
    sources: [
      { label: "Thunderstorm.tech — TSG Kits (seller’s site: price, contents)", href: "https://thunderstorm.tech/tsg-kits" },
      { label: "Plasmoid Power — Thunderstorm Generator Assembly Instructions, February 2026 (seller: disclaimer and warnings)", href: "https://thunderstorm.tech/tsg-kits/Assembly%20Instructions%20-%202026.pdf" },
      { label: "Hall, W. (2026), Embry-Riddle Aeronautical University master’s thesis (measured)", href: "https://commons.erau.edu/edt/964/" },
      { label: "Thunderstorm.tech — Test Results (seller claim)", href: "https://thunderstorm.tech/technology/test-results" },
      { label: "Skeptoid #1019, “Testing the Thunderstorm Generator,” Brian Dunning, Dec 16, 2025 (outside commentary)", href: "https://skeptoid.com/episodes/1019" },
      { label: "SEC filing: Empire Energy Corporation International, Form 8-K, March 26, 2008 (public record)", href: "https://www.sec.gov/Archives/edgar/data/788206/000119312508065827/d8k.htm" },
      { label: "SEC filing: Empire Energy press release, Exhibit 99.1, 2010 (public record)", href: "https://www.sec.gov/Archives/edgar/data/788206/000107878210002258/empire8k100410ex991.htm" },
      { label: "SEC order revoking registration of Empire Energy Corporation International, Release No. 86921, Sept 10, 2019 (public record)", href: "https://www.sec.gov/Archives/edgar/data/788206/999999999719006769/filename1.pdf" },
    ],
    related: [
      { href: "/explainers/thunderstorm-generator-critics/", label: "Critics and supporters, side by side" },
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does the Thunderstorm Generator work?" },
      { href: "/explainers/other-thunderstorm-generator-tests/", label: "Other Thunderstorm Generator tests" },
      { href: "/services/", label: "Services: install labor by inquiry" },
    ],
  },
  {
    slug: "thunderstorm-generator-critics",
    interactives: [{ after: 99, kind: "evidence-timeline" }],
    title: "Thunderstorm Generator critics and supporters, side by side",
    question: "What do critics and supporters of the Thunderstorm Generator say?",
    description:
      "Critics and supporters of the Thunderstorm Generator, side by side and labeled. The Embry-Riddle thesis is the measured anchor; the Skeptoid critique and the inventor’s claims are shown as such.",
    published: "2026-10-15",
    lede: "This is the deep roundup: what the critics say, what the supporters say, and what a university test measured. For the short answer to “is it a scam?”, see our plain verdict page. This page lays out what the critics say, what the supporters say, and what a university test measured. Each part is labeled so you can weigh it yourself.",
    blocks: [
      {
        heading: "What “hoax” would mean",
        kind: "plain",
        body: [
          "A hoax is deliberate fakery. This site has no evidence about anyone’s intent and does not judge people.",
          "What can be checked is narrower and more useful: what a meter read, and whether the stated explanation fits what is known about engines. That is the test this page uses.",
        ],
      },
      {
        heading: "The measured anchor: the Embry-Riddle thesis",
        kind: "measured",
        body: [
          "A 2026 master’s (M.S.) thesis at Embry-Riddle Aeronautical University built a Thunderstorm Generator retrofit and tested it. Fuel was weighed and timed. Exhaust was read with a five-gas analyzer.",
          "On a small generator under load, with the water-vapor (cold-gas) system on, fuel use fell from 35.27 to 31.86 milliliters per minute, a 9.67% drop. On a 1989 Chevrolet Blazer road loop, fuel economy was about 8.7% better, but the retrofit covered only four of eight cylinders and the retrofit runs had high winds.",
          "In an idle test of the small generator, carbon monoxide (CO) fell by an average of 34%. Carbon dioxide (CO₂) and oxygen showed no significant change, which the thesis says contradicts the inventor’s claims. Hydrocarbons showed no significant correlation.",
          "The thesis says it “did not conclusively validate” the inventor’s fuel and emissions claims, that its results fit “a modest positive effect,” and that the system “should not be entirely dismissed.”",
        ],
      },
      {
        heading: "The supporters’ view",
        kind: "claim",
        body: [
          "In the inventor’s model, bubbles collapsing in the bubbler form tiny plasmoids. In the final unit, exhaust heat and these plasmoids interact, and carbon in the exhaust is converted into oxygen and other elements. The device is designed to use more of the fuel instead of sending heat and carbon out the tailpipe.",
          "Thunderstorm.tech, the seller’s site, reports much larger numbers than the thesis: for example, carbon dioxide down by up to 99.9% and oxygen up sharply in tests on three continents. The thesis author notes that the original creators reported fuel gains of about 20%.",
          "These are claims by the inventor’s side. Our page on other tests shows who ran each one.",
        ],
      },
      {
        heading: "The Skeptoid critique",
        kind: "commentary",
        body: [
          "Brian Dunning (Skeptoid, December 16, 2025) makes several technical points. First, he says an ordinary ultraviolet (UV) bulb gives off light that is too weak to ionize air, so the first chamber does not ionize anything. Second, he says the cavitation behind plasmoid formation needs about 80–100 pounds per square inch (psi) of suction, while an engine’s vacuum is only about 4–10 psi.",
          "Third, he says the last chamber is a plain heat exchanger that warms the intake air. He concludes the whole device is an exhaust heat riser plus water injection, which engineers have known about for over 100 years, and that it only suits simple carbureted engines.",
          "He also writes that small gains in fuel efficiency or exhaust cleanliness are “probably true,” as long as they are small, and that the device works best with the engine at light load, when engine vacuum is highest. He adds that CO₂ is not reduced.",
        ],
      },
      {
        heading: "Where the two sides overlap",
        kind: "plain",
        body: [
          "The thesis and the critic agree on several things. Both describe heat recovery from the exhaust and added water vapor as the working parts. Both treat any fuel gain as modest. Both say CO₂ does not fall.",
          "They differ on what the heat-and-vapor effect is called. The inventor’s side says plasmoids. The critic says it is ordinary physics. The thesis did not test for plasmoids, so it cannot settle that point. They also differ on load: the thesis says the bubbler works only when the engine is loaded and is ineffective at idle, while the critic says engine suction is highest at idle and the device fades under load. Tests across several loads would help.",
        ],
      },
      {
        heading: "What would settle it",
        kind: "plain",
        body: [
          "The thesis author recommends more testing with a corrected design, all cylinders covered, calm weather, and better instruments, plus third-party validation by a nationally recognized testing laboratory.",
          "A strong test would also switch each part on and off one at a time. That would show whether the water vapor, the heat exchange, or something else accounts for the change. This site will add such results if they are published.",
        ],
      },
    ],
    sources: [
      { label: "Hall, W. (2026), “Plasmoid Vortex System Retrofit…,” Embry-Riddle Aeronautical University master’s thesis (measured)", href: "https://commons.erau.edu/edt/964/" },
      { label: "Skeptoid #1019, “Testing the Thunderstorm Generator,” Brian Dunning, Dec 16, 2025 (outside commentary)", href: "https://skeptoid.com/episodes/1019" },
      { label: "Thunderstorm.tech — Test Results (inventor’s side)", href: "https://thunderstorm.tech/technology/test-results" },
      { label: "Strike Foundation — Introduction (inventor’s side)", href: "https://www.strikefoundation.earth/introduction" },
    ],
    related: [
      { href: "/explainers/is-the-thunderstorm-generator-a-scam/", label: "Is the Thunderstorm Generator a scam?" },
      { href: "/explainers/embry-riddle-thunderstorm-generator-test/", label: "The Embry-Riddle test explained" },
      { href: "/explainers/other-thunderstorm-generator-tests/", label: "Other Thunderstorm Generator tests" },
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does the Thunderstorm Generator work?" },
      { href: "/sources/", label: "Sources" },
    ],
  },
  {
    slug: "other-thunderstorm-generator-tests",
    interactives: [{ after: 2, kind: "evidence-timeline" }],
    title: "Other Thunderstorm Generator tests: who ran each one",
    question: "What other tests of the Thunderstorm Generator exist, and who ran and paid for them?",
    description:
      "The Thunderstorm Generator tests we could find, in two labeled tables: the university thesis (measured) and four tests reported by the inventor’s side, with who ran each, what was measured, and what we could not verify.",
    published: "2026-10-15",
    lede: "Several tests of the Thunderstorm Generator have been published. This page lists each one with who ran it, who paid, what was measured, and what the result was. The university thesis is shown first. The seller-side tests come second and are labeled as reported by the inventor’s side.",
    blocks: [
      {
        heading: "Measured: the university thesis",
        kind: "measured",
        body: [
          "These three tests are from one master’s (M.S.) thesis at Embry-Riddle Aeronautical University (2026). For the road test, the main vortex unit, piping and bubbler were supplied by Plasmoid Power, the seller.",
        ],
        table: {
          caption: "Embry-Riddle thesis tests",
          head: ["Test", "Who ran it", "Who paid", "What was measured", "Result"],
          rows: [
            [
              "Idle exhaust test, small generator, 10 runs each way",
              "Walker Hall, M.S. student, with faculty advisers named in the thesis",
              "Not stated in the thesis text we read",
              "Exhaust gases from a Troy-Bilt 5550 generator at idle inside a trailer, read with a five-gas analyzer",
              "Carbon monoxide (CO) down by an average of 34%. Carbon dioxide (CO₂) and oxygen: no significant change.",
            ],
            [
              "Fuel test, small generator under load (about 2,760 W)",
              "Same",
              "Not stated in the thesis text we read",
              "Gasoline weighed and timed on each run, baseline versus retrofit with the water-vapor (cold-gas) system on",
              "Fuel-use rate 35.27 mL/min down to 31.86 mL/min, 9.67% lower",
            ],
            [
              "Road test, 1989 Chevrolet Blazer, 10 runs each way",
              "Same",
              "Not stated in the thesis text we read",
              "Fuel tank weighed before and after a 32.2 km (about 20 mile) loop",
              "About 8.7% better kilometers per liter. Only 4 of 8 cylinders were covered, and retrofit runs had high winds.",
            ],
          ],
        },
      },
      {
        heading: "Reported by the inventor’s side: four tests",
        kind: "claim",
        body: [
          "These four tests are published on Thunderstorm.tech, the seller’s site. We have not seen the full original reports. We list them as reported by the inventor’s side, not as measurements we can vouch for. The site describes them as independent and certified. We could not check who paid for any of them.",
        ],
        table: {
          caption: "Tests reported on Thunderstorm.tech",
          head: ["Test", "Who ran it", "Who paid", "What was measured", "Result as reported"],
          rows: [
            [
              "Dartford, UK, June 28, 2024",
              "Element, a testing company, per Thunderstorm.tech",
              "Not stated on the page",
              "Exhaust gases from a Thunderstorm Generator-fitted engine, with and without the device. Engine type not given.",
              "Carbon monoxide (CO) −97.1%, volatile organic compounds (VOCs) −99.9%, sulfur dioxide −84.8%, nitrogen oxides −6.5%. Oxygen 0.15% to 10.40%. CO₂ is not in the table.",
            ],
            [
              "Clearwater, Florida, June 24, 2024",
              "Not named on the page",
              "Not stated on the page",
              "Exhaust gases and fuel run time, base-load generator at 60 Hz under a 2,400 W load",
              "CO₂ −99.56%, CO −98.00%, nitrogen oxides −95.14%, hydrocarbons −77.47%, fuel run time +19.45%. Units are unclear in the page’s table.",
            ],
            [
              "Star Cement, United Arab Emirates (UAE), December 5–6, 2024",
              "Described as run in partnership with Strike Foundation (UK)",
              "Not stated on the page",
              "Ambient air, plain exhaust and treated exhaust on a Honda 5 kW gasoline engine",
              "CO₂ −83.33%, hydrocarbons −77.30%, nitrogen oxides −79.66%. CO unchanged at 0.10%. Oxygen 9.12% to 20.43%.",
            ],
            [
              "Plasmoid Power’s own test program (Test 13)",
              "Plasmoid Power, signed by its chief executive; the page calls it self-certified",
              "Not stated on the page",
              "Five-gas analyzer on a 5,500 W generator under a 2,200 W load, five runs over four hours",
              "CO₂, CO and nitrogen oxides “almost eliminated,” oxygen near air level. Hydrocarbons rose. The first run was left out of the averages.",
            ],
          ],
        },
      },
      {
        heading: "How the results compare",
        kind: "plain",
        body: [
          "The numbers differ a lot from test to test. CO fell by 34% in the thesis, by 97–98% in two seller-side tests, and not at all in the UAE test. CO₂ and oxygen did not change in the thesis, but moved sharply in the seller-side tests.",
          "Different engines, loads, analyzers and test methods can explain differences. They also mean no single number tells the whole story. A gas analyzer reports concentration, which is how much of a gas is in each sample. It does not by itself show how much gas the engine made.",
        ],
      },
      {
        heading: "What we could not verify",
        kind: "plain",
        body: [
          "We could not open the full Element report, and we do not know who paid for it. The Clearwater page does not name who ran the test. We did not find the original data behind the UAE trial beyond the summary table.",
          "If you hold a full report, send it to us and we will read it and update this page.",
        ],
      },
    ],
    sources: [
      { label: "Hall, W. (2026), Embry-Riddle Aeronautical University master’s thesis (measured)", href: "https://commons.erau.edu/edt/964/" },
      { label: "Thunderstorm.tech — Test Results (inventor’s side)", href: "https://thunderstorm.tech/technology/test-results" },
      { label: "Plasmoid Power — Test Results (inventor’s side)", href: "https://plasmoid-power.com/test-results" },
    ],
    related: [
      { href: "/explainers/embry-riddle-thunderstorm-generator-test/", label: "The Embry-Riddle test explained" },
      { href: "/explainers/thunderstorm-generator-critics/", label: "Critics and supporters, side by side" },
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does the Thunderstorm Generator work?" },
      { href: "/sources/", label: "Sources" },
    ],
  },
  {
    slug: "can-water-be-a-fuel",
    title: "Can water be a fuel?",
    question: "Can water be used as a fuel? What did the Thunderstorm Generator test show?",
    description:
      "Why water is not a fuel in ordinary physics, how electrolysis fits, what water can do inside an engine, and where the inventor’s “water as atomic fuel” claim stands. Labeled; the test did not show it.",
    published: "2026-10-15",
    lede: "Water cannot be burned for energy. That is ordinary physics, and it is where this page starts. It then shows what water can do in an engine, what the inventor claims about “water as an atomic fuel,” and what the test measured.",
    blocks: [
      {
        heading: "The plain answer: water is what is left after hydrogen burns",
        kind: "plain",
        body: [
          "When hydrogen burns, it combines with oxygen and makes water. Water is the ash. Its chemical bonds are strong, so energy is needed to break them, and no further chemical energy is left to release.",
          "This is the law of conservation of energy: energy is not created from nothing. A reference summary puts it this way: there is no way to extract chemical energy from water alone that agrees with the laws of physics.",
        ],
      },
      {
        heading: "Electrolysis: you can split water, but it costs energy",
        kind: "plain",
        body: [
          "Electrolysis uses electricity to split water into hydrogen and oxygen. The US Department of Energy describes it this way. The hydrogen can then be burned or used in a fuel cell to give back energy.",
          "But splitting water takes at least as much energy as you get back, and in practice more. As of 2022, commercial electrolysis used about 53 kilowatt-hours of electricity to make one kilogram of hydrogen that holds about 39.4 kilowatt-hours of energy. So hydrogen from water is a way to store energy, not a way to make it.",
        ],
      },
      {
        heading: "What water can do in an engine",
        kind: "plain",
        body: [
          "Water can help an engine without being the fuel. Water injection cools the combustion chamber and can reduce knock. A steam engine uses water as the fluid that carries heat, not as a fuel.",
          "The Embry-Riddle thesis points to this kind of effect. It says a steam thermal regeneration cycle (using exhaust heat to make steam) is a well-established way to recover waste heat, and that water injection has shown benefits in independent research.",
        ],
      },
      {
        heading: "The inventor’s claim: water as an atomic fuel",
        kind: "claim",
        body: [
          "Malcolm Bendall describes his device as “a proprietary plasmoid-induced and controlled atomic energy release process which allows water to be used as an atomic fuel.” This is his own summary, as quoted by Skeptoid.",
          "In his model, plasmoids are designed to release energy from the hydrogen in water. A 2023 Strike Foundation document by Bendall, as cited in the thesis, is titled “The ‘Thunderstorm Generator’ — Atomic Energy From Water Plasmoid Protium Power.” Protium is ordinary hydrogen. A fuller explanation is in our protium page.",
          "This is a claim from the inventor’s model. It is not accepted physics, and this site does not present it as fact.",
        ],
      },
      {
        heading: "What the test measured",
        kind: "measured",
        body: [
          "The Embry-Riddle thesis did not show water acting as a fuel. The engines in its tests ran on gasoline, and the fuel measured was the gasoline weighed or timed on each run. The thesis did not test the plasmoid or atomic-energy explanation and says those claims are outside its scope.",
          "What it did find was a modest fuel gain: a 9.67% lower fuel-use rate on a small generator. The thesis ties that gain to heat recovery and water vapor, not to water burning as fuel. It also says the results did not conclusively validate the inventor’s own numbers.",
        ],
      },
      {
        heading: "What outside writers say",
        kind: "commentary",
        body: [
          "Brian Dunning (Skeptoid, 2025) writes that water is not a fuel, because it is in a low-energy state with no extractable chemical energy. He says that in a device like this the engine keeps running on its gasoline, and the extra water vapor passes through it.",
          "Wikipedia’s article on water-fuelled cars says the first law of thermodynamics means the energy needed to split water equals the energy released when the gases recombine (ignoring losses), so a split-and-burn loop cannot make net energy.",
        ],
      },
      {
        heading: "A quick check for any water-fuel claim",
        kind: "plain",
        body: [
          "Ask three things. Where does the energy come from? Was the fuel in measured, with a baseline run for comparison? Could the gain come from heat recovery, water vapor, or a leaner mix?",
          "A claim that answers those with a measurement is worth a look. A claim that answers with a theory alone is still a claim.",
        ],
      },
    ],
    sources: [
      { label: "US Department of Energy — Hydrogen Production: Electrolysis (reference)", href: "https://www.energy.gov/eere/fuelcells/hydrogen-production-electrolysis" },
      { label: "Wikipedia — Electrolysis of water, efficiency and energy figures (reference)", href: "https://en.wikipedia.org/wiki/Electrolysis_of_water" },
      { label: "Wikipedia — Water-fuelled car, energy conservation and water injection (reference)", href: "https://en.wikipedia.org/wiki/Water-fuelled_car" },
      { label: "Hall, W. (2026), Embry-Riddle Aeronautical University master’s thesis; also cites the Strike Foundation document title (measured)", href: "https://commons.erau.edu/edt/964/" },
      { label: "Skeptoid #1019, “Testing the Thunderstorm Generator,” Brian Dunning, Dec 16, 2025 (outside commentary; quotes the inventor’s summary)", href: "https://skeptoid.com/episodes/1019" },
    ],
    related: [
      { href: "/explainers/protium-hydrogen-path/", label: "Protium and the hydrogen path" },
      { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does the Thunderstorm Generator work?" },
      { href: "/explainers/thunderstorm-generator-critics/", label: "Critics and supporters, side by side" },
      { href: "/sources/", label: "Sources" },
    ],
  },
  {
    slug: "strike-foundation-and-thunderstorm-tech",
    title: "Strike Foundation, Thunderstorm.tech and this site",
    question: "What is Strike Foundation, what is Thunderstorm.tech, and how is Plasmoid X different?",
    description:
      "Who is who: Strike Foundation, Thunderstorm.tech, Plasmoid Power, and Plasmoid X. This site is independent education, sells no kits, and links its Services and Sources pages.",
    published: "2026-10-15",
    lede: "Several names appear around the Thunderstorm Generator: Strike Foundation, Thunderstorm.tech, and Plasmoid Power. This page says who each is, in their own words where possible. It also says plainly how Plasmoid X is different from all of them.",
    blocks: [
      {
        heading: "Plasmoid X is independent and sells no kits",
        kind: "plain",
        body: [
          "Plasmoid X is independent education run by Derek Watson. It is not Strike Foundation, Strike Energy, Thunderstorm.tech or Plasmoid Power. It is not a licensee, dealer or partner of any of them.",
          "This site does not sell Thunderstorm Generator kits or parts. Links to other sites are outbound links only.",
          "The Services page describes the optional help offered: written estimates for installing a kit you already own. The Sources page lists every outside source this site relies on.",
        ],
      },
      {
        heading: "Strike Foundation",
        kind: "claim",
        body: [
          "Strike Foundation Guarantee Limited describes itself as a not-for-profit entity formed to hold, manage and commercialize all the intellectual property (IP) of inventor Malcolm Bendall. It says Bendall has asked it to publish all of his IP openly, so it posts his notes and diagrams.",
          "Its site also hosts an introduction to the inventor, supporting research papers, and the open-source notes behind the Molten Sea Ark Atomic Reconstruction Technology (MSAART). This site calls that material “Strike Foundation material.”",
        ],
      },
      {
        heading: "Thunderstorm.tech",
        kind: "claim",
        body: [
          "Thunderstorm.tech is a site about the Thunderstorm Generator. It publishes technology pages, test-result summaries, and a kit assembly guide. Its test-results page describes the testing as independent and certified.",
          "We treat it as the inventor’s side, because it presents the device favorably and hosts material from Plasmoid Power. See our page on other tests for how we handle its numbers.",
        ],
      },
      {
        heading: "Plasmoid Power",
        kind: "claim",
        body: [
          "Plasmoid Power presents itself as the maker of the Thunderstorm Generator kit. The Embry-Riddle thesis says the main vortex unit, piping and bubbler for its road test were supplied by Plasmoid Power. Skeptoid says the company is based in Thailand.",
          "Plasmoid Power’s kit assembly guide (updated February 2026) says the kit is provided to customers who want to evaluate the technology. It says no warranties or guarantees are given about emission reductions or fuel savings, and that neither Plasmoid Power Limited nor Alpha Prospects Limited will be liable for losses from using it.",
        ],
      },
      {
        heading: "What the one university test says about them",
        kind: "measured",
        body: [
          "The Embry-Riddle thesis is the one measured anchor this site uses. It was run by a master’s student, and its hardware was partly supplied by Plasmoid Power. It found a 9.67% lower fuel-use rate on a small generator and about a 34% drop in carbon monoxide in an idle test.",
          "Those results do not depend on who sells the kit. They also do not confirm the larger claims on the sellers’ sites.",
        ],
      },
      {
        heading: "How this site uses their material",
        kind: "plain",
        body: [
          "This site reads their pages, labels what they claim, and puts measurements first. It does not copy their marketing, and it does not take their numbers as proven.",
          "To see what this site has read, open the Sources page. To see what a given page treats as measured, claimed or commentary, look at the label above each block.",
        ],
      },
    ],
    sources: [
      { label: "Strike Foundation — home page (inventor’s side)", href: "https://strikefoundation.earth/" },
      { label: "Strike Foundation — Introduction (inventor’s side)", href: "https://www.strikefoundation.earth/introduction" },
      { label: "Thunderstorm.tech — Test Results (inventor’s side)", href: "https://thunderstorm.tech/technology/test-results" },
      { label: "Plasmoid Power — Thunderstorm Generator Assembly Instructions, Feb 2026 (inventor’s side)", href: "https://thunderstorm.tech/tsg-kits/Assembly%20Instructions%20-%202026.pdf" },
      { label: "Hall, W. (2026), Embry-Riddle Aeronautical University master’s thesis (measured)", href: "https://commons.erau.edu/edt/964/" },
      { label: "Skeptoid #1019, Brian Dunning, Dec 16, 2025 (outside commentary)", href: "https://skeptoid.com/episodes/1019" },
    ],
    related: [
      { href: "/services/", label: "Services" },
      { href: "/sources/", label: "Sources" },
      { href: "/explainers/who-is-malcolm-bendall/", label: "Who is Malcolm Bendall?" },
      { href: "/explainers/thunderstorm-generator/", label: "The Thunderstorm Generator explained" },
    ],
  },
];

export function getExplainer(slug: string): Explainer {
  const e = explainers.find((x) => x.slug === slug);
  if (!e) throw new Error(`Unknown explainer ${slug}`);
  return e;
}
