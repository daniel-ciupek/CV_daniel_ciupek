"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  total: string;
  title: string;
  subtitle: string;
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
      className="mb-12 md:mb-16 flex flex-col gap-2"
    >
      <div
        className="flex items-center gap-3 font-mono text-xs sm:text-sm"
        style={{ color: "var(--accent)" }}
      >
        <span>
          {index} / {total}
        </span>
        <span aria-hidden>▸</span>
        <span
          className="tracking-[0.2em] uppercase font-semibold"
          style={{ color: "var(--text)" }}
        >
          {title}
        </span>
        <span
          className="flex-1 h-px hidden sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,212,255,0.4) 0%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>
      <p
        className="font-mono text-xs sm:text-sm ml-0 sm:ml-16"
        style={{ color: "var(--text-subtle)" }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}
