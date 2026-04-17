"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiPostman,
  SiGooglegemini,
} from "react-icons/si";
import { BrainCircuit, Terminal } from "lucide-react";
import data from "@/config/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  PHP: SiPhp,
  Laravel: SiLaravel,
  "Node.js": SiNodedotjs,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Vue 3": SiVuedotjs,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  Git: SiGit,
  Postman: SiPostman,
  "REST API": Terminal,
  "Claude Code": BrainCircuit,
  Cursor: BrainCircuit,
  Gemini: SiGooglegemini,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function TechStack() {
  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeader index="03" total="05" title="UMIEJĘTNOŚCI" subtitle="// stack.json" />

        {/* Categories */}
        <div className="space-y-12">
          {data.skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              {/* Category label */}
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-subtle)" }}
              >
                {group.category}
              </p>

              {/* Skill badges */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {group.items.map((skill) => {
                  const Icon = iconMap[skill];
                  return (
                    <motion.div
                      key={skill}
                      variants={itemVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="flex cursor-default items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(0,212,255,0.40)";
                        el.style.color = "var(--text)";
                        el.style.boxShadow = "0 0 16px rgba(0,212,255,0.10)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--text-muted)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          style={{ color: "var(--accent)", flexShrink: 0 }}
                        />
                      )}
                      {skill}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
