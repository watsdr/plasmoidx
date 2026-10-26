/**
 * Evidence numbers for the interactive graphics. Every figure here already
 * appears on the site (explainers.ts tables and text) with a cited source.
 * Do not add a number unless it is cited on a page first.
 */

export const SRC = {
  thesis: {
    label: "Hall, W. (2026), Embry-Riddle Aeronautical University master’s thesis",
    href: "https://commons.erau.edu/edt/964/",
  },
  seller: {
    label: "Thunderstorm.tech — Test Results (seller’s site)",
    href: "https://thunderstorm.tech/technology/test-results",
  },
  skeptoid: {
    label: "Skeptoid #1019, Brian Dunning, Dec 16, 2025",
    href: "https://skeptoid.com/episodes/1019",
  },
  strike: {
    label: "Strike Foundation — home page (inventor’s side)",
    href: "https://strikefoundation.earth/",
  },
} as const;

export type EvidenceKind = "measured" | "seller";

export type EvidenceRow = {
  id: string;
  test: string;
  kind: EvidenceKind;
  /** Size of the change in percent (0–100 scale). null = shown as text only. */
  magnitude: number | null;
  /** Direction word for screen readers and the value label. */
  value: string;
  conditions: string;
  source: keyof typeof SRC;
  /** Oxygen only: level before and after, in percent of the sample. */
  levels?: [number, number];
};

export type EvidenceMetric = {
  id: "co" | "co2" | "oxygen" | "fuel";
  tab: string;
  title: string;
  note: string;
  rows: EvidenceRow[];
};

const thesisIdle =
  "Troy-Bilt 5550 generator at idle inside a trailer, five-gas analyzer, 10 runs each way.";

export const metrics: EvidenceMetric[] = [
  {
    id: "co",
    tab: "Carbon monoxide (CO)",
    title: "Change in carbon monoxide (CO) in the exhaust",
    note: "Bars show the size of the drop on a 0–100% scale.",
    rows: [
      { id: "co-thesis", test: "Embry-Riddle thesis, idle test (2026)", kind: "measured", magnitude: 34, value: "about 34% lower (average)", conditions: thesisIdle, source: "thesis" },
      { id: "co-element", test: "Dartford, UK (June 28, 2024)", kind: "seller", magnitude: 97.1, value: "97.1% lower, as reported", conditions: "Run by Element, a testing company, per Thunderstorm.tech. Engine type not given. We have not seen the full report or who paid.", source: "seller" },
      { id: "co-clearwater", test: "Clearwater, Florida (June 24, 2024)", kind: "seller", magnitude: 98, value: "98.00% lower, as reported", conditions: "Base-load generator at 60 hertz (Hz) under a 2,400 watt (W) load. Tester not named. Units are unclear in the page’s table.", source: "seller" },
      { id: "co-uae", test: "Star Cement, United Arab Emirates (UAE) (December 5–6, 2024)", kind: "seller", magnitude: 0, value: "unchanged at 0.10%, as reported", conditions: "Honda 5 kilowatt (kW) gasoline engine. Described as run in partnership with Strike Foundation (UK).", source: "seller" },
    ],
  },
  {
    id: "co2",
    tab: "Carbon dioxide (CO₂)",
    title: "Change in carbon dioxide (CO₂) in the exhaust",
    note: "Bars show the size of the drop on a 0–100% scale. The Dartford table has no CO₂ row.",
    rows: [
      { id: "co2-thesis", test: "Embry-Riddle thesis, idle test (2026)", kind: "measured", magnitude: 0, value: "no significant change", conditions: thesisIdle, source: "thesis" },
      { id: "co2-clearwater", test: "Clearwater, Florida (June 24, 2024)", kind: "seller", magnitude: 99.56, value: "99.56% lower, as reported", conditions: "Base-load generator at 60 hertz (Hz) under a 2,400 watt (W) load. Tester not named. Units are unclear in the page’s table.", source: "seller" },
      { id: "co2-uae", test: "Star Cement, United Arab Emirates (UAE) (December 5–6, 2024)", kind: "seller", magnitude: 83.33, value: "83.33% lower, as reported", conditions: "Honda 5 kilowatt (kW) gasoline engine. Described as run in partnership with Strike Foundation (UK).", source: "seller" },
    ],
  },
  {
    id: "oxygen",
    tab: "Oxygen",
    title: "Oxygen level in the exhaust sample",
    note: "Shown as levels before and after, not as a percent increase. A percent increase from a near-zero start looks enormous (the seller headlines Dartford as +6,833%), so it would not fit any honest scale.",
    rows: [
      { id: "o2-thesis", test: "Embry-Riddle thesis, idle test (2026)", kind: "measured", magnitude: null, value: "no significant change", conditions: thesisIdle, source: "thesis" },
      { id: "o2-element", test: "Dartford, UK (June 28, 2024)", kind: "seller", magnitude: null, levels: [0.15, 10.4], value: "0.15% before, 10.40% after, as reported", conditions: "Run by Element, a testing company, per Thunderstorm.tech. Engine type not given. A gas analyzer reports concentration (how much of a gas is in each sample), not how much gas the engine made.", source: "seller" },
      { id: "o2-uae", test: "Star Cement, United Arab Emirates (UAE) (December 5–6, 2024)", kind: "seller", magnitude: null, levels: [9.12, 20.43], value: "9.12% before, 20.43% after, as reported", conditions: "Honda 5 kilowatt (kW) gasoline engine. A gas analyzer reports concentration, not how much gas the engine made.", source: "seller" },
    ],
  },
  {
    id: "fuel",
    tab: "Fuel",
    title: "Fuel results",
    note: "Bars show the size of the change on the same 0–100% scale as the exhaust results.",
    rows: [
      { id: "fuel-gen", test: "Embry-Riddle thesis, small generator under load (2026)", kind: "measured", magnitude: 9.67, value: "9.67% lower fuel-use rate", conditions: "About 2,760 W load. Gasoline weighed and timed on each run: 35.27 to 31.86 milliliters per minute (mL/min).", source: "thesis" },
      { id: "fuel-road", test: "Embry-Riddle thesis, one-vehicle road test (2026)", kind: "measured", magnitude: 8.7, value: "about 8.7% better economy", conditions: "1989 Chevrolet Blazer, 10 runs each way on a 32.2 km (about 20 mile) loop. Only 4 of 8 cylinders were covered, and retrofit runs had high winds. The manufacturer, Plasmoid Power, supplied the road-test hardware.", source: "thesis" },
      { id: "fuel-clearwater", test: "Clearwater, Florida (June 24, 2024)", kind: "seller", magnitude: 19.45, value: "19.45% longer fuel run time, as reported", conditions: "Base-load generator at 60 hertz (Hz) under a 2,400 watt (W) load. Tester not named. Units are unclear in the page’s table.", source: "seller" },
    ],
  },
];

