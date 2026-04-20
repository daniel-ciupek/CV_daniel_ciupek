"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import data from "@/config/data";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const navLinks = [
  { label: "O mnie",       href: "#about" },
  { label: "Certyfikaty",  href: "#certifications" },
  { label: "Umiejętności", href: "#skills" },
  { label: "Projekty",     href: "#projects" },
  { label: "Kontakt",      href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce                  = useReducedMotion();
  const active                  = useScrollSpy(sectionIds);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 1000 : 160,
    damping:   reduce ? 100  : 28,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    el.classList.add("anchor-pulse");
    setTimeout(() => el.classList.remove("anchor-pulse"), 700);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl border-b" : "border-b border-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "rgba(15, 15, 15, 0.85)", borderColor: "var(--border)" }
          : {}
      }
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <a
          href="#"
          className="font-mono text-xl font-bold tracking-wider transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          {data.personal.name.split(" ").map((w) => w[0]).join("")}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="relative text-sm py-2 block transition-colors duration-200"
                  style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, var(--accent), var(--accent-dim))",
                      }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 38, mass: 0.6 }
                      }
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="/cv-print"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 nav-cta-shimmer"
          style={{
            border: "1px solid var(--accent)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-glow)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          }}
        >
          Pobierz CV
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md transition-colors"
          style={{ color: "var(--text-muted)" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 origin-left"
        style={{
          scaleX,
          height: "1.5px",
          background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-dim) 100%)",
        }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.97)",
              borderColor: "var(--border)",
              backdropFilter: "blur(20px)",
            }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNavClick}
                      className="block py-3 text-base transition-colors duration-200"
                      style={{
                        color: isActive ? "var(--accent)" : "var(--text-muted)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-3 border-t mt-2" style={{ borderColor: "var(--border)" }}>
                <a
                  href="/cv-print"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="block py-2 text-sm font-medium text-center rounded-md nav-cta-shimmer"
                  style={{
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  Pobierz CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
