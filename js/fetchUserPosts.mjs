import { API_key } from "./constants.mjs";
const memeGrid = document.getElementById("memeGrid");
const userNameDisplay = document.getElementById("userName");

export async function fetchAndRenderUserPosts() {
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("name");
  const postUrl = `https://v2.api.noroff.dev/social/posts/`;

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

    // Display the user's name in the dashboard.
    userNameDisplay.textContent = currentUser;

    // Render posts in the dashboard grid.

    if (userPosts.length > 0) {
      memeGrid.innerHTML = "";
      userPosts.forEach((post) => {
        renderMemeThumbnail(post);
      });
    } else {
      memeGrid.innerHTML =
        "<p>No memes found. Create a new post to get started.</p>";
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
    memeGrid.innerHTML =
      "<p>Error fetching user posts. Please try again later.</p>";
  }
}

function renderMemeThumbnail(post) {
  const postElement = document.createElement("div");
  postElement.classList.add(
    "meme-thumbnail",
    "bg-gray-100",
    "p-2",
    "rounded",
    "shadow"
  );

  postElement.innerHTML = `
      <img 
        src="${post.media?.url || "https://via.placeholder.com/150"}"
        alt="${post.media?.alt || "Meme"}"
        class="w-full h-32 object-cover rounded"
      />
      <h3 class="text-sm font-semibold mt-2">${post.title}</h3>
    `;
  // Add link to the specific post page when clicking on image.
  // Add 2 buttons that displays on hover to edit and delete the post.

  memeGrid.appendChild(postElement);
}

// Load the user's post when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderUserPosts();
});
