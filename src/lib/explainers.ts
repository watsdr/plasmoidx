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
  lede: string;
  blocks: ExplainerBlock[];
  related: { href: string; label: string }[];
};

const meterLine =
  "Embry-Riddle Aeronautical University M.S. thesis (2026), an independent meter: about +9–10% fuel efficiency and about −34% average emissions under the conditions tested, with carbon monoxide (CO) the clearest drop.";

export const explainers: Explainer[] = [
  {
    slug: "what-is-a-plasmoid",
    title: "What is a plasmoid?",
    question: "What is a plasmoid, in plain English?",
    description:
      "A plasmoid explained simply: a self-built, donut-shaped bit of plasma. How it forms in the Bendall picture, what EVO means, and what is measured vs claimed.",
    lede: "A plasmoid is a small, self-built, donut-shaped plasma that holds its own shape. In Malcolm Bendall’s study material it is also called an EVO.",
    blocks: [
      {
        heading: "The short answer",
        kind: "plain",
        body: [
          "Think of a smoke ring that holds itself together. A plasmoid is a donut-shaped (toroidal) plasma held in its own magnetic bottle.",
          "Strike decks use the phrase Exotic Vacuum Occurrence (EVO). The plainer reading this site uses is energetic vacuum object.",
        ],
      },
      {
        heading: "How it forms, in the inventor picture",
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
      { href: "/study/#plasmoid", label: "Study: Plasmoid / EVO lab" },
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
    lede: "Plasma is the material. A plasmoid is a shape that material can take — a self-contained, donut-shaped piece that holds itself together.",
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
      { href: "/explainers/what-is-a-plasmoid/", label: "What is a plasmoid?" },
      { href: "/study/#plasmoid", label: "Study: Plasmoid / EVO" },
      { href: "/faq/", label: "FAQ" },
    ],
  },
  {
    slug: "thunderstorm-generator",
    title: "Thunderstorm Generator explained",
    question: "What is the Thunderstorm Generator and does it work?",
    description:
      "The Bendall Thunderstorm Generator explained simply: three beats (ionizer, bubbler, resonator), what inventors claim, and what an independent meter measured.",
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
          "Large fuel-efficiency gains, often framed as 90% or more, and near-zero carbon monoxide (CO) and hydrocarbons (HC). Water / protium is framed as the real fuel, with petrol as kindling.",
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
    lede: "MSAART stands for Molten Sea Ark Atomic Reconstruction Technology — Malcolm Bendall’s research framework behind the plasmoid and atom picture.",
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
      { href: "/study/#curriculum", label: "Study: Lessons 1–6" },
      { href: "/study/#locks", label: "Study: Number locks" },
      { href: "/sources/", label: "Sources & method" },
    ],
  },
];

export function getExplainer(slug: string): Explainer {
  const e = explainers.find((x) => x.slug === slug);
  if (!e) throw new Error(`Unknown explainer ${slug}`);
  return e;
}
