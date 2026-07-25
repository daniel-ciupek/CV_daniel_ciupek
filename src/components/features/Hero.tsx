"use client";

import { motion, useAnimationFrame, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import data from "@/config/data";
import { useScrambleText } from "@/hooks/useScrambleText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import AvatarMorph from "@/components/ui/AvatarMorph";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiJavascript, SiTypescript,
  SiReact, SiVuedotjs, SiDocker, SiPostgresql, SiMysql, SiPython, SiGitlab, SiLinux,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

// PageLoader trwa ~1600ms, scramble startuje ~300ms po zakończeniu
const SCRAMBLE_DELAY_MS = 1900;

// Przyciąganie magnetyczne CTA (re-use logiki MagneticIcon z Contact.tsx)
const MAGNET_STRENGTH = 0.3;
const MAGNET_CLAMP = 14;

interface Tech {
  Icon: IconType;
  color: string;
  label: string;
}

// Kolejność marquee — najważniejsze technologie na początku
const TECH: Tech[] = [
  { Icon: SiLaravel, color: "#FF2D20", label: "Laravel" },
  { Icon: SiPhp, color: "#A97FD4", label: "PHP" },
  { Icon: SiVuedotjs, color: "#42B883", label: "Vue 3" },
  { Icon: SiReact, color: "#61DAFB", label: "React" },
  { Icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
  { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  { Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  { Icon: SiPython, color: "#3776AB", label: "Python" },
  { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL" },
  { Icon: SiMysql, color: "#4479A1", label: "MySQL" },
  { Icon: SiDocker, color: "#2496ED", label: "Docker" },
  { Icon: SiGitlab, color: "#FC6D26", label: "GitLab" },
  { Icon: SiLinux, color: "#FCC624", label: "Linux" },
  { Icon: FaAws, color: "#FF9900", label: "AWS" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Tech marquee z „center spotlight" ────────────────────────────
// Ikona przechodząca przez środek zapala się swoim kolorem i płynnie
// oddaje go kolejnej. Kolor interpolujemy per-frame (muted → brand wg
// odległości od środka), scroll napędzamy ręcznie — dzięki temu w tej
// samej pętli znamy pozycje bez getBoundingClientRect co klatkę.
const MUTED: [number, number, number] = [100, 116, 139]; // var(--text-muted) #64748b
const MARQUEE_SPEED = 46; // px / s
const ICON_SIZE = 40;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const MARQUEE = TECH.map((t) => ({ ...t, rgb: hexToRgb(t.color) }));

function TechMarquee() {
  const reduced = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const xRef = useRef(0);
  const lastT = useRef<number[]>([]);
  const geom = useRef({
    centers: [] as number[],
    setWidth: 0,
    viewportW: 0,
    radius: 80,
  });

  // Podwojony zestaw → bezszwowa pętla (przewijamy o szerokość jednego setu)
  const items = [...MARQUEE, ...MARQUEE];

  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const els = itemRefs.current;
      if (!vp || !els[0]) return;
      const centers = els.map((el) =>
        el ? el.offsetLeft + el.offsetWidth / 2 : 0
      );
      const pitch = els[1] ? els[1].offsetLeft - els[0].offsetLeft : 80;
      const nth = els[MARQUEE.length];
      const setWidth = nth ? nth.offsetLeft - els[0].offsetLeft : pitch * MARQUEE.length;
      geom.current = { centers, setWidth, viewportW: vp.clientWidth, radius: pitch };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const g = geom.current;
    if (!g.setWidth || !g.viewportW) return;

    let x = xRef.current - (MARQUEE_SPEED * (delta || 16)) / 1000;
    if (x <= -g.setWidth) x += g.setWidth;
    xRef.current = x;
    if (rowRef.current) {
      rowRef.current.style.transform = `translate3d(${x}px,0,0)`;
    }

    const center = g.viewportW / 2;
    const radius = g.radius;
    const els = itemRefs.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const dist = Math.abs(g.centers[i] + x - center);
      const t = dist >= radius ? 0 : 1 - dist / radius;
      const prev = lastT.current[i] ?? 0;
      if (t === 0 && prev === 0) continue; // pomiń dalekie, niezmienne ikony
      lastT.current[i] = t;
      const [br, bg, bb] = items[i].rgb;
      el.style.color = `rgb(${Math.round(MUTED[0] + (br - MUTED[0]) * t)},${Math.round(
        MUTED[1] + (bg - MUTED[1]) * t
      )},${Math.round(MUTED[2] + (bb - MUTED[2]) * t)})`;
      el.style.transform = `scale(${1 + 0.3 * t})`;
    }
  });

  return (
    <div
      ref={viewportRef}
      className="relative overflow-hidden py-3"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
      }}
    >
      <div ref={rowRef} className="flex w-max items-center gap-10">
        {items.map(({ Icon, label, rgb }, i) => (
          <span
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            title={label}
            className="inline-flex shrink-0 will-change-transform"
            style={{
              color: reduced
                ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
                : "rgb(100,116,139)",
            }}
          >
            <Icon size={ICON_SIZE} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Magnetyczny przycisk CTA (pill) ──────────────────────────────
function MagneticButton({
  href,
  children,
  className,
  style,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const clamp = (v: number) =>
    Math.max(-MAGNET_CLAMP, Math.min(MAGNET_CLAMP, v));

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: clamp(dx * MAGNET_STRENGTH), y: clamp(dy * MAGNET_STRENGTH) });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.5 }}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const scrambledName = useScrambleText({
    finalText: data.personal.name,
    startDelay: SCRAMBLE_DELAY_MS,
    duration: 1400,
  });

  const [avatarSize, setAvatarSize] = useState(256);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setAvatarSize(384);
      else if (w >= 768) setAvatarSize(320);
      else setAvatarSize(256);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleContactClick = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    el.classList.add("anchor-pulse");
    setTimeout(() => el.classList.remove("anchor-pulse"), 700);
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
    >
      {/* ── Aurora gradient mesh (CSS, zastępuje orby parallax) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute -left-32 -top-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.16) 0%, transparent 70%)",
          }}
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.13) 0%, transparent 70%)",
          }}
          animate={reduced ? undefined : { x: [0, -35, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)",
          }}
          animate={reduced ? undefined : { x: [0, 30, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Text side */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            {data.personal.title}
          </motion.p>

          <motion.h1
            id="hero-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          >
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-mono), monospace",
                fontVariantLigatures: "none",
              }}
              aria-label={data.personal.name}
            >
              {scrambledName}
            </span>
          </motion.h1>

          {/* Tech marquee — center spotlight wędruje z ikony na ikonę */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            aria-hidden
            className="mt-8 w-full max-w-md lg:max-w-xl"
          >
            <TechMarquee />
          </motion.div>

          {/* CTA — pill + gradient border + magnetic hover */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton
              href="#projects"
              className="rounded-full px-7 py-3 text-sm font-semibold shadow-accent transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.45)]"
              style={{
                backgroundImage: "var(--gradient-aurora)",
                color: "var(--bg-base)",
              }}
            >
              Zobacz projekty
            </MagneticButton>

            <MagneticButton
              href="#contact"
              onClick={handleContactClick}
              className="rounded-full px-7 py-3 text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,255,0.20)]"
              style={{
                color: "var(--accent)",
                border: "1px solid transparent",
                background:
                  "linear-gradient(var(--bg-base), var(--bg-base)) padding-box, var(--gradient-aurora) border-box",
              }}
            >
              Kontakt
            </MagneticButton>
          </motion.div>
        </div>

        {/* Avatar side — interaktywny morph (#7): blob + 3D tilt + crossfade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <AvatarMorph
            pro={data.personal.avatarPro}
            hacker={data.personal.avatarHacker}
            alt={`${data.personal.name} — ${data.personal.title}`}
            size={avatarSize}
          />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--text-subtle)" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
