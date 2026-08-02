"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Język ruchu B „Holo Chrome": ease [0.16,1,0.3,1], wejścia opacity+y+blur
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Obszary specjalizacji (chipy) — wywiedzione z bio, słowa-klucze pod rekrutera */
const FOCUS_AREAS = [
  { label: "Ekosystem Laravela", color: "var(--accent)" },
  { label: "AI / Prompt Engineering", color: "var(--accent-2)" },
  { label: "CI/CD & DevOps", color: "var(--holo-indigo)" },
] as const;

/** Frazy pogrubiane w bio (accent-bright) — jak w zatwierdzonym koncepcie */
const BIO_HIGHLIGHTS = [
  "Full Stack Developer w ekosystemie Laravela",
  "prompt engineer",
  "CI/CD",
];

/** Dzieli bio i pogrubia zdefiniowane frazy; tekst bio pozostaje w data.ts */
function highlightBio(text: string, phrases: string[]) {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${phrases.map(esc).join("|")})`, "g");
  return text
    .split(re)
    .filter(Boolean)
    .map((part, i) =>
      phrases.includes(part)
        ? <strong key={i}>{part}</strong>
        : <Fragment key={i}>{part}</Fragment>
    );
}

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

/* ─── Counter — glass bento tile z aurora-rim ──────────────── */
function Counter({
  target, suffix = "", label, sublabel, inView, delay = 0, reduce,
}: {
  target: number;
  suffix?: string;
  label: string;
  sublabel: string;
  inView: boolean;
  delay?: number;
  reduce: boolean;
}) {
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
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20, filter: reduce ? "blur(0px)" : "blur(7px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay / 1000, ease: EASE }}
      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.3, ease: EASE } }}
      className="glass-solid about-tile p-5 md:p-6"
    >
      <div className="flex items-baseline gap-1">
        <span className="about-num font-display text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
          {display}
        </span>
        {suffix && (
          <span className="text-xl font-medium md:text-2xl" style={{ color: "var(--accent-bright)" }}>
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium tracking-wide" style={{ color: "var(--text)" }}>
        {label}
      </p>
      <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
        {sublabel}
      </p>
    </motion.div>
  );
}

/* ─── About ────────────────────────────────────────────────── */
export default function About() {
  const reduce = usePrefersReducedMotion();
  const countersRef = useRef<HTMLDivElement>(null);
  const inView = useInView(countersRef, { once: true, margin: "-80px" });

  const certCount     = data.certificates.length;
  const totalHoursInt = Math.round(data.certificates.reduce((s, c) => s + c.hours, 0));
  const projectsCount = data.projects.length;
  const yearsLearning = 2;

  // Wejście z językiem ruchu B. KLUCZE opacity/y/filter zawsze obecne w initial
  // i whileInView (różnią się tylko wartości) — inaczej po flipie reduced-motion
  // (hook: false→true po mount) framer zostawia dangling blur/offset.
  // Przy reduce: initial = stan spoczynkowy → zero animacji, zero rozmycia.
  const enter = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24, filter: reduce ? "blur(0px)" : "blur(7px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="01" total="05" title="O MNIE" subtitle="Kim jestem" headingId="about-heading" />

        {/* Pull-quote — editorial, folia + pasek aurora */}
        <motion.figure {...enter(0)} className="relative mb-8 pl-6 md:mb-10 md:pl-8">
          <span
            aria-hidden
            className="about-bar absolute bottom-1 left-0 top-1 w-[3px] rounded-full"
          />
          <blockquote
            className="max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: "var(--text)" }}
          >
            <span className="about-foil">{data.personal.title}</span>{" "}
            {data.personal.tagline}
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-8" style={{ background: "var(--accent)" }} />
            <span className="text-sm tracking-wide" style={{ color: "var(--text-muted)" }}>
              Daniel Ciupek
            </span>
          </figcaption>
        </motion.figure>

        {/* Chipy obszarów specjalizacji */}
        <motion.ul
          {...enter(0.06)}
          role="list"
          aria-label="Obszary specjalizacji"
          className="mb-12 flex flex-wrap gap-2.5 md:mb-16"
        >
          {FOCUS_AREAS.map((f) => (
            <li key={f.label}>
              <span
                className="about-chip inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm"
                style={{ color: "var(--text)" }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: f.color, boxShadow: `0 0 8px ${f.color}` }}
                />
                {f.label}
              </span>
            </li>
          ))}
        </motion.ul>

        {/* Bio + countery (bento 2×2) */}
        <div className="grid gap-10 lg:grid-cols-5 lg:items-start lg:gap-12">
          {/* Bio */}
          <motion.div {...enter(0.1)} className="lg:col-span-3">
            <p
              className="about-bio max-w-prose text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {highlightBio(data.personal.bio, BIO_HIGHLIGHTS)}
            </p>
          </motion.div>

          {/* Countery — glass bento 2×2 */}
          <div ref={countersRef} className="grid grid-cols-2 gap-4 lg:col-span-2">
            <Counter target={certCount} label="Certyfikaty" sublabel="Udemy" inView={inView} delay={0} reduce={reduce} />
            <Counter target={totalHoursInt} suffix="h" label="Godziny szkoleń" sublabel="2025–2026" inView={inView} delay={120} reduce={reduce} />
            <Counter target={projectsCount} label="Projekty" sublabel="W portfolio" inView={inView} delay={240} reduce={reduce} />
            <Counter target={yearsLearning} suffix="+" label="Lata praktyki" sublabel="Fundamenty" inView={inView} delay={360} reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}
