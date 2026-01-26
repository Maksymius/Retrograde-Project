import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: "#050505",
          surface: "#111111",
          border: "#333333",
          text: "#E0E0E0",
          primary: "#FFB000", // Amber terminal
          accent: "#00FF41",  // Matrix green
          error: "#FF3333",   // Critical red
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "scanline": "scanline 8s linear infinite",
        // ОНОВЛЕНО: Більш "пружинна" анімація для реалістичного удару
        "stamp": "stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        stamp: {
          // 0%: Величезний штамп, прозорий (летить зверху)
          '0%': { opacity: '0', transform: 'scale(3) rotate(-12deg)' },
          // 50%: Момент удару (трохи стискається від сили)
          '50%': { opacity: '1', transform: 'scale(0.8) rotate(-12deg)' },
          // 100%: Стабілізація на папері
          '100%': { opacity: '1', transform: 'scale(1) rotate(-12deg)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;