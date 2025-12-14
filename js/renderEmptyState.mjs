export function renderEmptyState(query = "") {
  const memeContainer = document.getElementById("memeContainer");
  if (!memeContainer) return;

  memeContainer.innerHTML = `
    <div class="w-full py-16 text-center text-main/70">
      <p class="text-lg font-semibold">
        No memes found 😕
      </p>
      <p class="mt-2 text-sm">
        We couldn’t find anything matching
        <span class="font-mono text-main/90">"${query}"</span>
      </p>
    </div>
  `;
}