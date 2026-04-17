"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

/* ─── useCountUp ───────────────────────────────────────────── */
function useCountUp(target: number, opts?: { duration?: number; start?: boolean }) {
  const duration = opts?.duration ?? 1600;
  const start = opts?.start ?? true;
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      setValue(Math.round(target * easeOutExpo(t)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, start]);

  return value;
}

/* ─── Counter ──────────────────────────────────────────────── */
function Counter({
  target, suffix = "", label, sublabel, inView, delay = 0,
}: {
  target: number;
  suffix?: string;
  label: string;
  sublabel: string;
  inView: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  const counted = useCountUp(target, { start: !reduce && started, duration: 1600 });
  const display = reduce || !started ? target : counted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="mb-4 h-px w-8"
        style={{ background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)" }}
        aria-hidden
      />
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-4xl md:text-5xl font-semibold tabular-nums tracking-tight"
          style={{
            background: "linear-gradient(135deg, #F1F5F9 0%, #00D4FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {display}
        </span>
        {suffix && (
          <span
            className="font-mono text-xl md:text-2xl font-medium"
            style={{ color: "var(--accent)" }}
          >
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium tracking-wide" style={{ color: "var(--text)" }}>
        {label}
      </p>
      <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
        {sublabel}
      </p>
    </motion.div>
  );
}

/* ─── About ────────────────────────────────────────────────── */
export default function About() {
  const countersRef = useRef<HTMLDivElement>(null);
  const inView = useInView(countersRef, { once: true, margin: "-80px" });

  const certCount     = data.certificates.length;
  const totalHoursInt = Math.round(data.certificates.reduce((s, c) => s + c.hours, 0));
  const projectsCount = data.projects.length;
  const yearsLearning = 1;

  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader index="01" total="05" title="O MNIE" subtitle="// whoami" />

        {/* Pull-quote */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 md:mb-14 pl-6 md:pl-10 pr-6 md:pr-10"
        >
          {/* Otwierający cudzysłów — lewy */}
          <span
            aria-hidden
            className="absolute -top-4 md:-top-6 left-0 font-mono text-6xl md:text-7xl leading-none select-none"
            style={{ color: "var(--accent)", opacity: 0.4 }}
          >
            &ldquo;
          </span>
          {/* Lewa pionowa linia */}
          <span
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(180deg, var(--accent) 0%, transparent 100%)" }}
          />
          {/* Zamykający cudzysłów — prawy */}
          <span
            aria-hidden
            className="absolute -bottom-4 md:-bottom-6 right-0 font-mono text-6xl md:text-7xl leading-none select-none"
            style={{ color: "var(--accent)", opacity: 0.4 }}
          >
            &rdquo;
          </span>
          {/* Prawa pionowa linia */}
          <span
            aria-hidden
            className="absolute right-0 top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(180deg, transparent 0%, var(--accent) 100%)" }}
          />
          <blockquote
            className="text-xl md:text-2xl font-medium leading-snug tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Aspirujący do roli{" "}
            <span style={{ color: "var(--accent)" }}>
              Full Stack Developera
            </span>
            {" "}(Laravel, Vue 3, PHP, JS, React, Node.js).
          </blockquote>
          <figcaption
            className="mt-3 font-mono text-xs tracking-wider uppercase"
            style={{ color: "var(--text-subtle)" }}
          >
            — Daniel Ciupek
          </figcaption>
        </motion.figure>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {data.personal.bio}
          </p>
        </motion.div>

        {/* Divider */}
        <div
          className="mb-10 md:mb-12 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.25) 50%, transparent 100%)",
          }}
          aria-hidden
        />

        {/* Counters */}
        <div
          ref={countersRef}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
        >
          <Counter
            target={certCount}
            label="Certyfikaty"
            sublabel="// udemy"
            inView={inView}
            delay={0}
          />
          <Counter
            target={totalHoursInt}
            suffix="h"
            label="Godziny nauki"
            sublabel="// 2025–2026"
            inView={inView}
            delay={120}
          />
          <Counter
            target={projectsCount}
            label="Projekty"
            sublabel="// w portfolio"
            inView={inView}
            delay={240}
          />
          <Counter
            target={yearsLearning}
            suffix="+"
            label="Rok kodowania"
            sublabel="// fundamenty"
            inView={inView}
            delay={360}
          />
        </div>
      </div>
    </section>
  );
}
