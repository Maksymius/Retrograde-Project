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
        "stamp": "stamp 0.4s cubic-bezier(0.15, 2, 0.5, 0.5) forwards", // Пружинний ефект
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
          '0%': { opacity: '0', transform: 'scale(4) rotate(0deg)' }, // Летить здалеку
          '50%': { opacity: '1', transform: 'scale(1) rotate(-12deg)' }, // Вдаряється
          '70%': { transform: 'scale(1.1) rotate(-12deg)' }, // Відскакує трохи
          '100%': { opacity: '1', transform: 'scale(1) rotate(-12deg)' }, // Застигає
        }
      },
    },
  },
  plugins: [],
};
export default config;