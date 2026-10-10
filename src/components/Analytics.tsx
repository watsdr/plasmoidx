"use client";

import { useEffect } from "react";

const CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "plasmoidx";

/**
 * GoatCounter — cookieless, anonymous page counts.
 * Injected after load + idle so it never competes with first paint / TBT.
 */
export default function Analytics() {
  useEffect(() => {
    if (!CODE || location.hostname !== "plasmoidx.com" && location.hostname !== "www.plasmoidx.com") return;
    let idleId: number | undefined;
    let t: ReturnType<typeof setTimeout> | undefined;
    const inject = () => {
      if (document.querySelector("script[data-goatcounter]")) return;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
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
  }, []);
  return null;
}
