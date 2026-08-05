"use client";

import { MotionConfig } from "framer-motion";

/**
 * Globalny guard dostępności ruchu. `reducedMotion="user"` sprawia, że KAŻDY
 * komponent Framer Motion honoruje `prefers-reduced-motion` (Framer sam z siebie
 * tego nie robi) — domyka m.in. SectionHeader i wszelkie przyszłe animacje,
 * niezależnie od lokalnych gałęzi na `usePrefersReducedMotion`.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
