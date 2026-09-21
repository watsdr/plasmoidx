/** Quiet single hairline — prefer whitespace over decorative dividers. */
export default function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 ${className}`}
      aria-hidden
    >
      <div className="h-px w-full bg-ink-600/40" />
    </div>
  );
}
