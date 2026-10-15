import type { Metadata } from "next";
import Link from "next/link";
import { explainers } from "@/lib/explainers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/explainers/",
  title: "Plain-English explainers",
  description:
    "Short answers to common questions: what a plasmoid is, plasmoid vs plasma, the Thunderstorm Generator, Bendall’s MSAART, the critics, and whether water can be a fuel — claims, commentary and measurements labeled.",
  section: "explainers",
});

export default function ExplainersIndex() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Explainers</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">Explainers: quick answers</h1>
        <p className="measure mt-5 text-lg leading-relaxed text-mist-200">
          Each page answers one common question in a few minutes. Every block
          is labeled Measured, Inventor claim, Outside commentary, or Plain
          definition, so you can see what is proven and what is not. For the full course, open{" "}
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
