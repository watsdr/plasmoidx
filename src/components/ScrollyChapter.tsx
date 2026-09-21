"use client";

import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for calm progressive disclosure */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  id?: string;
  "aria-labelledby"?: string;
};

/**
 * Scrollytelling chapter — opacity + translateY via Reveal.
 * Apple-inspired restraint; respects prefers-reduced-motion.
 */
export default function ScrollyChapter({
  children,
  className = "",
  delay = 0,
  as = "div",
  id,
  "aria-labelledby": labelledBy,
}: Props) {
  return (
    <Reveal
      as={as}
      id={id}
      delay={delay}
      aria-labelledby={labelledBy}
      className={`scrolly-chapter ${className}`}
    >
      {children}
    </Reveal>
  );
}
