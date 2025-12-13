
import { apiFetch } from "./apiFetch.mjs";
import { getTimeAgo } from "./formatDate.mjs";

export async function fetchMemes() {
  const data = await apiFetch(
    "/posts?_tag=memespot&_author=true&_limit=12&sort=created&sortOrder=desc"
  );
  if (data) {
    renderMemes(data.data);
  }
}

export function renderMemes(memes) {
  const memeContainer = document.getElementById("memeContainer");
  if (!memeContainer) return;

  memeContainer.innerHTML = "";

  memes.forEach((meme) => {
    const authorName =
      meme.author && meme.author.name ? meme.author.name : "Unknown";

    const timeAgo = getTimeAgo(meme.created);
    const memeElement = document.createElement("div");
    memeElement.classList.add(
      "mb-4",
      "break-inside-avoid"
    );

memeElement.innerHTML = `
  <article class="group overflow-hidden rounded-xl bg-[#151515] shadow-md ring-1 ring-white/10 transition-all duration-300 hover:shadow-[0_0_22px_rgba(16,201,201,0.14)] hover:ring-[#10c9c9]/30">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#10c9c9]/40 to-transparent"></div>

    <a href="../pages/post.html?id=${meme.id}" class="block p-3">
      <img
        src="${meme.media?.url || ""}"
        alt="${meme.media?.alt || "Meme"}"
        class="w-full h-auto rounded-lg object-contain bg-black/20"
        loading="lazy"
        decoding="async"
      />
    </a>

    <div class="px-4 pb-4">
      <h2 class="text-main text-sm font-semibold leading-snug">
        <a href="../pages/post.html?id=${meme.id}" class="transition-colors hover:text-hover">
          ${meme.title}
        </a>
      </h2>

      <p class="mt-2 text-sm text-main/80 line-clamp-2">
        ${meme.body}
      </p>

      <div class="mt-4 flex items-center justify-between text-xs text-main/70">
        <a href="../account/profile.html?user=${authorName}" class="font-semibold hover:text-hover transition-colors">
          @${authorName}
        </a>
        <span class="opacity-80">${timeAgo}</span>
      </div>
    </div>
  </article>
`;

    memeContainer.appendChild(memeElement);
  });
}