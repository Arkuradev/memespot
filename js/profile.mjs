import { API_key } from "./constants.mjs";

export async function fetchUserDetails(loggedInUser, queryParams = "") {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${loggedInUser}${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
          "X-Noroff-API-Key": API_key,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch user details.");

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}
