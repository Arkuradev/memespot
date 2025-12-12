
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
      "meme-card",
      "bg-secondary",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "mb-4"
    );

memeElement.innerHTML = `
  <article class="group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#151515] shadow-md ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-[#10c9c9]/30 hover:shadow-[0_0_22px_rgba(16,201,201,0.14)]">

    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#10c9c9]/40 to-transparent"></div>

    <!-- Image -->
    <a href="../pages/post.html?id=${meme.id}" class="block p-3">
      <div class="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-black/20 ring-1 ring-white/10">
        <img
          src="${meme.media?.url || ""}"
          alt="${meme.media?.alt || "Meme"}"
          class="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
    </a>

    <!-- Content -->
    <div class="flex flex-1 flex-col px-4 pb-4 pt-0">
      <h2 class="text-main text-base font-semibold leading-snug">
        <a
          href="../pages/post.html?id=${meme.id}"
          class="transition-colors hover:text-hover"
        >
          ${meme.title}
        </a>
      </h2>

      <p class="mt-2 line-clamp-2 text-sm text-main/80">
        ${meme.body}
      </p>

      <!-- Footer -->
      <div class="mt-auto flex items-center justify-between pt-4 text-xs text-main/70">
        <a
          href="../account/profile.html?user=${authorName}"
          class="font-semibold transition-colors hover:text-hover"
        >
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