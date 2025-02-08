import { API_key } from "./constants.mjs";

const token = localStorage.getItem("token");
const username = localStorage.getItem("name");

async function fetchProfile() {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch profile: ${response.status}`);

    const { data } = await response.json();
    document.getElementById("profileAvatar").src =
      data.avatar.url || "default-avatar.jpg";
    document.getElementById("profileName").textContent = data.name;
    document.getElementById("profileBio").textContent =
      data.bio || "No bio available";
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProfile);
