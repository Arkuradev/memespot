import { API_key } from "./constants.mjs";

export async function deletePost(postId, token) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (confirmDelete) {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_key,
          },
        }
      );

      if (response.ok) {
        // Replace with handling message later.
        alert("Success! Meme has been deleted.");
      } else {
        alert("Failed to delete meme.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  }
}
