import { apiFetch } from "./apiFetch.mjs";
import { displayMessage } from "./displayMessage.mjs";

/**
 * Fetches the profile data of the logged-in user and updates the DOM with
 * the user's email, avatar, name, and bio. If no token is found in localStorage,
 * the function logs an error, displays a message to the user, and redirects
 * to the login page. Prefills the edit form fields with the fetched data.
 */

export async function fetchProfile() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");
  if (!token) {
    console.error(
      "Missing token or username in localStorage. Please log in first."
    );
    displayMessage("#message", "error", "Please log in first.");
    return (window.location.href = "/account/login.html");
  }

  const { data } = await apiFetch(`/profiles/${username}`);

  document.getElementById("profileEmail").textContent = "Email: " + data.email;
  document.getElementById("profileAvatar").src =
    data.avatar?.url || "default-avatar.jpg";
  document.getElementById("profileName").textContent = data.name;
  document.getElementById("profileBio").textContent =
    data.bio || "No bio set yet";

  // Prefill edit form.
  document.getElementById("editAvatar").value = data.avatar?.url;
  document.getElementById("editBio").value = data.bio;
}

function main() {
  fetchProfile();
}

main();
