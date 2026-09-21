import { claimRows } from "@/lib/claims";

type Props = {
  /** Extra top margin control when embedded */
  className?: string;
};

/** Calm bookmarkable inventor → meter → does not prove module. */
export default function ClaimsCompare({ className = "" }: Props) {
  return (
    <div className={className}>
      <p className="max-w-2xl text-sm leading-relaxed text-mist-300">
        Three columns per claim. Education tone: measured first, inventor
        labeled, limits stated.
      </p>
      <div className="mt-6 space-y-6">
        {claimRows.map((row) => (
          <article
            key={row.id}
            id={`claim-${row.id}`}
            className="rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
          >
            <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                  Inventor claim
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-200">
                  {row.inventor}
                </p>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                  What the meter showed
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-200">
                  {row.meter}
                </p>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                  What it does not prove
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-200">
                  {row.doesNotProve}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
