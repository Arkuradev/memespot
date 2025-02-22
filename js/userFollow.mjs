import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_PROFILES_ENDPOINT } from "./constants.mjs";
import { fetchUserDetails } from "./profile.mjs";
import { displayMessage } from "./displayMessage.mjs";

export async function followHandler() {
  try {
    const loggedInUser = localStorage.getItem("name");
    if (!loggedInUser)
      throw new Error("User not logged in. Please log in and try again.");

    const userData = await fetchUserDetails(loggedInUser, "?_following=true");
    const following = userData.following;
    let followingNames = following.map((user) => user.name);

    const urlParams = new URLSearchParams(window.location.search);
    const profileUser = urlParams.get("user");
    if (!profileUser) throw new Error("No user specified. Please try again.");

    const followButton = document.querySelector("#follow-btn");

    function updateButtonUI(isFollowing) {
      followButton.textContent = isFollowing ? "Unfollow" : "Follow";
      followButton.classList.toggle("active", isFollowing);
    }

    updateButtonUI(followingNames.includes(profileUser));

    followButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const isCurrentlyFollowing = followingNames.includes(profileUser);
      const action = isCurrentlyFollowing ? "unfollow" : "follow";

      followButton.innerHTML = `<div class="w-5 h-5 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>`;
      followButton.disabled = true;

      try {
        await followToggleApi(profileUser, action);

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

/**
 * This will handle the API call to follow/unfollow a user.
 * @param {string} user - The username of the user to follow/unfollow.
 * @param {string} action - The action to perform, either "follow" or "unfollow".
 */

async function followToggleApi(user, action) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES_ENDPOINT}/${user}/${action}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_KEY,
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

function main() {
  followHandler();
}

main();
