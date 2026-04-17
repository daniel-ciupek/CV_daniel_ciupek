"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Award, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.94, y: 8, transition: { duration: 0.2 } },
};

type Certificate = (typeof data.certificates)[number];

export default function Certifications() {
  const certs = data.certificates;
  const [selected, setSelected] = useState<Certificate | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <section id="certifications" className="relative px-6 py-24 md:py-32">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeader index="02" total="05" title="CERTYFIKATY" subtitle="// achievements.log" />

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certs.map((cert, i) => (
            <motion.button
              key={cert.key}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setSelected(cert)}
              className="group relative flex flex-col items-start rounded-2xl p-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,212,255,0.35)";
                el.style.boxShadow = "0 0 24px rgba(0,212,255,0.10), inset 0 1px 0 rgba(0,212,255,0.06)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
              >
                <Award size={18} style={{ color: "var(--accent)" }} />
              </div>

              {/* Title */}
              <p
                className="mb-3 flex-1 text-sm font-medium leading-snug"
                style={{ color: "var(--text)" }}
              >
                {cert.title}
              </p>

              {/* Meta */}
              <div className="flex w-full items-center justify-between">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {cert.date}
                </span>
                <div
                  className="flex items-center gap-1 font-mono text-xs"
                  style={{ color: "var(--text-subtle)" }}
                >
                  <Clock size={11} />
                  {cert.hours}h
                </div>
              </div>

              {/* Hover hint */}
              <div
                className="absolute bottom-3 right-4 flex items-center gap-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: "var(--accent)" }}
              >
                <ExternalLink size={11} />
                <span className="font-mono">podgląd</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 cursor-pointer"
              style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
              onClick={close}
              aria-hidden
            />

            {/* Modal */}
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal
              aria-label={selected.title}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl pointer-events-auto"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid rgba(0,212,255,0.20)",
                  boxShadow: "0 0 60px rgba(0,212,255,0.10)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={close}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.60)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.40)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                  aria-label="Zamknij"
                >
                  <X size={16} />
                </button>

                {/* Certificate image */}
                <div className="relative w-full" style={{ aspectRatio: "1.414 / 1" }}>
                  <Image
                    src={selected.file}
                    alt={selected.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between px-6 py-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {selected.title}
                    </p>
                    <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      {selected.platform} · {selected.date} · {selected.hours}h
                    </p>
                  </div>
                  <Award size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
