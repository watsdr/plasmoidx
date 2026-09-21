import type { Metadata } from "next";
import Link from "next/link";
import { externalLinks, msaartExpansion } from "@/lib/content";
import { errataItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Sources & method",
  description:
    "How Plasmoid X separates measured results, inventor claims, and independent commentary. Acronym policy, outbound credits, quality bar.",
  openGraph: {
    title: "Sources & method · Plasmoid X",
    description:
      "Measured vs inventor vs commentary. MSAART expansion, Embry-Riddle citation, outbound credits.",
  },
};

export default function SourcesPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Sources</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Method before mystique
        </h1>
        <p className="measure mt-5 text-lg leading-relaxed text-mist-200">
          Independent education voice. We separate what was measured, what
          inventors claim, and what independent educators say — then teach the
          model calmly.
        </p>
      </header>

      <section className="mt-12 max-w-2xl">
        <h2 className="fluid-title font-semibold text-mist-50">
          Three lanes
        </h2>
        <ol className="mt-6 space-y-6">
          <li>
            <h3 className="text-base font-medium tracking-tight text-mist-50">
              Measured
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              Embry-Riddle Aeronautical University M.S. thesis (2026) —
              independent meter this site leads with: roughly +9–10% fuel
              efficiency and about −34% average emissions (carbon monoxide
              clearest). Not a Plasmoid X credential; cited as used on the site.
            </p>
          </li>
          <li>
            <h3 className="text-base font-medium tracking-tight text-mist-50">
              Inventor / marketing
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              Bendall Thunderstorm Generator decks, HowTube /
              StrikeFoundationEarth lectures, Perry narrative pieces. Large
              fuel figures (including ≥90%), near-zero exhaust language, and
              rollout promises stay labeled claims.
            </p>
          </li>
          <li>
            <h3 className="text-base font-medium tracking-tight text-mist-50">
              Independent commentary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              Alchemical Science and similar educators — useful explainers and
              footage, not meters and not Strike. Credited outbound only.
            </p>
          </li>
        </ol>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="fluid-title font-semibold text-mist-50">
          Acronym policy
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mist-300">
          <li>
            <strong className="font-medium text-mist-100">MSAART</strong> —
            Molten Sea Ark Atomic Reconstruction Technology on first use.{" "}
            <em>Ark</em>, not Arc (PUM / Draft 518400 titles).
          </li>
          <li>
            <strong className="font-medium text-mist-100">PUM · EVO · MOE · CTR · ATV</strong>{" "}
            — expanded once per page section where a beginner lands; glossary
            holds the short forms.
          </li>
          <li>
            Full list:{" "}
            <Link href="/glossary/" className="link-aurora">
              Glossary
            </Link>
            .
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-mist-400">
          First expansion on this page: {msaartExpansion} (MSAART).
        </p>
      </section>

      <section className="mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">
          Outbound credits
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300">
          Linked for study. Not partners. Not official Plasmoid X channels.
        </p>
        <ul className="mt-6 divide-y divide-ink-600/40 rounded-xl border border-ink-600/45">
          {externalLinks.map((item) => (
            <li key={item.href} className="px-4 py-3.5 sm:px-5">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-aurora text-sm font-medium"
              >
                {item.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-1 text-xs leading-relaxed text-mist-400">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-300">
          Core public notes: Strike Foundation Draft 518400 parts, Plasmoid
          Unification Model deck (MSAART expansion), Thunderstorm Generator
          presentation, supporting-research prior art list on
          strikefoundation.earth.
        </p>
      </section>


      <section className="mt-16 max-w-2xl">
        <h2 className="fluid-title font-semibold text-mist-50">
          Draft 518,400 research source
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mist-300">
          <strong className="font-medium text-mist-100">
            Draft #518,400 B KMV
          </strong>{" "}
          (Malcolm Bendall / Strike Foundation Guarantee Limited, 2022;
          graphics Steve Earl) is a research source for teaching summaries on
          this site — Alpha–Omega ladder layout, MSAART themes, and related
          study labs. Plasmoid X does{" "}
          <strong className="font-medium text-mist-100">not</strong> republish
          or host those patent-note PDFs. Public notes remain at{" "}
          <a
            href="https://www.strikefoundation.earth"
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            strikefoundation.earth
          </a>{" "}
          (Strike Foundation — external independent org).
        </p>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="fluid-title font-semibold text-mist-50">
          Quality bar
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mist-300">
          Keyboard-reachable labs, visible focus, touch targets that stay
          usable on phones, and{" "}
          <code className="text-mist-200">prefers-reduced-motion</code>{" "}
          respected. After a first visit the offline shell (service worker)
          keeps key pages and the study pack available. We do not publish
          fabricated Lighthouse scores.
        </p>
      </section>

      <section id="errata" className="mt-16 max-w-2xl">
        <h2 className="fluid-title font-semibold text-mist-50">
          Errata &amp; updates
        </h2>
        <p className="mt-2 text-sm text-mist-300">
          Dated corrections. Full list also on{" "}
          <Link href="/updates/" className="link-aurora">
            /updates/
          </Link>
          .
        </p>
        <ul className="mt-6 space-y-5">
          {errataItems.map((item) => (
            <li key={item.title}>
              <p className="font-mono text-[11px] text-aurora">{item.date}</p>
              <h3 className="mt-1 text-sm font-medium text-mist-50">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist-300">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/study/" className="btn-primary">
          Study
        </Link>
        <Link href="/faq/" className="btn-ghost">
          FAQ
        </Link>
        <Link href="/study-pack/" className="btn-ghost">
          Study pack
        </Link>
      </div>
    </div>
  );
}
