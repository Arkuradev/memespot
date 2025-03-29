document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("themeToggleButton");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");
  const html = document.documentElement;

  function updateButton() {
    if (html.classList.contains("dark")) {
      themeIcon.textContent = "☀️"; // Sun icon
      themeText.textContent = "Light Mode";
    } else {
      themeIcon.textContent = "🌙"; // Moon icon
      themeText.textContent = "Dark Mode";
    }
  }

  // Load theme from localStorage
  if (localStorage.getItem("theme") === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark"); // Default to dark mode
  }

  updateButton(); // Set correct icon & text on load

  // Toggle theme on button click
  toggleButton.addEventListener("click", () => {
    html.classList.toggle("dark");

    const newTheme = html.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    updateButton(); // Update icon & text after change
  });
});
