export function getBaseUrl() {
  const { origin, pathname } = window.location;
  const repoName = pathname.split("/").filter(Boolean)[0];
  return repoName ? `${origin}/${repoName}` : origin;
}
export function toUrl(path) {
  return `${getBaseUrl()}${path}`;
}