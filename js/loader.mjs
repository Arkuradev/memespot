export function showLoader() {
  const loader = document.getElementById("global-loader");
  if (!loader) return;
  
  loader.style.display = "flex";
}

export function hideLoader() {
  const loader = document.getElementById("global-loader");
  if (!loader) return;

  loader.style.display = "none";
}
