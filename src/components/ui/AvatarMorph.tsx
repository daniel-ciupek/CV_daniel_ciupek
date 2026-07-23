"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };
// Organiczny kształt blob (zgodny z keyframe `blobMorph` w globals.css)
const BLOB = "60% 40% 30% 70% / 60% 30% 70% 40%";
// Crossfade: intencjonalny hover reaguje żwawo, ambientowy auto-swap jest
// wolniejszy i bardziej „morfujący" (prośba użytkownika: wolniej + płynniej).
const CROSSFADE_EASE = [0.37, 0, 0.63, 1] as const; // easeInOutSine — miękkie, gradualne
const HOVER_DURATION = 1.1;
const AUTO_DURATION = 2.4;
// Auto-swap co kilka sekund (pauzowany na hover, wyłączony przy reduced-motion)
const AUTO_INTERVAL_MS = 6000;

interface Props {
  /** Domyślne (profesjonalne) zdjęcie */
  pro: string;
  /** Zdjęcie pokazywane na hover (crossfade) */
  hacker: string;
  alt: string;
  size: number;
}

/**
 * Interaktywny awatar: blob + 3D tilt reagujący na kursor + crossfade
 * profesjonalne → „hacker" na hover (z blur) + aurora glow pod spodem.
 * Wszystkie ruchy wyłączone przy `prefers-reduced-motion` (zostaje sam
 * crossfade opacity, sterowany hoverem).
 */
export default function AvatarMorph({ pro, hacker, alt, size }: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [auto, setAuto] = useState(false);
  // Ref, żeby interwał widział aktualny hover bez restartowania timera
  const hoveredRef = useRef(false);

  // Auto-swap: co AUTO_INTERVAL_MS przełącz zdjęcie — chyba że kursor jest
  // na awatarze (hover ma priorytet) albo użytkownik woli mniej ruchu.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (!hoveredRef.current) setAuto((a) => !a);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  // „Hacker" widoczny gdy hover LUB gdy auto-swap jest w fazie hacker
  const showHacker = hovered || auto;

  // Hover = żwawo; auto-swap = wolny, miękki morph
  const crossfade = {
    duration: hovered ? HOVER_DURATION : AUTO_DURATION,
    ease: CROSSFADE_EASE,
  };

  // Pozycja kursora względem środka (−0.5 … 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), SPRING);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), SPRING);
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [-24, 24]), SPRING);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [-24, 24]), SPRING);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleEnter = () => {
    hoveredRef.current = true;
    setHovered(true);
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const proAnim = reduced
    ? { opacity: showHacker ? 0 : 1 }
    : { opacity: showHacker ? 0 : 1, scale: showHacker ? 1.05 : 1 };

  const hackerAnim = reduced
    ? { opacity: showHacker ? 1 : 0 }
    : {
        opacity: showHacker ? 1 : 0,
        scale: showHacker ? 1 : 1.1,
        filter: showHacker ? "blur(0px)" : "blur(10px)",
      };

  return (
    <div style={{ width: size, height: size, perspective: 1200 }} className="relative">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          width: "100%",
          height: "100%",
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Aurora glow pod awatarem */}
        <motion.div
          aria-hidden
          className="absolute inset-0 blur-2xl"
          style={{
            x: reduced ? 0 : glowX,
            y: reduced ? 0 : glowY,
            scale: 1.15,
            borderRadius: BLOB,
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.55), rgba(52,211,153,0.55))",
            opacity: showHacker ? 0.9 : 0.5,
            transition: "opacity 0.6s ease",
            transform: "translateZ(-1px)",
          }}
        />

        {/* Blob ze zdjęciami (crossfade) */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: BLOB,
            animation: reduced ? undefined : "blobMorph 8s ease-in-out infinite",
            border: "2px solid rgba(0,212,255,0.25)",
            transform: "translateZ(40px)",
          }}
        >
          {/* Profesjonalne (domyślne) */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={proAnim}
            transition={crossfade}
          >
            <Image
              src={pro}
              alt={alt}
              fill
              sizes={`${size}px`}
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* „Hacker" (hover) */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={hackerAnim}
            transition={crossfade}
          >
            <Image
              src={hacker}
              alt=""
              fill
              sizes={`${size}px`}
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
