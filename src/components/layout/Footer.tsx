"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import data from "@/config/data";

function scrollToTop() {
  const lenis = (window as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 py-10 md:py-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* CLI lines */}
        <p className="mb-1 font-mono text-sm">
          <span style={{ color: "var(--accent)", opacity: 0.7 }}>$ </span>
          <span style={{ color: "var(--text-muted)" }}>exit</span>
        </p>
        <p className="mb-6 font-mono text-sm">
          <span style={{ color: "var(--text-subtle)" }}>{">"} </span>
          <span style={{ color: "var(--text)" }}>Session closed · </span>
          <span style={{ color: "var(--accent)" }}>daniel_ciupek</span>
          <span style={{ color: "var(--text)" }}>@portfolio</span>
        </p>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Copyright + socials */}
          <div className="flex items-center gap-4">
            <p className="font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
              <span style={{ color: "var(--accent)", opacity: 0.5 }}>{"// "}</span>
              © {year} {data.personal.name}
            </p>
            <div className="flex items-center gap-2">
              {[
                { href: data.personal.github,  icon: FaGithub,   label: "GitHub" },
                { href: data.personal.linkedin, icon: FaLinkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200"
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
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Go-to-top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Wróć na górę strony"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all duration-200"
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
            ↑ cd ~
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
