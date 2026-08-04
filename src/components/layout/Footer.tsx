"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import data from "@/config/data";

const AURORA = "var(--gradient-aurora)";
// Maska „tylko obrys" — pokazuje gradient wyłącznie na 1px ramce (padding-box XOR border-box)
const RING_MASK: React.CSSProperties = {
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
};

function scrollToTop() {
  const lenis = (window as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

type SocialDef = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

const SOCIALS: SocialDef[] = [
  { href: data.personal.github, label: "GitHub", icon: FaGithub },
  { href: data.personal.linkedin, label: "LinkedIn", icon: FaLinkedin },
];

function SocialPill({ href, label, icon: Icon }: SocialDef) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — otwórz profil w nowej karcie`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
      style={{
        background: "var(--bg-elevated)",
        border: `1px solid ${hover ? "var(--border-hover)" : "var(--border)"}`,
        color: hover ? "var(--accent-bright)" : "var(--text-muted)",
        boxShadow: hover ? "0 0 18px rgba(168,85,247,0.15)" : "none",
        transform: hover ? "translateY(-1px)" : "none",
      }}
    >
      <Icon size={15} />
      {label}
      <ArrowUpRight size={12} style={{ opacity: 0.5 }} />
    </a>
  );
}

function GoToTop() {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      onClick={scrollToTop}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Wróć na górę strony"
      className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-full"
      style={{
        background: "var(--bg-elevated)",
        color: "var(--accent-bright)",
        boxShadow: hover ? "0 10px 26px -10px rgba(168,85,247,0.5)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Aurora ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-1px] rounded-full"
        style={{ padding: 1, background: AURORA, opacity: hover ? 1 : 0.45, transition: "opacity 0.3s", ...RING_MASK }}
      />
      <ArrowUp
        size={17}
        style={{ transform: hover ? "translateY(-2px)" : "none", transition: "transform 0.2s" }}
      />
    </motion.button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pb-8 pt-9" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-5xl">
        {/* Szklany panel z aurora-obrysem */}
        <div
          className="relative flex flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl px-6 py-5 sm:flex-row"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Obrys aurory */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ padding: 1, background: AURORA, opacity: 0.3, ...RING_MASK }}
          />

          {/* Marka — monogram DC (aurora) + imię/tytuł */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              style={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontSize: 24,
                background: AURORA,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              DC
            </span>
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                {data.personal.name}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {data.personal.title}
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <SocialPill key={s.label} {...s} />
            ))}
          </div>

          {/* Powrót na górę */}
          <GoToTop />
        </div>

        {/* Copyright */}
        <p className="mt-4 text-center text-[11.5px]" style={{ color: "var(--text-muted)" }}>
          © {year} {data.personal.name} · Zbudowane w Next.js
        </p>
      </div>
    </footer>
  );
}
