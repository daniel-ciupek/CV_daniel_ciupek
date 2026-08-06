"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Tło Hero „Holo Chrome": mesh-blobs → conic folia → pryzmatyczny beam → grain.
 * Folia dryfuje (rAF) i reaguje hue-shiftem na pozycję kursora (jeden MotionValue
 * przez CSS custom property — zero re-renderów). Przy `prefers-reduced-motion`
 * cały ruch wyłączony (folia zamrożona na statycznym kadrze, beam ukryty w CSS).
 */
export default function HeroBackdrop() {
  const reduced = usePrefersReducedMotion();
  const foilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const foil = foilRef.current;
    if (!foil) return;

    let raf = 0;
    let last = performance.now();
    let drift = 0; // ambientowy obrót folii
    let mx = 0; // wygładzona pozycja kursora
    let tmx = 0; // docelowa pozycja kursora (−0.5…0.5)

    const onMove = (e: PointerEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
    };
    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      drift = (drift + 0.05 * (dt / 16.67)) % 360;
      mx += (tmx - mx) * 0.06;
      foil.style.setProperty("--foil-rot", `${(drift + mx * 16).toFixed(2)}deg`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-blob hero-blob--1" />
      <div className="hero-blob hero-blob--2" />
      <div className="hero-blob hero-blob--3" />
      <div ref={foilRef} className="hero-foil" />
      <div className="hero-beam" />
      <div className="hero-grain" />
    </div>
  );
}
