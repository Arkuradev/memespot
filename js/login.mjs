import { API_LOGIN } from "./constants.mjs";
import { displayMessage } from "./displayMessage.mjs";

const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fieldset = loginForm.querySelector("fieldset");
  const button = loginForm.querySelector("button");
  const previousButtonText = button.textContent;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    const errorMessage = "Please enter your email and password.";
    displayMessage("#message", "error", errorMessage);
    return;
  }

  try {
    button.textContent = "Logging in...";
    fieldset.disabled = true;
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
    localStorage.setItem("token", data.data?.accessToken);
    localStorage.setItem("name", data.data?.name);
    localStorage.setItem("isLoggedIn", "true");

    displayMessage("#message", "success", "Logging in...");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  } catch (error) {
    displayMessage("#message", "error", error.message);
  } finally {
    fieldset.disabled = false;
    button.textContent = previousButtonText;
  }
});
