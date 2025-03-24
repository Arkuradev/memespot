/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./js/**/*.mjs", "!./node_modules/**/*"],
  safelist: ["animate-spin"],
  theme: {
    extend: {},
  },
  plugins: [],
};
