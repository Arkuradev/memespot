/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  safelist: ["animate-spin"],
  theme: {
    extend: {},
  },
  plugins: [],
};
