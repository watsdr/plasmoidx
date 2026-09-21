"use client";

import { useEffect, useState } from "react";
import { readProgress, subscribeProgress } from "@/lib/progress";

/** Read a localStorage progress flag after mount (avoids hydration mismatch). */
export function useProgress(key: string): boolean {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(readProgress(key));
    return subscribeProgress(key, setDone);
  }, [key]);

  return done;
}
