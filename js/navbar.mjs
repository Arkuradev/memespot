document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("#navToggle");
  const mobileMenu = document.querySelector("#mobileMenu");
  const closeMenu = document.querySelector("#closeMenu");

  if (!navToggle || !mobileMenu || !closeMenu) {
    console.error("Navbar elements not found in DOM.");
    return;
  }

  navToggle.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0", "opacity-100");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full", "opacity-0");
  });
});
