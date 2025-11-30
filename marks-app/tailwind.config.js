/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        muted: "oklch(var(--foreground-muted))",
        card: "oklch(var(--card))",
        border: "#000",
        strong: "oklch(var(--border-strong))",
        hover: "oklch(var(--hover))",
        accent: "oklch(var(--accent))",
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"],
      },
      borderRadius: {
        xl: "14px",
      }
    },
  },
  plugins: [],
};
