"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  total: string;
  title: string;
  /** Czysty opis sekcji (bez terminalowych `//`). Opcjonalny. */
  subtitle?: string;
}

export default function SectionHeader({
  index,
  total,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 flex flex-col gap-3 md:mb-16"
    >
      {/* Eyebrow — numer sekcji + linia */}
      <div className="flex items-center gap-3">
        <span
          className="text-xs font-semibold tabular-nums tracking-[0.25em]"
          style={{ color: "var(--accent)" }}
        >
          {index} / {total}
        </span>
        <span
          aria-hidden
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, var(--border-hover) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Tytuł */}
      <h2
        className="text-2xl font-bold tracking-tight md:text-3xl"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>

      {/* Podtytuł — opcjonalny, czysty */}
      {subtitle && (
        <p className="text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
