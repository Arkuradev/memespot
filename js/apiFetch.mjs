import { API_KEY, BASE_API_ENDPOINT } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { showLoader, hideLoader } from "./loader.mjs";
import { toUrl } from "./baseUrlHelper.mjs";

/**
 * apiFetch(endpoint, method?, body?, options?)
 * options:
 *  - showGlobalLoader: boolean (default true)
 *  - redirectOnAuthFail: boolean (default true)
 *  - messageSelector: string (default "#message")
 */
export async function apiFetch(
  endpoint,
  method = "GET",
  body = null,
  {
    showGlobalLoader = true,
    redirectOnAuthFail = false,
    allowUnauthorized = false,
    silentAuthFail = false,
    messageSelector = "#message",
  } = {}
) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  try {
    if (showGlobalLoader) showLoader();
    
    const response = await fetch(
      `${BASE_API_ENDPOINT}/social${endpoint}`,
      options
    );

    let data = null;
    
    if (response.status !== 204) {
      data = await response.json();
    }

    if (allowUnauthorized && (response.status === 401 || response.status === 403)) {
      return null;
    }

    if (!response.ok) {
      const message =
        data?.message || `Request failed (${response.status})`;
      const err = new Error(message);
      err.status = response.status;
      throw err;
    }

    return data;
  } catch (error) {
    // Show a user-friendly message
    const msg = error?.message || "Failed to fetch data.";
    displayMessage(messageSelector, "error", `${msg}. Please try again.`);

    if (!(silentAuthFail && isAuthFail)) {
      const msg = error?.message || "Failed to fetch data.";
      displayMessage(messageSelector, "error", `${msg}. Please try again.`);
    }

    if (redirectOnAuthFail && isAuthFail) {
      setTimeout(() => {
        window.location.href = toUrl("/account/login.html");
      }, 800);
    }

    // Re-throw so callers can handle if they want
    throw error;
  } finally {
    if (showGlobalLoader) hideLoader();
  }
}