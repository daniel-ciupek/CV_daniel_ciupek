"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  value?: string;
};

const links: SocialLink[] = [
  { label: "Email",     href: `mailto:${data.personal.email}`,   icon: Mail,        value: data.personal.email },
  { label: "Telefon",   href: `tel:${data.personal.phone}`,      icon: Phone,       value: data.personal.phone },
  { label: "GitHub",    href: data.personal.github,               icon: FaGithub },
  { label: "LinkedIn",  href: data.personal.linkedin,             icon: FaLinkedin },
  { label: "Facebook",  href: data.personal.facebook,             icon: FaFacebook },
  { label: "Instagram", href: data.personal.instagram,            icon: FaInstagram },
];

function MagneticIcon({ link }: { link: SocialLink }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPos({ x: dx * 0.35, y: dy * 0.35 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const Icon = link.icon;

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.href.startsWith("mailto") || link.href.startsWith("tel") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      aria-label={link.label}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center gap-2"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
        style={{
          backgroundColor: hovered ? "var(--bg-elevated)" : "var(--bg-surface)",
          border: hovered ? "1px solid rgba(0,212,255,0.40)" : "1px solid var(--border)",
          boxShadow: hovered ? "0 0 24px rgba(0,212,255,0.18), inset 0 1px 0 rgba(0,212,255,0.08)" : "none",
          color: hovered ? "var(--accent)" : "var(--text-muted)",
        }}
      >
        <Icon size={22} />
      </div>
      <span
        className="font-mono text-xs transition-colors duration-200"
        style={{ color: hovered ? "var(--accent)" : "var(--text-subtle)" }}
      >
        {link.label}
      </span>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeader index="05" total="05" title="KONTAKT" subtitle="// reach.me" />

        {/* Dock */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex flex-wrap justify-center gap-6 rounded-3xl px-8 py-8 sm:gap-8"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {links.map(link => (
            <MagneticIcon key={link.label} link={link} />
          ))}
        </motion.div>

        {/* Direct contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-6"
        >
          <a
            href={`mailto:${data.personal.email}`}
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {data.personal.email}
          </a>
          <span style={{ color: "var(--border)" }}>·</span>
          <a
            href={`tel:${data.personal.phone}`}
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {data.personal.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
