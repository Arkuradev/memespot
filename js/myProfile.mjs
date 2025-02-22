import { API_KEY } from "./constants.mjs";
import { token } from "./constants.mjs";

const loggedInUser = localStorage.getItem("name");

/**
 * Fetches the profile data of the logged-in user and updates the DOM with
 * the user's avatar, email, name, and bio. If no token is found in localStorage,
 * the function logs an error and returns early. Handles errors in fetching
 * profile data by logging them to the console.
 */

async function fetchMyProfile() {
  if (!token) {
    console.error("Missing token, please log in before viewing this page.");
    return (window.location.href = "/account/login.html");
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${loggedInUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch your profile: ${response.status}`);

    const { data } = await response.json();

    document.getElementById("profileAvatar").src =
      data.avatar?.url || "default-avatar.jpg";
    document.getElementById("profileEmail").textContent =
      "Your Email: " + data.email;
    document.getElementById("profileName").textContent = data.name;
    document.getElementById("profileBio").textContent =
      "Your Bio: " + data.bio || "No bio set yet.";
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

function main() {
  fetchMyProfile();
}

main();
