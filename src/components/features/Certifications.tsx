"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

const CERT_CATEGORY: Record<string, string> = {
  cert_js:        "Frontend",
  cert_php:       "Backend",
  cert_mysql:     "Bazy",
  cert_postgres:  "Bazy",
  cert_laravel:   "Backend",
  cert_docker:    "DevOps",
  cert_postman:   "DevOps",
  cert_english:   "Języki",
  cert_ai:        "AI",
  cert_claude:    "AI",
  cert_ai_coding: "AI",
};

type Certificate = (typeof data.certificates)[number];
const certs = data.certificates;

const CARD_W = 280;
const CARD_GAP = 20;
const CARD_STEP = CARD_W + CARD_GAP;

// ─── Card ─────────────────────────────────────────────────────────────────────

function CertCard({
  cert,
  index,
  total,
  trackX,
  cardIndex,
  containerWidth,
  onOpen,
}: {
  cert: Certificate;
  index: number;
  total: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
  cardIndex: number;
  containerWidth: number;
  onOpen: () => void;
}) {
  const centerX = (containerWidth - CARD_W) / 2 - cardIndex * CARD_STEP;

  const scale = useTransform(
    trackX,
    [centerX - CARD_STEP, centerX, centerX + CARD_STEP],
    [0.90, 1.0, 0.90]
  );
  const opacity = useTransform(
    trackX,
    [centerX - CARD_STEP * 1.5, centerX, centerX + CARD_STEP * 1.5],
    [0.55, 1.0, 0.55]
  );

  const category = CERT_CATEGORY[cert.key] ?? "Inne";
  const idx = String(index).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  return (
    <motion.div
      style={{ scale, opacity, width: CARD_W, flexShrink: 0 }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      aria-label={`Podgląd certyfikatu: ${cert.title}`}
    >
      {/* Card shell */}
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.40)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "inset 0 1px 0 rgba(255,255,255,0.04)";
        }}
      >
        {/* Thumbnail — no blur, just slight dim */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={cert.file}
            alt={cert.title}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ filter: "brightness(0.82)" }}
          />
          {/* Soft gradient at bottom to blend into card body */}
          <div
            className="absolute inset-x-0 bottom-0 h-12"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--bg-surface))",
            }}
          />

          {/* Category badge — overlaid */}
          <div className="absolute left-3 top-3">
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider"
              style={{
                background: "rgba(5,5,5,0.70)",
                border: "1px solid rgba(0,212,255,0.35)",
                color: "var(--accent)",
                backdropFilter: "blur(6px)",
              }}
            >
              {category}
            </span>
          </div>

          {/* Index counter */}
          <div
            className="absolute right-3 top-3 font-mono text-[10px]"
            style={{
              color: "rgba(255,255,255,0.5)",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {idx} / {tot}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <p
            className="mb-3 text-[13px] font-semibold leading-snug"
            style={{
              color: "var(--text)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {cert.title}
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
              {cert.platform} · {cert.date} · {cert.hours}h
            </p>
            <div
              className="flex flex-shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ color: "var(--accent)" }}
            >
              <Maximize2 size={11} />
              <span className="font-mono text-[10px]">podgląd</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const cert = certs[activeIndex];
  const total = certs.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const lenis = (window as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [onClose, onPrev, onNext]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[100] cursor-pointer"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal
        aria-label={cert.title}
      >
        {/* Prev */}
        <button
          className="pointer-events-auto absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl transition-all duration-200 md:left-6"
          style={{ background: "rgba(23,23,23,0.9)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.45)";
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Poprzedni certyfikat"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Modal */}
        <div
          className="pointer-events-auto relative w-full max-w-3xl overflow-hidden rounded-2xl"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid rgba(0,212,255,0.25)",
            boxShadow: "0 0 80px rgba(0,212,255,0.12)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
            style={{ background: "rgba(0,0,0,0.6)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.40)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
            onClick={onClose}
            aria-label="Zamknij podgląd"
          >
            <X size={15} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full"
              style={{ aspectRatio: "1.414 / 1" }}
            >
              <Image
                src={cert.file}
                alt={cert.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div>
              <div className="mb-1">
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                  style={{
                    background: "rgba(0,212,255,0.10)",
                    border: "1px solid rgba(0,212,255,0.22)",
                    color: "var(--accent)",
                  }}
                >
                  {CERT_CATEGORY[cert.key] ?? "Inne"}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{cert.title}</p>
              <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                {cert.platform} · {cert.date} · {cert.hours}h
              </p>
            </div>
            <span className="flex-shrink-0 font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Next */}
        <button
          className="pointer-events-auto absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl transition-all duration-200 md:right-6"
          style={{ background: "rgba(23,23,23,0.9)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.45)";
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Następny certyfikat"
        >
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = certs.length;

  const trackX = useMotionValue(0);

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Go to card (spring animation)
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      setActiveIndex(clamped);
      const targetX = (containerWidth - CARD_W) / 2 - clamped * CARD_STEP;
      animate(trackX, targetX, { type: "spring", stiffness: 320, damping: 32 });
    },
    [containerWidth, total, trackX]
  );

  // Init position once containerWidth is known
  useEffect(() => {
    if (containerWidth > 0) goTo(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  // Snap on drag end
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      const threshold = 40;
      if (info.offset.x < -threshold) goTo(activeIndex + 1);
      else if (info.offset.x > threshold) goTo(activeIndex - 1);
      else goTo(activeIndex);
    },
    [activeIndex, goTo]
  );

  const dragLeft = containerWidth > 0 ? (containerWidth - CARD_W) / 2 - (total - 1) * CARD_STEP : -9999;
  const dragRight = containerWidth > 0 ? (containerWidth - CARD_W) / 2 : 9999;

  // Lightbox handlers
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + total) % total : null)),
    [total]
  );
  const nextLightbox = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % total : null)),
    [total]
  );

  return (
    <>
      <section id="certifications" className="relative px-6 py-24 md:py-32">
        {/* Background accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-6xl">
          <SectionHeader index="02" total="05" title="CERTYFIKATY" subtitle="// achievements.log" />
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative mt-6 overflow-hidden"
          style={{ cursor: "grab" }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: dragLeft, right: dragRight }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            style={{ x: trackX, display: "flex", gap: CARD_GAP }}
            className="select-none"
            whileTap={{ cursor: "grabbing" }}
          >
            {certs.map((cert, i) => (
              <CertCard
                key={cert.key}
                cert={cert}
                index={i + 1}
                total={total}
                trackX={trackX}
                cardIndex={i}
                containerWidth={containerWidth}
                onOpen={() => openLightbox(i)}
              />
            ))}
          </motion.div>

          {/* Left/right fade masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16"
            style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
            style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }}
          />
        </div>

        {/* Navigation bar */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-30"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              if (activeIndex === 0) return;
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.40)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
            aria-label="Poprzedni certyfikat"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {certs.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex ? "var(--accent)" : "rgba(255,255,255,0.20)",
                }}
                aria-label={`Przejdź do certyfikatu ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === total - 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-30"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              if (activeIndex === total - 1) return;
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.40)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
            aria-label="Następny certyfikat"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Hint */}
        <div className="mt-3 text-center font-mono text-[11px]" style={{ color: "var(--text-subtle)" }}>
          {"// przeciągnij lub kliknij kartę aby otworzyć"}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            key="lightbox"
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
