"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import data from "@/config/data";
import { useScrambleText } from "@/hooks/useScrambleText";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import AvatarFallback from "@/components/ui/AvatarFallback";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiJavascript, SiTypescript,
  SiReact, SiVuedotjs, SiDocker, SiPostgresql, SiMysql, SiPython,
} from "react-icons/si";

// PageLoader trwa ~1600ms, scramble startuje 300ms po zakończeniu
const SCRAMBLE_DELAY_MS = 1900;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  const scrambledName = useScrambleText({
    finalText: data.personal.name,
    startDelay: SCRAMBLE_DELAY_MS,
    duration: 1400,
  });

  const getOffset = useMouseParallax();
  const orb1 = getOffset(0.02);
  const orb2 = getOffset(0.015);
  const orb3 = getOffset(0.025);

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

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
    >
      {/* ── Background orbs (parallax) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl will-change-transform"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            transform: `translate3d(${orb1.x}px, ${orb1.y}px, 0)`,
          }}
        />
        <div
          className="absolute top-1/2 -right-40 h-80 w-80 rounded-full opacity-10 blur-3xl will-change-transform"
          style={{
            background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
            transform: `translate3d(${orb2.x}px, ${orb2.y}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full opacity-10 blur-3xl will-change-transform"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            transform: `translate3d(${orb3.x}px, ${orb3.y}px, 0)`,
          }}
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
            className="mb-4 font-mono text-sm tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            {data.personal.title}
          </motion.p>

          <motion.h1
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

          {/* Floating tech icons — scattered */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mt-6 w-full"
            style={{ height: 190 }}
          >
            {[
              { Icon: SiLaravel,    color: "#FF2D20", size: 38, top: "8%",  left: "0%"  },
              { Icon: SiVuedotjs,   color: "#42B883", size: 32, top: "62%", left: "9%"  },
              { Icon: SiPhp,        color: "#A97FD4", size: 42, top: "18%", left: "22%" },
              { Icon: SiReact,      color: "#61DAFB", size: 34, top: "70%", left: "36%" },
              { Icon: SiNodedotjs,  color: "#5FA04E", size: 36, top: "5%",  left: "50%" },
              { Icon: SiTypescript, color: "#3178C6", size: 30, top: "55%", left: "61%" },
              { Icon: SiJavascript, color: "#F7DF1E", size: 34, top: "18%", left: "74%" },
              { Icon: SiDocker,     color: "#2496ED", size: 38, top: "66%", left: "89%" },
              { Icon: SiPostgresql, color: "#336791", size: 28, top: "38%", left: "43%" },
              { Icon: SiMysql,      color: "#4479A1", size: 30, top: "40%", left: "16%" },
              { Icon: SiPython,     color: "#3776AB", size: 34, top: "10%", left: "86%" },
            ].map(({ Icon, color, size, top, left }, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ top, left, color, opacity: 0.82 }}
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 2.6 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
                whileHover={{ opacity: 0.75, scale: 1.25 }}
              >
                <Icon size={size} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              className="rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "var(--accent)", color: "#050505" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(0,212,255,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              Zobacz projekty
            </a>
            <a
              href="/cv-print"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Pobierz CV
            </a>
          </motion.div>
        </div>

        {/* Avatar side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="relative flex-shrink-0"
          style={{ width: avatarSize, height: avatarSize }}
        >
          {/* Glow behind avatar */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-30 blur-2xl scale-110"
            style={{ backgroundColor: "var(--accent)" }}
          />

          <div className="relative">
            <AvatarFallback
              src={data.personal.avatar}
              alt={`${data.personal.name} — ${data.personal.title}`}
              size={avatarSize}
            />
          </div>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--text-subtle)" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
