"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SLIDE_INTERVAL_MS = 3500;

type Project = (typeof data.projects)[number];

// Monogram z tytułu (fallback podglądu dla projektów bez zrzutów)
function monogram(title: string) {
  return title
    .split(/[\s—–-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ─── Auto-slideshow screenów (crossfade) ──────────────────────────
function ProjectScreenshots({ images, alt }: { images: string[]; alt: string }) {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced || images.length < 2) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      SLIDE_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [reduced, images.length]);

  return (
    <div className="absolute inset-0" style={{ backgroundColor: "var(--bg-elevated)" }}>
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={i === 0 ? alt : ""}
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className="object-cover object-top"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Fallback podglądu — aurora + monogram (projekty bez zrzutów)
function FallbackPreview({ title, big = false }: { title: string; big?: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid place-items-center"
      style={{
        background:
          "radial-gradient(120% 120% at 28% 18%, rgba(0,212,255,0.10), transparent 55%), radial-gradient(120% 120% at 82% 88%, rgba(52,211,153,0.08), transparent 55%), var(--bg-elevated)",
      }}
    >
      <span
        className={`font-mono font-bold tracking-tight ${big ? "text-5xl sm:text-6xl" : "text-lg"}`}
        style={{
          background: "var(--gradient-aurora)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          opacity: 0.9,
        }}
      >
        {monogram(title)}
      </span>
    </div>
  );
}

// Podgląd w dużej karcie: slideshow zrzutów lub fallback
function DetailPreview({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  if (shots.length > 0) {
    return <ProjectScreenshots images={shots} alt={`${project.title} — zrzut ekranu`} />;
  }
  return <FallbackPreview title={project.title} big />;
}

// Podgląd w miniaturze: pierwszy zrzut (statyczny) lub fallback
function ThumbPreview({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  if (shots.length > 0) {
    return (
      <Image
        src={shots[0]}
        alt=""
        fill
        sizes="150px"
        className="object-cover object-top"
      />
    );
  }
  return <FallbackPreview title={project.title} />;
}

// ─── Współdzielone kawałki treści ─────────────────────────────────
function StackPills({ stack }: { stack: readonly string[] }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full px-2.5 py-1 text-xs"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors duration-200"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.borderColor = "var(--border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <FaGithub size={14} />
          Kod
        </a>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-opacity duration-200 hover:opacity-90"
          style={{ background: "var(--accent)", color: "var(--bg-base)" }}
        >
          <ExternalLink size={14} />
          Live
        </a>
      )}
    </div>
  );
}

// ─── Miniatura w pasku selektora ──────────────────────────────────
function Thumb({
  project,
  index,
  active,
  onSelect,
  tabRef,
}: {
  project: Project;
  index: number;
  active: boolean;
  onSelect: (i: number) => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={tabRef}
      role="tab"
      aria-selected={active}
      aria-controls="project-detail"
      id={`project-tab-${index}`}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(index)}
      className="group w-32 flex-shrink-0 rounded-lg text-left sm:w-36"
      style={{ opacity: active ? 1 : 0.55, transition: "opacity 0.2s" }}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg"
        style={
          active
            ? {
                padding: "1.5px",
                background: "var(--gradient-aurora)",
                boxShadow: "0 0 20px rgba(0,212,255,0.22)",
              }
            : { border: "1px solid var(--border)" }
        }
      >
        <div className="relative h-full w-full overflow-hidden rounded-[6px]">
          <ThumbPreview project={project} />
        </div>
      </div>
      <span
        className="mt-2 block truncate text-xs transition-colors duration-200"
        style={{ color: active ? "var(--accent)" : "var(--text-muted)" }}
      >
        {project.title}
      </span>
    </button>
  );
}

// ─── Switcher: duża karta + pasek miniatur ────────────────────────
function ProjectSwitcher({ projects }: { projects: readonly Project[] }) {
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState(0);
  const total = projects.length;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[selected];

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = selected;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (selected + 1) % total;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (selected - 1 + total) % total;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else return;
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Duża karta — glass, podgląd na górze */}
      <div
        id="project-detail"
        role="tabpanel"
        aria-labelledby={`project-tab-${selected}`}
        className="overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative h-[220px] w-full overflow-hidden sm:h-[300px] md:h-[380px]"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <DetailPreview project={project} />
            </div>

            <div className="p-6 md:p-8">
              {selected === 0 && (
                <span
                  className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
                  style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                >
                  Wyróżniony projekt
                </span>
              )}
              <h3
                className="mb-2 text-xl font-semibold md:text-2xl"
                style={{ color: "var(--text)" }}
              >
                {project.title}
              </h3>
              <p
                className="mb-5 max-w-3xl text-sm leading-relaxed md:text-[15px]"
                style={{ color: "var(--text-muted)" }}
              >
                {project.description}
              </p>
              <StackPills stack={project.stack} />
              <ProjectLinks project={project} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nagłówek selektora + licznik */}
      <div className="mb-3 mt-8 flex items-center justify-between">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: "var(--text-muted)" }}
        >
          Wszystkie projekty
        </span>
        <span
          className="font-mono text-[11px] tabular-nums"
          style={{ color: "var(--text-muted)" }}
        >
          {String(selected + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Pasek miniatur — data-lenis-prevent-touch: oddaj poziomy scroll natywnie,
          bo Lenis (syncTouch) przejmuje dotyk na całej stronie i psuje przewijanie palcem */}
      <div
        role="tablist"
        aria-label="Wybór projektu"
        onKeyDown={onKeyDown}
        data-lenis-prevent-touch
        className="no-scrollbar flex touch-pan-x gap-3 overflow-x-auto overscroll-x-contain pb-2"
      >
        {projects.map((p, i) => (
          <Thumb
            key={p.title}
            project={p}
            index={i}
            active={i === selected}
            onSelect={setSelected}
            tabRef={(el) => {
              tabRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const projects = data.projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative px-6 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeader index="04" total="05" title="PROJEKTY" headingId="projects-heading" />

        {projects.length === 0 ? (
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Uzupełnij <code>projects[]</code> w <code>src/config/data.ts</code>.
            </p>
          </div>
        ) : (
          <ProjectSwitcher projects={projects} />
        )}
      </div>
    </section>
  );
}
