import { API_key } from "./constants.mjs";
async function createPost(token, title, body, url) {
  const postUrl = `https://v2.api.noroff.dev/social/posts/`; // ${name}
  const postData = {
    title: title,
    body: body,
    tags: ["memespot"], // Default tag to sort all posts relevant to this project.
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
    console.log("Post Created:", result);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    alert(`Error creating post: ${error.message}`);
  }
}

/**
 * Function to create a new post.
 * @param {string} token - The user's token from local storage.
 * @param {string} titleInput - The title of the post.
 * @param {string} bodyInput - The body of the post.
 * @param {string} urlInput - The URL of the post.
 * @returns {Promise} - A promise that resolves to the created post.
 * @throws {Error} - If the post creation fails.
 * @example
 * ```js
 * // Use this function when a user wants to create a new post.
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
      alert("You must be logged in to create a post.");
      return;
    }

    if (!urlInput || !titleInput || !bodyInput) {
      alert("All fields required.");
      return;
    }

    try {
      const newPost = await createPost(token, titleInput, bodyInput, urlInput);

      if (newPost) {
        alert("Post successfully created!");
        form.reset();
        // window.location.href = "../account/dashboard.html";
      } else {
        alert("Failed to create post. Please try again!");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
}

document.addEventListener("DOMContentLoaded", createPostForm);

create;
