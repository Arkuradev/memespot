export function showLoader() {
  const loader = document.getElementById("global-loader");
  if (loader) loader.style.display = "flex";
}

export function hideLoader() {
  const loader = document.getElementById("global-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }
}
