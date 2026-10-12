import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { errataItems } from "@/lib/faq";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/updates/",
    title: "Updates and corrections",
    description: "Dated corrections and changes on Plasmoid X: the MSAART “Ark” spelling, leading with the measured numbers, device visuals, and later notes.",
    section: "sources",
  }),
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Updates</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Updates and corrections
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          This page lists every correction and notable change, with dates. It
          matters because a site that teaches honesty should show its own
          fixes. A short version is also on{" "}
          <Link href="/sources/#errata" className="link-aurora">
            Sources
          </Link>
          .
        </p>
      </header>

      <ol className="mt-12 max-w-2xl space-y-8">
        {errataItems.map((item) => (
          <li key={item.title}>
            <p className="font-mono text-xs text-aurora">{item.date}</p>
            <h2 className="mt-2 text-lg font-medium tracking-tight text-mist-50">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              {item.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-16 flex flex-wrap gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/sources/" className="btn-ghost">
          Sources
        </Link>
        <Link href="/faq/" className="btn-ghost">
          FAQ
        </Link>
      </div>
    </div>
  );
}
