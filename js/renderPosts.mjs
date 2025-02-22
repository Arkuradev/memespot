import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_POSTS_ENDPOINT } from "./constants.mjs";
import { token } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

const postFeed = document.getElementById("memeFeed");
const projectTag = "memespot";

export async function renderPosts() {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS_ENDPOINT}`, {
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

    const data = await response.json();
    const posts = data.data || [];
    const filteredPosts = posts.filter((post) => {
      return Array.isArray(post.tags) && post.tags.includes(projectTag);
    });

    if (filteredPosts.length > 0) {
      postFeed.innerHTML = "";
      filteredPosts.forEach((post) => {
        renderPost(post, postFeed);
      });
    } else {
      postFeed.innerHTML = "<p>No relevant memes found for this project.</p>";
    }
  } catch (error) {
    console.error("Error rendering posts, error");
    displayMessage(
      "#message",
      "error",
      "Failed to load memes. Please try again later..."
    );
  }
}

function renderPost(post, container) {
  const postElement = document.createElement("div");
  postElement.classList.add(
    "post",
    "snap-center",
    "h-screen",
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "bg-gray-700"
  );

  postElement.innerHTML = `
    
    <img class="w-3/4 sm:w-2/3 md:w-1/4 max-w-sm object-contain rounded-lg shadow-lg" src="${
      post.media?.url || ""
    }" alt="${post.media?.alt || "Meme"}" />

    <h2 class="text-white text-lg font-semibold mt-4"><a class="text-white hover:text-blue-300" href="../pages/post.html?id=${
      post.id
    }">${post.title}</a></h2>
    
    <p class="text-gray-400 mt-2 text-center px-6">${post.body}</p> 
    `;
  container.appendChild(postElement);
}
function main() {
  renderPosts();
}

main();
