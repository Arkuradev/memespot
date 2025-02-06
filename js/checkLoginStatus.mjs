// Checks if user is logged in.

// Work out a solution to block certain pages if user is not logged in.
// When a user is not logged in they should be redirected to the login page.

export function checkLoginStatus() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to view this page. Please log in.");
    window.location.href = "../account/login.html";
  }
}
