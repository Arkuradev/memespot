import { API_Key } from "./constants.mjs";
import { API_BASE_URL } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

/**
 * Deletes a post with the given post ID.
 * Prompts the user for confirmation before proceeding with deletion.
 * If confirmed, sends a DELETE request to the server.
 * Displays an alert based on the success or failure of the operation.
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */

export async function deletePost(postId, token) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (confirmDelete) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_Key,
        },
      });

      if (response.ok) {
        displayMessage("#message", "warning", "Meme has been deleted.");
        setTimeout(() => {
          const messageElement = document.querySelector("#message");
          if (messageElement) {
            messageElement.innerHTML = "";
            messageElement.className = "";
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      displayMessage(
        "#message",
        "error",
        "An error occurred while deleting the post."
      );
    }
  }
}
