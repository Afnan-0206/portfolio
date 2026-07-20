/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   "#050817",
          secondary: "#091126",
          elevated:  "#0C1530",
          purpleMuted: "#211A33",
        },
        border: {
          DEFAULT: "rgba(148, 163, 184, 0.20)",
          subtle:  "rgba(148, 163, 184, 0.10)",
        },
        text: {
          primary:   "#F8FAFC",
          secondary: "#C7D2E2",
          muted:     "#8FA2B8",
        },
        accent: {
          cyan:   "#22D3EE",
          cyanDeep: "#0E7490",
          violet: "#8B5CF6",
          green:  "#34D399",
          amber:  "#F59E0B",
          pink:   "#EC4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Geist Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        "ultra": "0.4em",
        "wide-xl": "0.3em",
      },
      boxShadow: {
        "glow-cyan":   "0 0 40px -10px rgba(34,211,238,0.3)",
        "glow-violet": "0 0 40px -10px rgba(139,92,246,0.3)",
        "glow-green":  "0 0 40px -10px rgba(52,211,153,0.3)",
        "card":        "0 24px 80px -30px rgba(0,0,0,0.8)",
        "card-hover":  "0 32px 100px -20px rgba(0,0,0,0.85)",
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease-out",
        "slide-up":   "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" },               "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
