import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="section-label">Page not found</p>
      <h1 className="fluid-display mt-3 max-w-xl font-semibold text-mist-50">
        We couldn’t find that page
      </h1>
      <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
        The link may be old, or the page may have moved. Start from Home or
        open a quick explainer.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/explainers/" className="btn-ghost">
          Read the explainers
        </Link>
      </div>
    </div>
  );
}
