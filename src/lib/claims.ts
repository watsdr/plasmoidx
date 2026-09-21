/** Honest claims-compare rows — inventor → meter → does not prove. */

export type ClaimRow = {
  id: string;
  inventor: string;
  meter: string;
  doesNotProve: string;
};

export const claimRows: ClaimRow[] = [
  {
    id: "fuel",
    inventor:
      "Large fuel-efficiency gains — often framed as ≥90% in inventor / marketing material (Thunderstorm decks, Perry narrative).",
    meter:
      "Embry-Riddle Aeronautical University M.S. thesis (2026, independent meter): roughly +9–10% fuel efficiency under the conditions tested.",
    doesNotProve:
      "Does not prove inventor-scale fuel cuts, commercial fleet performance, or that 90% figures are realistic for everyday engines.",
  },
  {
    id: "emissions",
    inventor:
      "Near-zero carbon monoxide (CO) / hydrocarbons (HC); “carbon killer” framing and high O₂ in exhaust in some narrative pieces.",
    meter:
      "Same thesis: about −34% average emissions, with carbon monoxide (CO) the clearest drop among the cuts reported.",
    doesNotProve:
      "Does not prove near-zero exhaust, full regulatory compliance claims, or that every pollutant fell equally.",
  },
  {
    id: "water",
    inventor:
      "Water / protium as atomic fuel with closed recirculation; hydrocarbons mainly as kindling (heat + vacuum).",
    meter:
      "The meter speaks to fuel use and exhaust gases on a retrofit test path — not a full isotope / closed-loop verification.",
    doesNotProve:
      "Does not prove water-as-fuel at scale or a verified closed protium cycle. That framing stays study material until fuller dyno / isotope work lands.",
  },
  {
    id: "hardware",
    inventor:
      "Three-beat hardware (ionizer → bubbler → resonator / nested CTR spheres) as the path to the claimed energy harvest.",
    meter:
      "Measured effect appeared with Thunderstorm-style retrofit hardware in the independent study context — enough to take the effect seriously as measured.",
    doesNotProve:
      "Does not prove every ratio or MSAART lock is required for the meter result, or that the model is mainstream consensus physics.",
  },
];
