import { displayMessage } from "./displayMessage.mjs";

// Deploy a fix for mobile menu so the loginLink updates when the user is logged in.

document.addEventListener("DOMContentLoaded", () => {
  const desktopLoginLink = document.getElementById("desktopLoginLink");
  const mobileLoginLink = document.getElementById("mobileLoginLink");

  if (!desktopLoginLink || !mobileLoginLink) {
    console.error("No login link found!");
    return;
  }

  // Check login state
  const isUserLoggedIn = localStorage.getItem("name");

  if (isUserLoggedIn) {
    // Update the link to "Log Out"
    updateLoginLinks("Log Out", "#");
  }

  // Attach event listener to the link
  [desktopLoginLink, mobileLoginLink].forEach((link) => {
    link.addEventListener("click", (event) => {
      if (isUserLoggedIn) {
        // Log out flow
        event.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
          displayMessage(
            "#message",
            "warning",
            "You have been logged out Redirecting to login page."
          );
          logOutUser();
        }
      } else {
        // Log in flow (redirect to login page)

        console.log("Redirecting to login...");
        link.href = "../account/login.html";
      }
    });
  });

  function logOutUser() {
    setTimeout(() => {
      localStorage.clear(); // Clear login data
      updateLoginLinks("Log In", "../account/login.html"); // Update link destination
      // Optionally redirect to the login page or a confirmation page
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
