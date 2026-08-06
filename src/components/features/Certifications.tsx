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

// Kolor kropki kategorii (dekoracja — cyan dozwolony jako kropka, nie tekst)
const CAT_COLOR: Record<string, string> = {
  Frontend: "#e879f9", Backend: "#a855f7", Bazy: "#818cf8", DevOps: "#22d3ee",
  AI: "#c084fc", "Języki": "#f0abfc", Cloud: "#60a5fa",
};

type Certificate = (typeof data.certificates)[number];
const certs = data.certificates;
const N = certs.length;
const TOTAL_HOURS = Math.round(certs.reduce((sum, c) => sum + c.hours, 0));
const STEP = 360 / N;              // kąt między kartami
const DRAG_SENS = 0.12;            // stopni obrotu na 1px przeciągnięcia (łagodne)
const AUTO_MS = 3600;              // ms między auto-przełączeniem karty (skokowo)

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
  // Karty ~jednakowej wielkości (jak w artefacie) — głębię robi perspektywa, nie skala
  const scale = useTransform(eff, (a) => Math.max(0.9, 1 - (Math.abs(a) / STEP) * 0.05));
  const opacity = useTransform(eff, (a) => (Math.abs(a) >= 128 ? 0 : 1));
  // Boki przygaszone, przód w pełni jasny
  const darken = useTransform(eff, (a) => Math.min(0.74, (Math.abs(a) / STEP) * 0.52));
  // Poświata aurory tylko na wprost
  const glow = useTransform(eff, (a) => Math.max(0, 1 - Math.abs(a) / (STEP * 0.6)));

  const category = catOf(cert);
  const catColor = CAT_COLOR[category] ?? "var(--accent)";

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
      aria-hidden
    >
      <motion.div className="relative h-full w-full" style={{ opacity, scale }}>
        {/* Ciemna karta holo — pieczęć + kod; pełny skan tylko w lightboxie */}
        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl"
          style={{
            border: "1px solid var(--border)",
            background:
              "linear-gradient(180deg, rgba(196,181,253,0.05), rgba(196,181,253,0.015)), var(--glass-solid)",
          }}
        >
          {/* Twarz — miniatura realnego certyfikatu + chip kodu */}
          <div className="relative flex-1 overflow-hidden">
            <Image
              src={cert.thumb}
              alt=""
              fill
              draggable={false}
              sizes="300px"
              className="select-none object-cover"
              style={{ objectPosition: "center 28%", userSelect: "none", WebkitUserSelect: "none" }}
            />
            {/* Holo-wash + dolny scrim pod krawędź podpisu */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 28% 6%, rgba(168,85,247,0.18), transparent 58%), linear-gradient(180deg, transparent 80%, rgba(8,7,13,0.3) 100%)",
              }}
            />
            {/* Kategoria (jak w Umiejętnościach) — chip w prawym DOLNYM rogu (białe tło skanu) */}
            <span
              className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider"
              style={{
                background: "rgba(8,7,13,0.66)",
                border: "1px solid rgba(168,85,247,0.40)",
                color: "var(--accent-bright)",
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: catColor, boxShadow: `0 0 6px ${catColor}` }}
              />
              {category}
            </span>
          </div>

          {/* Podpis — tytuł + godziny + rok */}
          <div className="px-3.5 py-3" style={{ borderTop: "1px solid var(--border)" }}>
            <p
              className="text-[12.5px] font-semibold leading-snug"
              style={{
                color: "var(--text)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.5em",
              }}
            >
              {cert.title}
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="cert-foil-text font-display text-lg font-semibold tabular-nums">
                {cert.hours}h
              </span>
              <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                {cert.date ?? ""}
              </span>
            </div>
          </div>

          {/* Cień kart bocznych */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "#050409", opacity: darken }}
          />

          {/* Smuga-skan (folia) na aktywnej karcie */}
          {isActive && (
            <motion.div
              key={`sweep-${i}`}
              aria-hidden
              className="pointer-events-none absolute inset-x-0"
              style={{
                height: "55%",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(196,181,253,0.18) 42%, rgba(129,140,248,0.14) 58%, transparent 100%)",
              }}
              initial={{ y: "-60%", opacity: 0 }}
              animate={{ y: "170%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Poświata + foliowy obrys — tylko na frontowej karcie (sterowane `glow`) */}
        <motion.div aria-hidden className="cert-glow" style={{ opacity: glow }} />
        <motion.div aria-hidden className="cert-rim" style={{ opacity: glow }} />
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
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ color: "var(--text-muted)" }}
        >
          Wszystkie certyfikaty
        </span>
        <span className="font-mono text-[11px] tabular-nums" style={{ color: "var(--text-muted)" }}>
          {N} pozycji · ≈{TOTAL_HOURS} h nauki
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {certs.map((cert, i) => {
          const isActive = i === activeIndex;
          const category = catOf(cert);
          const catColor = CAT_COLOR[category] ?? "var(--accent)";
          return (
            <button
              key={cert.key}
              onClick={() => onOpen(i)}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl py-2.5 pl-4 pr-3 text-left transition-colors duration-200"
              style={{
                background: isActive ? "rgba(168,85,247,0.09)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? "rgba(168,85,247,0.38)" : "var(--border)"}`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--border)";
              }}
              onFocus={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onBlur={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Pasek kategorii przy krawędzi (dekoracja — hue tylko tutaj i w kropce) */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{ background: `linear-gradient(180deg, ${catColor}, ${catColor}55)` }}
              />
              <span
                aria-hidden
                className="w-6 shrink-0 font-mono text-[11px] tabular-nums"
                style={{ color: isActive ? "var(--accent-bright)" : "var(--text-muted)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block truncate text-[13px] leading-snug"
                  style={{
                    color: isActive ? "var(--text)" : "var(--text-muted)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {cert.title}
                </span>
                <span
                  className="mt-1 flex items-center gap-1.5 font-mono text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: catColor, boxShadow: `0 0 6px ${catColor}` }}
                  />
                  {category}
                  <span aria-hidden style={{ opacity: 0.5 }}>·</span>
                  {cert.hours} h
                  <span aria-hidden style={{ opacity: 0.5 }}>·</span>
                  {cert.date}
                </span>
              </span>
              <Maximize2
                aria-hidden
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
  const hoverRef = useRef(false);
  const draggedRef = useRef(false);
  const capturedRef = useRef(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);

  // Wymiary sceny — szersze karty (miniatura + podpis; opisy się nie ucinają)
  const cardW = Math.min(320, Math.max(210, Math.round(containerWidth * 0.32)));
  const cardH = Math.round(cardW * 1.12);
  const radius = Math.round((cardW / 2) / Math.tan(Math.PI / N)) + Math.round(cardW * 0.16);
  const perspective = Math.round(radius * 2.0);
  const stageH = Math.round(cardH * 1.55);

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

  // Auto-przełączanie karta-po-karcie (pauza: hover / drag / lightbox / reduced-motion)
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      if (!hoverRef.current && !draggingRef.current) step(1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [reduced, paused, step]);

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
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
        className="relative mx-auto cursor-grab select-none active:cursor-grabbing"
        style={{ height: stageH, perspective, perspectiveOrigin: "50% 45%", touchAction: "pan-y" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", rotateY: rotation, z: -radius, willChange: "transform" }}
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
            background: "radial-gradient(ellipse at center, rgba(168,85,247,0.12), transparent 70%)",
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

        <div className="flex max-w-[300px] flex-wrap items-center justify-center gap-0.5">
          {certs.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className="grid h-6 w-6 place-items-center rounded-full"
              aria-label={`Przejdź do certyfikatu ${i + 1}`}
            >
              {/* Wizualna kropka mała, ale hit-area 24×24 (WCAG 2.5.8) */}
              <span
                aria-hidden
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex ? "var(--accent)" : "rgba(255,255,255,0.18)",
                }}
              />
            </button>
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

      <p className="mt-4 text-center font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
        Przełącza się sam · przeciągnij lub strzałki · kliknij, by powiększyć · {String(activeIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
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
            <Image src={cert.thumb} alt={cert.title} fill sizes="(max-width:640px) 45vw, 260px" className="object-cover" />
            <span
              className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
              style={{ background: "rgba(8,7,13,0.6)", border: "1px solid rgba(168,85,247,0.35)", color: "var(--accent-bright)" }}
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

// ─── Lightbox (Holo violet) ─────────────────────────────────────────────────────

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
  const dialogRef = useRef<HTMLDivElement>(null);

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

  // Focus-trap + przywrócenie focusu po zamknięciu (WCAG 2.4.3 / 2.1.2)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const buttons = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
    const els = buttons();
    (els.find((b) => b.getAttribute("aria-label") === "Zamknij podgląd") ?? els[0])?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = buttons();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onTab);
    return () => {
      document.removeEventListener("keydown", onTab);
      prev?.focus?.();
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[100] cursor-pointer"
        style={{ background: "rgba(6,5,11,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={dialogRef}
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
            border: "1px solid rgba(168,85,247,0.35)",
            boxShadow: "0 0 90px rgba(168,85,247,0.18)",
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
                  style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.26)", color: "var(--accent-bright)" }}
                >
                  {catOf(cert)}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{cert.title}</p>
              <p className="mt-0.5 font-mono text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
                {cert.platform} · {cert.hours}h
              </p>
            </div>
            <span className="flex-shrink-0 font-mono text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
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
      <section id="certifications" aria-labelledby="certifications-heading" className="relative overflow-hidden px-6 py-16 md:py-20">
        {/* Ambient aurora — violet + szept fuchsia */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-[42rem] -translate-x-1/2 opacity-[0.08] blur-3xl"
          style={{
            background:
              "radial-gradient(60% 100% at 40% 50%, #a855f7 0%, transparent 70%), radial-gradient(55% 100% at 65% 50%, #e879f9 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-6xl">
          <SectionHeader index="02" total="05" title="CERTYFIKATY" subtitle="Kursy ukończone na Udemy" headingId="certifications-heading" />

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
