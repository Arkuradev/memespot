import { apiFetch } from "./apiFetch.mjs";

const postFeed = document.getElementById("memeFeed");
const projectTag = "memespot";

/**
 * Fetches all posts from the API and renders the relevant posts on the
 * #memeFeed element. A post is considered relevant if it has the
 * "memespot" tag.
 *
 * @returns {Promise<void>}
 */
export async function renderPosts() {
  const data = await apiFetch("/posts");
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
    postFeed.innerHTML = "<p>No relevant memes found</p>";
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
