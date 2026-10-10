"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "plasmoidx";

type GoatCounter = { count?: (o: { path: string }) => void; no_onload?: boolean };
declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/** One path form for every view: "/study/" and "/study" both count as "/study". */
function normalize(p: string): string {
  return p.length > 1 ? p.replace(/\/+$/, "") : "/";
}

function isProd(): boolean {
  return location.hostname === "plasmoidx.com" || location.hostname === "www.plasmoidx.com";
}

/**
 * GoatCounter — cookieless, anonymous page counts.
 * count.js is injected after load + idle (never competes with first paint) with
 * no_onload, and we count every route ourselves — including Next.js client-side
 * navigations, which count.js alone never sees. Each path is counted once per
 * view (dedupes React re-renders / Strict Mode double effects).
 */
export default function Analytics() {
  const pathname = usePathname();
  const lastCounted = useRef<string | null>(null);
  const pending = useRef<string | null>(null);

  const send = (path: string) => {
    if (lastCounted.current === path) return;
    const gc = window.goatcounter;
    if (gc && typeof gc.count === "function") {
      lastCounted.current = path;
      pending.current = null;
      gc.count({ path });
    } else {
      // Script not loaded yet: remember the latest path; flushed on script load.
      pending.current = path;
    }
  };

  // Load count.js once, deferred.
  useEffect(() => {
    if (!CODE || !isProd()) return;
    let idleId: number | undefined;
    let t: ReturnType<typeof setTimeout> | undefined;
    const inject = () => {
      if (document.querySelector("script[data-goatcounter]")) return;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
      s.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
      s.addEventListener("load", () => {
        if (pending.current) send(pending.current);
      });
      document.body.appendChild(s);
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(inject, { timeout: 5000 });
      } else {
        t = setTimeout(inject, 2500);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      if (t) clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Count first load and every client-side route change.
  useEffect(() => {
    if (!CODE || !isProd() || !pathname) return;
    send(normalize(pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
