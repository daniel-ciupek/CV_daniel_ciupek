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
        className="font-mono text-xs sm:text-sm"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--accent)",
          flexWrap: "nowrap",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>{index} / {total}</span>
        <span aria-hidden>▸</span>
        <span
          style={{
            color: "var(--text)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span
          aria-hidden
          className="hidden sm:block"
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(90deg, rgba(0,212,255,0.4) 0%, transparent 100%)",
          }}
        />
      </div>
      <p
        className="font-mono text-xs sm:text-sm"
        style={{ color: "var(--text-subtle)", marginLeft: 0 }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}
