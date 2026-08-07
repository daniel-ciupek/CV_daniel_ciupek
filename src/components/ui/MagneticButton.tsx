"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
  /** Siła przyciągania (0–1). Domyślnie 0.3 — jak w Hero/Contact. */
  strength?: number;
  /** Maksymalny offset w px. */
  clamp?: number;
}

/**
 * Magnetyczny przycisk-anchor — element delikatnie podąża za kursorem.
 * Ekstrakcja logiki z Hero/Contact do reużycia (Navbar CTA, itd.).
 * Wyłączony przy `prefers-reduced-motion`; na dotyku po prostu nie reaguje
 * (brak `mousemove`), więc jest bezpieczny mobilnie.
 */
export default function MagneticButton({
  href,
  children,
  className,
  style,
  target,
  rel,
  onClick,
  ariaLabel,
  strength = 0.3,
  clamp = 14,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const clampV = (v: number) => Math.max(-clamp, Math.min(clamp, v));

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: clampV(dx * strength), y: clampV(dy * strength) });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.5 }}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </motion.a>
  );
}
