import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/features/Hero";
import About from "@/components/features/About";
import TechStack from "@/components/features/TechStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
      </main>
    </>
  );
}
