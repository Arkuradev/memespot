import { API_KEY } from "./constants.mjs";
import { API_SOCIAL_PROFILES_ENDPOINT } from "./constants.mjs";

export async function fetchUserDetails(loggedInUser, queryParams = "") {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES_ENDPOINT}/${loggedInUser}/${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
          "X-Noroff-API-Key": API_KEY,
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
