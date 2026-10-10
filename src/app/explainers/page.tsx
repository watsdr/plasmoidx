import type { Metadata } from "next";
import Link from "next/link";
import { explainers } from "@/lib/explainers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/explainers/",
  title: "Plain-English explainers",
  description:
    "Short answers to common questions: what a plasmoid is, plasmoid vs plasma, the Thunderstorm Generator, and Bendall’s MSAART — claims and measurements labeled.",
  section: "explainers",
});

export default function ExplainersIndex() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Explainers</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">Quick answers</h1>
        <p className="measure mt-5 text-lg leading-relaxed text-mist-200">
          One question per page. Each one labels what is measured and what is an
          inventor claim. For the full path, open{" "}
          <Link href="/study/" className="link-aurora">
            Study
          </Link>
          .
        </p>
      </header>
      <ul className="mt-12 max-w-2xl divide-y divide-ink-600/40 border-t border-ink-600/40">
        {explainers.map((e) => (
          <li key={e.slug} className="py-6">
            <h2 className="text-lg font-medium tracking-tight">
              <Link href={`/explainers/${e.slug}/`} className="link-aurora">
                {e.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
