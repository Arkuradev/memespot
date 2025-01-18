import { API_LOGIN } from "./constants.mjs";

const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton"); // Check if this is needed.
const statusContainer = document.querySelector("#statusContainer"); // For errors and messages.

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents form from refreshing page.

  const email = emailInput.value;
  const password = passwordInput.value;

  // Come back to this later to properly handle errors.
  if (!email || !password) {
    statusContainer.textContent = "Please enter your email and password.";
    statusContainer.style.color = "red";
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

    statusContainer.textContent = "Login Successful!";
    statusContainer.style.color = "green";

    // Redirect to dashboard or home page. (Not decided yet)
    setTimeout(() => {
      window.location.href = "../account/dashboard.html";
    }, 1000);
  } catch (error) {
    statusContainer.textContent = error.message;
    statusContainer.style.color = "red";
  }
});
