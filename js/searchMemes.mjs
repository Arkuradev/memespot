import { apiFetch } from "./apiFetch.mjs";
import { renderMemes, fetchMemes } from "./renderAllMemes.mjs";
import { debounce } from "./debounce.mjs";

async function searchMemes(query) {

  // renderMemeSkeletons(8);
  if (!query) {
    await fetchMemes();
    return;
  }

  const data = await apiFetch("/posts?_tag=memespot&_author=true");

  if (data) {
    const q = query.toLowerCase();
    const filteredMemes = data.data.filter(
      (meme) =>
        meme.title?.toLowerCase().includes(q) ||
        meme.body?.toLowerCase().includes(q) ||
        meme.author?.name?.toLowerCase().includes(q)
    );

    renderMemes(filteredMemes);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // initial render
  fetchMemes();

  const searchInput = document.getElementById("searchBar");
  if (!searchInput) return;

  const debounced = debounce((value) => {
    searchMemes(value.trim());
  }, 350);

  searchInput.addEventListener("input", (e) => {
    debounced(e.target.value);
  });
});