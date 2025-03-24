import { API_KEY } from "./constants.mjs";
import { BASE_API_ENDPOINT } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { showLoader, hideLoader } from "./loader.mjs";

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
  try {
    showLoader();

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
    displayMessage("#message", "error", `${error.message}. Please try again.`);
    setTimeout(() => {
      window.location.href = "../account/login.html";
    }, 1000);
  } finally {
    hideLoader();
  }
}
