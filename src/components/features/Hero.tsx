"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import data from "@/config/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
    >
      {/* ── Background orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-40 h-80 w-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
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
            Full Stack Developer
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          >
            <span
              style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.personal.name}
            </span>
          </motion.h1>

          {data.personal.bio && (
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {data.personal.bio}
            </motion.p>
          )}

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
              style={{
                backgroundColor: "var(--accent)",
                color: "#050505",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(0,212,255,0.4)")
              }
              onMouseLeave={e =>
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
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--accent-glow)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
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
        >
          {/* Glow behind avatar */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-30 blur-2xl scale-110"
            style={{ backgroundColor: "var(--accent)" }}
          />

          {/* Blob avatar */}
          <div
            className="relative h-64 w-64 overflow-hidden md:h-80 md:w-80 lg:h-96 lg:w-96"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              animation: "blobMorph 8s ease-in-out infinite",
              border: "2px solid rgba(0,212,255,0.25)",
            }}
          >
            <Image
              src={data.personal.avatar}
              alt={`${data.personal.name} — ${data.personal.title}`}
              fill
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              className="object-cover object-top"
              priority
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
