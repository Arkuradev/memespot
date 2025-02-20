import { API_LOGIN } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents form from refreshing page.

  const email = emailInput.value;
  const password = passwordInput.value;

  // Come back to this later to properly handle errors.
  if (!email || !password) {
    const errorMessage = "Please enter your email and password.";
    displayMessage("#message", "error", errorMessage);
    return;
  }

  try {
    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password. Please try again.");
    }

    const data = await response.json();
    // Saves the token and username to local storage for future use.
    localStorage.setItem("token", data.data?.accessToken);
    localStorage.setItem("name", data.data?.name);
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to dashboard or home page.
    displayMessage("#message", "success", "Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "../account/dashboard.html";
    }, 3000);
  } catch (error) {
    displayMessage("#message", "error", error.message);
  }
});
