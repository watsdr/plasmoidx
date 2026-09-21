import type { Metadata } from "next";
import Link from "next/link";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Beginner questions about Plasmoid X: MSAART, Embry-Riddle meter vs 90% claims, Strike credit, kit installs, offline study, and where to start.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">FAQ</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Beginner questions
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Short answers. For method and credits see{" "}
          <Link href="/sources/" className="link-aurora">
            Sources
          </Link>
          .
        </p>
      </header>

      <dl className="mt-12 max-w-2xl space-y-8">
        {faqItems.map((item) => (
          <div key={item.id} id={item.id}>
            <dt className="text-base font-medium tracking-tight text-mist-50">
              {item.q}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-mist-300">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/study/#curriculum" className="btn-primary">
          Lessons 1–6
        </Link>
        <Link href="/sources/" className="btn-ghost">
          Sources
        </Link>
        <Link href="/updates/" className="btn-ghost">
          Errata
        </Link>
      </div>
    </div>
  );
}
