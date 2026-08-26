import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8f2",
          100: "#e0efe0",
          200: "#c2dfc3",
          300: "#97c79a",
          400: "#68a96d",
          500: "#478c4d",
          600: "#357039",
          700: "#2b5930",
          800: "#244729",
          900: "#1e3a23",
          950: "#0f2012"
        },
        accent: {
          400: "#d9b34a",
          500: "#c9a227",
          600: "#a9861f"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
