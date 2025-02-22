import { apiFetch } from "./apiFetch.mjs";
import { displayMessage } from "./displayMessage.mjs";

const username = localStorage.getItem("name");

export async function updateProfile() {
  const avatarUrl = document.getElementById("editAvatar").value;
  const bio = document.getElementById("editBio").value;

  const response = await apiFetch(`/profiles/${username}`, "PUT", {
    avatar: { url: avatarUrl },
    bio,
  });

  if (response) {
    displayMessage("#message", "success", "Profile updated successfully!");
    document.getElementById("editProfileForm").style.display = "none";
    document.getElementById("userProfile").style.display = "block";
  } else {
    displayMessage("#message", "error", "Failed to update profile.");
  }
}
