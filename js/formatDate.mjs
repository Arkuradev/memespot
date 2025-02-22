/**
 * Converts a timestamp into a formatted date string.
 *
 * @param {number|string|Date} timestamp - The timestamp to be converted into a date.
 * @returns {string} The formatted date string in "DD MMMM YYYY, HH:MM" format.
 */

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calculates the time elapsed since the given date and returns a human-readable string.
 *
 * @param {string|Date} postedDate - The date when the post was made, as a string or Date object.
 * @returns {string} A string representing the time elapsed since the post,
 *                   formatted as "Posted X seconds ago", "Posted X minutes ago",
 *                   "Posted X hours ago", or "Posted X days ago", depending on the duration.
 */

export function getTimeAgo(postedDate) {
  const postTime = new Date(postedDate);
  const now = new Date();

  const diffInSeconds = Math.floor((now - postTime) / 1000);

  if (diffInSeconds < 60) {
    return `Posted <b>${diffInSeconds}</b> seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Posted <b>${minutes}</b> minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Posted <b>${hours}</b> hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `Posted <b>${days}</b> days ago`;
  }
}
