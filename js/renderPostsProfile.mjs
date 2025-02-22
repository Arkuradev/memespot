import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_POSTS_ENDPOINT } from "./constants.mjs";
import { token } from "./constants.mjs";

export async function renderPostsProfile() {
  const currentUser = localStorage.getItem("name");
  const profilePosts = document.getElementById("userPosts");

  try {
    const response = await fetch(`${API_SOCIAL_POSTS_ENDPOINT}?_author=true`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const { data: posts } = await response.json();

    const userPosts = posts.filter((post) => {
      return post.tags.includes(currentUser);
    });

    if (userPosts.length > 0) {
      userPosts.forEach((post) => {
        profilePosts.innerHTML = "";
        renderMemeThumbnail(post);
      });
    } else {
      profilePosts.innerHTML =
        "<p class='text-gray-400'>No memes found. Create a new post to get started.</p>";
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
    profilePosts.innerHTML =
      "<p>Error fetching user posts. Please try again later.</p>";
  }
}
