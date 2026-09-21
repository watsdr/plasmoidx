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
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        mist: {
          50: "rgb(var(--mist-50) / <alpha-value>)",
          100: "rgb(var(--mist-100) / <alpha-value>)",
          200: "rgb(var(--mist-200) / <alpha-value>)",
          300: "rgb(var(--mist-300) / <alpha-value>)",
          400: "rgb(var(--mist-400) / <alpha-value>)",
        },
        aurora: {
          DEFAULT: "rgb(var(--aurora) / <alpha-value>)",
          soft: "rgb(var(--aurora-soft) / <alpha-value>)",
          deep: "rgb(var(--aurora-deep) / <alpha-value>)",
          glow: "rgb(var(--aurora-glow) / <alpha-value>)",
          violet: "#a78bfa",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(94, 234, 212, 0.15)",
        "glow-sm": "0 0 20px rgba(94, 234, 212, 0.1)",
      },
      backgroundImage: {
        "radial-ink":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(94, 234, 212, 0.12), transparent)",
        "torus-hint":
          "radial-gradient(circle at 50% 50%, rgba(94, 234, 212, 0.06) 0%, transparent 55%)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
