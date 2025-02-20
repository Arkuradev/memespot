import { API_key } from "./constants.mjs";
import { fetchUserDetails } from "./profile.mjs";

export async function followHandler() {
  try {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("name");
    if (!loggedInUser)
      throw new Error("User not logged in. Please log in and try again.");

    // Fetch the user's following list.
    const userData = await fetchUserDetails(loggedInUser, "?_following=true");
    const following = userData.following;
    const followingNames = following.map((user) => user.name);

    // Get the username from the query parameters.
    const urlParams = new URLSearchParams(window.location.search);
    const profileUser = urlParams.get("user");
    if (!profileUser) throw new Error("No user specified. Please try again.");

    const followButton = document.querySelector("#follow-btn");
    if (!followButton) throw new Error("Follow button not found.");

    // Check if already following and update the UI
    if (followingNames.includes(profileUser)) {
      followButton.textContent = "Unfollow";
      followButton.classList.add("active");
    } else {
      followButton.textContent = "Follow";
    }

    // Event listener for the follow/unfollow toggle.
    followButton.addEventListener("click", async () => {
      const action = followingNames.includes(profileUser)
        ? "unfollow"
        : "follow";
      await followToggleApi(profileUser, action);
    });
  } catch (error) {
    console.log(error);
    // displayMessage("#message", "error", error.message);
  }
}

async function followToggleApi(user, action) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${user}/${action}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_key,
        },
      }
    );
    if (!response.ok) throw new Error(`Failed to ${action} user.`);

    //Reload page to reflect changes.
    window.location.reload();
  } catch (error) {
    console.log(error);
    displayMessage("#message", "error", error.message);
  }
}

document.addEventListener("DOMContentLoaded", followHandler);
