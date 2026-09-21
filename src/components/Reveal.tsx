"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  id?: string;
  "aria-labelledby"?: string;
};

/**
 * Lightweight in-view fade/rise. Progressive: content stays visible without JS.
 * Animation only arms when html.js-motion is present.
 * Honors prefers-reduced-motion (no hide/animate).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  id,
  "aria-labelledby": labelledBy,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(true); // SSR / first paint visible

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShown(true);
      return;
    }

    document.documentElement.classList.add("js-motion");

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
    if (inView) {
      setShown(true);
      return;
    }

    setShown(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      aria-labelledby={labelledBy}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
