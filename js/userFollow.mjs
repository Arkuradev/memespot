import { API_key } from "./constants.mjs";
import { fetchUserDetails } from "./profile.mjs";
import { displayMessage } from "./displayMessage.mjs";

export async function followHandler() {
  try {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("name");
    if (!loggedInUser)
      throw new Error("User not logged in. Please log in and try again.");

    // Fetch the user's following list.
    const userData = await fetchUserDetails(loggedInUser, "?_following=true");
    const following = userData.following;
    let followingNames = following.map((user) => user.name);

    // Get the username from the query parameters.
    const urlParams = new URLSearchParams(window.location.search);
    const profileUser = urlParams.get("user");
    if (!profileUser) throw new Error("No user specified. Please try again.");

    const followButton = document.querySelector("#follow-btn");
    if (!followButton) throw new Error("Follow button not found.");

    // Function to update button UI
    function updateButtonUI(isFollowing) {
      followButton.textContent = isFollowing ? "Unfollow" : "Follow";
      followButton.classList.toggle("active", isFollowing);
    }
    // Initial UI update.
    updateButtonUI(followingNames.includes(profileUser));

    // Event listener for the follow/unfollow toggle.
    followButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const isCurrentlyFollowing = followingNames.includes(profileUser);
      const action = isCurrentlyFollowing ? "unfollow" : "follow";

      // Showloading state

      followButton.innerHTML = `<div class="w-5 h-5 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>`;
      followButton.disabled = true;

      try {
        await followToggleApi(profileUser, action);

        // Update following list
        if (isCurrentlyFollowing) {
          followingNames = followingNames.filter(
            (name) => name !== profileUser
          );
        } else {
          followingNames.push(profileUser);
        }

        updateButtonUI(!isCurrentlyFollowing);

        displayMessage(
          "#message",
          "info",
          `You have successfully ${action}ed ${profileUser}`
        );

        setTimeout(() => {
          const messageElement = document.querySelector("#message");
          if (messageElement) {
            messageElement.innerHTML = "";
            messageElement.className = "";
          }
        }, 1500);
      } catch (error) {
        console.log(error);
        displayMessage("#message", "error", error.message);
      } finally {
        followButton.disabled = false;
      }
    });
  } catch (error) {
    console.log(error);
    displayMessage("#message", "error", error.message);
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
  } catch (error) {
    console.log(error);
    displayMessage("#message", "error", error.message);
  }
}

document.addEventListener("DOMContentLoaded", followHandler);
