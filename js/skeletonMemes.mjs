export function renderMemeSkeletons(count = 8) {
  const memeContainer = document.getElementById("memeContainer");
  if (!memeContainer) return;

  memeContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "mb-4 inline-block w-full [break-inside:avoid]";

    el.innerHTML = `
      <article class="overflow-hidden rounded-xl bg-[#151515] ring-1 ring-white/10 shadow-md">
        <div class="p-3">
          <div class="h-40 w-full rounded-lg bg-white/10 animate-pulse"></div>
        </div>

        <div class="px-4 pb-4">
          <div class="h-4 w-3/4 rounded bg-white/10 animate-pulse"></div>
          <div class="mt-3 space-y-2">
            <div class="h-3 w-full rounded bg-white/10 animate-pulse"></div>
            <div class="h-3 w-5/6 rounded bg-white/10 animate-pulse"></div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="h-3 w-20 rounded bg-white/10 animate-pulse"></div>
            <div class="h-3 w-16 rounded bg-white/10 animate-pulse"></div>
          </div>
        </div>
      </article>
    `;
    memeContainer.appendChild(el);
  }
}