import { apiFetch } from "./apiFetch.mjs";
import { displayMessage } from "./displayMessage.mjs";

const loggedInUser = localStorage.getItem("name");

/**
 * Posts a new meme to the server.
 * @param {string} token - The user's authentication token.
 * @param {string} title - The title of the meme.
 * @param {string} body - The body of the meme.
 * @param {string} url - The URL of the meme.
 * @returns {Promise<Object>} - The newly created post.
 */
async function createPost(token, title, body, url) {
  const postData = {
    title: title,
    body: body,
    tags: ["memespot", loggedInUser],
    media: {
      url: url,
      alt: title,
    },
  };
  const result = await apiFetch("/posts?_author=true", "POST", postData, token);
  return result;
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

function main() {
  if (!loggedInUser) {
    displayMessage(
      "#message",
      "error",
      "Log in before making a post. Redirecting to login page..."
    );
    setTimeout(() => {
      window.location.href = "../account/login.html";
    }, 1500);
  } else {
    createPostForm();
  }
}

main();
