import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:     "#00d4ff",
        "accent-dim":  "#38bdf8",
        "bg-base":     "#050505",
        "bg-surface":  "#0f0f0f",
        "bg-elevated": "#171717",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-accent":
          "linear-gradient(135deg, #f1f5f9 0%, #00d4ff 100%)",
      },
      boxShadow: {
        accent: "0 0 30px rgba(0, 212, 255, 0.15)",
        "accent-lg": "0 0 60px rgba(0, 212, 255, 0.20)",
      },
      animation: {
        "blob-morph": "blobMorph 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blobMorph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%":       { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
