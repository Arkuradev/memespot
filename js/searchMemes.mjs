import { apiFetch } from "./apiFetch.mjs";
import { renderMemes, fetchMemes } from "./renderAllMemes.mjs";
import { debounce } from "./debounce.mjs";
import { renderMemeSkeletons } from "./skeletonMemes.mjs";
import { renderEmptyState } from "./renderEmptyState.mjs";
import { renderLoginGate } from "./renderAllMemes.mjs";

async function searchMemes(query) {

  if (!query) {
    await fetchMemes();
    return;
  }

renderMemeSkeletons(8);

  const data = await apiFetch("/posts?_tag=memespot&_author=true",
  "GET",
  null,
  { showGlobalLoader: false, allowUnauthorized: true, redirectOnAuthFail: false }
);
  if (query.length < 3) return;
  if (data) {
    const q = query.toLowerCase();
    
    const filteredMemes = data.data.filter(
      (meme) =>
        meme.title?.toLowerCase().includes(q) ||
        meme.body?.toLowerCase().includes(q) ||
        meme.author?.name?.toLowerCase().includes(q)
    );

    if (filteredMemes.length === 0) {
    renderEmptyState(query);
    return;
  }
    renderMemes(filteredMemes);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    renderLoginGate();
    return; // Prevents further execution if not logged in which gives a 401 error.
  }

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