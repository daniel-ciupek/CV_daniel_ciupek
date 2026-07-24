"use client";

import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
  cert_python:    "Backend",
  cert_aws:       "Cloud",
  cert_gitlab:    "DevOps",
};

type Certificate = (typeof data.certificates)[number];
const certs = data.certificates;
const N = certs.length;
const STEP = 360 / N;              // kąt między kartami
const DRAG_SENS = 0.12;            // stopni obrotu na 1px przeciągnięcia (łagodne)
const AUTO_SPEED = 4.5;            // stopni/sek auto-obrotu (powoli)

const catOf = (cert: Certificate) => CERT_CATEGORY[cert.key] ?? "Inne";

// Normalizuj kąt do (-180, 180]; 0 = karta na wprost
const wrapDeg = (a: number) => {
  a %= 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
};

// ─── Karta na pierścieniu 3D ────────────────────────────────────────────────────

function RingCard({
  cert,
  i,
  radius,
  cardW,
  cardH,
  rotation,
  isActive,
  onClick,
}: {
  cert: Certificate;
  i: number;
  radius: number;
  cardW: number;
  cardH: number;
  rotation: MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
}) {
  const theta = STEP * i;
  const eff = useTransform(rotation, (r) => wrapDeg(theta + r));

  // Przód znacznie większy niż boki
  const scale = useTransform(eff, (a) => Math.max(0.46, 1 - (Math.abs(a) / STEP) * 0.3));
  const opacity = useTransform(eff, (a) => (Math.abs(a) >= 112 ? 0 : 1));
  // Boki głęboko w cieniu, przód w pełni jasny
  const darken = useTransform(eff, (a) => Math.min(0.9, (Math.abs(a) / STEP) * 0.68));
  // Poświata aurory tylko na wprost
  const glow = useTransform(eff, (a) => Math.max(0, 1 - Math.abs(a) / (STEP * 0.6)));

  const category = catOf(cert);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
        transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      onClick={onClick}
      role="button"
      aria-label={`Certyfikat: ${cert.title}`}
    >
      <motion.div className="relative h-full w-full" style={{ opacity, scale }}>
        {/* Rama certyfikatu */}
        <div
          className="relative h-full w-full overflow-hidden rounded-2xl"
          style={{ border: "1px solid var(--border)", background: "var(--bg-elevated)" }}
        >
          <Image
            src={cert.file}
            alt={cert.title}
            fill
            draggable={false}
            sizes="320px"
            className="select-none object-cover"
            style={{ userSelect: "none", WebkitUserSelect: "none" }}
          />
          {/* Górny scrim — subtelna winieta na górze karty */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-14"
            style={{ background: "linear-gradient(to bottom, rgba(9,9,11,0.7), transparent)" }}
          />
          {/* Badge kategorii — prawy dolny róg (czyste białe tło certyfikatu) */}
          <span
            className="absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider"
            style={{
              background: "rgba(9,9,11,0.55)",
              border: "1px solid rgba(0,212,255,0.35)",
              color: "var(--accent)",
            }}
          >
            {category}
          </span>

          {/* Cień kart bocznych */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "#000", opacity: darken }}
          />

          {/* Smuga-skan na aktywnej karcie */}
          {isActive && (
            <motion.div
              key={`sweep-${i}`}
              aria-hidden
              className="pointer-events-none absolute inset-x-0"
              style={{
                height: "55%",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.16) 42%, rgba(52,211,153,0.12) 58%, transparent 100%)",
              }}
              initial={{ y: "-60%", opacity: 0 }}
              animate={{ y: "170%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Poświata aurory — rama przedniej karty */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            opacity: glow,
            border: "1px solid rgba(0,212,255,0.85)",
            boxShadow: "0 0 26px 1px rgba(0,212,255,0.32), 0 0 70px rgba(52,211,153,0.14)",
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── Lista wszystkich certyfikatów (pod karuzelą) ───────────────────────────────

function CertList({
  activeIndex,
  onOpen,
}: {
  activeIndex: number;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="mt-12">
      <div className="mb-3 flex items-center justify-between">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ color: "var(--text-subtle)" }}
        >
          Wszystkie certyfikaty
        </span>
        <span className="font-mono text-[11px] tabular-nums" style={{ color: "var(--text-subtle)" }}>
          {N} pozycji
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {certs.map((cert, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={cert.key}
              onClick={() => onOpen(i)}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200"
              style={{
                background: isActive ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? "rgba(0,212,255,0.30)" : "var(--border)"}`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <span
                className="w-6 shrink-0 font-mono text-[11px] tabular-nums"
                style={{ color: isActive ? "var(--accent)" : "var(--text-subtle)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.20)",
                  color: "var(--accent)",
                  minWidth: 60,
                  textAlign: "center",
                }}
              >
                {catOf(cert)}
              </span>
              <span
                className="flex-1 truncate text-[13px]"
                style={{
                  color: isActive ? "var(--text)" : "var(--text-muted)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {cert.title}
              </span>
              <span
                className="hidden shrink-0 font-mono text-[11px] tabular-nums sm:block"
                style={{ color: "var(--text-subtle)" }}
              >
                {cert.hours}h
              </span>
              <Maximize2
                size={13}
                className="shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: "var(--accent)" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Karuzela 3D ────────────────────────────────────────────────────────────────

function RingCarousel({ onOpen, paused }: { onOpen: (i: number) => void; paused: boolean }) {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const rotation = useMotionValue(0);
  const targetRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);
  const capturedRef = useRef(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);

  // Wymiary sceny
  const cardW = Math.min(300, Math.max(190, Math.round(containerWidth * 0.3)));
  const cardH = Math.round(cardW / 1.414);
  const radius = Math.round((cardW / 2) / Math.tan(Math.PI / N) * 1.18);
  const perspective = Math.round(radius * 2.5);
  const stageH = Math.round(cardH * 2.15);

  useLayoutEffect(() => {
    if (stageRef.current) setContainerWidth(stageRef.current.clientWidth);
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Pętla: auto-obrót / dojazd do celu / aktualizacja aktywnej karty
  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const dt = Math.min(delta, 50) / 1000;
    if (draggingRef.current) {
      // rotacja ustawiana przez pointer
    } else if (targetRef.current !== null) {
      const r = rotation.get();
      const diff = targetRef.current - r;
      if (Math.abs(diff) < 0.2) {
        rotation.set(targetRef.current);
        targetRef.current = null;
      } else {
        rotation.set(r + diff * Math.min(1, dt * 6));
      }
    } else if (!paused) {
      rotation.set(rotation.get() - AUTO_SPEED * dt);
    }
    const idx = ((Math.round(-rotation.get() / STEP) % N) + N) % N;
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActiveIndex(idx);
    }
  });

  // Dojazd do konkretnego indeksu najkrótszą drogą
  const goToIndex = useCallback((i: number) => {
    const r = rotation.get();
    const base = -i * STEP;
    targetRef.current = base + Math.round((r - base) / 360) * 360;
  }, [rotation]);

  const step = useCallback((dir: 1 | -1) => {
    const curV = Math.round(-rotation.get() / STEP);
    targetRef.current = -(curV + dir) * STEP;
  }, [rotation]);

  // Pointer drag (działa też dla touch).
  // Uwaga: przechwytujemy pointer DOPIERO po realnym ruchu (>4px), żeby
  // zwykły klik w kartę nie był zjadany przez pointer-capture i otwierał lightbox.
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    draggedRef.current = false;
    capturedRef.current = false;
    startXRef.current = e.clientX;
    startRotRef.current = rotation.get();
    targetRef.current = null;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) {
      draggedRef.current = true;
      if (!capturedRef.current) {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        capturedRef.current = true;
      }
    }
    if (draggedRef.current) rotation.set(startRotRef.current + dx * DRAG_SENS);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (capturedRef.current) {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      capturedRef.current = false;
    }
    // brak snapu — auto-obrót płynnie wraca
  };

  const handleCardClick = (i: number) => {
    if (draggedRef.current) return;
    onOpen(i); // klik w dowolny kafelek → pełny podgląd
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(activeIndex); }
  };

  return (
    <div className="mt-8">
      {/* Scena 3D */}
      <div
        ref={stageRef}
        role="group"
        aria-label="Karuzela certyfikatów — przeciągnij lub użyj strzałek"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mx-auto cursor-grab select-none outline-none active:cursor-grabbing"
        style={{ height: stageH, perspective, perspectiveOrigin: "50% 45%", touchAction: "pan-y" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", rotateY: rotation, willChange: "transform" }}
        >
          {containerWidth > 0 &&
            certs.map((cert, i) => (
              <RingCard
                key={cert.key}
                cert={cert}
                i={i}
                radius={radius}
                cardW={cardW}
                cardH={cardH}
                rotation={rotation}
                isActive={i === activeIndex}
                onClick={() => handleCardClick(i)}
              />
            ))}
        </motion.div>

        {/* Cień/podłoga */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-1 mx-auto h-10 w-2/3"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,212,255,0.10), transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Nawigacja */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => step(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
          aria-label="Poprzedni certyfikat"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex max-w-[220px] flex-wrap items-center justify-center gap-1.5">
          {certs.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                background: i === activeIndex ? "var(--accent)" : "rgba(255,255,255,0.18)",
              }}
              aria-label={`Przejdź do certyfikatu ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => step(1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
          aria-label="Następny certyfikat"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="mt-4 text-center font-mono text-[11px]" style={{ color: "var(--text-subtle)" }}>
        Kręci się sam · przeciągnij, by obrócić · kliknij, by powiększyć · {String(activeIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
      </p>

      {/* Pełna lista certyfikatów — pod karuzelą, czytelna */}
      <CertList activeIndex={activeIndex} onOpen={onOpen} />
    </div>
  );
}

// ─── Fallback bez animacji (prefers-reduced-motion) ─────────────────────────────

function CertGrid({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {certs.map((cert, i) => (
        <button
          key={cert.key}
          onClick={() => onOpen(i)}
          className="group overflow-hidden rounded-2xl text-left transition-colors duration-200"
          style={{ border: "1px solid var(--border)", background: "var(--bg-surface)" }}
        >
          <div className="relative aspect-[1.414/1] w-full overflow-hidden">
            <Image src={cert.file} alt={cert.title} fill sizes="(max-width:640px) 45vw, 260px" className="object-cover" />
            <span
              className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
              style={{ background: "rgba(9,9,11,0.6)", border: "1px solid rgba(0,212,255,0.3)", color: "var(--accent)" }}
            >
              {catOf(cert)}
            </span>
          </div>
          <div className="p-3">
            <p
              className="text-[13px] font-medium leading-snug"
              style={{ color: "var(--text)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {cert.title}
            </p>
            <p className="mt-1 font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
              {cert.platform} · {cert.hours}h
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Lightbox (jeden akcent — cyan) ─────────────────────────────────────────────

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
        style={{ background: "rgba(9,9,11,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
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
        <button
          className="pointer-events-auto absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl transition-all duration-200 md:left-6"
          style={{ background: "rgba(24,24,31,0.9)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Poprzedni certyfikat"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          className="pointer-events-auto relative w-full max-w-3xl overflow-hidden rounded-2xl"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid rgba(0,212,255,0.28)",
            boxShadow: "0 0 90px rgba(0,212,255,0.14)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
            style={{ background: "rgba(9,9,11,0.6)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.borderColor = "var(--border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border)";
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
            style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
          >
            <div>
              <div className="mb-1">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
                  style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.24)", color: "var(--accent)" }}
                >
                  {catOf(cert)}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{cert.title}</p>
              <p className="mt-0.5 font-mono text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
                {cert.platform} · {cert.hours}h
              </p>
            </div>
            <span className="flex-shrink-0 font-mono text-xs tabular-nums" style={{ color: "var(--text-subtle)" }}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <button
          className="pointer-events-auto absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl transition-all duration-200 md:right-6"
          style={{ background: "rgba(24,24,31,0.9)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
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
  const reduced = usePrefersReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = certs.length;

  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox  = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + total) % total : null)),
    [total]
  );
  const nextLightbox  = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % total : null)),
    [total]
  );

  return (
    <>
      <section id="certifications" className="relative overflow-hidden px-6 py-16 md:py-20">
        {/* Ambient aurora — cyan + szept emerald */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-[42rem] -translate-x-1/2 opacity-[0.06] blur-3xl"
          style={{
            background:
              "radial-gradient(60% 100% at 40% 50%, #00d4ff 0%, transparent 70%), radial-gradient(55% 100% at 65% 50%, #34d399 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-6xl">
          <SectionHeader index="02" total="05" title="CERTYFIKATY" subtitle="Kursy ukończone na Udemy" />

          {reduced ? <CertGrid onOpen={openLightbox} /> : <RingCarousel onOpen={openLightbox} paused={lightboxIndex !== null} />}
        </div>
      </section>

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
