import { apiFetch } from "./apiFetch.mjs";
import { renderMemeThumbnail } from "./renderMemeThumbnail.mjs";
export async function renderPostsProfile() {
  const currentUser = localStorage.getItem("name");
  const profilePosts = document.getElementById("userPosts");

  const { data: posts } = await apiFetch("/posts?_author=true");

  const userPosts = posts.filter((post) => {
    return post.tags.includes(currentUser);
  });

  if (userPosts.length > 0) {
    userPosts.forEach((post) => {
      profilePosts.innerHTML = "";
      renderMemeThumbnail(post);
    });
  } else {
    profilePosts.innerHTML =
      "<p class='text-main'>No memes found. Create a new post to get started.</p>";
  }
}
