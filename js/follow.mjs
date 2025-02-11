import { API_key } from "./constants.mjs";

async function isFollowingUser(targetUsername) {
  const loggedInUser = localStorage.getItem("name");
  if (!loggedInUser) return false;

  try {
    const userProfileResponse = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${loggedInUser}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!userProfileResponse.ok) {
      throw new Error(
        `Failed to fetch user profile: ${userProfileResponse.status}`
      );
    }

    const userProfileData = await userProfileResponse.json();
    console.log("Logged-in user's profile:", userProfileData);

    // Check if the target user is in the following list
    const followingList = userProfileData.data.following || [];
    return followingList.some((profile) => profile.name === targetUsername);
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}

export async function setupFollowButtons(user) {
  const followButton = document.getElementById("followButton");
  const unfollowButton = document.getElementById("unfollowButton");

  if (!followButton || !unfollowButton) {
    console.error("Follow/Unfollow buttons not found!");
    return;
  }

  const isFollowing = await isFollowingUser(user.name);
  console.log(`Is logged-in user following ${user.name}?`, isFollowing);

  // Show the correct button
  // followButton.style.display = isFollowing ? "none" : "block";
  // unfollowButton.style.display = isFollowing ? "block" : "none";

  // Remove old event listeners
  followButton.replaceWith(followButton.cloneNode(true));
  unfollowButton.replaceWith(unfollowButton.cloneNode(true));

  const newFollowButton = document.getElementById("followButton");
  const newUnfollowButton = document.getElementById("unfollowButton");

  newFollowButton.addEventListener("click", async () => {
    await followUser(user);
    setupFollowButtons(user);
  });

  newUnfollowButton.addEventListener("click", async () => {
    await unfollowUser(user);
    setupFollowButtons(user);
  });
}
async function followUser(user) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${user.name}/follow`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!response.ok) throw new Error(`Error following: ${response.status}`);
    console.log(`Successfully followed ${user.name}`);
    alert(`You are now following ${user.name}`);
  } catch (error) {
    console.error("Error following user:", error);
    alert(`You are already following ${user.name}`);
  }
}

async function unfollowUser(user) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${user.name}/unfollow`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!response.ok) throw new Error(`Error unfollowing: ${response.status}`);
    console.log(`Successfully unfollowed ${user.name}`);
    alert(`Successfully unfollowed ${user.name}`);
  } catch (error) {
    console.error("Error unfollowing user:", error);
    alert(`You're already not following ${user.name}`);
  }
}
