"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import data from "@/config/data";
import { iconMap } from "./tech-stack/iconMap";

function CategoryCard({
  group,
  delay,
  fullHeight = false,
}: {
  group: (typeof data.skills)[number];
  delay: number;
  fullHeight?: boolean;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative rounded-2xl p-6 transition-shadow duration-300 ${fullHeight ? "w-full h-full" : ""}`}
    >
      {/* Glassmorphism background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      />

      {/* Spotlight glow follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(0,212,255,0.10) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Content — lifted in Z */}
      <div style={{ transform: "translateZ(12px)", position: "relative" }}>
        <p
          className="mb-4 text-center text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          {group.category}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {group.items.map((skill) => {
            const Icon = iconMap[skill];
            return (
              <motion.div
                key={skill}
                whileHover={reduced ? {} : { scale: 1.06, y: -2 }}
                transition={{ duration: 0.15 }}
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

  return (
    <div className="space-y-4" style={{ perspective: "1200px" }}>
      {/* Pierwsze 3 karty — pełny grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {firstRow.map((group, i) => (
          <CategoryCard key={group.category} group={group} delay={i * 0.08} />
        ))}
      </div>

      {/* Pozostałe karty — wyśrodkowane */}
      {secondRow.length > 0 && (
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          {secondRow.map((group, i) => (
            <div key={group.category} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] flex">
              <CategoryCard group={group} delay={(firstRow.length + i) * 0.08} fullHeight />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
