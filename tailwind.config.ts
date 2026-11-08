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
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          forest: "#1b4332",
          deep: "#0f281e",
          sand: "#e8ded1",
          earth: "#8c532b",
          terracotta: "#a04028",
          ocean: "#1d6363",
          parchment: "#faf8f5",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Noto Sans'",
          "'Noto Sans Sinhala'",
          "'Noto Sans Tamil'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

