"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TechStackGrid from "./TechStackGrid";

export default function TechStack() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative px-6 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="03" total="05" title="UMIEJĘTNOŚCI" subtitle="Technologie i narzędzia" headingId="skills-heading" />
        <TechStackGrid />
      </div>
    </section>
  );
}
