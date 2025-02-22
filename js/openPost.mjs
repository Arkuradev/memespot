import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_POSTS_ENDPOINT } from "./constants.mjs";
import { formatDate } from "./formatDate.mjs";
import { token } from "./constants.mjs";

const openPost = document.getElementById("postContainer");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function loadPostData() {
  if (!postId) {
    console.error("Post ID is null or undefined.");
    return;
  }

  try {
    const response = await fetch(`${API_SOCIAL_POSTS_ENDPOINT}/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch post data:", response.status);
      return;
    }
    const data = await response.json();
    const post = data.data;
    if (!post) {
      console.error("No post data found in response.");
      return;
    }
    openPost.appendChild(renderPost(post));
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

export function renderPost(post) {
  if (post) {
    const pageTitle = document.querySelector("#pageTitle");
    document.title = post.title;
    pageTitle.innerHTML = `${post.title} posted by ${post.tags[1]}`; // Set the h1 element's text;
  }

  const formattedDate = formatDate(post.created);
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
    <img class="w-2/3 sm:w-1/2 md:w-1/3 max-w-sm object-contain rounded-lg shadow-lg" src="${
      post.media?.url || "default-image.jpg"
    }" alt="${post.media?.alt || "Meme"}" />
    <h2 class="text-white text-lg font-semibold mt-4">${post.title}</h2>
    <p class="text-gray-300 mt-2 text-center px-6">${post.body}</p>
    <p class="text-gray-300 text-sm mt-1">Posted by: <a class="text-white hover:text-blue-300" href="../account/profile.html?user=${
      post.tags[1]
    }">${post.tags[1]}</a></p>
    <p class="text-gray-200 text-sm mt-1">Post created: ${formattedDate}</p>
    
  `;
  return postElement;
}

function main() {
  loadPostData();
}

main();
