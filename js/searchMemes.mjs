import { API_key } from "./constants.mjs";
import { renderMemes, fetchMemes } from "./renderAllMemes.mjs";

async function searchMemes(query) {
  if (!query) {
    fetchMemes();
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/social/posts?_tag=memespot&_author=true",
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
      const filteredMemes = data.data.filter(
        (meme) =>
          meme.title.toLowerCase().includes(query.toLowerCase()) ||
          meme.body.toLowerCase().includes(query.toLowerCase()) ||
          meme.author?.name.toLowerCase().includes(query.toLowerCase())
      );
      renderMemes(filteredMemes); // Render memes on the page.
    }
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}

// Event listener for search input
document.getElementById("searchBar").addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length > 0) {
    searchMemes(query);
  } else {
    fetchMemes();
  }
});
