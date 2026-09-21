"use client";

import { useEffect, useState } from "react";

export type LockRow = {
  formula: string;
  equals: string;
  meaning: string;
  plain?: string;
};

function LockCard({ row }: { row: LockRow }) {
  return (
    <li className="rounded-xl border border-ink-600/50 px-4 py-3.5">
      <p className="font-mono text-xs text-aurora-glow">{row.formula}</p>
      <p className="mt-1.5 font-medium tracking-tight text-mist-50">
        {row.equals}
      </p>
      <p className="mt-1 text-sm text-mist-300">{row.meaning}</p>
      {row.plain ? (
        <p className="mt-1 text-xs leading-relaxed text-mist-400">{row.plain}</p>
      ) : null}
    </li>
  );
}

/** Fetches lock rows on the client so Study HTML does not inline the table. */
export default function LocksTable() {
  const [rows, setRows] = useState<LockRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/data/locks.json");
        if (!res.ok) throw new Error("fetch");
        const data = (await res.json()) as LockRow[];
        if (!cancelled) setRows(data);
      } catch {
        try {
          const mod = await import("@/data/locks.json");
          if (!cancelled) setRows(mod.default as LockRow[]);
        } catch {
          if (!cancelled) setFailed(true);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <p className="mt-5 text-sm text-mist-400" role="status">
        The locks table could not load. Refresh while online, then it will stay
        available.
      </p>
    );
  }

  if (!rows) {
    return (
      <div
        className="mt-5 h-40 rounded-xl border border-ink-600/40 bg-ink-900/30"
        aria-busy="true"
        aria-label="Loading locks"
      />
    );
  }

  return (
    <>
      <ul className="mt-5 grid gap-3 md:hidden">
        {rows.map((row) => (
          <LockCard key={row.formula} row={row} />
        ))}
      </ul>

      <div className="mt-5 hidden max-w-full overflow-x-auto rounded-xl border border-ink-600/60 md:block">
        <table className="locks-table">
          <thead>
            <tr>
              <th className="px-4 py-3 font-semibold">Lock</th>
              <th className="px-4 py-3 font-semibold">Equals</th>
              <th className="px-4 py-3 font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-600/40">
            {rows.map((row) => (
              <tr key={row.formula}>
                <td className="px-4 py-3 font-mono text-xs text-aurora-glow sm:text-sm">
                  {row.formula}
                </td>
                <td className="px-4 py-3 font-medium tracking-tight text-mist-50">
                  {row.equals}
                </td>
                <td className="px-4 py-3 text-mist-300">
                  <span className="block">{row.meaning}</span>
                  {row.plain ? (
                    <span className="mt-1 block text-xs leading-relaxed text-mist-400">
                      {row.plain}
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
