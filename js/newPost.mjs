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

/*

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents form from refreshing page.

  const url = urlInput.value;
  const title = titleInput.value;
  const description = descriptionInput.value;

  // Come back to this later to properly handle errors.
  if (!url || !title || !description) {
    alert("Please fill in all fields");
    return;
  }

  const postData = {
    title,
    body: description,
    tags: ["meme"],
    media: {
      url,
      alt: title,
    },
  };
  console.log("Post Data:", postData);
  try {
    //Fetching token from localStorage.
    const token = localStorage.getItem("token");
    console.log("Token", token);

    const response = await fetch("https://v2.api.noroff.dev/social/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      alert("Meme posted successfully");
      //Clear form.
      form.reset();
      window.location.href = "./account/dashboard.html";
    } else {
      const errorData = await response.json();
      console.error("Error", errorData);
      alert(`Failed to post meme: ${errorData.message || "Unknown Error"}`);
    }
  } catch (error) {
    console.error("Error", error);
    alert("An error occurred while posting this meme. Please try again.");
  }
}); */
