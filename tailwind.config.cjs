/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./js/**/*.mjs", "!./node_modules/**/*"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        nav: "rgba(var(--nav))",
        background: "rgba(var(--background))",
        main: "rgba(var(--main))",
        hover: "rgba(var(--hover))",
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        tertiary: "rgba(var(--tertiary))",
        "btn-primary": "rgba(var(--btn-primary))",
        "btn-secondary": "rgba(var(--btn-secondary))",
        border: "rgba(var(--border))",
      },
    },
  },
  plugins: [],
};
