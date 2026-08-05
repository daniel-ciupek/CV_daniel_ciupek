"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Mail, Phone, Copy, Check, ArrowUpRight } from "lucide-react";
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

const AURORA = "var(--gradient-aurora)";

// ─── Status Dot ──────────────────────────────────────────────────────────────────

function StatusDot() {
  const [head, ...rest] = data.personal.availability.split("·");
  const tail = rest.join("·").trim();
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{ background: "rgba(168,85,247,0.10)", border: "1px solid var(--border-hover)" }}
    >
      <span
        className="status-dot h-[7px] w-[7px] flex-shrink-0 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      <span className="text-[13px]">
        <span style={{ color: "var(--accent-bright)", fontWeight: 500 }}>{head.trim()}</span>
        {tail && <span style={{ color: "var(--text-muted)" }}>{` · ${tail}`}</span>}
      </span>
    </div>
  );
}

// ─── Ikona-przycisk „kopiuj" ─────────────────────────────────────────────────────

function CopyIconButton({ value, what }: { value: string; what: string }) {
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
      className={`inline-grid h-9 w-9 flex-none place-items-center rounded-lg transition-colors duration-200${copied ? " copy-pulse" : ""}`}
      style={{
        border: `1px solid ${copied ? "var(--border-hover)" : "var(--border)"}`,
        color: copied ? "var(--accent-bright)" : "var(--text-muted)",
        background: "var(--bg-elevated)",
      }}
      onMouseEnter={(e) => {
        if (copied) return;
        e.currentTarget.style.color = "var(--accent-bright)";
        e.currentTarget.style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        if (copied) return;
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied && <span role="status" aria-live="polite" className="sr-only">Skopiowano {what} do schowka</span>}
    </button>
  );
}

// ─── Wiersz kontaktu (label + duża wartość + kopiuj + akcja) ─────────────────────

function ContactRow({
  label,
  value,
  href,
  action,
  Icon,
  what,
}: {
  label: string;
  value: string;
  href: string;
  action: string;
  Icon: React.ComponentType<{ size?: number }>;
  what: string;
}) {
  return (
    <div
      className="rounded-xl px-4 py-3 transition-colors duration-200"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Label + przyciski w jednej linii, WARTOŚĆ pełną szerokością pod spodem —
          wartość nie dzieli wiersza z przyciskami, więc pełny e-mail/telefon
          mieści się na każdej szerokości (fix ucinania na mobile/tablecie). */}
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.16em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <span className="flex flex-none items-center gap-1.5">
          <CopyIconButton value={value} what={what} />
          <a
            href={href}
            aria-label={action}
            className="inline-grid h-9 w-9 flex-none place-items-center rounded-lg transition-colors duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)", background: "var(--bg-elevated)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-bright)";
              e.currentTarget.style.borderColor = "var(--border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <Icon size={15} />
          </a>
        </span>
      </div>
      <a
        href={href}
        className="block truncate font-mono text-[16px] transition-colors duration-200 hover:underline md:text-[18px]"
        style={{ color: "var(--accent-bright)" }}
      >
        {value}
      </a>
    </div>
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
          color: hover ? "var(--accent-bright)" : "var(--text-muted)",
          boxShadow: hover ? "0 0 20px rgba(168,85,247,0.16)" : "none",
        }}
      >
        <Icon size={16} />
        {social.label}
        <ArrowUpRight size={13} style={{ opacity: 0.5 }} />
      </a>
    </MagneticElement>
  );
}

// ─── Main — Split „Rozmowa | Kontakt" ───────────────────────────────────────────

