"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import data from "@/config/data";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "O mnie",       href: "#about" },
  { label: "Certyfikaty",  href: "#certifications" },
  { label: "Umiejętności", href: "#skills" },
  { label: "Projekty",     href: "#projects" },
  { label: "Kontakt",      href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

// Gradient border (aurora) w konwencji padding-box/border-box

// ─── Desktopowy link nawigacji: magnetyczny + kinetyczny swap etykiety ──────────
// Magnetyzm gaśnie przy reduced-motion; na dotyku nie odpala się (brak mousemove).
// Swap etykiety jest w CSS pod `@media (hover: hover)` (globals.css → .nav-swap).
function NavLink({
  link,
  isActive,
  onNavClick,
  reduce,
}: {
  link: { label: string; href: string };
  isActive: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  reduce: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number) => Math.max(-8, Math.min(8, v));
    setPos({ x: clamp(dx * 0.35), y: clamp(dy * 0.35) });
  };

  return (
    <li className="relative">
      <motion.a
        ref={ref}
        href={link.href}
        onClick={onNavClick}
        onMouseMove={handleMove}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.5 }}
        className="nav-link relative block py-2 text-sm"
        style={{ willChange: "transform" }}
      >
        {isActive && <span aria-hidden className="nav-glow" />}
        <span className="nav-swap">
          <span
            style={{
              color: isActive ? "var(--accent-bright)" : "var(--text-muted)",
              textShadow: isActive ? "0 0 10px rgba(168, 85, 247, 0.5)" : undefined,
            }}
          >
            {link.label}
          </span>
          <span
            className="nav-swap__two"
            aria-hidden
            style={{
              color: "var(--accent-bright)",
              textShadow: isActive ? "0 0 10px rgba(168, 85, 247, 0.5)" : undefined,
            }}
          >
            {link.label}
          </span>
        </span>
      </motion.a>
    </li>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce                  = usePrefersReducedMotion();
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

  const initials = data.personal.name.split(" ").map((w) => w[0]).join("");

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b backdrop-blur-xl" : "border-b border-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "rgba(8, 7, 13, 0.72)", borderColor: "var(--border)" }
          : {}
      }
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo — monogram z gradientem aurora */}
        <a
          href="#"
          aria-label={`${initials} — ${data.personal.name}, początek strony`}
          className="group relative inline-flex items-center transition-transform duration-200 hover:-translate-y-px"
        >
          <span
            className="text-2xl font-extrabold tracking-tight"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {initials}
          </span>
          <span
            aria-hidden
            className="ml-0.5 h-1.5 w-1.5 self-end rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", marginBottom: "0.35rem" }}
          />
        </a>

        {/* Desktop links — magnetyczne + kinetyczny swap (wariant 4) */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              isActive={active === link.href.slice(1)}
              onNavClick={handleNavClick}
              reduce={reduce}
            />
          ))}
        </ul>

        {/* Desktop CTA — magnetic + gradient border */}
        <MagneticButton
          href="/cv-print"
          target="_blank"
          rel="noopener noreferrer"
          clamp={10}
          className="cta-ghost hidden rounded-full px-4 py-2 text-sm font-medium md:inline-flex md:items-center"
        >
          Pobierz CV
        </MagneticButton>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-2 transition-colors md:hidden"
          style={{ color: "var(--text-muted)" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Scroll progress bar — gradient aurora */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 origin-left"
        style={{
          scaleX,
          height: "1.5px",
          background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)",
        }}
      />

      {/* Mobile menu — glassmorphism v2 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t md:hidden"
            style={{
              backgroundColor: "rgba(8, 7, 13, 0.85)",
              borderColor: "var(--border)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNavClick}
                      className="flex items-center gap-3 py-3 text-base transition-colors duration-200"
                      style={{
                        color: isActive ? "var(--text)" : "var(--text-muted)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      <span
                        aria-hidden
                        className="h-4 w-[2px] rounded-full transition-all duration-200"
                        style={{
                          background: isActive
                            ? "linear-gradient(180deg, var(--accent), var(--accent-2))"
                            : "transparent",
                        }}
                      />
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2 border-t pt-3" style={{ borderColor: "var(--border)" }}>
                <a
                  href="/cv-print"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="cta-ghost block rounded-full py-2 text-center text-sm font-medium"
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
