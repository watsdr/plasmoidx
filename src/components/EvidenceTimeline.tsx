import Link from "next/link";
import { SRC, timeline } from "@/lib/evidence";

/** Static, expandable evidence timeline — no client JavaScript (native <details>). */
export default function EvidenceTimeline() {
  return (
    <section
      aria-labelledby="evidence-timeline-h"
      className="my-6 min-w-0 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
    >
      <p id="evidence-timeline-h" className="text-sm font-medium tracking-tight text-mist-50">
        Evidence timeline
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-mist-400">
        Tests and sources this site cites, oldest first. Open an item for the
        details and the source.
      </p>
      <ol className="mt-4 space-y-1 border-l border-ink-600/50 pl-4">
        {timeline.map((t) => (
          <li key={t.iso + t.title} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[1.3rem] top-[1.05rem] h-2 w-2 rounded-full ${
                t.label === "Measured" ? "bg-aurora" : "border border-mist-400 bg-transparent"
              }`}
            />
            <details>
              <summary className="flex min-h-11 cursor-pointer flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora">
                <time dateTime={t.iso} className="font-mono text-xs text-mist-400">
                  {t.date}
                </time>
                <span className="text-sm font-medium tracking-tight text-mist-50">{t.title}</span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    t.label === "Measured" ? "text-aurora" : "text-mist-400"
                  }`}
                >
                  {t.label}
                </span>
              </summary>
              <div className="pb-3">
                <p className="max-w-2xl text-sm leading-relaxed text-mist-200">{t.body}</p>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href={SRC[t.source].href} target="_blank" rel="noopener noreferrer" className="link-aurora">
                    {SRC[t.source].label}
                  </a>
                  {t.more ? (
                    <Link href={t.more.href} className="link-aurora">
                      {t.more.label}
                    </Link>
                  ) : null}
                </p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