/** One shared set of evidence labels for badges, chips and timelines across the site. */
export const EVIDENCE_LABELS = {
  measured: "Measured",
  seller: "Seller claim",
  inventor: "Inventor claim",
  outside: "Outside commentary",
  inventorSide: "Inventor’s side",
  definition: "Plain definition",
} as const;

/** What each bar measures, so different quantities are never read off one unlabeled axis. */
export const BAR_MEASURE: Record<string, string> = {
  "fuel-gen": "Fuel-use rate, % lower",
  "fuel-road": "Fuel economy, % better",
  "fuel-clearwater": "Fuel run time, % longer",
};

/** The one measured fuel figure the estimator uses (small generator). */
export const MEASURED_FUEL_RATE = 9.67;

export type TimelineItem = {
  date: string;
  iso: string;
  title: string;
  label: (typeof EVIDENCE_LABELS)[keyof typeof EVIDENCE_LABELS];
  body: string;
  source: keyof typeof SRC;
  more?: { href: string; label: string };
};

export const timeline: TimelineItem[] = [
  { date: "Nov 10, 2022", iso: "2022-11-10", title: "Wide audience: the Joe Rogan Experience", label: "Inventor’s side", body: "Randall Carlson introduces Bendall’s work on episode #1897 of the Joe Rogan Experience, as Strike Foundation tells it (it dates the episode Nov 11).", source: "strike", more: { href: "/explainers/joe-rogan-randall-carlson-malcolm-bendall/", label: "Joe Rogan, Carlson and Bendall" } },
  { date: "Jun 24, 2024", iso: "2024-06-24", title: "Clearwater, Florida generator test", label: "Seller claim", body: "Reported: carbon monoxide (CO) −98.00%, carbon dioxide (CO₂) −99.56%, fuel run time +19.45%. Tester not named.", source: "seller", more: { href: "/explainers/other-thunderstorm-generator-tests/", label: "All tests side by side" } },
  { date: "Jun 28, 2024", iso: "2024-06-28", title: "Dartford, UK test (Element, per the seller)", label: "Seller claim", body: "Reported: carbon monoxide (CO) −97.1%, oxygen 0.15% to 10.40%. Full report not seen.", source: "seller", more: { href: "/explainers/other-thunderstorm-generator-tests/", label: "All tests side by side" } },
  { date: "Dec 5–6, 2024", iso: "2024-12-05", title: "Star Cement, United Arab Emirates (UAE)", label: "Seller claim", body: "Reported: carbon dioxide (CO₂) −83.33%, carbon monoxide (CO) unchanged at 0.10%, oxygen 9.12% to 20.43%.", source: "seller", more: { href: "/explainers/other-thunderstorm-generator-tests/", label: "All tests side by side" } },
  { date: "Dec 16, 2025", iso: "2025-12-16", title: "Skeptoid critique", label: "Outside commentary", body: "Brian Dunning argues the device is an exhaust heat riser plus water injection; small gains are “probably true” if they stay small.", source: "skeptoid", more: { href: "/explainers/thunderstorm-generator-critics/", label: "Critics and supporters, side by side" } },
  { date: "2026", iso: "2026", title: "Embry-Riddle master’s thesis", label: "Measured", body: "A 9.67% lower fuel-use rate on a small generator; carbon monoxide (CO) about 34% lower at idle; CO₂ and oxygen not significantly changed; about 8.7% better economy on a one-vehicle road test using hardware the manufacturer supplied.", source: "thesis", more: { href: "/explainers/embry-riddle-thunderstorm-generator-test/", label: "What the test measured" } },
];
