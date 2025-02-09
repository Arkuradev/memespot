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
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch profile: ${response.status}`);

    const { data } = await response.json();

    document.getElementById("profileEmail").textContent = data.email;
    document.getElementById("profileAvatar").src =
      data.avatar.url || "default-avatar.jpg";
    document.getElementById("profileName").textContent = data.name;
    document.getElementById("profileBio").textContent =
      data.bio || "No bio set yet";

    // Prefill edit form.
    document.getElementById("editAvatar").value = data.avatar.url;
    document.getElementById("editBio").value = data.bio;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

async function updateProfile() {
  const avatarUrl = document.getElementById("editAvatar").value;
  // const name = document.getElementById("editName").value;
  const bio = document.getElementById("editBio").value;

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
        body: JSON.stringify({ avatar: { url: avatarUrl }, name, bio }),
      }
    );

    if (!response.ok)
      throw new Error(`Failed to update profile: ${response.status}`);

    alert("Profile updated successfully!");
    document.getElementById("editProfileForm").style.display = "none";
    document.getElementById("userProfile").style.display = "block";

    fetchProfile(); // Refresh profile data after updating.
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred while updating your profile.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const editProfileButton = document.getElementById("editProfileButton");
  const editProfileForm = document.getElementById("editProfileForm");
  const profilePreview = document.getElementById("profilePreview");
  const cancelEditButton = document.getElementById("cancelEditButton");

  editProfileButton.addEventListener("click", () => {
    console.log("Edit profile button clicked!");
    editProfileForm.style.display = "block";
    editProfileButton.style.display = "none";
    profilePreview.style.display = "none";
  });

  cancelEditButton.addEventListener("click", () => {
    console.log("Cancel edit button clicked!");
    editProfileForm.style.display = "none";
    editProfileButton.style.display = "block";
    profilePreview.style.display = "block";
  });
  fetchProfile();
});
