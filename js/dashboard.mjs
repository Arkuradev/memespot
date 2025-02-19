import { updateProfile } from "./updateProfile.mjs";
import { fetchProfile } from "./fetchProfile.mjs";

document.addEventListener("DOMContentLoaded", () => {
  fetchProfile(); // Fetch profile data when the page is loaded.

  const editProfileButton = document.getElementById("editProfileButton");
  const editProfileForm = document.getElementById("editProfileForm");
  const saveProfileButton = document.getElementById("saveProfileButton");
  const cancelEditButton = document.getElementById("cancelEditButton");

  // Ensuring buttons exists before adding event listeners.
  if (
    editProfileButton &&
    editProfileForm &&
    saveProfileButton &&
    cancelEditButton
  ) {
    editProfileButton.addEventListener("click", () => {
      editProfileForm.classList.remove("hidden");
    });

    saveProfileButton.addEventListener("click", () => {
      updateProfile();
      if (updateProfile) {
        setTimeout(() => {
          // fetchProfile();
          // Reloads page to show updated profile and allow user to click Edit profile right away.
          window.location.reload();
        }, 2000);
      }
    });

    cancelEditButton.addEventListener("click", () => {
      editProfileForm.classList.add("hidden");
    });
  } else {
    console.error("One or more profile elements are missing.");
  }
});
