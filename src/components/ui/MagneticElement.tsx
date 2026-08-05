"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Element opakowujący (domyślnie span-owy inline-flex). */
  as?: "div" | "span";
  /** Siła przyciągania (0–1). Domyślnie 0.3 — jak w Hero/Contact/Navbar. */
  strength?: number;
  /** Maksymalny offset w px. */
  clamp?: number;
}

/**
 * Ogólny magnetyczny wrapper — dziecko (link / przycisk / cokolwiek) delikatnie
 * podąża za kursorem. Ekstrakcja logiki z Contact `MagneticIcon` / Hero do reużycia.
 * Wyłączony przy `prefers-reduced-motion`; na dotyku nie reaguje (brak `mousemove`).
 */
export default function MagneticElement({
  children,
  className,
  style,
  as = "span",
  strength = 0.3,
  clamp = 14,
}: MagneticElementProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const clampV = (v: number) => Math.max(-clamp, Math.min(clamp, v));

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: clampV(dx * strength), y: clampV(dy * strength) });
  };

  const MotionTag = as === "div" ? motion.div : motion.span;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.5 }}
      className={className}
      style={{ display: "inline-flex", willChange: "transform", ...style }}
    >
      {children}
    </MotionTag>
  );
}
