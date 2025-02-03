export async function registerUser(name, email, password, bio) {
  const registerUrl = `https://v2.api.noroff.dev/auth/register`;

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
      alert("Registration successful! You can now log in.");
      window.location.href = "../account/login.html";
    } else {
      alert(data.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// Form data

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
