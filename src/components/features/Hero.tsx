"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import data from "@/config/data";
import { useScrambleText } from "@/hooks/useScrambleText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import AvatarMorph from "@/components/ui/AvatarMorph";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroBackdrop from "@/components/features/hero/HeroBackdrop";
import TechCarousel from "@/components/features/hero/TechCarousel";
import TechModal from "@/components/ui/TechModal";
import type { TechSkill } from "@/types";

// PageLoader trwa ~1600ms, scramble startuje ~300ms po zakończeniu
const SCRAMBLE_DELAY_MS = 1900;

// Język ruchu B „Holo Chrome": ease [0.16,1,0.3,1], wejścia opacity+y+blur, stagger 70ms
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(7px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const scrambledName = useScrambleText({
    finalText: data.personal.name,
    startDelay: SCRAMBLE_DELAY_MS,
    duration: 1400,
  });

  const [avatarSize, setAvatarSize] = useState(256);
  const [selected, setSelected] = useState<TechSkill | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setAvatarSize(340);
      else if (w >= 768) setAvatarSize(300);
      else setAvatarSize(240);
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
      style={{ isolation: "isolate" }}
    >
      <HeroBackdrop />
      <div className="hero-scrim" aria-hidden />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        {/* Text side */}
        <div className="flex max-w-[560px] flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="hero-kick mb-3 text-xs"
          >
            {data.personal.title}
          </motion.p>

          <motion.h1
            id="hero-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            aria-label={data.personal.name}
            className="hero-name font-display text-5xl font-extrabold leading-[0.96] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span aria-hidden className="hero-name-base inline-block">
              {scrambledName}
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-3.5 max-w-[46ch] text-base"
            style={{ color: "var(--text-muted)" }}
          >
            {data.personal.heroTagline}
          </motion.p>

          {/* Karuzela stacku — autorskie ikony + modal opisu */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 w-full max-w-[560px]"
          >
            <TechCarousel skills={data.techStack} onSelect={setSelected} />
            <p className="hero-tip mt-2">
              ↳ kliknij ikonę, aby zobaczyć dogłębny opis · karuzela pauzuje na hover
            </p>
          </motion.div>

          {/* CTA — magnetyczne pigułki */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <MagneticButton href="#projects" className="hero-cta cta-ghost">
              Zobacz projekty
            </MagneticButton>

            <MagneticButton
              href="#contact"
              onClick={handleContactClick}
              className="hero-cta hero-cta-secondary"
            >
              Kontakt
              <ArrowRight aria-hidden />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Avatar side — morph pro↔hacker (blob 1:1 z produkcji, oprawa Holo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--text-subtle)" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>

      {/* Modal opisu umiejętności (poza flow, position fixed) */}
      <TechModal skill={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
