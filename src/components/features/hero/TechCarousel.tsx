"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { TechSkill } from "@/types";

const SPEED = 38; // px / s

interface Props {
  skills: TechSkill[];
  onSelect: (skill: TechSkill) => void;
}

/**
 * Pozioma karuzela autorskich ikon stacku. Natywny kontener przewijalny
 * (ukryty pasek) — auto-marquee steruje `scrollLeft` w rAF, więc:
 *  • pauzuje WYŁĄCZNIE na hover kursorem (pointer) — po zamknięciu modala
 *    focus wraca na ikonę, ale ruch trwa; zatrzymuje się dopiero na najechanie,
 *  • podczas pauzy można przewijać ręcznie/palcem (pozycja się synchronizuje),
 *  • przy reduced-motion zostaje statyczny, wciąż przewijalny pasek.
 * Drugi (zduplikowany) zestaw daje bezszwową pętlę i jest wyłączony z Tab/AT.
 */
export default function TechCarousel({ skills, onSelect }: Props) {
  const reduced = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);

  const doubled = [...skills, ...skills];

  useEffect(() => {
    if (reduced) return;
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      if (pausedRef.current) {
        posRef.current = el.scrollLeft; // synchronizacja po ręcznym przewinięciu
      } else {
        const half = el.scrollWidth / 2;
        posRef.current += (SPEED * dt) / 1000;
        if (half > 0 && posRef.current >= half) posRef.current -= half;
        el.scrollLeft = posRef.current;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    const el = scrollerRef.current;
    if (el) posRef.current = el.scrollLeft;
    pausedRef.current = false;
  };

  return (
    <div
      ref={scrollerRef}
      className="tech-carousel"
      onPointerEnter={pause}
      onPointerLeave={resume}
      aria-label="Mój stack technologiczny — kliknij ikonę, aby zobaczyć opis"
    >
      <div className="tech-track">
        {doubled.map((s, i) => {
          const isClone = i >= skills.length;
          return (
            <button
              key={i}
              type="button"
              className="tech-skill"
              aria-label={`${s.name} — otwórz opis`}
              aria-haspopup="dialog"
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : 0}
              onClick={() => onSelect(s)}
            >
              <Image
                className="ic"
                src={s.icon}
                alt=""
                width={48}
                height={48}
                draggable={false}
              />
              <span className="lb">{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
