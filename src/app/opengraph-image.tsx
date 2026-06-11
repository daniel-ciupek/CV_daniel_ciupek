import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import data from "@/config/data";

export const dynamic = "force-static";
export const alt = `${data.personal.name} — ${data.personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#00D4FF";
const STACK = ["Laravel", "Vue 3", "PostgreSQL", "Docker"];

const avatar = readFileSync(join(process.cwd(), "public/MyImage/avatarDc.jpeg"));
const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

export default function Image() {
  const domain = (data.personal.website ?? "").replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#050505",
          backgroundImage: `radial-gradient(720px circle at 84% 50%, rgba(0,212,255,0.20) 0%, transparent 55%)`,
          color: "#F1F5F9",
          fontFamily: "sans-serif",
        }}
      >
        {/* Lewa kolumna — tekst */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "620px" }}>
          {/* Akcentowa kreska */}
          <div
            style={{
              display: "flex",
              width: "84px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: ACCENT,
              marginBottom: "36px",
            }}
          />

          {/* Imię */}
          <div style={{ fontSize: "78px", fontWeight: 700, letterSpacing: "-3px", lineHeight: 1 }}>
            {data.personal.name}
          </div>

          {/* Tytuł */}
          <div style={{ fontSize: "44px", fontWeight: 600, color: ACCENT, marginTop: "18px" }}>
            {data.personal.title}
          </div>

          {/* Stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "40px" }}>
            {STACK.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: "24px",
                  color: "#CBD5E1",
                  padding: "9px 20px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Domena */}
          <div style={{ fontSize: "24px", color: ACCENT, marginTop: "44px" }}>
            {domain}
          </div>
        </div>

        {/* Prawa kolumna — zdjęcie */}
        <img
          src={avatarSrc}
          width={384}
          height={384}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center 18%",
            border: "4px solid rgba(0,212,255,0.55)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
