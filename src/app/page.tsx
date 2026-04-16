import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/features/Hero";
import About from "@/components/features/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
