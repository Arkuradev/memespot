import { apiFetch } from "./apiFetch.mjs";

/**
 * Fetches a user's profile details from the API.
 * @param {string} loggedInUser the username of the user to fetch
 * @param {string} [queryParams=""] any additional query parameters to add to the URL
 * @returns {Object} the user's profile details
 */
export async function fetchUserDetails(loggedInUser, queryParams = "") {
  const data = await apiFetch(`/profiles/${loggedInUser}/${queryParams}`);
  return data.data;
}
