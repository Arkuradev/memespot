function main() {
  const toggleButton = document.getElementById("themeToggleButton");
  const html = document.documentElement;

  if (localStorage.getItem("theme") === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
  }

  if (toggleButton) {
    function updateButton() {
      toggleButton.innerHTML = html.classList.contains("dark")
        ? `☀️ Light Mode`
        : `🌙 Dark Mode`;
    }

    updateButton();

    toggleButton.addEventListener("click", () => {
      html.classList.toggle("dark");

      const theme = html.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", theme);

      updateButton();
    });
  }
}

main();
