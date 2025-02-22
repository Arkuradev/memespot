import { apiFetch } from "./apiFetch.mjs";
import { renderMemes, fetchMemes } from "./renderAllMemes.mjs";

async function searchMemes(query) {
  if (!query) {
    fetchMemes();
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

document.getElementById("searchBar").addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length > 0) {
    searchMemes(query);
  } else {
    fetchMemes();
  }
});
