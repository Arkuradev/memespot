document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("global-loader");

  window.addEventListener("load", () => {
    if (loader) loader.classList.add("opacity-0", "pointer-events-none");
  });
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
      setTimeout(() => {
        if (loader) loader.style.display = "none"; // Hide loader after fetching data.
      }, 300);
    }
  }
}
