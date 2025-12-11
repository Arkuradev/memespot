import { apiFetch } from "./apiFetch.mjs";
import { formatDate } from "./formatDate.mjs";

const openPost = document.getElementById("postContainer");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function loadPostData() {
  if (!postId) {
    console.error("Post ID is null or undefined.");
    return;
  }
  const data = await apiFetch(`/posts/${postId}`);
  const post = data.data;
  if (!post) {
    console.error("No post data found in response.");
    return;
  }
  openPost.appendChild(renderPost(post));
}

export function renderPost(post) {
  if (post) {
    const pageTitle = document.querySelector("#pageTitle");
    document.title = `${post.title} | ${post.tags[1]}`;
    pageTitle.innerHTML = `${post.title} posted by ${post.tags[1]}`;
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
    "bg-background"
  );
  postElement.innerHTML = `
    <img class="w-2/3 sm:w-1/2 md:w-1/3 max-w-sm object-contain rounded-lg shadow-lg" src="${
      post.media?.url || "default-image.jpg"
    }" alt="${post.media?.alt || "Meme"}" />
    <h2 class="text-main text-lg font-semibold mt-4">${post.title}</h2>
    <p class="text-main mt-2 text-center px-6">${post.body}</p>
    <p class="text-main text-sm mt-1">Posted by: <a class="text-main font-bold hover:text-hover" href="../account/profile.html?user=${
      post.tags[1]
    }">${post.tags[1]}</a></p>
    <p class="text-main text-sm mt-1">Post created: ${formattedDate}</p>
    
  `;
  return postElement;
}

function main() {
  loadPostData();
}

main();
