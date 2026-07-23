"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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

/* ─── Counter — glass bento tile ───────────────────────────── */
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
  const reduce = usePrefersReducedMotion();
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
      className="rounded-2xl border border-white/[0.08] p-5 transition-colors duration-300 hover:border-[rgba(0,212,255,0.30)] md:p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-baseline gap-1">
        <span
          className="text-4xl font-semibold tabular-nums tracking-tight md:text-5xl"
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
            className="text-xl font-medium md:text-2xl"
            style={{ color: "var(--accent)" }}
          >
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium tracking-wide" style={{ color: "var(--text)" }}>
        {label}
      </p>
      <p className="mt-0.5 text-xs" style={{ color: "var(--text-subtle)" }}>
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
  const yearsLearning = 2;

  return (
    <section id="about" className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="01" total="05" title="O MNIE" subtitle="Kim jestem" />

        {/* Pull-quote — editorial, pasek gradient cyan→emerald */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-12 pl-6 md:mb-16 md:pl-8"
        >
          <span
            aria-hidden
            className="absolute bottom-1 left-0 top-1 w-[3px] rounded-full"
            style={{
              background: "linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 100%)",
            }}
          />
          <blockquote
            className="text-2xl font-medium leading-snug tracking-tight md:text-3xl"
            style={{ color: "var(--text)" }}
          >
            <span style={{ color: "var(--accent)" }}>{data.personal.title}</span>{" "}
            {data.personal.tagline}
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-8"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-sm tracking-wide" style={{ color: "var(--text-muted)" }}>
              Daniel Ciupek
            </span>
          </figcaption>
        </motion.figure>

        {/* Bio + countery (bento 2×2) */}
        <div className="grid gap-10 lg:grid-cols-5 lg:items-start lg:gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <p
              className="max-w-prose text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {data.personal.bio}
            </p>
          </motion.div>

          {/* Countery — glass bento 2×2 */}
          <div
            ref={countersRef}
            className="grid grid-cols-2 gap-4 lg:col-span-2"
          >
            <Counter target={certCount} label="Certyfikaty" sublabel="Udemy" inView={inView} delay={0} />
            <Counter target={totalHoursInt} suffix="h" label="Godziny szkoleń" sublabel="2025–2026" inView={inView} delay={120} />
            <Counter target={projectsCount} label="Projekty" sublabel="W portfolio" inView={inView} delay={240} />
            <Counter target={yearsLearning} suffix="+" label="Lata praktyki" sublabel="Fundamenty" inView={inView} delay={360} />
          </div>
        </div>
      </div>
    </section>
  );
}
