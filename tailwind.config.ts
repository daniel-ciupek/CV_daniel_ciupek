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
        accent:          "#a855f7",
        "accent-bright": "#c4b5fd",
        "accent-dim":    "#c084fc",
        "accent-2":      "#e879f9",
        "holo-cyan":     "#22d3ee",
        "holo-indigo":   "#818cf8",
        "bg-base":       "#08070d",
        "bg-surface":    "#100e1a",
        "bg-elevated":   "#191527",
      },
      fontFamily: {
        sans:    ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-space-grotesk)", "var(--font-geist-sans)", "sans-serif"],
      },
      boxShadow: {
        accent: "0 0 30px rgba(168, 85, 247, 0.22)",
        "accent-lg": "0 0 60px rgba(168, 85, 247, 0.28)",
        "accent-2": "0 0 30px rgba(232, 121, 249, 0.18)",
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
