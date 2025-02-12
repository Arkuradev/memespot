import { API_key } from "./constants.mjs";
const token = localStorage.getItem("token");
const username = localStorage.getItem("name");

export async function fetchProfile() {
  if (!token || !username) {
    console.error(
      "Missing token or username in localStorage. Please log in first."
    );
    return;
  }
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch profile: ${response.status}`);

    const { data } = await response.json();

    document.getElementById("profileEmail").textContent =
      "Email: " + data.email;
    document.getElementById("profileAvatar").src =
      data.avatar?.url || "default-avatar.jpg";
    document.getElementById("profileName").textContent =
      "Username: " + data.name;
    document.getElementById("profileBio").textContent =
      "Bio: " + data.bio || "No bio set yet";

    // Prefill edit form.
    document.getElementById("editAvatar").value = data.avatar?.url;
    document.getElementById("editBio").value = data.bio;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
