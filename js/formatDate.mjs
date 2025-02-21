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
