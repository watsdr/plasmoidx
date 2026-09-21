import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact → Connect",
  description:
    "This path moved to Connect. Email, form stub, and independent outbound links live at /connect/.",
  robots: { index: false, follow: true },
};

/** Thin alias for the old /contact path — static export cannot HTTP-redirect. */
export default function ContactAliasPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="section-label">Moved</p>
      <h1 className="fluid-display mt-3 max-w-xl font-semibold text-mist-50">
        Contact is now Connect
      </h1>
      <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
        Reach out, education &amp; licensed-pilot notes, and outbound independent
        links are on{" "}
        <Link href="/connect/" className="link-aurora">
          Connect
        </Link>
        .
      </p>
      <div className="mt-8">
        <Link href="/connect/" className="btn-primary">
          Go to Connect
        </Link>
      </div>
    </div>
  );
}
