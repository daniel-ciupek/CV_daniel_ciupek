"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const springConfig = { stiffness: 260, damping: 28 };
const SLIDE_INTERVAL_MS = 3500;

type Project = (typeof data.projects)[number];

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
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover object-top"
          />
        </motion.div>
      ))}

      {/* Delikatny gradient u dołu — pod kropki */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }}
      />

      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 16 : 6,
                background: i === idx ? "var(--accent)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
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
    <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3">
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

// ─── Karta projektu (glass + 3D tilt) ─────────────────────────────
function ProjectCard({
  project,
  delay,
  featured = false,
}: {
  project: Project;
  delay: number;
  featured?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const tilt = featured ? 4 : 6;
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [tilt, -tilt]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-tilt, tilt]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-1, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-1, 1], [0, 100]), springConfig);

  const spotlight = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x}% ${y}%, rgba(0,212,255,0.10) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  const shots = project.screenshots ?? [];
  const hasMedia = shots.length > 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      className={`group relative ${featured ? "lg:col-span-2" : ""}`}
    >
      {/* Glass base + hover gradient */}
      <div
        className="absolute inset-0 overflow-hidden rounded-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
          boxShadow: hovered ? "0 24px 60px -24px rgba(0,212,255,0.25)" : "none",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.10) 0%, transparent 55%, rgba(52,211,153,0.08) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      {/* Spotlight podążający za kursorem */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background: spotlight }}
      />

      {/* Treść — uniesiona w Z */}
      <div
        className="relative flex h-full flex-col"
        style={{ transform: "translateZ(24px)" }}
      >
        {hasMedia && (
          <div
            className={`relative overflow-hidden rounded-t-3xl ${
              featured ? "aspect-[16/8]" : "aspect-video"
            }`}
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <ProjectScreenshots images={shots} alt={`${project.title} — zrzut ekranu`} />
          </div>
        )}

        <div className={`flex flex-1 flex-col ${featured ? "p-7 md:p-9" : "p-6"}`}>
          {featured && (
            <span
              className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
              style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
            >
              Wyróżniony projekt
            </span>
          )}
          <h3
            className={`mb-3 font-semibold ${featured ? "text-2xl font-bold md:text-3xl" : "text-lg"}`}
            style={{ color: "var(--text)" }}
          >
            {project.title}
          </h3>
          <p
            className={`mb-6 leading-relaxed ${featured ? "text-sm md:text-base" : "text-sm"}`}
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>
          <StackPills stack={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects = data.projects;

  return (
    <section id="projects" className="relative px-6 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl" style={{ perspective: "1200px" }}>
        <SectionHeader index="04" total="05" title="PROJEKTY" subtitle="// projects/" />

        {projects.length === 0 && (
          <div
            className="rounded-3xl p-8"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Uzupełnij <code>projects[]</code> w <code>src/config/data.ts</code>.
            </p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                delay={i * 0.06}
                featured={i === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
