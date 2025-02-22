import { displayMessage } from "./displayMessage.mjs";
import { apiFetch } from "./apiFetch.mjs";

/**
 * Deletes a meme post with the given id from the database.
 *
 * @param {string} postId - The id of the post to delete.
 *
 * @returns {Promise} - A promise that resolves if the deletion was successful.
 */
export async function deletePost(postId) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (confirmDelete) {
    await apiFetch(`/posts/${postId}`, "DELETE");
    displayMessage("#message", "warning", "Meme has been deleted.");
  }
}
