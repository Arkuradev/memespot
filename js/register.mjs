import { displayMessage } from "./displayMessage.mjs";
import { BASE_API_ENDPOINT } from "./constants.mjs";

export async function registerUser(name, email, password, bio) {
  const registerUrl = `${BASE_API_ENDPOINT}/auth/register`;

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, bio }),
    });

    const data = await response.json();

    if (response.ok) {
      displayMessage("#message", "success", "Registration successful!");
      setTimeout(() => {
        window.location.href = "../account/login.html";
      }, 1500);
    } else {
      displayMessage(
        "#message",
        "error",
        data.message || "Registration failed."
      );
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const bio = document.getElementById("bio").value;

    await registerUser(name, email, password, bio);
  });
