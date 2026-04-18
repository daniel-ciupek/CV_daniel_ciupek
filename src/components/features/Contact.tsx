"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

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

const CLAMP = 15;

// ─── Status Dot ───────────────────────────────────────────────────────────────

function StatusDot() {
  const [tip, setTip] = useState(false);
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        aria-label="Status dostępności: otwarty na propozycje"
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
        style={{
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.20)",
        }}
      >
        <span
          className="status-dot inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ background: "#10B981" }}
        />
        <span className="hidden font-mono text-[10px] uppercase tracking-wider sm:inline" style={{ color: "#10B981" }}>
          ONLINE
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider sm:hidden" style={{ color: "#10B981" }}>
          ON
        </span>
      </button>
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-10 mt-2 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-[11px]"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "var(--text-muted)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            Otwarty na propozycje współpracy
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Tile ─────────────────────────────────────────────────────────────

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  href: string;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [echo, setEcho] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setEcho(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setEcho(false), 2500);
    } catch {
      // clipboard not available
    }
  }, [value]);

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-w-0 flex-1 rounded-xl p-5 transition-all duration-300"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.40)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(0,212,255,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2" style={{ color: "var(--text-subtle)" }}>
          <Icon size={15} aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
        </div>

        {/* Copy button */}
        <div className="relative">
          <button
            onClick={handleCopy}
            aria-label={`Kopiuj ${label.toLowerCase()} do schowka`}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: copied ? "var(--accent)" : "var(--text-subtle)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.30)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-subtle)";
              }
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check size={12} />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Copy size={12} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                role="status"
                aria-live="polite"
                className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[10px]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid rgba(0,212,255,0.30)",
                  color: "var(--accent)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4), 0 0 20px rgba(0,212,255,0.10)",
                }}
              >
                ✓ skopiowano
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Separator */}
      <div className="mb-3 h-px" style={{ background: "var(--border)" }} />

      {/* Value link */}
      <a
        href={href}
        className="block cursor-pointer break-all font-mono text-sm transition-colors duration-200"
        style={{ color: "var(--text)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
      >
        {value}
      </a>

      {/* Terminal echo on copy */}
      <AnimatePresence>
        {echo && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden font-mono text-[10px]"
            style={{ color: "var(--text-subtle)", marginTop: echo ? 8 : 0 }}
          >
            {">"} copied:{" "}
            <span style={{ color: "var(--accent)" }}>{value}</span>
            {" → "}
            <span style={{ color: "var(--accent)" }}>clipboard</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Magnetic Social Icon ─────────────────────────────────────────────────────

function MagneticIcon({ social, delay }: { social: SocialDef; delay: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const clamp = (v: number) => Math.max(-CLAMP, Math.min(CLAMP, v));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: clamp(dx * 0.3), y: clamp(dy * 0.3) });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const Icon = social.icon;

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social.label} — otwórz profil w nowej karcie`}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.5 }}
        className="flex flex-col items-center gap-2"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
          style={{
            background: "var(--bg-elevated)",
            border: hovered ? "1px solid rgba(0,212,255,0.40)" : "1px solid var(--border)",
            boxShadow: hovered
              ? "0 0 24px rgba(0,212,255,0.18), inset 0 1px 0 rgba(0,212,255,0.08)"
              : "none",
            color: hovered ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              transform: reduced ? "none" : `translate(${-pos.x * 0.15}px, ${-pos.y * 0.15}px)`,
            }}
          >
            <Icon size={22} />
          </span>
        </div>
        <span
          className="font-mono text-[11px] transition-colors duration-200"
          style={{ color: hovered ? "var(--accent)" : "var(--text-subtle)" }}
        >
          {social.label}
        </span>
      </motion.a>
    </motion.div>
  );
}

// ─── CLI Line ─────────────────────────────────────────────────────────────────

function CliLine({
  command,
  output,
  delay,
}: {
  command: string;
  output?: React.ReactNode;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="mb-3">
      <motion.p
        initial={reduced ? {} : { opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.25, delay, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[13px] md:text-sm"
      >
        <span style={{ color: "var(--accent)", opacity: 0.7 }}>$ </span>
        <span style={{ color: "var(--text-muted)" }}>{command}</span>
      </motion.p>
      {output && (
        <motion.div
          initial={reduced ? {} : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.25, delay: delay + 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 font-mono text-[13px] md:text-sm"
        >
          <span style={{ color: "var(--text-subtle)" }}>{">"} </span>
          <span style={{ color: "var(--text)" }}>{output}</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const primary = SOCIALS.slice(0, 2);
  const extra   = SOCIALS.slice(2);

  return (
    <>
      <style>{`
        @keyframes availablePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.55), 0 0 10px rgba(16,185,129,0.45); }
          50%       { box-shadow: 0 0 0 5px rgba(16,185,129,0),  0 0 14px rgba(16,185,129,0.60); }
        }
        .status-dot { animation: availablePulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .status-dot {
            animation: none;
            box-shadow: 0 0 0 2px rgba(16,185,129,0.15), 0 0 12px rgba(16,185,129,0.5);
          }
        }
      `}</style>

      <section id="contact" className="relative px-6 py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-3xl">
          <SectionHeader index="05" total="05" title="KONTAKT" subtitle="// establish.connection" />

          {/* Terminal window */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            role="region"
            aria-label="Dane kontaktowe"
            className="overflow-hidden rounded-2xl"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid rgba(0,212,255,0.20)",
              boxShadow: "0 0 60px rgba(0,212,255,0.05), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Terminal header bar */}
            <motion.div
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "rgba(0,212,255,0.60)" }} />
              </div>
              <span className="font-mono text-[11px]" style={{ color: "var(--text-subtle)" }}>
                <span className="hidden sm:inline">daniel@portfolio:</span>~/contact
              </span>
              <StatusDot />
            </motion.div>

            {/* Body */}
            <div className="p-5 md:p-7">

              <CliLine command="whoami" output="daniel_ciupek" delay={0.3} />

              <CliLine
                command="status"
                output={
                  <span>
                    <span
                      className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{ background: "#10B981" }}
                    />
                    Dostępny · otwarty na propozycje współpracy
                  </span>
                }
                delay={0.45}
              />

              {/* contact --primary */}
              <div className="mb-5">
                <CliLine command="contact --primary" delay={0.6} />
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <ContactTile
                    icon={Mail}
                    label="Email"
                    value={data.personal.email}
                    href={`mailto:${data.personal.email}`}
                    delay={0.7}
                  />
                  <ContactTile
                    icon={Phone}
                    label="Telefon"
                    value={data.personal.phone}
                    href={`tel:${data.personal.phone}`}
                    delay={0.8}
                  />
                </div>
              </div>

              {/* socials --list */}
              <div className="mb-2">
                <CliLine command="socials --list" delay={0.95} />
                <div className="mt-3 flex flex-wrap items-end gap-4">
                  {primary.map((s, i) => (
                    <MagneticIcon key={s.label} social={s} delay={1.05 + i * 0.08} />
                  ))}

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        id="socials-extra"
                        initial={reduced ? { opacity: 0 } : { opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, width: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden", display: "flex", gap: 16, alignItems: "flex-end" }}
                      >
                        {extra.map((s, i) => (
                          <MagneticIcon key={s.label} social={s} delay={0.1 + i * 0.08} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    initial={reduced ? {} : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: 1.25 }}
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    aria-controls="socials-extra"
                    className="mb-7 flex items-center gap-1 font-mono text-[12px] transition-colors duration-200"
                    style={{ color: "var(--text-subtle)", background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-subtle)")}
                  >
                    <motion.span
                      animate={{ rotate: expanded ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: "inline-block" }}
                    >
                      ▸
                    </motion.span>
                    {expanded ? "mniej" : `więcej (${extra.length})`}
                  </motion.button>
                </div>
              </div>

              {/* Blinking cursor */}
              <motion.p
                initial={reduced ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, delay: 1.4 }}
                className="font-mono text-[13px] md:text-sm"
              >
                <span style={{ color: "var(--accent)", opacity: 0.7 }}>$ </span>
                <span
                  className="inline-block h-[1.1em] w-[7px] align-text-bottom"
                  style={{
                    background: "var(--accent)",
                    opacity: 0.8,
                    animation: "pulse 1.1s ease-in-out infinite",
                  }}
                />
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
