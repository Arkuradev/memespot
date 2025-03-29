/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./js/**/*.mjs", "!./node_modules/**/*"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        grape: "var(--grape)",
      },
    },
  },
  plugins: [],
};
