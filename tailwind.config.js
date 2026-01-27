/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: "#0E6B52",
            dark: "#0A4E3C",
          },
          gold: {
            DEFAULT: "#D4AF37",
            dark: "#B8922E",
          },
          ink: "#0B1220",
          muted: "#667085",
          bg: "#F6F8FA",
          card: "#FFFFFF",
          line: "#E5E7EB",
        },
      },
      boxShadow: {
        soft: "0 12px 30px rgba(2, 8, 23, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
