"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import data from "@/config/data";
import SectionHeader from "@/components/ui/SectionHeader";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Projects() {
  const projects = data.projects;

  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeader index="04" total="05" title="PROJEKTY" subtitle="// projects/" />

        {/* Empty state */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
            style={{
              border: "1px dashed var(--border)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <Layers size={40} className="mb-4" style={{ color: "var(--text-subtle)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Projekty zostaną dodane wkrótce
            </p>
            <p className="mt-1 font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
              Uzupełnij <code>projects[]</code> w <code>src/config/data.ts</code>
            </p>
          </motion.div>
        )}

        {/* Project cards */}
        {projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.article
                key={project.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex flex-col rounded-2xl p-6 transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,212,255,0.30)";
                  el.style.boxShadow = "0 8px 32px rgba(0,212,255,0.08)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Project image */}
                {project.image && (
                  <div className="mb-5 h-44 w-full overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Title */}
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-5 flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {project.description}
                </p>

                {/* Stack badges */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="rounded-md px-2.5 py-1 font-mono text-xs"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        color: "var(--accent-dim)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs transition-colors duration-200"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
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
                      className="flex items-center gap-1.5 text-xs transition-colors duration-200"
                      style={{ color: "var(--accent)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-dim)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--accent)")}
                    >
                      <ExternalLink size={14} />
                      Live demo
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
