import { apiFetch } from "./apiFetch.mjs";
import { token } from "./constants.mjs";
const loggedInUser = localStorage.getItem("name");

/**
 * Fetches and displays the profile data of the logged-in user.
 * If no token is found, logs an error and redirects to the login page.
 * Updates the DOM elements with the user's avatar, email, name, and bio.
 */
async function fetchMyProfile() {
  if (!token) {
    console.error("Missing token, please log in before viewing this page.");
    return (window.location.href = "/account/login.html");
  }
  const { data } = await apiFetch(`/profiles/${loggedInUser}`);

  document.getElementById("profileAvatar").src =
    data.avatar?.url || "default-avatar.jpg";
  document.getElementById("profileEmail").textContent =
    "Your Email: " + data.email;
  document.getElementById("profileName").textContent = data.name;
  document.getElementById("profileBio").textContent =
    "Your Bio: " + data.bio || "No bio set yet.";
}

/**
 * Initializes the page by fetching and displaying the logged-in user's profile
 * data.
 */

function main() {
  fetchMyProfile();
}

main();
