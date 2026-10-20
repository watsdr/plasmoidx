import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import { explainers, type Explainer } from "@/lib/explainers";
import { absUrl } from "@/lib/seo";
import MeasuredVsClaimed from "@/components/interactive/MeasuredVsClaimed";
import FuelEstimator from "@/components/interactive/FuelEstimator";
import EvidenceTimeline from "@/components/EvidenceTimeline";

const interactive = {
  "measured-vs-claimed": MeasuredVsClaimed,
  "fuel-estimator": FuelEstimator,
  "evidence-timeline": EvidenceTimeline,
} as const;

const kindLabel = {
  measured: "Measured",
  claim: "Inventor claim",
  commentary: "Outside commentary",
  plain: "Plain definition",
} as const;

export default function ExplainerArticle({ e }: { e: Explainer }) {
  const url = absUrl(`/explainers/${e.slug}/`);
  // Related explainers: 3 others not already in "Keep learning", in list order after this one.
  const linked = new Set(e.related.map((r) => r.href));
  const i = explainers.findIndex((x) => x.slug === e.slug);
  const related = [...explainers.slice(i + 1), ...explainers.slice(0, i)]
    .filter((x) => !linked.has(`/explainers/${x.slug}/`))
    .slice(0, 3);
  return (
    <article className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: e.title,
          description: e.description,
          url,
          mainEntityOfPage: url,
          image: absUrl(`/og/explainers/${e.slug}.png`),
          inLanguage: "en-US",
          author: { "@type": "Person", name: "Derek Watson" },
          publisher: { "@type": "Organization", name: "Plasmoid X", url: absUrl("/") },
          datePublished: e.published ?? "2026-10-10",
          about: e.question,
        }}
      />
      <header className="max-w-2xl">
        <p className="section-label">
          <Link href="/explainers/" className="link-aurora">
            Explainers
          </Link>
        </p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">{e.title}</h1>
        <p className="measure mt-5 text-lg leading-relaxed text-mist-200">{e.lede}</p>
      </header>

      <div className="mt-12 max-w-5xl space-y-10 border-t border-ink-600/40 pt-10">
        {e.blocks.map((b, bi) => (
          <div key={b.heading} className="space-y-10">
          <section className={b.table ? undefined : "max-w-2xl"}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              {kindLabel[b.kind]}
            </p>
            <h2 className="mt-2 max-w-2xl text-xl font-medium tracking-tight text-mist-50">{b.heading}</h2>
            {b.body.map((para) => (
              <p key={para} className="mt-3 max-w-2xl text-base leading-relaxed text-mist-200">
                {para}
              </p>
            ))}
            {b.table && (
              <div className="mt-4 overflow-x-auto rounded-lg border border-ink-600/40" tabIndex={0} role="region" aria-label={`${b.table.caption} (scrolls sideways on small screens)`}>
                <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                  <caption className="px-3 py-2 text-left text-xs text-mist-400">{b.table.caption}</caption>
                  <thead>
                    <tr className="border-b border-ink-600/40 text-mist-50">
                      {b.table.head.map((h) => (
                        <th key={h} scope="col" className="px-3 py-2 align-bottom font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-600/30 text-mist-200">
                    {b.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, ci) =>
                          ci === 0 ? (
                            <th key={ci} scope="row" className="px-3 py-3 align-top font-medium text-mist-50">
                              {cell}
                            </th>
                          ) : (
                            <td key={ci} className="px-3 py-3 align-top leading-relaxed">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          {e.interactives
            ?.filter((x) => Math.min(x.after, e.blocks.length - 1) === bi)
            .map((x) => {
              const C = interactive[x.kind];
              return (
                <div key={x.kind} className="max-w-3xl">
                  <C />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {e.sources && (
        <section aria-labelledby="sources-heading" className="mt-14 max-w-2xl border-t border-ink-600/40 pt-8">
          <h2 id="sources-heading" className="text-sm font-medium text-mist-50">
            Sources
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-mist-400">
            Pages we opened and read for this explainer. The label in parentheses says which side each one speaks for.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {e.sources.map((src) => (
              <li key={src.href}>
                <a href={src.href} className="link-aurora" rel="noopener noreferrer" target="_blank">
                  {src.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Keep learning" className="mt-14 max-w-2xl border-t border-ink-600/40 pt-8">
        <h2 className="text-sm font-medium text-mist-50">Keep learning</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {e.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="link-aurora">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-8 text-sm font-medium text-mist-50">Related explainers</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {related.map((x) => (
            <li key={x.slug}>
              <Link href={`/explainers/${x.slug}/`} className="link-aurora">
                {x.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-mist-400">
          Independent education. Not Strike Foundation, Strike Energy, or a licensee.
        </p>
      </nav>
      <NewsletterSignup className="mt-12" />
    </article>
  );
}
