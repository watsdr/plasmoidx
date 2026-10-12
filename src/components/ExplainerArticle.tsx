import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import { explainers, type Explainer } from "@/lib/explainers";
import { absUrl } from "@/lib/seo";

const kindLabel = {
  measured: "Measured",
  claim: "Inventor claim",
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

      <div className="mt-12 max-w-2xl space-y-10 border-t border-ink-600/40 pt-10">
        {e.blocks.map((b) => (
          <section key={b.heading}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              {kindLabel[b.kind]}
            </p>
            <h2 className="mt-2 text-xl font-medium tracking-tight text-mist-50">{b.heading}</h2>
            {b.body.map((para) => (
              <p key={para} className="mt-3 text-base leading-relaxed text-mist-200">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

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
