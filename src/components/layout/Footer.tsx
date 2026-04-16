import data from "@/config/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
          © {year} {data.personal.name}
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
          Built with{" "}
          <span style={{ color: "var(--accent)" }}>Next.js</span>
          {" & "}
          <span style={{ color: "var(--accent)" }}>Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
