import { apiFetch } from "./apiFetch.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { token } from "./constants.mjs";

if (!token) {
  alert("You must be logged in to view this page. Please log in.");
  displayMessage(
    "#message",
    "error",
    "You must be logged in to view this page."
  );
  window.location.href = "./account/login.html";
}

export async function fetchUserProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user");

  document.title = `${profileUsername}'s profile`;

  if (!profileUsername) {
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 2000);
    displayMessage("#message", "error", "No user specified. Please try again.");
  }

  const { data: profileData } = await apiFetch(`/profiles/${profileUsername}`);

  renderUserProfile(profileData);

  fetchUserPosts(profileUsername);
}

function renderUserProfile(user) {
  document.getElementById("profileAvatar").src =
    user.avatar?.url || "default-avatar.jpg";
  document.getElementById("profileUsername").textContent = user.name;
  document.getElementById("profileBio").textContent =
    user.bio || "No bio available.";

  const loggedInUser = localStorage.getItem("name");
  if (loggedInUser === user.name) {
    document.getElementById("follow-btn").style.display = "none";
  } else if (loggedInUser !== user.name) {
    document.getElementById("follow-btn").style.display = "block";
  }
}

async function fetchUserPosts(username) {
  const { data: allPosts } = await apiFetch("/posts?_author=true");

  const userPosts = allPosts.filter(
    (post) => post.author && post.author.name === username
  );
  renderUserPosts(userPosts);
}

function renderUserPosts(posts) {
  const postContainer = document.getElementById("userPosts");
  postContainer.innerHTML = "";

  if (posts.length === 0) {
    postContainer.innerHTML = "<p class='text-gray-400'>No posts found.</p>";
    return;
  }

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add(
      "meme-card",
      "bg-gray-800",
      "p-6",
      "rounded-lg",
      "shadow-lg",
      "mb-6"
    );

    postElement.innerHTML = `
      <img src="${post.media?.url || ""}" alt="${
      post.media?.alt || "Meme"
    }" class="w-62 h-auto object-cover rounded-md">
      <h2 class="text-white text-lg font-semibold mt-2"><a class="text-white hover:text-blue-300"href="../pages/post.html?id=${
        post.id
      }">${post.title}</a></h2>
      <p class="text-gray-400 mt-2">${post.body}</p>
    `;

    postContainer.appendChild(postElement);
  });
}

function main() {
  fetchUserProfile();
}

main();
