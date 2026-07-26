"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import data from "@/config/data";
import { iconMap } from "./tech-stack/iconMap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Kaskada chipów — jedna płynna fala przez całą sekcję (globalny indeks → delay)
const CHIP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CategoryCard({
  group,
  delay,
  indexOffset,
  fullHeight = false,
}: {
  group: (typeof data.skills)[number];
  delay: number;
  /** Globalny offset chipów tej karty — spina kaskadę w jedną falę przez sekcję. */
  indexOffset: number;
  fullHeight?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Wspólny spring tilt kart (spójny z Projects) — #47
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-8, 8]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-1, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-1, 1], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative rounded-2xl p-6 ${fullHeight ? "h-full w-full" : ""}`}
    >
      {/* Szkło v2 — spójne z Projects/About (translucent glass + blur) */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border)",
          boxShadow: hovered ? "0 24px 60px -24px rgba(0,212,255,0.22)" : "none",
          transition: "box-shadow 0.4s",
        }}
      >
        {/* Aurora hover — jedyne miejsce emeraldu (bez „tęczy") */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.10) 0%, transparent 55%, rgba(52,211,153,0.08) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      {/* Animowany obrys aurory — jaśnieje na hover (emerald tylko w ruchu) */}
      <div
        aria-hidden
        className="tech-rim pointer-events-none absolute inset-0 rounded-2xl"
        style={{ opacity: hovered ? 0.95 : 0.4, transition: "opacity 0.35s" }}
      />

      {/* Spotlight podążający za kursorem (cyan) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(0,212,255,0.12) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Treść — uniesiona w Z */}
      <div style={{ transform: "translateZ(12px)", position: "relative" }}>
        <div className="mb-4 flex flex-col items-center gap-1.5">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            {group.category}
          </p>
          {/* Sygnaturowa kreska aurory */}
          <span
            aria-hidden
            className="h-px w-8 rounded-full"
            style={{ background: "linear-gradient(90deg, #00d4ff, #34d399)", opacity: 0.6 }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {group.items.map((skill, i) => {
            const Icon = iconMap[skill];
            return (
              <motion.div
                key={skill}
                custom={indexOffset + i}
                variants={reduced ? undefined : CHIP_VARIANTS}
                initial={reduced ? false : "hidden"}
                whileInView={reduced ? undefined : "show"}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={reduced ? {} : { scale: 1.06, y: -2 }}
                className="flex cursor-default items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,212,255,0.40)";
                  el.style.color = "var(--text)";
                  el.style.boxShadow = "0 0 12px rgba(0,212,255,0.10)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-muted)";
                  el.style.boxShadow = "none";
                }}
              >
                {Icon && (
                  <Icon size={15} style={{ color: "var(--accent)", flexShrink: 0 }} />
                )}
                {skill}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStackGrid() {
  const firstRow = data.skills.slice(0, 3);
  const secondRow = data.skills.slice(3);

  // Skumulowany offset chipów — kaskada płynie jako jedna fala przez wszystkie karty
  let acc = 0;
  const offsets = data.skills.map((s) => {
    const start = acc;
    acc += s.items.length;
    return start;
  });

  return (
    <div className="space-y-4" style={{ perspective: "1200px" }}>
      {/* Pierwsze 3 karty — pełny grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {firstRow.map((group, i) => (
          <CategoryCard
            key={group.category}
            group={group}
            delay={i * 0.08}
            indexOffset={offsets[i]}
          />
        ))}
      </div>

      {/* Pozostałe karty — wyśrodkowane */}
      {secondRow.length > 0 && (
        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {secondRow.map((group, i) => (
            <div
              key={group.category}
              className="flex w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <CategoryCard
                group={group}
                delay={(firstRow.length + i) * 0.08}
                indexOffset={offsets[firstRow.length + i]}
                fullHeight
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
