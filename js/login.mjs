import { API_LOGIN } from "./constants.mjs";

const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");
const statusContainer = document.querySelector("#statusContainer"); // For errors and messages.

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents form from refreshing page.

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    statusContainer.textContent = "Please enter your email and password.";
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
    localStorage.setItem("token", data.data?.accessToken);

    statusContainer.textContent = "Login Successful!";
    statusContainer.style.color = "green";

    // Redirect to dashboard or home page. (Not decided yet)
  } catch (error) {
    statusContainer.textContent = error.message;
    statusContainer.style.color = "red";
  }
});
