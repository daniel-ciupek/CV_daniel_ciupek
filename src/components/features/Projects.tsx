"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

const springConfig = { stiffness: 260, damping: 28 };

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function repoName(githubUrl: string) {
  return githubUrl.split("/").pop() ?? "repo";
}

function padIndex(n: number, total: number) {
  return `${String(n).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
}

function ProjectCard({
  project,
  index,
  total,
  delay,
}: {
  project: (typeof data.projects)[number];
  index: number;
  total: number;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-6, 6]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-1, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-1, 1], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const slug = toSlug(project.title);
  const repo = project.github ? repoName(project.github) : slug;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative flex flex-col rounded-2xl"
    >
      {/* Base background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          transition: "border-color 0.3s",
        }}
      />

      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}% ${y}%, rgba(0,212,255,0.08) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Content — lifted in Z */}
      <div
        className="relative flex flex-1 flex-col"
        style={{ transform: "translateZ(10px)", borderRadius: "inherit" }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center justify-between rounded-t-2xl px-4 py-3"
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
          <span
            className="font-mono text-[11px]"
            style={{ color: "var(--text-subtle)" }}
          >
            ~/projects/{slug}
          </span>
          <span
            className="font-mono text-[11px]"
            style={{ color: "var(--text-subtle)" }}
          >
            {padIndex(index, total)}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Git clone line */}
          <p
            className="mb-4 font-mono text-xs"
            style={{ color: "var(--text-subtle)" }}
          >
            <span style={{ color: "var(--accent)", opacity: 0.7 }}>$ </span>
            git clone daniel-ciupek/{repo}
            <span
              className="ml-0.5 inline-block h-[1.1em] w-[7px] align-text-bottom"
              style={{ background: "var(--accent)", opacity: 0.8, animation: "pulse 1.1s ease-in-out infinite" }}
            />
          </p>

          {/* Title */}
          <h3 className="mb-3 text-base font-semibold" style={{ color: "var(--text)" }}>
            <span style={{ color: "var(--text-subtle)", marginRight: "0.35em" }}>#</span>
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="mb-5 flex-1 text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Stack */}
          <div className="mb-5">
            <span
              className="mb-2 block font-mono text-[11px] font-medium"
              style={{ color: "var(--text-subtle)" }}
            >
              ▸ stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    className="inline-block h-1 w-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)", opacity: 0.7 }}
                  />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div
            className="mb-4"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, rgba(0,212,255,0.20) 0%, transparent 100%)",
            }}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <FaGithub size={13} />
                source →
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
                style={{ color: "var(--accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--accent)")}
              >
                <ExternalLink size={12} />
                live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects = data.projects;
  const total = projects.length;

  return (
    <section id="projects" className="relative px-6 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl" style={{ perspective: "1200px" }}>
        <SectionHeader index="04" total="05" title="PROJEKTY" subtitle="// projects/" />

        {/* Empty state */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="mb-2 font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
              <span style={{ color: "var(--accent)", opacity: 0.7 }}>$ </span>
              ls projects/
            </p>
            <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
              directory is empty
            </p>
            <p className="mt-1 font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
              Uzupełnij <code>projects[]</code> w <code>src/config/data.ts</code>
            </p>
          </motion.div>
        )}

        {/* Project grid */}
        {projects.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i + 1}
                total={total}
                delay={i * 0.08}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
