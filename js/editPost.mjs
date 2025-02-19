import { API_key } from "./constants.mjs";

// Get postId and name from URL parameters.
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const token = localStorage.getItem("token");

// Load post data when the page is loaded.
document.addEventListener("DOMContentLoaded", loadPostData);

// Fetch and display post data.
async function loadPostData() {
  if (!postId) {
    console.error("Post ID is null or undefined.");
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
    alert("Error: Missing post ID. Cannot update post.");
    return;
  }

  if (!token) {
    console.error("Missing token in localStorage. Please log in first.");
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
      alert("Post updated successfully!");
      window.location.href = "../account/dashboard.html";
    } else {
      console.error("Failed to update post:", responseData);
      alert("Failed to update post. Please try again.");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    alert("An error occurred while updating the post. Please try again later.");
  }
}

window.savePost = savePost;
