import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_POSTS_ENDPOINT } from "./constants.mjs";
import { token } from "./constants.mjs";
import { renderMemes, fetchMemes } from "./renderAllMemes.mjs";

async function searchMemes(query) {
  if (!query) {
    fetchMemes();
    return;
  }

  try {
    const response = await fetch(
      `${API_SOCIAL_POSTS_ENDPOINT}?_tag=memespot&_author=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      const filteredMemes = data.data.filter(
        (meme) =>
          meme.title.toLowerCase().includes(query.toLowerCase()) ||
          meme.body.toLowerCase().includes(query.toLowerCase()) ||
          meme.author?.name.toLowerCase().includes(query.toLowerCase())
      );
      renderMemes(filteredMemes);
    }
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}

document.getElementById("searchBar").addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length > 0) {
    searchMemes(query);
  } else {
    fetchMemes();
  }
});
