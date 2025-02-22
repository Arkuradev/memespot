import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_PROFILES_ENDPOINT } from "./constants.mjs";
import { token } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

const username = localStorage.getItem("name");

export async function updateProfile() {
  const avatarUrl = document.getElementById("editAvatar").value;
  const bio = document.getElementById("editBio").value;

  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES_ENDPOINT}/${username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({ avatar: { url: avatarUrl }, bio }),
      }
    );

    if (!response.ok)
      throw new Error(`Failed to update profile: ${response.status}`);

    displayMessage("#message", "success", "Profile updated successfully!");

    document.getElementById("editProfileForm").style.display = "none";
    document.getElementById("userProfile").style.display = "block";

    return response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    displayMessage("#message", "error", "Failed to update profile.");
  }
}
