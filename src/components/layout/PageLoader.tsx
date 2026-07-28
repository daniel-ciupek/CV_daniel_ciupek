"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import data from "@/config/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PageLoader() {
  const reduce = usePrefersReducedMotion();
  const pathname = usePathname();
  // trailingSlash: true w next.config → ścieżka może mieć końcowy "/"
  const isPrint = pathname.replace(/\/$/, "").startsWith("/cv-print");
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState<
    { left: number; top: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    if (reduce || isPrint) {
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce, isPrint]);

  // Cząsteczki generowane po stronie klienta (unikamy niezgodności hydratacji)
  useEffect(() => {
    if (reduce || isPrint) return;
    setParticles(
      Array.from({ length: 16 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 2,
        delay: Math.random() * 2.4,
      }))
    );
  }, [reduce, isPrint]);

  if (reduce || isPrint) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--bg-base)", zIndex: 200 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 1.4 }}
        >
          <div className="relative grid place-items-center">
            {/* Poświata za monogramem */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                width: "240%",
                height: "240%",
                background: "radial-gradient(circle, rgba(0,212,255,0.16), transparent 62%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            />

            {/* Cząsteczki światła */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{ inset: "-40% -60%" }}
            >
              {particles.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.size,
                    height: p.size,
                    background: "var(--accent)",
                    boxShadow: "0 0 6px rgba(0,212,255,0.8)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0], y: [0, -8, 0] }}
                  transition={{ duration: 2.6, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>

            <svg
              viewBox="0 0 160 80"
              className="relative h-16 sm:h-20"
              aria-hidden
            >
            {/* Letter D */}
            <motion.path
              d="M10 10 L10 70 L38 70 Q62 70 62 40 Q62 10 38 10 Z"
              stroke="var(--accent)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.8, ease: [0.65, 0.05, 0.36, 1] },
                opacity: { duration: 0.1 },
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(0,212,255,0.6))",
              }}
            />
            {/* Letter C */}
            <motion.path
              d="M150 22 Q132 10 112 10 Q82 10 82 40 Q82 70 112 70 Q132 70 150 58"
              stroke="var(--accent)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.65, 0.05, 0.36, 1],
                },
                opacity: { duration: 0.1, delay: 0.4 },
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(0,212,255,0.6))",
              }}
            />
            </svg>
          </div>

          <motion.p
            className="mt-4 text-[11px] font-medium uppercase tracking-[0.34em] sm:text-[12px]"
            style={{ color: "var(--text-muted)", paddingLeft: "0.34em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            {data.personal.name}
            <span className="animate-pulse" aria-hidden>|</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
