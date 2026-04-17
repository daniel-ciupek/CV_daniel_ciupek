"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface Options {
  finalText: string;
  startDelay?: number;
  duration?: number;
  frameInterval?: number;
  charset?: string;
  enabled?: boolean;
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function useScrambleText({
  finalText,
  startDelay = 0,
  duration = 1400,
  frameInterval = 50,
  charset = DEFAULT_CHARSET,
  enabled = true,
}: Options): string {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(finalText);
  const frameRef = useRef<number | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduced || !enabled) {
      setDisplay(finalText);
      return;
    }

    const chars = finalText.split("");
    const nonSpaceIndexes = chars
      .map((c, i) => (c === " " ? -1 : i))
      .filter((i) => i >= 0);

    const revealPoints = new Map<number, number>();
    nonSpaceIndexes.forEach((idx, order) => {
      const progress = order / Math.max(1, nonSpaceIndexes.length - 1);
      revealPoints.set(idx, duration * (0.2 + 0.8 * progress));
    });

    let startTime: number | null = null;

    const tick = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;

      const next = chars
        .map((target, i) => {
          if (target === " ") return " ";
          const revealAt = revealPoints.get(i) ?? duration;
          if (elapsed >= revealAt) return target;
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join("");

      setDisplay(next);

      if (elapsed < duration) {
        const t = setTimeout(() => {
          frameRef.current = requestAnimationFrame(tick);
        }, frameInterval);
        timeoutsRef.current.push(t);
      } else {
        setDisplay(finalText);
      }
    };

    const startT = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, startDelay);
    timeoutsRef.current.push(startT);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [finalText, startDelay, duration, frameInterval, charset, enabled, reduced]);

  return display;
}
