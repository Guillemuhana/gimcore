import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(222 30% 6%)",
        surface: "hsl(222 25% 9%)",
        "surface-hover": "hsl(222 22% 12%)",
        border: "hsl(222 18% 16%)",
        foreground: "hsl(210 20% 96%)",
        muted: "hsl(215 14% 60%)",
        primary: {
          DEFAULT: "hsl(158 64% 52%)",
          foreground: "hsl(222 30% 6%)",
        },
        accent: {
          DEFAULT: "hsl(266 85% 66%)",
          foreground: "hsl(210 20% 96%)",
        },
        danger: "hsl(0 72% 58%)",
        warning: "hsl(38 92% 58%)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(158 64% 52% / 0.15), 0 8px 30px hsl(158 64% 52% / 0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
