import { apiFetch } from "./apiFetch.mjs";
import { getTimeAgo } from "./formatDate.mjs";

export async function fetchMemes() {
  const data = await apiFetch("/posts?_author=true");
  if (data) {
    const memespotPosts = data.data.filter((post) =>
      post.tags.includes("memespot")
    );
    renderMemes(memespotPosts);
  }
}

export function renderMemes(memes) {
  const memeContainer = document.getElementById("memeContainer");

  memeContainer.innerHTML = "";

  memes.forEach((meme) => {
    const authorName =
      meme.author && meme.author.name ? meme.author.name : "Unknown";

    const timeAgo = getTimeAgo(meme.created);
    const memeElement = document.createElement("div");
    memeElement.classList.add(
      "meme-card",
      "bg-secondary",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "mb-4"
    );

    memeElement.innerHTML = `
  <img src="${meme.media?.url || ""}" alt="${
      meme.media?.alt || "Meme"
    }" class="w-full h-auto object-cover rounded-md">
  <h2 class="text-main text-lg font-semibold mt-2"><a class="text-main hover:text-hover" href="../pages/post.html?id=${
    meme.id
  }">${meme.title}</a></h2>
  <p class="text-main mt-2">${meme.body}</p>
  <p class="text-main text-sm mt-1">Posted by: <a class="text-main font-bold hover:text-hover" href="../account/profile.html?user=${authorName}">${authorName}</a></p>
  <p class="text-main text-sm mt-1">${timeAgo}</p>
  `;

    memeContainer.appendChild(memeElement);
  });
}
function main() {
  fetchMemes();
}

main();
