import Navbar from "@/components/layout/Navbar";
import data from "@/config/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center pt-16">
        <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
          🚧 Building {data.personal.name}&apos;s portfolio...
        </p>
      </main>
    </>
  );
}
