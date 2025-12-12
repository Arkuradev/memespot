import { apiFetch } from "./apiFetch.mjs";
import { renderMemes, fetchMemes } from "./renderAllMemes.mjs";

async function searchMemes(query) {
  // If query is empty, fall back to default memes
  if (!query) {
    await fetchMemes();
    return;
  }

  const data = await apiFetch("/posts?_tag=memespot&_author=true");

  if (data) {
    const filteredMemes = data.data.filter(
      (meme) =>
        meme.title.toLowerCase().includes(query.toLowerCase()) ||
        meme.body.toLowerCase().includes(query.toLowerCase()) ||
        meme.author?.name.toLowerCase().includes(query.toLowerCase())
    );

    renderMemes(filteredMemes);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Initial load: render the default memes
  fetchMemes();

  const searchInput = document.getElementById("searchBar");
  if (!searchInput) return;

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    searchMemes(query);
  });
});