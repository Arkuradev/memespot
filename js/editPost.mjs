import { apiFetch } from "./apiFetch.mjs";
import { displayMessage } from "./displayMessage.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const cancelEditButton = document.getElementById("cancelEditButton");
cancelEditButton.addEventListener("click", () => {
  window.location.href = "../account/dashboard.html";
});

async function loadPostData() {
  if (!postId) {
    console.error("Post ID is null or undefined.");
    displayMessage("#message", "error", "Missing post ID. Cannot update post.");
    return;
  }
  const data = await apiFetch(`/posts/${postId}`);
  if (data) {
    document.getElementById("editTitle").value = data.data.title;
    document.getElementById("editDescription").value = data.data.body;
    document.getElementById("editURL").value = data.data.media.url;
    document.title = `Edit Post - ${data.data.title}`; // Set page title.
  } else {
    console.error("Failed to fetch post data.");
  }
}

export async function savePost() {
  const token = localStorage.getItem("token");

  if (!postId) {
    console.error("Missing postId in URL parameters.");
    displayMessage("#message", "error", "Missing post ID. Cannot update post.");
    return;
  }

  if (!token) {
    console.error("Missing token in localStorage. Please log in first.");
    displayMessage("#message", "error", "Please log in first.");
    return;
  }

  const title = document.getElementById("editTitle").value;
  const body = document.getElementById("editDescription").value;
  const mediaUrl = document.getElementById("editURL").value;

  const responseData = await apiFetch(`/posts/${postId}`, "PUT", {
    title,
    body,
    media: { url: mediaUrl },
  });

  if (responseData) {
    setTimeout(
      () => (window.location.href = "../account/dashboard.html"),
      2000
    );
    displayMessage("#message", "success", "Post updated!");
  } else {
    console.error("Failed to update post:", responseData);
    displayMessage("#message", "error", "Failed to update post.");
  }
}

window.savePost = savePost;

function main() {
  loadPostData();
}

main();
