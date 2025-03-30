import { apiFetch } from "./apiFetch.mjs";
import { token } from "./constants.mjs";
import { deletePost } from "./deletePost.mjs";

const memeGrid = document.getElementById("memeGrid");

export async function fetchAndRenderUserPosts() {
  const currentUser = localStorage.getItem("name");

  const { data: posts } = await apiFetch("/posts?_author=true");

  const userPosts = posts.filter((post) => {
    return post.tags.includes(currentUser);
  });

  if (userPosts.length > 0) {
    memeGrid.innerHTML = "";
    userPosts.forEach((post) => {
      renderMemeThumbnail(post);
    });
  } else {
    memeGrid.innerHTML =
      "<p class='text-gray-400'>No memes found.<br> Click on <a class='text-white hover:text-blue-300' href='../post/new.html'>New Post</a> to post a meme!</p>";
  }
}

export function renderMemeThumbnail(post) {
  const postElement = document.createElement("div");
  postElement.classList.add(
    "meme-thumbnail",
    "bg-background",
    "text-main",
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
      <h3 class="text-sm font-semibold mt-2"><a class="text-main hover:text-hover" href="../pages/post.html?id=${
        post.id
      }">${post.title}</a></h3>
      <button class="edit-button mt-4 mb-4 px-4 py-2 bg-btn-primary hover:bg-hover text-main font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">Edit</button>
      <button class="delete-button mt-4 mb-4 px-4 py-2 bg-btn-secondary hover:bg-red-500 text-main font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300">Delete</button>
    `;

  const deleteButton = postElement.querySelector(".delete-button");
  const editButton = postElement.querySelector(".edit-button");

  editButton.addEventListener("click", () => {
    window.location.href = `../post/edit.html?id=${post.id}`;
  });

  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await deletePost(post.id, token);
      fetchAndRenderUserPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  });

  memeGrid.appendChild(postElement);
}

function main() {
  fetchAndRenderUserPosts();
}

main();
