import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/features/Hero";

// Sekcje pod pierwszym ekranem ładowane jako osobne chunki (next/dynamic, ssr:true
// domyślnie → HTML/SEO bez zmian). Rozbicie jednego dużego bundla na mniejsze
// moduły skraca długie zadania głównego wątku podczas hydratacji → mniej „zwiechy"
// na starcie na słabszych telefonach. Above-the-fold (Navbar, Hero) zostaje inline.
const About = dynamic(() => import("@/components/features/About"));
const Certifications = dynamic(() => import("@/components/features/Certifications"));
const TechStack = dynamic(() => import("@/components/features/TechStack"));
const Projects = dynamic(() => import("@/components/features/Projects"));
const Contact = dynamic(() => import("@/components/features/Contact"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Certifications />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
