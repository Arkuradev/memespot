// Hide loading indicator when content is ready.

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("global-loader");

  setTimeout(() => {
    if (loader) loader.classList.add("opacity-0", "pointer-events-none");
  }, 500);
});

async function fetchData(url) {
  const loader = document.getElementById("global-loader");
  if (loader) {
    loader.style.display = "flex"; // Show loader while fetching data.

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data.");
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      displayMessage("#message", "error", error.message);
    } finally {
      if (loader) loader.style.display = "none"; // Hide loader after fetching data.
    }
  }
}