export default function Contact() {
  const reduced = usePrefersReducedMotion();
  const { email, phone, contact } = data.personal;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  // Nagłówek: ostatnie słowo w gradiencie aurory
  const words = contact.headline.trim().split(" ");
  const lastWord = words.pop() ?? "";
  const leadWords = words.join(" ");

  // Światło reagujące na kursor (MotionValue — zero re-renderów)
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const light = useMotionTemplate`radial-gradient(440px circle at ${mx}px ${my}px, rgba(168,85,247,0.12), transparent 60%)`;
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.5), 0 0 8px rgba(168,85,247,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(168,85,247,0),   0 0 12px rgba(168,85,247,0.6); }
        }
        .status-dot { animation: availablePulse 2.2s ease-in-out infinite; }
        @keyframes copyPulse {
          0%   { box-shadow: 0 0 0 0 rgba(168,85,247,0.4); }
          100% { box-shadow: 0 0 0 7px rgba(168,85,247,0); }
        }
        .copy-pulse { animation: copyPulse 0.5s ease-out; }
        @keyframes contactBeam {
          0%       { transform: translateX(-140%) rotate(18deg); }
          60%, 100%{ transform: translateX(360%)  rotate(18deg); }
        }
        .contact-beam {
          position: absolute; top: -60%; left: 0; width: 38%; height: 220%;
          background: linear-gradient(90deg, transparent, rgba(196,181,253,0.14), transparent);
          animation: contactBeam 6s ease-in-out infinite; pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .status-dot { animation: none; box-shadow: 0 0 0 2px rgba(168,85,247,0.15), 0 0 12px rgba(168,85,247,0.5); }
          .copy-pulse, .contact-beam { animation: none; }
          .contact-beam { display: none; }
        }
      `}</style>

      <section id="contact" aria-labelledby="contact-heading" className="relative px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader index="05" total="05" title="KONTAKT" subtitle="Napisz do mnie" headingId="contact-heading" />

          {/* Glass panel */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleCardMove}
            onMouseEnter={() => setLit(true)}
            onMouseLeave={() => setLit(false)}
            role="region"
            aria-label="Dane kontaktowe"
            className="relative overflow-hidden rounded-3xl p-7 md:p-12"
            style={{
              background: "var(--glass-solid)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              boxShadow: "0 0 80px rgba(168,85,247,0.08)",
            }}
          >
            {/* Aurora mesh za szkłem */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <motion.div
                className="absolute -left-16 -top-20 h-80 w-80 rounded-full blur-3xl"
                style={{ background: "rgba(232,121,249,0.15)" }}
                animate={reduced ? undefined : { x: [0, 28, 0], y: [0, -22, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-24 -right-14 hidden h-80 w-80 rounded-full blur-3xl sm:block"
                style={{ background: "rgba(129,140,248,0.13)" }}
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

            {/* Split: lewa „pitch" | prawa „konsola kontaktu".
                2 kolumny dopiero od lg — na tablecie (md) stack na pełną szerokość,
                by długie słowo nagłówka nie ściskało konsoli i nie ucinało e-maila. */}
            <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
              {/* Lewa — pitch */}
              <div>
                <StatusDot />

                <p
                  className="mt-5 text-balance font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-[2.75rem]"
                  style={{ color: "var(--text)" }}
                >
                  {leadWords}{" "}
                  <span className="text-foil">{lastWord}</span>
                </p>

                <p className="mt-3 max-w-md text-base md:text-[17px]" style={{ color: "var(--text-muted)" }}>
                  {contact.subline}
                </p>

                {/* Sociale — komplet 4 (desktop ma miejsce) */}
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {SOCIALS.map((s) => (
                    <SocialPill key={s.label} social={s} />
                  ))}
                </div>
              </div>

              {/* Prawa — konsola kontaktu */}
              <div
                className="relative overflow-hidden rounded-2xl p-5 md:p-6"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(196,181,253,0.05), rgba(196,181,253,0.015)), var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
              >
                {!reduced && <span aria-hidden className="contact-beam" />}

                <p
                  className="relative mb-3 font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Bezpośredni kontakt
                </p>

                <div className="relative flex flex-col gap-2.5">
                  <ContactRow
                    label="Email"
                    value={email}
                    href={`mailto:${email}`}
                    action="Napisz e-mail"
                    Icon={Mail}
                    what="email"
                  />
                  <ContactRow
                    label="Telefon"
                    value={phone}
                    href={telHref}
                    action="Zadzwoń"
                    Icon={Phone}
                    what="telefon"
                  />
                </div>

                <a
                  href={`mailto:${email}`}
                  className="cta-ghost relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold"
                >
                  <Mail size={16} />
                  Napisz wiadomość
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
