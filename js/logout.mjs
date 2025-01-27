// Deploy a fix for mobile menu so the loginLink updates when the user is logged in.

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded!");

  const loginLink = document.getElementById("loginLink");

  if (!loginLink) {
    console.error("No login link found!");
    return;
  }

  // Check login state

  const isUserLoggedIn = localStorage.getItem("name");

  if (isUserLoggedIn) {
    // Update the link to "Log Out"
    loginLink.textContent = "Log Out";
    loginLink.href = "#"; // Prevent navigation on logout
  }

  // Attach event listener to the link
  loginLink.addEventListener("click", (event) => {
    if (isUserLoggedIn) {
      // Log out flow
      event.preventDefault();
      if (confirm("Are you sure you want to log out?")) {
        logOutUser();
      }
    } else {
      // Log in flow (redirect to login page)
      console.log("Redirecting to login...");
      loginLink.href = "../account/login.html";
    }
  });

  function logOutUser() {
    console.log("Logging out...");
    localStorage.clear(); // Clear login data
    loginLink.textContent = "Log In"; // Update link back to "Log In"
    loginLink.href = "../account/login.html"; // Update link destination
    console.log("User logged out.");
    // Optionally redirect to the login page or a confirmation page
    window.location.href = "../account/login.html";
  }
});
