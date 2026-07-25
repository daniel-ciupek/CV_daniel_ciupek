"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Mail, Phone, Copy, Check, ArrowUpRight, ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";
import MagneticElement from "@/components/ui/MagneticElement";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// ─── Dane ───────────────────────────────────────────────────────────────────────

type SocialDef = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
};

const SOCIALS: SocialDef[] = [
  { label: "GitHub",    href: data.personal.github,    icon: FaGithub },
  { label: "LinkedIn",  href: data.personal.linkedin,  icon: FaLinkedin },
  { label: "Facebook",  href: data.personal.facebook,  icon: FaFacebook },
  { label: "Instagram", href: data.personal.instagram, icon: FaInstagram },
];

const AURORA = "linear-gradient(135deg, #00d4ff, #34d399)";
const AURORA_BORDER =
  "linear-gradient(var(--bg-base), var(--bg-base)) padding-box, linear-gradient(135deg, #00d4ff, #34d399) border-box";

// ─── Status Dot (cyan, bez terminala) ────────────────────────────────────────────

function StatusDot() {
  const [head, ...rest] = data.personal.availability.split("·");
  const tail = rest.join("·").trim();
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.24)" }}
    >
      <span
        className="status-dot h-[7px] w-[7px] flex-shrink-0 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      <span className="text-[13px]">
        <span style={{ color: "var(--accent)", fontWeight: 500 }}>{head.trim()}</span>
        {tail && <span style={{ color: "var(--text-muted)" }}>{` · ${tail}`}</span>}
      </span>
    </div>
  );
}

// ─── Copy chip (kopiuj do schowka) ──────────────────────────────────────────────

function CopyChip({ label, value, what }: { label: string; value: string; what: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* clipboard niedostępny */
      }
    },
    [value]
  );

  return (
    <button
      onClick={copy}
      aria-label={`Kopiuj ${what} do schowka`}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] transition-colors duration-200${copied ? " copy-pulse" : ""}`}
      style={{
        border: `1px solid ${copied ? "var(--border-hover)" : "var(--border)"}`,
        color: copied ? "var(--accent)" : "var(--text-muted)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        if (copied) return;
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        if (copied) return;
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="inline-flex"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </motion.span>
      </AnimatePresence>
      {label}
      {copied && <span role="status" aria-live="polite" className="sr-only">Skopiowano {what} do schowka</span>}
    </button>
  );
}

// ─── Social pill-badge (magnetyczny) ────────────────────────────────────────────

function SocialPill({ social }: { social: SocialDef }) {
  const Icon = social.icon;
  const [hover, setHover] = useState(false);
  return (
    <MagneticElement>
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social.label} — otwórz profil w nowej karcie`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
        style={{
          background: "var(--bg-elevated)",
          border: `1px solid ${hover ? "var(--border-hover)" : "var(--border)"}`,
          color: hover ? "var(--accent)" : "var(--text-muted)",
          boxShadow: hover ? "0 0 20px rgba(0,212,255,0.16)" : "none",
        }}
      >
        <Icon size={16} />
        {social.label}
        <ArrowUpRight size={13} style={{ opacity: 0.5 }} />
      </a>
    </MagneticElement>
  );
}

// ─── Social cluster (GitHub/LinkedIn na wierzchu, reszta pod „więcej") ──────────

function SocialCluster() {
  const reduced = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const primary = SOCIALS.slice(0, 2); // GitHub, LinkedIn
  const extra = SOCIALS.slice(2);      // Facebook, Instagram

  return (
    <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
      {primary.map((s) => (
        <SocialPill key={s.label} social={s} />
      ))}

      <AnimatePresence>
        {expanded &&
          extra.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : i * 0.06 }}
            >
              <SocialPill social={s} />
            </motion.div>
          ))}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
        style={{ border: "1px solid var(--border)", color: "var(--text-subtle)", background: "transparent" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--accent)";
          e.currentTarget.style.borderColor = "var(--border-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-subtle)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        {expanded ? "mniej" : `więcej (${extra.length})`}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
    </div>
  );
}

// ─── Main — Bold Aurora Panel ───────────────────────────────────────────────────

