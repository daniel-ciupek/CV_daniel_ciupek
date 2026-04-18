"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

const NAV_LINKS = [
  { label: "O mnie",      href: "#about" },
  { label: "Certyfikaty", href: "#certifications" },
  { label: "Tech Stack",  href: "#techstack" },
  { label: "Projekty",    href: "#projects" },
  { label: "Kontakt",     href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: data.personal.github,   icon: FaGithub },
  { label: "LinkedIn", href: data.personal.linkedin,  icon: FaLinkedin },
];

function scrollToTop() {
  const lenis = (window as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      {/* Main 3-column grid */}
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Col 1 — Identity */}
          <div>
            <p
              className="mb-1 font-mono text-base font-semibold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              {data.personal.name}
            </p>
            <p className="mb-4 font-mono text-xs" style={{ color: "var(--accent)" }}>
              {data.personal.title}
            </p>
            <p className="font-mono text-[11px]" style={{ color: "var(--text-subtle)" }}>
              © {year} · Wszelkie prawa zastrzeżone
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--text-subtle)" }}
            >
              // nawigacja
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }, i) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 font-mono text-xs transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                  >
                    <span style={{ color: "var(--text-subtle)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Socials + built-with */}
          <div>
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--text-subtle)" }}
            >
              // social
            </p>
            <ul className="mb-8 space-y-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                  >
                    <Icon size={12} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[10px]" style={{ color: "var(--text-subtle)" }}>
              Built with{" "}
              <span style={{ color: "var(--accent)" }}>Next.js</span>
              {" & "}
              <span style={{ color: "var(--accent)" }}>Framer Motion</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mx-auto max-w-6xl px-6 pb-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between pt-6">
          <p className="font-mono text-[10px]" style={{ color: "var(--text-subtle)" }}>
            <span style={{ color: "var(--accent)", opacity: 0.6 }}>~/</span>
            {" "}daniel-ciupek · {year}
          </p>

          {/* Go-to-top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Wróć na górę strony"
            className="flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px] transition-all duration-200"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.35)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            <ArrowUp size={13} />
            góra
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
