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
          primary:   "#090A0C", // Deep obsidian
          secondary: "#121316", // Rich charcoal
          elevated:  "#18191E", // Elevated surface
          card:      "#141519", // Clean card background
          subtle:    "#1D1E24", // Subtle border fill
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          subtle:  "rgba(255, 255, 255, 0.05)",
          hover:   "rgba(255, 255, 255, 0.15)",
        },
        text: {
          primary:   "#F4F4F5", // Crisp chalk white
          secondary: "#A1A1AA", // Muted slate gray
          muted:     "#71717A", // Subtle tertiary
        },
        accent: {
          amber:  "#F59E0B",
          warm:   "#E2B36E",
          emerald:"#10B981",
          silver: "#E4E4E7",
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
        "ultra": "0.3em",
        "wide-xl": "0.2em",
      },
      boxShadow: {
        "card":        "0 12px 40px -10px rgba(0,0,0,0.6)",
        "card-hover":  "0 20px 50px -10px rgba(0,0,0,0.8)",
        "warm-glow":   "0 0 30px -8px rgba(226,179,110,0.2)",
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