export default function Contact() {
  const reduced = usePrefersReducedMotion();
  const { email, phone, contact } = data.personal;

  // Nagłówek: ostatnie słowo w gradiencie aurory
  const words = contact.headline.trim().split(" ");
  const lastWord = words.pop() ?? "";
  const leadWords = words.join(" ");

  // Światło reagujące na kursor (MotionValue — zero re-renderów)
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const light = useMotionTemplate`radial-gradient(440px circle at ${mx}px ${my}px, rgba(0,212,255,0.10), transparent 60%)`;
  const [lit, setLit] = useState(false);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <>
      <style>{`
        @keyframes availablePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,212,255,0.5), 0 0 8px rgba(0,212,255,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(0,212,255,0),   0 0 12px rgba(0,212,255,0.6); }
        }
        .status-dot { animation: availablePulse 2.2s ease-in-out infinite; }
        @keyframes copyPulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,212,255,0.4); }
          100% { box-shadow: 0 0 0 7px rgba(0,212,255,0); }
        }
        .copy-pulse { animation: copyPulse 0.5s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .status-dot { animation: none; box-shadow: 0 0 0 2px rgba(0,212,255,0.15), 0 0 12px rgba(0,212,255,0.5); }
          .copy-pulse { animation: none; }
        }
      `}</style>

      <section id="contact" className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionHeader index="05" total="05" title="KONTAKT" />

          {/* Glass panel */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleCardMove}
            onMouseEnter={() => setLit(true)}
            onMouseLeave={() => setLit(false)}
            role="region"
            aria-label="Dane kontaktowe"
            className="relative overflow-hidden rounded-3xl p-8 md:p-14"
            style={{
              background: "rgba(17,17,22,0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              boxShadow: "0 0 80px rgba(0,212,255,0.06)",
            }}
          >
            {/* Aurora mesh za szkłem */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <motion.div
                className="absolute -left-16 -top-20 h-80 w-80 rounded-full blur-3xl"
                style={{ background: "rgba(0,212,255,0.15)" }}
                animate={reduced ? undefined : { x: [0, 28, 0], y: [0, -22, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-24 -right-14 hidden h-80 w-80 rounded-full blur-3xl sm:block"
                style={{ background: "rgba(52,211,153,0.12)" }}
                animate={reduced ? undefined : { x: [0, -26, 0], y: [0, 20, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Światło za kursorem */}
            {!reduced && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: light, opacity: lit ? 1 : 0, transition: "opacity 0.3s" }}
              />
            )}

            {/* Obrys aurory (1px) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                padding: 1,
                background: AURORA,
                opacity: 0.35,
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Treść */}
            <div className="relative">
              <StatusDot />

              <p
                className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl"
                style={{ color: "var(--text)" }}
              >
                {leadWords}{" "}
                <span
                  style={{
                    background: AURORA,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {lastWord}
                </span>
              </p>

              <p className="mt-3 max-w-lg text-base md:text-[17px]" style={{ color: "var(--text-muted)" }}>
                {contact.subline}
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <MagneticElement>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-semibold transition-shadow duration-300 hover:shadow-[0_0_42px_rgba(0,212,255,0.45)] sm:w-auto"
                    style={{ background: AURORA, color: "var(--bg-base)" }}
                  >
                    <Mail size={17} />
                    Napisz:&nbsp;<span className="font-mono font-medium">{email}</span>
                  </a>
                </MagneticElement>

                <MagneticElement>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-semibold transition-shadow duration-300 hover:shadow-[0_0_26px_rgba(0,212,255,0.22)] sm:w-auto"
                    style={{ color: "var(--accent)", border: "1px solid transparent", background: AURORA_BORDER }}
                  >
                    <Phone size={16} />
                    Zadzwoń&nbsp;<span className="whitespace-nowrap font-mono font-medium">{phone}</span>
                  </a>
                </MagneticElement>
              </div>

              {/* Divider */}
              <div className="my-7 h-px" style={{ background: "var(--border)" }} />

              {/* Kopiuj */}
              <div className="flex flex-wrap items-center gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <span>lub skopiuj:</span>
                <CopyChip label="email" value={email} what="email" />
                <CopyChip label="telefon" value={phone} what="telefon" />
              </div>

              {/* Sociale — GitHub/LinkedIn na wierzchu, reszta pod „więcej" */}
              <SocialCluster />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
