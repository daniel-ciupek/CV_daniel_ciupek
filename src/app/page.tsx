import data from "@/config/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
        🚧 Building {data.personal.name}&apos;s portfolio...
      </p>
    </main>
  );
}
