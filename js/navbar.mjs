const navToggle = document.querySelector("#navToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const closeMenu = document.querySelector("#closeMenu");

// Open the mobile menu by sliding it in from the right
navToggle.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  mobileMenu.classList.add("translate-x-0");
});

// Close the mobile menu by sliding it out to the right
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("translate-x-full");
});
