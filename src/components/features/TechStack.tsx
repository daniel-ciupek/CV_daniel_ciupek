"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TechStackGrid from "./TechStackGrid";

export default function TechStack() {
  return (
    <section id="skills" className="relative px-6 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="03" total="05" title="UMIEJĘTNOŚCI" subtitle="// stack.json" />
        <TechStackGrid />
      </div>
    </section>
  );
}
