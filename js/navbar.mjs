const navToggle = document.querySelector("#navToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const closeMenu = document.querySelector("#closeMenu");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  mobileMenu.classList.add("translate-x-0");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("translate-x-full");
});
