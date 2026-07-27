"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Miękka poświata podążająca za kursorem — subtelny akcent tła (desktop only).
 * Pozycję trzymamy w MotionValue i aktualizujemy bezpośrednio w handlerze
 * `mousemove` (bez setState), więc efekt nie powoduje re-renderów Reacta.
 * Wyłączony na urządzeniach dotykowych oraz przy `prefers-reduced-motion`.
 */
export default function CursorSpotlight() {
  const reduced = usePrefersReducedMotion();
  // Strona /cv-print (ATS/druk) musi być wolna od efektów — patrz CLAUDE.md §7.
  // trailingSlash:true → ścieżka to "/cv-print/", normalizujemy końcowy slash.
  const pathname = usePathname();
  const isPrint = pathname.replace(/\/$/, "").startsWith("/cv-print");

  // Start poza ekranem — poświata jest niewidoczna do pierwszego ruchu myszy.
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const spring = { stiffness: 140, damping: 22, mass: 0.4 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  const background = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, var(--accent-glow) 0%, transparent 70%)`;

  const firstMove = useRef(true);

  useEffect(() => {
    if (reduced || isPrint) return;
    // Pomijamy urządzenia bez hovera (dotyk) — brak listenera = brak pracy.
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (firstMove.current) {
        // Pierwszy ruch: pojaw się dokładnie pod kursorem, bez przelotu z rogu.
        x.jump(e.clientX);
        y.jump(e.clientY);
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        firstMove.current = false;
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, isPrint, x, y, smoothX, smoothY]);

  // prefers-reduced-motion lub strona /cv-print → efekt całkowicie wyłączony.
  if (reduced || isPrint) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-spotlight pointer-events-none fixed inset-0 -z-10"
      style={{ background }}
    />
  );
}
