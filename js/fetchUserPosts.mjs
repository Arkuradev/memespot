import { API_key } from "./constants.mjs";
import { deletePost } from "./deletePost.mjs";

const token = localStorage.getItem("token");
const memeGrid = document.getElementById("memeGrid");

export async function fetchAndRenderUserPosts() {
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("name");
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

export function renderMemeThumbnail(post) {
  const postElement = document.createElement("div");
  postElement.classList.add(
    "meme-thumbnail",
    "bg-gray-700",
    "text-white",
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
      <h3 class="text-sm font-semibold mt-2"><a class="text-white hover:text-blue-300" href="../pages/post.html?id=${
        post.id
      }">${post.title}</a></h3>
      <button class="edit-button mt-4 mb-4 px-4 py-2 bg-green-700 hover:bg-green-500 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">Edit</button>
      <button class="delete-button mt-4 mb-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300">Delete</button>
    `;
  // Add link to the specific post page when clicking on image.
  // Add 2 buttons that displays on hover to edit and delete the post.

  const deleteButton = postElement.querySelector(".delete-button");
  const editButton = postElement.querySelector(".edit-button");

  editButton.addEventListener("click", () => {
    window.location.href = `../post/edit.html?id=${post.id}`;
  });

  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await deletePost(post.id, token); // Wait for deletion to complete.
      fetchAndRenderUserPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    /* deletePost(post.id, token);
    // Refresh the page after deleting the post
    setTimeout(fetchAndRenderUserPosts, 300); */
  });

  memeGrid.appendChild(postElement);
}

// Load the user's post when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderUserPosts();
});
