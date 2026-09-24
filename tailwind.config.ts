import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f8f3",
          100: "#e3f0e3",
          200: "#c7e1c8",
          300: "#9ecca1",
          400: "#6eaf72",
          500: "#49934e",
          600: "#36763b",
          700: "#2d5e31",
          800: "#264b2a",
          900: "#1a391e",
          950: "#0c1f10"
        },
        sprout: {
          400: "#86c944",
          500: "#70b232",
          600: "#589123"
        },
        earth: {
          50: "#faf9f6",
          100: "#f2efe9",
          200: "#e5ded3",
          700: "#5c5549",
          900: "#2c2822"
        },
        accent: {
          400: "#d9b34a",
          500: "#c9a227",
          600: "#a9861f"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
export default config;
