import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ["GeistSans", "sans-serif"],
      },
      colors: {
        gray: {
          50: "#f9fafb", // Background
          100: "#f3f4f6",
          200: "#e5e7eb", // Card border
          300: "#d1d5db",
          700: "#374151", // Label text
          800: "#1f2937", // Enhanced prompt text
          900: "#111827", // Main text
        },
        white: "#ffffff", // For cards and header/footer
        blue: {
          500: "#3b82f6", // Accent color for focus rings
          600: "#2563eb", // Button color
          700: "#1d4ed8", // Button hover
        },
      },
    },
  },
  plugins: [],
};

export default config;

// Add this line at the bottom
export {};
