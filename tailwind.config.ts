import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      colors: {
        "cyber-cyan": "#00F5FF",
        "deep-cyan": "#0e4e5d",
        "sapphire-blue": "#1f3b73",
        "mint-green": "#7fffd4",
        "silver-glow": "#c5d1e4",
        "glass-dark": "rgba(8,18,37,0.65)",
        "glass-light": "rgba(255,255,255,0.12)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(15,51,92,0.85), rgba(26,83,105,0.8), rgba(64,224,208,0.35))",
        "card-gradient":
          "linear-gradient(135deg, rgba(0, 164, 189, 0.85), rgba(64, 224, 208, 0.75), rgba(192, 211, 224, 0.55))",
        "card-gradient-dark":
          "linear-gradient(135deg, rgba(12, 48, 63, 0.95), rgba(9, 132, 227, 0.85), rgba(94, 234, 212, 0.45))",
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0, 45, 85, 0.35)",
      },
      backdropBlur: {
        ultra: "30px",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
};

export default config;

