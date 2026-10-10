import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/stats/",
  title: "Site stats (private)",
  description: "Private dashboard links for Plasmoid X visit counts and search performance.",
  section: "home",
  noindex: true,
});

const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "plasmoidx";
const gc = `https://${code}.goatcounter.com/`;
const gsc =
  "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aplasmoidx.com";

const gcTerms = [
  ["Visitors", "Roughly how many different people came by. Estimated without cookies, so treat it as a close guess."],
  ["Pageviews", "How many pages were opened in total. One person reading three pages counts three."],
  ["Referrers", "The site someone came from — a search engine, a social post, or a link elsewhere."],
  ["Top pages", "Which pages get read most. Good for deciding what to improve next."],
  ["Browsers, systems, sizes", "What devices people use. Helps keep mobile layouts working."],
] as const;

const gscTerms = [
  ["Impressions", "How often a Plasmoid X page showed up in Google results, even if nobody clicked."],
  ["Clicks", "How often someone clicked through from Google to the site."],
  ["CTR (click-through rate)", "Clicks divided by impressions. Higher means the title and description are doing their job."],
  ["Average position", "Where the page usually sits in results. 1 is the top; under 10 is the first page."],
  ["Queries", "The actual words people searched. Use these to pick new explainer topics."],
] as const;

function Terms({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="mt-4 space-y-4">
      {items.map(([t, d]) => (
        <div key={t}>
          <dt className="text-sm font-medium text-mist-50">{t}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-mist-300">{d}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function StatsPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header>
        <p className="section-label">Private</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">Site stats</h1>
        <p className="measure mt-4 text-base leading-relaxed text-mist-200">
          Two places to check how the site is doing. This page is hidden from
          search engines and not linked anywhere.
        </p>
      </header>

      <section className="mt-12 border-t border-ink-600/40 pt-10" aria-labelledby="gc-h">
        <h2 id="gc-h" className="fluid-title font-semibold text-mist-50">Visits (GoatCounter)</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist-300">
          Cookieless, anonymous counts. Sign in to see the full dashboard.
        </p>
        <a href={gc} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-flex">
          Open GoatCounter
        </a>
        <Terms items={gcTerms} />
      </section>

      <section className="mt-12 border-t border-ink-600/40 pt-10" aria-labelledby="gsc-h">
        <h2 id="gsc-h" className="fluid-title font-semibold text-mist-50">Search (Google Search Console)</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist-300">
          How Google sees the site. Numbers lag about two days.
        </p>
        <a href={gsc} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-flex">
          Open Search Console
        </a>
        <Terms items={gscTerms} />
      </section>
    </div>
  );
}
