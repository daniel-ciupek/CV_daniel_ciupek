"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Na dotyku (mobile/tablet) oraz przy prefers-reduced-motion NIE uruchamiamy
    // Lenisa — zostawiamy natywny scroll przeglądarki. `syncTouch` przechwytywał
    // scroll dotykowy i pchał go przez JS rAF, co na telefonie dawało „lepki",
    // zacinający się scroll (efekt zawieszania). Smooth-scroll zostaje na desktopie.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as { __lenis?: typeof lenis }).__lenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as { __lenis?: typeof lenis }).__lenis;
    };
  }, [mounted]);

  return <>{children}</>;
}
