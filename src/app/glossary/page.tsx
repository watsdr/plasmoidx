import type { Metadata } from "next";
import Link from "next/link";
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

      <nav className="mt-8 max-w-2xl" aria-label="Glossary index">
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
