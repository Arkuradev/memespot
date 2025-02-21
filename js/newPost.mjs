import { API_key } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

const loggedInUser = localStorage.getItem("name");

/**
 * Asynchronously creates a new post on the social platform.
 *
 * @param {string} token - The authentication token of the user.
 * @param {string} title - The title of the post.
 * @param {string} body - The body content of the post.
 * @param {string} url - The URL of the media associated with the post.
 * @returns {Promise<Object>} - A promise that resolves to the created post data if successful.
 * @throws {Error} - Throws an error if the post creation fails.
 */

async function createPost(token, title, body, url) {
  const postUrl = `https://v2.api.noroff.dev/social/posts/`;

  //Get the logged in user's username from localStorage.

  const postData = {
    title: title,
    body: body,
    tags: ["memespot", loggedInUser], // Default tag to sort all posts relevant to this project.
    media: {
      url: url,
      alt: title,
    },
  };

  try {
    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create post.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    displayMessage("#message", "error", "Failed to create post.");
    // alert(`Error creating post: ${error.message}`);
  }
}

/**
 * Function to create a new post.
 * @param {string} token - The user's authentication token stored in local storage.
 * @param {string} titleInput - The title of the post.
 * @param {string} bodyInput - The body of the post.
 * @param {string} urlInput - The URL of the meme/gif.
 * @returns {Promise} - A promise that resolves to the created post.
 * @throws {Error} - If the post creation fails.
 * @example
 * ```js
 * // Function fires when user interact with the create post function.
 * //
 * // After post has been created the user is forwarded to their dashboard page.
 * ```
 */
function createPostForm() {
  const form = document.getElementById("newPostForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlInput = document.getElementById("url").value;
    const titleInput = document.getElementById("title").value;
    const bodyInput = document.getElementById("description").value;
    const token = localStorage.getItem("token");

    if (!token) {
      displayMessage(
        "#message",
        "error",
        "You must be logged in to create a post."
      );
      return;
    }

    if (!urlInput || !titleInput || !bodyInput) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      displayMessage("#message", "error", "All fields required.");
      return;
    }

    try {
      const newPost = await createPost(token, titleInput, bodyInput, urlInput);

      if (newPost) {
        displayMessage("#message", "success", "Post successfully created!");
        setTimeout(() => {
          form.reset();
          window.location.href = "../account/dashboard.html";
        }, 1500);
      } else {
        displayMessage(
          "#message",
          "error",
          "Failed to create post. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      displayMessage(
        "#message",
        "error",
        "Failed to create post. Please try again later."
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!loggedInUser) {
    displayMessage(
      "#message",
      "error",
      "You must be logged in to create a post."
    );
    window.location.href = "../account/login.html";
  } else {
    createPostForm();
  }
});
