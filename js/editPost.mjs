import { API_key } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

// Get postId and name from URL parameters.
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const token = localStorage.getItem("token");

// Load post data when the page is loaded.
document.addEventListener("DOMContentLoaded", loadPostData);

// Add event listener to cancel button to return user to dashboard.
const cancelEditButton = document.getElementById("cancelEditButton");
cancelEditButton.addEventListener("click", () => {
  window.location.href = "../account/dashboard.html";
});

// Fetch and display post data.
async function loadPostData() {
  if (!postId) {
    console.error("Post ID is null or undefined.");
    displayMessage("#message", "error", "Missing post ID. Cannot update post.");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
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
      // Display post data in form fields.
      document.getElementById("editTitle").value = data.data.title;
      document.getElementById("editDescription").value = data.data.body;
      document.getElementById("editURL").value = data.data.media.url;
      document.title = `Edit Post - ${data.data.title}`; // Set page title.
    } else {
      console.error("Failed to fetch post data.");
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

// Function to handle form submission.
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

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
        body: JSON.stringify({ title, body, media: { url: mediaUrl } }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      console.log("Post updated successfully:", responseData);
      setTimeout(
        () => (window.location.href = "../account/dashboard.html"),
        2000
      );
      displayMessage("#message", "success", "Post updated!");
    } else {
      console.error("Failed to update post:", responseData);
      displayMessage("#message", "error", "Failed to update post.");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    displayMessage(
      "#message",
      "error",
      "An error occurred while updating the post. Please try again later."
    );
  }
}

window.savePost = savePost;
