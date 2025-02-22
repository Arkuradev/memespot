import { API_KEY } from "./constants.mjs";
import { BASE_API_ENDPOINT } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

export async function apiFetch(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const loader = document.getElementById("global-loader");
  try {
    if (loader) loader.style.display = "flex";
    const response = await fetch(
      `${BASE_API_ENDPOINT}/social${endpoint}`,
      options
    );
    let data = null;
    if (response.status !== 204) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data.");
    }
    return data;
  } catch (error) {
    displayMessage(
      "#message",
      "error",
      "Failed to fetch data. Please log in and try again."
    );
  } finally {
    setTimeout(() => {
      if (loader) loader.style.display = "none";
    }, 300);
  }
}
