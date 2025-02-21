import { updateProfile } from "./updateProfile.mjs";
import { fetchProfile } from "./fetchProfile.mjs";

const editProfileButton = document.getElementById("editProfileButton");
const editProfileForm = document.getElementById("editProfileForm");
const saveProfileButton = document.getElementById("saveProfileButton");
const cancelEditButton = document.getElementById("cancelEditButton");

function main() {
  fetchProfile();
  editProfileButton.addEventListener("click", () => {
    editProfileForm.classList.remove("hidden");
  });

  saveProfileButton.addEventListener("click", () => {
    updateProfile();
    if (updateProfile) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });

  cancelEditButton.addEventListener("click", () => {
    editProfileForm.classList.add("hidden");
  });
}

main();
