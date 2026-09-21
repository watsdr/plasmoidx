import type { Metadata } from "next";
import Link from "next/link";
import { errataItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Errata & updates",
  description:
    "Dated corrections for Plasmoid X: MSAART Ark spelling, meter vs 90% lead, mobile header fix, and later notes.",
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Updates</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Errata &amp; updates
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Honest corrections as the education package settles. Also summarized
          on{" "}
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
