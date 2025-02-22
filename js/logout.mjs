import { displayMessage } from "./displayMessage.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const desktopLoginLink = document.getElementById("desktopLoginLink");
  const mobileLoginLink = document.getElementById("mobileLoginLink");

  if (!desktopLoginLink || !mobileLoginLink) {
    console.error("No login link found!");
    return;
  }

  const isUserLoggedIn = localStorage.getItem("name");

  if (isUserLoggedIn) {
    updateLoginLinks("Log Out", "#");
  }
  [desktopLoginLink, mobileLoginLink].forEach((link) => {
    link.addEventListener("click", (event) => {
      if (isUserLoggedIn) {
        event.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
          displayMessage(
            "#message",
            "warning",
            "You have been logged out. Redirecting to login page."
          );
          logOutUser();
        }
      } else {
        displayMessage(
          "#message",
          "warning",
          "You are not logged in. Redirecting to login page."
        );
        link.href = "../account/login.html";
      }
    });
  });

  function logOutUser() {
    setTimeout(() => {
      localStorage.clear();
      updateLoginLinks("Log In", "../account/login.html");
      window.location.href = "../account/login.html";
    }, 2000);
  }

  function updateLoginLinks(text, href) {
    desktopLoginLink.textContent = text;
    desktopLoginLink.href = href;

    mobileLoginLink.textContent = text;
    mobileLoginLink.href = href;
  }
});
