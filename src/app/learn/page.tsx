import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn → Study",
  description:
    "This path moved to Study. Number locks, vortex laws, plasmoids, and the learning path live at /study/.",
  robots: { index: false, follow: true },
};

/** Thin alias for the old /learn path — static export cannot HTTP-redirect. */
export default function LearnAliasPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="section-label">Moved</p>
      <h1 className="fluid-display mt-3 max-w-xl font-semibold text-mist-50">
        Learn is now Study
      </h1>
      <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
        The learning path lives under{" "}
        <Link href="/study/" className="link-aurora">
          Study
        </Link>
        . Hardware beats and ratios are on{" "}
        <Link href="/device/" className="link-aurora">
          Device
        </Link>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/study/" className="btn-primary">
          Go to Study
        </Link>
        <Link href="/device/" className="btn-ghost">
          Device
        </Link>
      </div>
    </div>
  );
}
