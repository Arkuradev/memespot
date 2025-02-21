// Rendering all memes for the home page.
import { API_key } from "./constants.mjs";
export async function fetchMemes() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to view this page. Please log in.");
    return;
  }
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/social/posts?_author=true",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_key,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      // Filter out other students posts.
      const memespotPosts = data.data.filter((post) =>
        post.tags.includes("memespot")
      );
      renderMemes(memespotPosts); // Render memes on the page.
    } else {
      console.error("Failed to fetch memes.");
    }
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}

export function renderMemes(memes) {
  const memeContainer = document.getElementById("memeContainer");
  memeContainer.innerHTML = ""; // Clear previous content.

  memes.forEach((meme) => {
    const authorName =
      meme.author && meme.author.name ? meme.author.name : "Unknown";

    const memeElement = document.createElement("div");
    memeElement.classList.add(
      "meme-card",
      "bg-gray-800",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "mb-4"
    );

    memeElement.innerHTML = `
  <img src="${meme.media?.url || ""}" alt="${
      meme.media?.alt || "Meme"
    }" class="w-full h-auto object-cover rounded-md">
  <h2 class="text-white text-lg font-semibold mt-2"><a class="text-white hover:text-blue-300" href="../pages/post.html?id=${
    meme.id
  }">${meme.title}</a></h2>
  <p class="text-gray-400 mt-2">${meme.body}</p>
  <p class="text-gray-400 text-sm mt-1">Posted by: <a class="text-white hover:text-blue-300" href="../account/profile.html?user=${authorName}">${authorName}</a></p>
  `;

    memeContainer.appendChild(memeElement);
  });
}

document.addEventListener("DOMContentLoaded", fetchMemes);
