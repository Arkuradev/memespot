import { API_key } from "./constants.mjs";

export async function renderPostsProfile() {
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("name");
  const profilePosts = document.getElementById("userPosts");
  const postUrl = `https://v2.api.noroff.dev/social/posts?_author=true`;

  try {
    const response = await fetch(postUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_key,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const { data: posts } = await response.json(); // API returns data array.

    // Filter posts to only include those created by the logged-in user
    const userPosts = posts.filter((post) => {
      return post.tags.includes(currentUser);
    });

    // Render posts in the dashboard grid.
    if (userPosts.length > 0) {
      userPosts.forEach((post) => {
        profilePosts.innerHTML = "";
        renderMemeThumbnail(post);
      });
    } else {
      profilePosts.innerHTML =
        "<p>No memes found. Create a new post to get started.</p>";
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
    profilePosts.innerHTML =
      "<p>Error fetching user posts. Please try again later.</p>";
  }
}
