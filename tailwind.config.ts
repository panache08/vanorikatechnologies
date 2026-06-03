import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0A2540", light: "#0D3160", dark: "#061830" },
        electric: { DEFAULT: "#2563EB", light: "#3B82F6", dark: "#1D4ED8" },
        cyan: { DEFAULT: "#06B6D4", light: "#22D3EE", dark: "#0891B2" },
        charcoal: { DEFAULT: "#111827", light: "#1F2937" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-plus-jakarta)"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0A2540 0%, #2563EB 100%)",
        "electric-gradient": "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
        "hero-gradient": "linear-gradient(135deg, #0A2540 0%, #0D3160 50%, #1D4ED8 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.05) 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, #0A2540 0, transparent 50%), radial-gradient(at 80% 0%, #2563EB 0, transparent 50%), radial-gradient(at 0% 50%, #06B6D4 0, transparent 50%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-blue": "pulseBlue 2s ease-in-out infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulseBlue: { "0%,100%": { boxShadow: "0 0 20px rgba(37,99,235,0.3)" }, "50%": { boxShadow: "0 0 40px rgba(37,99,235,0.6)" } },
        gradientX: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
