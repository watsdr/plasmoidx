import type { Metadata } from "next";
import Link from "next/link";
import ScrollyChapter from "@/components/ScrollyChapter";
import { glossaryTerms } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain definitions for MSAART, PUM, EVO, MOE, CTR, Time’s mould, Embry-Riddle meter, and related Plasmoid X study terms.",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Glossary</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Terms in plain language
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Short entries with links into Study and Device. The header Glossary
          drawer shows the same set.
        </p>
      </header>

      <section
        className="mt-12 max-w-2xl border-t border-ink-600/40 pt-12"
        aria-labelledby="glossary-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="glossary-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            Why a plain glossary
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Teach → act before the dense list. Index chips and entries stay
            unwrapped so scanning stays fast.
          </p>
        </ScrollyChapter>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
          <ScrollyChapter
            delay={80}
            className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 1 · Problem
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
              Acronym fog
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              MSAART, EVO, MOE, CTR, and PUM show up early. Without plain
              expansions, beginners bounce instead of learning the picture.
            </p>
          </ScrollyChapter>

          <ScrollyChapter
            delay={140}
            className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aurora">
              Chapter 2 · Solution
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
              Short definitions + deep links
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Each entry expands the short form once, then points into Study or
              Device when a longer section exists. Same set as the header
              drawer.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Jump an index chip below, or open{" "}
              <Link href="/study/#curriculum" className="link-aurora">
                Lessons 1–6
              </Link>{" "}
              when you want the path, not just a word.
            </p>
          </div>
        </ScrollyChapter>
      </section>

      <nav className="mt-12 max-w-2xl" aria-label="Glossary index">
        <ul className="flex flex-wrap gap-2">
          {glossaryTerms.map((term) => (
            <li key={term.abbr}>
              <a href={`#${encodeURIComponent(term.abbr)}`} className="chip">
                {term.abbr}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <dl className="mt-12 max-w-2xl space-y-8">
        {glossaryTerms.map((term) => (
          <div key={term.abbr} id={term.abbr} className="scroll-mt-28">
            <dt className="text-base font-medium tracking-tight text-mist-50">
              <span className="text-aurora">{term.abbr}</span>
              <span className="mt-0.5 block text-sm font-normal text-mist-200">
                {term.title}
              </span>
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-mist-300">
              {term.body}
              {term.href ? (
                <>
                  {" "}
                  <Link href={term.href} className="link-aurora">
                    Open section
                  </Link>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 flex flex-wrap gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/study/" className="btn-primary">
          Study
        </Link>
        <Link href="/sources/" className="btn-ghost">
          Sources
        </Link>
      </div>
    </div>
  );
}
