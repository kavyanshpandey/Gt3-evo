import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        carbon: "#111111",
        carbon2: "#1a1a1a",
        racered: "#FF1E1E",
        iceblue: "#00D4FF",
        silver: "#BFC3C7",
        gold: "#D4AF37",
        ghost: "#F5F5F5",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        mono: ['"Orbitron"', "ui-monospace", "monospace"],
        body: ['"Space Grotesk"', "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "scan-line": "scan-line 4s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "ember": "ember 6s ease-in-out infinite",
      },
      keyframes: {
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ember: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.4" },
          "50%": { transform: "translateY(-30px) scale(1.2)", opacity: "0.9" },
        },
      },
      boxShadow: {
        "glow-red": "0 0 40px rgba(255, 30, 30, 0.4), 0 0 80px rgba(255, 30, 30, 0.2)",
        "glow-blue": "0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2)",
        "glow-gold": "0 0 30px rgba(212, 175, 55, 0.35)",
        "inset-dark": "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
