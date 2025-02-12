// Fetch profile data of logged in user. More detailed profile information and Edit functionality included on profile view.
import { API_key } from "./constants.mjs";

const token = localStorage.getItem("token");
const loggedInUser = localStorage.getItem("name");

async function fetchMyProfile() {
  if (!token) {
    console.error("Missing token, please log in before viewing this page.");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${loggedInUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
          "X-Noroff-API-Key": API_key,
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

    // Prefill edit form.
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchMyProfile);
