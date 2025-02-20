import { API_key } from "./constants.mjs";
// import { setupFollowButtons } from "./follow.mjs";

const token = localStorage.getItem("token");

if (!token) {
  alert("You must be logged in to view this page. Please log in.");
  window.location.href = "../account/login.html";
}

export async function fetchUserProfile() {
  // Get username from URL parameters.
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user");

  // Sets the title of the page to the profile the user has opened.
  document.title = `${profileUsername}'s profile`;

  if (!profileUsername) {
    alert("No user specified. Please try again.");
    window.location.href = "/index.html";
  }

  // Fetch user profile.
  try {
    const profileResponse = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${profileUsername}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!profileResponse.ok) throw new Error("Failed to fetch user profile.");

    const { data: profileData } = await profileResponse.json();

    // Call renderUserProfile to display the profile details.
    renderUserProfile(profileData);

    // Fetch user specific posts.
    fetchUserPosts(profileUsername);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}

function renderUserProfile(user) {
  document.getElementById("profileAvatar").src =
    user.avatar?.url || "default-avatar.jpg";
  document.getElementById("profileUsername").textContent = user.name;
  document.getElementById("profileBio").textContent =
    user.bio || "No bio available.";

  const loggedInUser = localStorage.getItem("name");
  if (loggedInUser !== user.name) {
    // document.getElementById("followButton").style.display = "block";
  } else {
    document.getElementById("followButton").style.display = "none";
  }
}

async function fetchUserPosts(username) {
  try {
    const postResponse = await fetch(
      `https://v2.api.noroff.dev/social/posts?_author=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!postResponse.ok) throw new Error("Failed to fetch user posts.");

    const { data: allPosts } = await postResponse.json();

    // Filter posts to only include those from selected user.
    const userPosts = allPosts.filter(
      (post) => post.author && post.author.name === username
    );

    renderUserPosts(userPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
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
      <h2 class="text-white text-lg font-semibold mt-2">${post.title}</h2>
      <p class="text-gray-400 mt-2">${post.body}</p>
    `;

    postContainer.appendChild(postElement);
  });
}

document.addEventListener("DOMContentLoaded", fetchUserProfile);
/*



*/
