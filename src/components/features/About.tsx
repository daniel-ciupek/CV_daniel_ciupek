"use client";

import { motion, type Variants } from "framer-motion";
import { Code2, Database, Layers, Rocket } from "lucide-react";
import data from "@/config/data";

const highlights = [
  {
    icon: Code2,
    label: "Frontend",
    value: "React / Vue / Next.js",
  },
  {
    icon: Database,
    label: "Backend",
    value: "PHP / Laravel / Node.js",
  },
  {
    icon: Layers,
    label: "Bazy danych",
    value: "MySQL / PostgreSQL",
  },
  {
    icon: Rocket,
    label: "DevOps",
    value: "Docker / Git",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      {/* Section label */}
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-sm tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          O mnie
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 text-3xl font-bold md:text-4xl"
          style={{ color: "var(--text)" }}
        >
          Kim jestem
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {data.personal.bio ? (
              <p
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "var(--text-muted)" }}
              >
                {data.personal.bio}
              </p>
            ) : (
              <div className="space-y-4">
                <p
                  className="text-base leading-relaxed md:text-lg"
                  style={{ color: "var(--text-muted)" }}
                >
                  Jestem Full Stack Developerem z pasją do tworzenia nowoczesnych
                  aplikacji webowych. Specjalizuję się w ekosystemie PHP/Laravel
                  na backendzie oraz React i Vue.js na frontendzie.
                </p>
                <p
                  className="text-base leading-relaxed md:text-lg"
                  style={{ color: "var(--text-muted)" }}
                >
                  Stale rozwijam swoje umiejętności — posiadam{" "}
                  <span style={{ color: "var(--accent)" }}>
                    {data.certificates.length} certyfikatów Udemy
                  </span>{" "}
                  potwierdzających kompetencje w obszarach backend, frontend,
                  baz danych, DevOps i AI.
                </p>
              </div>
            )}
          </motion.div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-xl p-5 transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,212,255,0.30)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                }}
              >
                <item.icon
                  size={22}
                  className="mb-3 transition-colors duration-300"
                  style={{ color: "var(--accent)" }}
                />
                <p
                  className="mb-1 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
