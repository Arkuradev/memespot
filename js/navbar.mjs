//Toggle for mobile menu
const navToggle = document.querySelector("#navToggle");
const mobileMenu = document.querySelector("#mobileMenu");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
