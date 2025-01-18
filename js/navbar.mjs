const loginLink = document.getElementById("loginLink");
const token = localStorage.getItem("token");
const themeToggle = document.getElementById("themeToggle");
const rootElement = document.documentElement;

// Changes the name of the login link on the navbar depending on if the user is logged in or not.
if (token) {
  loginLink.textContent = "Logout";
  loginLink.href = "#";
  loginLink.classList.add("text-red-500"); // Highlight logout link
  loginLink.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../account/login.html";
  });
}

// Theme toggle logic

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  rootElement.classList.add("dark", savedTheme === "dark");
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "🌞";
}

// Toggle theme on button click.
themeToggle.addEventListener("click", () => {
  const isDarkMode = rootElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  themeToggle.textContent = isDarkMode ? "🌙" : "🌞";
});
